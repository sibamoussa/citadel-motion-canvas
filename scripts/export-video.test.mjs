import assert from 'node:assert/strict';
import test from 'node:test';
import {parseOptions, validateSequence, validateFrameTimes} from './export-video.mjs';

test('uses project fps unless explicitly overridden', () => {
  assert.equal(parseOptions([], 30).fps, 30);
  const options = parseOptions(['--fps', '60'], 30);
  assert.equal(options.fps, 60);
  assert.equal(options.explicitFps, true);
});

test('rejects invalid arguments and frame rates', () => {
  for (const args of [['--fps'], ['--fps', '0'], ['--fps', 'NaN'], ['--unknown', '60'], ['--output', 'film.png']]) {
    assert.throws(() => parseOptions(args, 30));
  }
});

test('requires contiguous frames starting at zero', () => {
  assert.equal(validateSequence(['000001.png', '000000.png', 'notes.txt'], 2, false), 2);
  assert.throws(() => validateSequence([], 2, false), /No six-digit/);
  assert.throws(() => validateSequence(['000001.png'], 1, true), /Missing frame/);
  assert.throws(() => validateSequence(['000000.png', '000002.png'], 2, true), /Missing frame/);
});

test('detects stale or incomplete ranges unless render fps is explicit', () => {
  assert.throws(() => validateSequence(['000000.png'], 900, false), /project range expects/);
  assert.equal(validateSequence(['000000.png'], 900, true), 1);
});

test('rejects older frames left behind by a previous render even with explicit fps', () => {
  validateFrameTimes([10000, 11000, 12000]);
  validateFrameTimes([10000, 9900, 11000]);
  assert.throws(() => validateFrameTimes([10000, 11000, 5000]), /Stale frames/);
});
