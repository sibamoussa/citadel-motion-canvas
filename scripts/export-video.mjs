import {spawnSync} from 'node:child_process';
import {createWriteStream} from 'node:fs';
import {access, mkdir, readFile, readdir, rename, rm} from 'node:fs/promises';
import path from 'node:path';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const release = 'https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1';

export function parseOptions(args, defaultFps) {
  const options = {
    fps: defaultFps,
    explicitFps: false,
    frames: path.join(root, 'output', 'project'),
    output: path.join(root, 'output', 'project', 'citadel.mp4'),
  };
  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];
    if (!['--fps', '--frames', '--output'].includes(flag) || !value) {
      throw new Error('Usage: npm run export:video -- [--fps 60] [--frames directory] [--output file.mp4]');
    }
    if (flag === '--fps') {
      options.fps = Number(value);
      options.explicitFps = true;
    } else {
      options[flag.slice(2)] = path.resolve(value);
    }
  }
  if (!Number.isFinite(options.fps) || options.fps <= 0) {
    throw new Error('Frame rate must be a positive number.');
  }
  if (path.extname(options.output).toLowerCase() !== '.mp4') {
    throw new Error('Output must have an .mp4 extension.');
  }
  return options;
}

export function validateSequence(names, expectedFrames, explicitFps) {
  const frames = names.filter(name => /^\d{6}\.png$/.test(name)).sort();
  if (!frames.length) throw new Error('No six-digit PNG frames found. Render the image sequence first.');
  for (let i = 0; i < frames.length; i++) {
    if (frames[i] !== `${String(i).padStart(6, '0')}.png`) {
      throw new Error(`Missing frame ${String(i).padStart(6, '0')}.png; export a complete sequence.`);
    }
  }
  if (!explicitFps && frames.length !== expectedFrames) {
    throw new Error(
      `Found ${frames.length} frames, but the project range expects ${expectedFrames}. ` +
      'Check for an incomplete render or stale frames. Use --fps with the actual render rate only if this sequence is intentional.',
    );
  }
  return frames.length;
}

function run(binary, args, capture = false) {
  const result = spawnSync(binary, args, {
    stdio: capture ? 'pipe' : 'inherit',
    encoding: 'utf8',
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${path.basename(binary)} failed (${result.status}): ${result.stderr ?? ''}`);
  }
  return result.stdout;
}

async function download(name, destination) {
  const response = await fetch(`${release}/${name}`);
  if (!response.ok || !response.body) {
    throw new Error(`FFmpeg download failed: HTTP ${response.status} for ${name}`);
  }
  const temporary = `${destination}.download`;
  try {
    await pipeline(Readable.fromWeb(response.body), createWriteStream(temporary, {flags: 'wx'}));
    await rename(temporary, destination);
  } finally {
    await rm(temporary, {force: true});
  }
}

async function encoder(name) {
  const system = spawnSync(name, ['-version'], {stdio: 'ignore', windowsHide: true});
  if (!system.error && system.status === 0) return name;
  if (process.platform !== 'win32' || !['x64', 'arm64'].includes(process.arch)) {
    throw new Error(`Install ${name} and add it to PATH, then run export:video again.`);
  }
  const tools = path.join(root, '.tools');
  await mkdir(tools, {recursive: true});
  const binary = path.join(tools, `${name}.exe`);
  try {
    await access(binary);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.log(`Downloading pinned ${name} Windows x64 binary (Windows ARM uses x64 emulation).`);
    await download(`${name}-win32-x64`, binary);
  }
  for (const document of ['LICENSE', 'README']) {
    const destination = path.join(tools, `ffmpeg-${document}.txt`);
    try {
      await access(destination);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await download(`win32-x64.${document}`, destination);
    }
  }
  run(binary, ['-version'], true);
  return binary;
}

export async function main(args = process.argv.slice(2)) {
  const meta = JSON.parse(await readFile(path.join(root, 'src', 'project.meta'), 'utf8'));
  const options = parseOptions(args, meta.rendering.fps);
  const count = validateSequence(
    await readdir(options.frames),
    meta.shared.range[1] - meta.shared.range[0],
    options.explicitFps,
  );
  try {
    await access(options.output);
    throw new Error(`Output already exists: ${options.output}. Choose a new --output filename.`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const ffmpeg = await encoder('ffmpeg');
  const ffprobe = await encoder('ffprobe');
  await mkdir(path.dirname(options.output), {recursive: true});
  const temporary = options.output.replace(/\.mp4$/i, '.partial.mp4');
  await access(temporary).then(
    () => { throw new Error(`Temporary output exists: ${temporary}. Remove it or choose another output.`); },
    error => { if (error.code !== 'ENOENT') throw error; },
  );
  console.log(`Encoding ${count} frames at ${options.fps} fps (${(count / options.fps).toFixed(3)} seconds).`);
  try {
    run(ffmpeg, [
      '-hide_banner', '-loglevel', 'error', '-stats', '-n',
      '-framerate', String(options.fps), '-start_number', '0',
      '-i', path.join(options.frames, '%06d.png'),
      '-frames:v', String(count), '-an', '-c:v', 'libx264', '-crf', '18',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', temporary,
    ]);
    const probe = JSON.parse(run(ffprobe, [
      '-v', 'error', '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height,nb_frames,avg_frame_rate:format=duration',
      '-of', 'json', temporary,
    ], true));
    const stream = probe.streams[0];
    const [numerator, denominator] = stream.avg_frame_rate.split('/').map(Number);
    const duration = Number(probe.format.duration);
    if (
      Number(stream.nb_frames) !== count ||
      stream.width !== meta.shared.size.x * meta.rendering.resolutionScale ||
      stream.height !== meta.shared.size.y * meta.rendering.resolutionScale ||
      Math.abs(numerator / denominator - options.fps) > 0.001 ||
      Math.abs(duration - count / options.fps) > 1 / options.fps + 0.01
    ) {
      throw new Error(`Encoded video does not match expected frames, dimensions or duration: ${JSON.stringify(probe)}`);
    }
    await rename(temporary, options.output);
    console.log(`Saved ${options.output} (${stream.width}x${stream.height}, ${duration.toFixed(3)}s, no audio).`);
  } finally {
    await rm(temporary, {force: true});
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
