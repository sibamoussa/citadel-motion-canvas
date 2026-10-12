import {Circle, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';

const C = {
  ink: '#071A2B',
  panel: '#0D2942',
  panel2: '#123B5A',
  white: '#F5FAFF',
  muted: '#B5CBE0',
  teal: '#00A4EF',
  tealDim: '#0078D4',
  gold: '#FFB900',
  red: '#F25022',
  green: '#7FBA00',
  line: '#27506F',
};

const entities = [
  {label: 'FOUNDRY BUILDS', detail: 'Microsoft Foundry', x: -565, y: -210, accent: C.teal},
  {label: 'CUSTOM STACKS', detail: 'Your chosen framework', x: 565, y: -210, accent: C.tealDim},
  {label: 'PARTNER AGENTS', detail: 'REST · MCP · A2A', x: -565, y: 190, accent: C.red},
  {label: 'OTHER PLATFORMS', detail: 'Connected runtimes', x: 565, y: 190, accent: C.green},
];

export default makeScene2D(function* (view) {
  view.fill(C.ink);

  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const topLabel = createRef<Txt>();
  const hub = createRef<Rect>();
  const hubCore = createRef<Circle>();
  const checkpointBeam = createRef<Line>();
  const hubWord = createRef<Txt>();
  const hubCaption = createRef<Txt>();
  const repositoryLink = createRef<Txt>();
  const entityCards = entities.map(() => createRef<Rect>());
  const connectors = entities.map(() => createRef<Line>());
  const architecturePanel = createRef<Rect>();
  const architectureFlows = [createRef<Line>()];
  const oversightPanel = createRef<Rect>();
  const outcomePanel = createRef<Rect>();
  const timeline = createRef<Txt>();
  const footer = createRef<Txt>();
  const scanDot = createRef<Circle>();
  const scanLabel = createRef<Txt>();
  const endTitle = createRef<Txt>();
  const endSub = createRef<Txt>();
  const timecode = createRef<Txt>();

  view.add(
    <>
      {[
        {x: -875, y: -458, fill: C.red},
        {x: -857, y: -458, fill: C.green},
        {x: -875, y: -440, fill: C.teal},
        {x: -857, y: -440, fill: C.gold},
      ].map((pane) => (
        <Rect
          x={pane.x}
          y={pane.y}
          width={14}
          height={14}
          fill={pane.fill}
        />
      ))}
      <Txt
        ref={topLabel}
        text="CITADEL  /  AIRPORT SECURITY FOR AI"
        x={-600}
        y={-450}
        width={460}
        fontFamily="Arial"
        fontSize={17}
        fontWeight={600}
        letterSpacing={3}
        fill={C.muted}
        opacity={0}
      />
      <Txt
        ref={title}
        text="Different agents."
        x={0}
        y={-180}
        width={1500}
        fontFamily="Arial"
        fontSize={86}
        fontWeight={600}
        lineHeight={96}
        fill={C.white}
        textAlign="center"
        opacity={0}
      />
      <Txt
        ref={subtitle}
        text="One checkpoint for AI."
        x={0}
        y={-77}
        width={1200}
        fontFamily="Arial"
        fontSize={31}
        lineHeight={38}
        fill={C.muted}
        textAlign="center"
        opacity={0}
      />

      <Line
        points={[
          [-940, 396],
          [-350, 396],
          [-310, 372],
          [-210, 372],
          [-170, 396],
          [940, 396],
        ]}
        stroke={C.line}
        lineWidth={2}
        opacity={0.65}
      />

      {entities.map((entity, index) => (
        <>
          <Line
            ref={connectors[index]}
            points={[[0, 0], [entity.x, entity.y]]}
            stroke={entity.accent}
            lineWidth={2}
            opacity={0}
            end={0}
          />
          <Rect
            ref={entityCards[index]}
            x={entity.x}
            y={entity.y}
            width={270}
            height={116}
            radius={12}
            fill={C.panel}
            stroke={entity.accent}
            lineWidth={1}
            opacity={0}
          >
            <Circle
              x={-106}
              y={-25}
              width={10}
              height={10}
              fill={entity.accent}
              opacity={0.85}
            />
            <Txt
              text={entity.label}
              x={0}
              y={-20}
              width={240}
              fontFamily="Arial"
              fontSize={18}
              fontWeight={600}
              letterSpacing={1.4}
              fill={C.white}
              textAlign="center"
            />
            <Txt
              text={entity.detail}
              x={0}
              y={25}
              width={240}
              fontFamily="Arial"
              fontSize={17}
              fill={C.muted}
              textAlign="center"
            />
          </Rect>
        </>
      ))}

      <Rect
        ref={hub}
        x={0}
        y={0}
        width={244}
        height={248}
        radius={22}
        stroke={C.teal}
        lineWidth={3}
        fill={C.panel}
        opacity={0}
      >
        <Line
          points={[[-92, -99], [92, -99]]}
          stroke={C.teal}
          lineWidth={6}
        />
        <Line
          ref={checkpointBeam}
          points={[[-92, -60], [92, -60]]}
          stroke={C.gold}
          lineWidth={2}
          opacity={0}
        />
        <Line
          points={[[-92, 78], [92, 78]]}
          stroke={C.line}
          lineWidth={1}
        />
      </Rect>
      <Circle
        ref={hubCore}
        x={0}
        y={-47}
        width={12}
        height={12}
        fill={C.gold}
        opacity={0}
      />
      <Txt
        ref={hubWord}
        text="CITADEL"
        x={0}
        y={-12}
        width={210}
        fontFamily="Arial"
        fontSize={29}
        fontWeight={700}
        letterSpacing={4}
        fill={C.white}
        textAlign="center"
        opacity={0}
      />
      <Txt
        ref={hubCaption}
        text="SECURITY CHECKPOINT"
        x={0}
        y={42}
        width={230}
        fontFamily="Arial"
        fontSize={14}
        fontWeight={600}
        letterSpacing={2}
        fill={C.teal}
        textAlign="center"
        opacity={0}
      />

      <Rect
        ref={architecturePanel}
        x={0}
        y={45}
        width={1420}
        height={420}
        radius={24}
        fill={C.panel}
        stroke={C.line}
        lineWidth={1}
        opacity={0}
      >
        <Txt
          text="Four layers. One security checkpoint."
          x={0}
          y={-150}
          width={1280}
          fontFamily="Arial"
          fontSize={34}
          fontWeight={700}
          fill={C.white}
          textAlign="center"
        />
        <Txt
          text="FOUNDRY CITADEL REFERENCE ARCHITECTURE"
          x={0}
          y={-108}
          width={1280}
          fontFamily="Arial"
          fontSize={16}
          fontWeight={600}
          letterSpacing={1.6}
          fill={C.muted}
          textAlign="center"
        />
        <Rect
          x={-455}
          y={24}
          width={270}
          height={178}
          radius={14}
          fill={C.panel2}
          stroke={C.teal}
          lineWidth={1}
        >
          <Txt
            text="AGENTS FROM ANY STACK"
            x={0}
            y={-40}
            width={250}
            fontFamily="Arial"
            fontSize={22}
            fontWeight={700}
            lineHeight={27}
            fill={C.white}
            textAlign="center"
          />
          <Line
            points={[[-88, 0], [88, 0]]}
            stroke={C.line}
            lineWidth={1}
          />
          <Txt
            text="REST  ·  MCP  ·  A2A"
            x={0}
            y={28}
            width={220}
            fontFamily="Arial"
            fontSize={16}
            fontWeight={600}
            letterSpacing={1}
            fill={C.teal}
            textAlign="center"
          />
          <Txt
            text="Protocol-based entry"
            x={0}
            y={62}
            width={220}
            fontFamily="Arial"
            fontSize={14}
            fill={C.muted}
            textAlign="center"
          />
        </Rect>
        <Line
          ref={architectureFlows[0]}
          points={[[-320, -63], [-207, -63]]}
          stroke={C.teal}
          lineWidth={2}
          opacity={0}
          end={0}
        />
        <Txt
          text="›"
          x={-262}
          y={-64}
          width={28}
          fontFamily="Arial"
          fontSize={32}
          fontWeight={600}
          fill={C.teal}
          textAlign="center"
        />
        {[
          {
            layer: 'GOVERNANCE HUB',
            services: 'Azure API Management · API Center registry',
            accent: C.tealDim,
          },
          {
            layer: 'AI CONTROL PLANE',
            services: 'Foundry Control Plane · traces · red teaming',
            accent: C.teal,
          },
          {
            layer: 'AGENT IDENTITY',
            services: 'Microsoft Entra ID · Agent 365',
            accent: C.green,
          },
          {
            layer: 'SECURITY FABRIC',
            services: 'Defender · Purview · Entra · across all layers',
            accent: C.red,
          },
        ].map((layer, index) => (
          <Rect
            x={185}
            y={-63 + index * 58}
            width={830}
            height={48}
            radius={8}
            fill={C.panel2}
            stroke={layer.accent}
            lineWidth={1}
          >
            <Rect
              x={-405}
              y={0}
              width={8}
              height={34}
              radius={3}
              fill={layer.accent}
            />
            <Txt
              text={`0${index + 1}`}
              x={-365}
              y={0}
              width={50}
              fontFamily="Arial"
              fontSize={16}
              fontWeight={700}
              fill={layer.accent}
            />
            <Txt
              text={layer.layer}
              x={-220}
              y={0}
              width={255}
              fontFamily="Arial"
              fontSize={16}
              fontWeight={700}
              letterSpacing={0.8}
              fill={C.white}
            />
            <Txt
              text={layer.services}
              x={160}
              y={0}
              width={490}
              fontFamily="Arial"
              fontSize={15}
              fill={C.muted}
            />
          </Rect>
        ))}
        <Txt
          text="THE GATEWAY GOVERNS MODEL, TOOL AND AGENT TRAFFIC"
          x={0}
          y={168}
          width={1280}
          fontFamily="Arial"
          fontSize={16}
          fontWeight={600}
          letterSpacing={0.8}
          fill={C.teal}
          textAlign="center"
        />
      </Rect>

      <Rect
        ref={oversightPanel}
        x={0}
        y={45}
        width={1420}
        height={400}
        radius={24}
        fill={C.panel}
        stroke={C.line}
        lineWidth={1}
        opacity={0}
      >
        <Txt
          text="THE SECURITY SCREENING"
          x={-305}
          y={-145}
          width={700}
          fontFamily="Arial"
          fontSize={18}
          fontWeight={600}
          letterSpacing={2.4}
          fill={C.teal}
        />
        <Txt
          text="Screen every request"
          x={-300}
          y={-70}
          width={760}
          fontFamily="Arial"
          fontSize={48}
          fontWeight={600}
          lineHeight={56}
          fill={C.white}
        />
        <Txt
          text="Identity · rate limits · PII · content safety"
          x={-300}
          y={25}
          width={760}
          fontFamily="Arial"
          fontSize={24}
          lineHeight={34}
          fill={C.muted}
        />
        <Line
          points={[[-5, 10], [160, 10], [290, 10], [425, 10]]}
          stroke={C.line}
          lineWidth={3}
        />
        <Circle
          x={-5}
          y={10}
          width={28}
          height={28}
          fill={C.teal}
        />
        <Circle
          x={160}
          y={10}
          width={28}
          height={28}
          fill={C.teal}
        />
        <Circle
          ref={scanDot}
          x={290}
          y={10}
          width={48}
          height={48}
          fill={C.gold}
          scale={0}
        />
        <Circle
          x={425}
          y={10}
          width={28}
          height={28}
          fill={C.tealDim}
        />
        <Txt
          text="REQUEST"
          x={-5}
          y={62}
          width={120}
          fontFamily="Arial"
          fontSize={16}
          fontWeight={600}
          letterSpacing={1.2}
          fill={C.muted}
          textAlign="center"
        />
        <Txt
          text="IDENTITY"
          x={160}
          y={62}
          width={120}
          fontFamily="Arial"
          fontSize={16}
          fontWeight={600}
          letterSpacing={1.2}
          fill={C.muted}
          textAlign="center"
        />
        <Txt
          text="SAFETY SCAN"
          x={290}
          y={62}
          width={180}
          fontFamily="Arial"
          fontSize={16}
          fontWeight={600}
          letterSpacing={1.2}
          fill={C.gold}
          textAlign="center"
        />
        <Txt
          text="ALLOW / BLOCK"
          x={425}
          y={62}
          width={120}
          fontFamily="Arial"
          fontSize={16}
          fontWeight={600}
          letterSpacing={1.2}
          fill={C.muted}
          textAlign="center"
        />
        <Txt
          ref={scanLabel}
          text="CONTENT + SAFETY CHECK"
          x={290}
          y={-68}
          width={300}
          fontFamily="Arial"
          fontSize={17}
          fontWeight={700}
          letterSpacing={1.2}
          fill={C.gold}
          textAlign="center"
          opacity={0}
        />
      </Rect>

      <Rect
        ref={outcomePanel}
        x={0}
        y={45}
        width={1420}
        height={400}
        radius={24}
        fill={C.panel}
        stroke={C.line}
        lineWidth={1}
        opacity={0}
      >
        <Txt
          text="THE CONTROL TOWER"
          x={-300}
          y={-145}
          width={700}
          fontFamily="Arial"
          fontSize={18}
          fontWeight={600}
          letterSpacing={2.4}
          fill={C.teal}
        />
        <Txt
          text="Trace activity. Control cost."
          x={-305}
          y={-70}
          width={700}
          fontFamily="Arial"
          fontSize={48}
          fontWeight={600}
          lineHeight={54}
          fill={C.white}
        />
        <Txt
          text="A shared registry, end-to-end traces and usage controls across connected agents."
          x={-300}
          y={28}
          width={700}
          fontFamily="Arial"
          fontSize={24}
          lineHeight={34}
          fill={C.muted}
        />
        {[
          ['AI REGISTRY', 'Agents · models · tools'],
          ['OBSERVABILITY', 'End-to-end traces · evaluations'],
          ['COST CONTROLS', 'Token limits · usage attribution'],
        ].map(([label, detail], index) => (
          <>
            {index > 0 && (
              <Line
                points={[[55, -48 + index * 82], [650, -48 + index * 82]]}
                stroke={C.line}
                lineWidth={1}
              />
            )}
            <Circle
              x={76}
              y={-75 + index * 82}
              width={10}
              height={10}
              fill={index === 1 ? C.gold : C.teal}
            />
            <Txt
              text={label}
              x={270}
              y={-84 + index * 82}
              width={440}
              fontFamily="Arial"
              fontSize={18}
              fontWeight={700}
              letterSpacing={1.5}
              fill={C.white}
            />
            <Txt
              text={detail}
              x={270}
              y={-53 + index * 82}
              width={460}
              fontFamily="Arial"
              fontSize={18}
              fill={C.muted}
            />
          </>
        ))}
      </Rect>

      <Txt
        ref={timeline}
        text=""
        x={0}
        y={330}
        width={1120}
        fontFamily="Arial"
        fontSize={17}
        fontWeight={600}
        letterSpacing={1.7}
        fill={C.muted}
        textAlign="center"
        opacity={0}
      />
      <Txt
        ref={footer}
        text="CITADEL  /  TRUSTED GOVERNANCE ACROSS AGENT STACKS"
        x={0}
        y={458}
        width={1100}
        fontFamily="Arial"
        fontSize={17}
        fontWeight={600}
        letterSpacing={1.6}
        fill={C.muted}
        textAlign="center"
        opacity={0}
      />
      <Txt
        ref={repositoryLink}
        text="github.com/Azure-Samples/foundry-citadel-platform"
        x={0}
        y={390}
        width={1400}
        fontFamily="Arial"
        fontSize={22}
        fontWeight={600}
        fill={C.teal}
        textAlign="center"
        opacity={0}
      />
      <Txt
        ref={timecode}
        text="30 SECONDS  /  EXECUTIVE OVERVIEW"
        x={690}
        y={-450}
        width={440}
        fontFamily="Arial"
        fontSize={16}
        fontWeight={600}
        letterSpacing={1.6}
        fill={C.muted}
        textAlign="right"
        opacity={0}
      />
      <Txt
        ref={endTitle}
        text="Different stacks. One trusted checkpoint."
        x={0}
        y={-48}
        width={1500}
        fontFamily="Arial"
        fontSize={66}
        fontWeight={600}
        lineHeight={80}
        fill={C.white}
        textAlign="center"
        opacity={0}
      />
      <Txt
        ref={endSub}
        text="CITADEL  ·  GOVERNED AI ACROSS PLATFORMS"
        x={0}
        y={115}
        width={1300}
        fontFamily="Arial"
        fontSize={20}
        fontWeight={600}
        letterSpacing={3}
        fill={C.teal}
        textAlign="center"
        opacity={0}
      />
    </>,
  );

  yield* all(
    topLabel().opacity(1, 0.8),
    title().opacity(1, 1.1),
    title().position.y(-145, 1.1),
  );
  yield* all(subtitle().opacity(1, 0.8), timecode().opacity(1, 0.8));
  yield* waitFor(1.1);

  yield* all(
    title().opacity(0, 0.55),
    subtitle().opacity(0, 0.55),
    topLabel().opacity(0, 0.55),
    timecode().opacity(0, 0.55),
    hub().opacity(1, 0.8),
    hubCore().opacity(1, 0.8),
    hubWord().opacity(1, 0.8),
    hubCaption().opacity(1, 0.8),
    repositoryLink().opacity(1, 0.8),
    timeline().text('MULTI-STACK AGENTS  →  REST  ·  MCP  ·  A2A', 0.8),
    timeline().opacity(1, 0.8),
    footer().opacity(1, 0.8),
  );
  yield* all(
    ...entityCards.map((card) => card().opacity(1, 0.75)),
    ...connectors.map((line) => all(line().opacity(1, 0.8), line().end(1, 1.1))),
  );
  yield* all(
    checkpointBeam().opacity(1, 0.1),
    checkpointBeam().position.y(54, 0.8).to(-60, 0.8),
  );
  yield* waitFor(1.5);

  yield* all(
    ...entityCards.map((card) => card().opacity(0, 0.45)),
    ...connectors.map((line) => line().opacity(0, 0.4)),
    hub().opacity(0, 0.4),
    hubCore().opacity(0, 0.4),
    hubWord().opacity(0, 0.4),
    hubCaption().opacity(0, 0.4),
    repositoryLink().opacity(0, 0.4),
    timeline().opacity(0, 0.4),
    architecturePanel().opacity(1, 0.65),
  );
  timeline().text('GOVERNANCE HUB  ·  CONTROL PLANE  ·  IDENTITY  ·  SECURITY FABRIC');
  yield* all(
    timeline().opacity(1, 0.3),
    ...architectureFlows.map((line) =>
      all(line().opacity(1, 0.45), line().end(1, 0.75)),
    ),
  );
  yield* waitFor(8.25);

  yield* all(
    architecturePanel().opacity(0, 0.5),
    ...architectureFlows.map((line) => line().opacity(0, 0.4)),
    oversightPanel().opacity(1, 0.5),
    timeline().opacity(0, 0.3),
  );
  timeline().text('IDENTITY CHECK  →  SAFETY SCAN  →  ALLOW OR BLOCK');
  yield* all(
    timeline().opacity(1, 0.3),
    scanDot().scale(1, 0.6),
    scanLabel().opacity(1, 0.6),
  );
  yield* waitFor(5.9);

  yield* all(
    oversightPanel().opacity(0, 0.5),
    outcomePanel().opacity(1, 0.5),
    scanLabel().opacity(0, 0.3),
    timeline().opacity(0, 0.3),
  );
  timeline().text('OBSERVABILITY  ·  SHARED REGISTRY  ·  COST CONTROL');
  yield* timeline().opacity(1, 0.3);
  yield* waitFor(2.2);

  yield* all(
    outcomePanel().opacity(0, 0.55),
    footer().opacity(0, 0.45),
    timeline().opacity(0, 0.45),
    timecode().opacity(1, 0.6),
    endTitle().opacity(1, 0.8),
    endSub().opacity(1, 0.8),
  );
  yield* waitFor(2.2);
});
