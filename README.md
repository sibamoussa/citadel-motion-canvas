# Citadel Motion Canvas animation

A 30-second, 16:9 Motion Canvas executive film explaining Citadel as airport
security for AI agents: agents built across stacks enter through supported
protocols, pass through a shared governance hub, and remain observable.
The animation uses Microsoft's blue-first palette with four-color accents.

### Requirements

Install Node.js 22 or newer (including npm) and Git. Use a browser to preview
and render the animation. An internet connection is required for npm setup
and, on Windows, the first automatic FFmpeg download.

### Get started

Clone the project, then run these commands from its folder:

```sh
git clone https://github.com/sibamoussa/citadel-motion-canvas.git
cd citadel-motion-canvas
npm install
npm run dev
```

Open the local URL printed in the terminal. Keep that terminal running while
using the Motion Canvas editor. Press Play to preview the film or scrub the
timeline to inspect individual beats. Stop the server with Ctrl+C when finished.

To watch without installing anything, open or download
[the exported MP4](media/citadel.mp4). The published video is 30.667 seconds
at 60 fps, 1920x1080, with no audio.

### Step by step: replicate this film

1. Install the requirements above, clone the repository, and enter
   `citadel-motion-canvas`.
2. Run `npm ci` to install the dependency versions recorded in the lockfile.
3. Run `npm run dev` and open the URL printed in the terminal.
4. Play the film from the beginning. Check the opening, platform intake,
   architecture, screening, control tower, and final card before rendering.
5. For the configured 30-second version, select PNG image sequence,
   1920x1080, resolution scale 1, rendering fps 30, range 0-900, and no
   scene grouping. Use an empty frame folder, then click Render.
6. Wait for rendering to finish and confirm the numbered PNGs are in
   `output\project`. In a second terminal in the project folder, run
   `npm run export:video`.
7. Open `output\project\citadel.mp4` in a video player and watch the full
   result. Use this file in your presentation or share it with others.

The checked-in viewing copy was made from 1,840 saved frames at 60 fps and
lasts 30.667 seconds. The default recipe above produces the configured
900-frame, 30-fps version; it is not a byte-for-byte reproduction of that
earlier export. To regenerate the viewing copy, render the full scene at
60 fps, note the actual frame count, and use
`npm run export:video -- --fps 60`. Fonts and rendering can vary between
machines.

### Step by step: create a new motion

1. Fork this repository on GitHub, then clone your fork. Alternatively,
   clone this repository into a new local folder to experiment without
   changing the original. Run `npm ci`.
2. Define the brief: audience, one takeaway, desired duration, palette,
   source material, and any required metaphor. Break it into timed beats.
   For a 30-second film, start with a short opening, an explanation,
   a diagram, an outcome, and a closing message.
3. Create `src\scenes\my-motion.tsx`. Either copy `citadel.tsx` and adapt
   its existing components, or use the small scene below as a starting point.
   Replace Citadel-specific names, links, and claims with your own
   source-backed content.
4. Register the new scene in `src\project.ts` using the example below.
   Replace the scene list to make a new film, or add scenes in sequence for
   a multi-scene film. Each scene's duration contributes to the total.
5. Build the visuals in JSX and animate their properties with generator
   functions. `yield*` waits for a transition; `all(...)` runs transitions
   together. Include both animation durations and `waitFor(...)` pauses
   in the total runtime.
6. Match the project render range to the new runtime: seconds multiplied
   by rendering fps. The starter below lasts 5 seconds, so use range
   0-150 at 30 fps. Keep the composition at 1920x1080 and scale 1 unless
   you intentionally need another size.
7. Run `npm run dev`, preview the new scene, and inspect its first frame,
   transitions, and final frame. Check text wrapping, safe margins, and
   readability. Run `npm run build` and `npm run test:export`.
8. Render a fresh PNG sequence using the settings above, then run
   `npm run export:video -- --output output\project\my-motion.mp4`.
   If the render used another fps, also pass that actual rate with `--fps`.
9. Watch the exported film end to end. Update this README's story, source
   references, and timings. If publishing a viewing copy, put it in
   `media` rather than committing the generated frame directory.

**Minimal scene** (`src\scenes\my-motion.tsx`):

```tsx
import {makeScene2D, Txt} from '@motion-canvas/2d';
import {createRef, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#071A2B');
  const title = createRef<Txt>();
  view.add(
    <Txt
      ref={title}
      text="Your executive message"
      fontSize={80}
      fill="#F5FAFF"
      width={1500}
      textAlign="center"
      textWrap
      opacity={0}
    />,
  );
  yield* title().opacity(1, 0.6);
  yield* waitFor(3.8);
  yield* title().opacity(0, 0.6);
});
```

**Register it** (`src\project.ts`):

```ts
import {makeProject} from '@motion-canvas/core';
import myMotion from './scenes/my-motion?scene';

export default makeProject({
  scenes: [myMotion],
});
```

**Optional agent-assisted workflow:** open your fork in a coding agent that
supports project skills and ask it to follow
`.github\skills\motion-canvas-executive-film\SKILL.md`. For example:

> Create a 30-second executive Motion Canvas film about [topic] for
> [audience]. Use [source URL] for factual claims, [metaphor] to explain
> the flow, and [palette]. Include five readable story beats, update the
> narration guide, and check text fits. Follow the project film skill.

After the editor finishes rendering, ask the agent to convert the saved
frames and provide their directory and actual render fps. The skill does
not replace the editor's PNG render step.

