---
name: motion-canvas-executive-film
description: Create and refine executive explainer animations in Motion Canvas. Use when asked to create, improve, or adapt a short executive motion film, especially for Microsoft or Azure architecture, AI governance, security, or cross-platform agent stories.
---

# Motion Canvas executive films

Use this skill to turn a concise executive brief into a polished, editable
Motion Canvas film—not a static mockup or a generic slide deck.

## Start with the story

- Identify the audience, the one point they should remember, the runtime,
  required facts, and the requested metaphor. Preserve a user-specified
  metaphor, such as airport security for AI agents.
- For an executive film, organize the story into a small number of beats:
  establish the problem or metaphor, show how the system works, make the
  architecture legible, show the outcome, then close with a memorable line.
- Write a concise voice-over or narration guide and match on-screen copy to
  its beats. Keep labels and narration readable at video size.
- Use exact runtime math. For example, 30 seconds at 30 fps is 900 frames.
  Set both the Motion Canvas project range and rendering frame rate to match.
- Do not invent customers, deployments, performance metrics, or product
  capabilities. Treat metaphors and synthetic examples as illustrative.

## Treat architecture as source-backed content

- Read the linked product repository or official architecture documentation
  before animating product architecture. Use its actual layer names,
  components, and relationships.
- Prefer a simple left-to-right flow: incoming platforms or agents, shared
  gateway / governance layers, then governed models, tools, and observable
  outcomes. Use overlays or spanning bands only when they accurately express
  cross-cutting controls.
- Keep architecture labels short. Put detailed service names in a compact
  supporting label or the project README, not in dense paragraphs on screen.
- Distinguish a reference architecture from a deployed implementation.
  Explain protocol or integration prerequisites; never imply every external
  platform connects automatically.
- When requested, show the canonical source repository URL on the relevant
  architecture beat, and add a clickable Markdown link in accompanying docs.
- Use product marks only when authorized and available. A palette inspired
  by a brand is not an official logo.

## Compose and animate in Motion Canvas

- Use Motion Canvas 2D components and generator-based timelines. Keep each
  scene editable and group elements by story beat.
- Design for the final composition size, not the editor window. A useful
  executive-film starting point is 1920×1080, 16:9, at 30 fps.
- Establish a clear reading order: one strong headline, one supporting
  message, then the diagram or visual proof. Make the active beat the focal
  point; avoid spreading small labels across the whole frame.
- Use scene transitions and motion to explain cause and flow—for example,
  platforms entering a checkpoint, a scan passing across the gate, or
  architecture layers appearing in sequence. Keep timing deliberate and
  readable rather than animating every element at once.
- Leave safe margins around all text and important marks. Keep text, cards,
  captions, and diagrams within the 16:9 frame and inside their containing
  panels. Check long service names and the final end card.
- Use a restrained, high-contrast palette with distinct semantic roles. For
  Microsoft-themed work, a deep blue field with Microsoft blue/cyan and
  sparing orange, green, and yellow accents can identify distinct layers or
  paths. Do not rely on color alone; pair it with labels and position.

## Text and legibility

- Avoid writing visible `\n` or `/n` artifacts into `Txt` content. For
  predictable line breaks, use separate `Txt` elements; otherwise let text
  wrap naturally and give it enough width.
- Increase text size for the rendered video, not merely the editor preview.
  Body labels should remain legible when the 1920×1080 video is shown scaled
  down in a presentation.
- Keep headings and support copy inside the frame and panel bounds. If copy
  clips, first widen or reposition the text box, then shorten the wording
  without changing the factual claim.
- Reduce unused space by bringing related content together and expanding
  meaningful diagrams or type—not by filling the frame with decorative
  elements.
- Check line height, letter spacing, text wrapping, and card width together;
  long service names may need wider rows or a smaller, still-readable size.

## Project workflow and verification

- Inspect the existing project before changing it. Reuse its package setup,
  scene, palette, frame rate, and editor configuration where possible.
- For a new project, use the Motion Canvas packages already established by
  the repository: `@motion-canvas/core`, `@motion-canvas/2d`,
  `@motion-canvas/ui`, and `@motion-canvas/vite-plugin`. Match Vite to the
  plugin's supported peer dependency.
- Keep the render range, scene timing, and narration timestamps in sync.
  For an image-sequence export, document how to render it and where output is
  saved; do not imply a video file exists until it has actually been exported.
- When the user requests a video or confirms frames are saved, automatically
  run `npm run export:video` after the complete PNG render. Do not stop at
  instructions: encode and verify the MP4, then report its actual path.
  This is agent workflow guidance, not a background watcher; it does not
  automatically fire when the editor finishes without an agent invocation.
- Use the project's render fps by default. If the frame count differs from
  the configured range, investigate incomplete or stale frames and confirm
  the original render rate. Only use `-- --fps 60` when the saved sequence
  was actually rendered at 60 fps. Never silently trim, delete, or retime it.
- The export script checks contiguous six-digit PNGs, encodes H.264 MP4,
  and verifies frame count, dimensions, fps, and duration using ffprobe.
  Existing videos are preserved; use `--output` for a new filename.
  On Windows ARM64, use the script's pinned Windows x64 FFmpeg fallback,
  not the unsupported native `@motion-canvas/ffmpeg` exporter.
- Run `npm run build` after changes. Check the live Vite/Motion Canvas editor
  for scene transform errors, then inspect the composition at the beginning,
  architecture beat, and end card. Verify all visible copy fits before
  reporting completion.
- Document the run command, runtime, beat timings, narration, source links,
  and any intentionally omitted assets such as recorded voice-over or music.