### Edit the animation

| File | What to change |
| --- | --- |
| `src/scenes/citadel.tsx` | On-screen text, Microsoft colors, diagrams, motion, and scene timing. |
| `src/project.ts` | Scenes included in the project. |
| `src/project.meta` | Composition size, render frame rate, frame range, and exporter settings. |
| `.github/skills/motion-canvas-executive-film/SKILL.md` | Guidance for a coding agent creating, refining, and exporting films. |

Save changes and inspect them in the editor. Run `npm run build` to check
TypeScript and bundle the project. This command does **not** produce a video.
For deliberate line breaks in JSX, use a JavaScript expression such as
`text={'First line\nSecond line'}` or separate text nodes; quoted JSX
attributes do not interpret `\n`.

### Render PNG frames

1. In the editor's Video Settings, select the image-sequence exporter and PNG.
2. Set the composition to 1920x1080, rendering fps to 30, and range to
   0-900 frames for the configured 30-second export. Preview fps is separate.
3. Keep scene grouping disabled so frames use one numbered sequence.
4. Click Render and wait until the render finishes. The default frames are
   saved in `output\project` as `000000.png`, `000001.png`, and so on.

Before re-rendering a shorter sequence, move previous frames to a backup folder
so stale PNGs do not remain at the end. Do not mix different renders in one
directory. Export only after all frames have been saved.

### Export MP4

After rendering PNG frames, run:

```sh
npm run export:video
```

This creates `output\project\citadel.mp4` with H.264, presentation-friendly quality,
and no audio. The command reads the project render frame rate, checks for
missing or stale frames, and verifies the encoded dimensions, duration, and
frame count. It refuses to overwrite an existing video. For another export:

```sh
npm run export:video -- --output output\project\citadel-v2.mp4
```

If the frames were rendered at a different frame rate, explicitly supply
that rate, for example `npm run export:video -- --fps 60`.
Do not change the rate just to shorten the video: it must match the actual
render rate. The saved 1,840-frame sequence is 30.667 seconds at 60 fps.
For an exact 30-second film, render a fresh, empty sequence directory with
the configured 900-frame range at 30 fps.

For frames saved elsewhere, pass their directory and the desired destination.
Quote paths containing spaces:

```sh
npm run export:video -- --fps 60 --frames "C:\path\to\frames" --output "C:\path\to\citadel.mp4"
```

These examples use Windows paths; on macOS or Linux, use the equivalent paths
for your system.

FFmpeg and ffprobe are used from PATH when available. On Windows x64 or ARM64,
missing tools are automatically downloaded from the pinned `b6.1.1` release
of [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static) into the ignored
`.tools` directory, including license documentation. Windows ARM64 runs the
x64 binaries through emulation, avoiding the unsupported native Motion Canvas
FFmpeg plugin. Other systems need FFmpeg and ffprobe installed on PATH.

### Troubleshooting and automation

| Message or issue | What to do |
| --- | --- |
| No frames found or missing frame | Finish rendering a complete numbered PNG sequence and check the `--frames` directory. |
| Frame count differs from the project range | Check for stale PNGs or an incomplete render. If intentional, pass the actual render fps with `--fps`. |
| Output already exists | Preserve the old video and choose a new filename with `--output`. |
| Wrong dimensions or duration | Check the render size, resolution scale, fps, and range; render a fresh sequence with matching settings. |
| FFmpeg download fails | Check internet access, or install FFmpeg and ffprobe on PATH and retry. |
| Literal newline text or clipping | Edit the scene's text expressions, widths, positions, and font sizes, then inspect the rendered frames. |

Run `npm run test:export` to check the export script's argument and sequence
validation. The project skill instructs an agent to run conversion once you
confirm frames are saved. It is not an always-running watcher: manual editor
renders still require `npm run export:video` or an agent request to convert.

Generated PNGs, local MP4s, dependencies, build output, and downloaded tools
are ignored by Git. The intentionally published viewing copy is
`media\citadel.mp4`.

### Story and voice-over

| Time | On-screen story | Voice-over |
| --- | --- | --- |
| 00–03 | The checkpoint | Different platforms. Different agents. |
| 03–08 | Platform intake | Citadel is airport security for AI agents. |
| 08–17 | Four-layer architecture | REST, MCP and A2A connect them to one gateway. Four layers add enforcement, observability, identity and security. |
| 17–24 | Security screening | Identity checks, rate limits and safety filters screen routed requests before they reach models or tools. |
| 24–27 | Control tower | Registry. Traces. Usage and cost. |
| 27–30 | The close | Citadel. Govern AI at scale. |

### Architecture depicted

The architecture is based on the [Foundry Citadel Platform reference
repository](https://github.com/Azure-Samples/foundry-citadel-platform):

- **Governance Hub:** Azure API Management for runtime gateway enforcement and Azure API Center for the shared registry.
- **AI Control Plane:** Microsoft Foundry Control Plane for observability, traces, evaluations and red teaming.
- **Agent Identity:** Microsoft Entra ID and Agent 365 for agent identity and lifecycle governance.
- **Security Fabric:** Microsoft Defender, Microsoft Purview and Entra protections spanning the other layers.

The airport checkpoint is an explanatory metaphor. The linked repository
describes an adaptable reference architecture and protocol-agnostic approach;
the animation names REST, MCP and A2A as connection options. Platform coverage
depends on the available protocol integration—it does not imply every agent
connects without configuration. No recorded voice-over, music, third-party
assets, or official product logos are included.