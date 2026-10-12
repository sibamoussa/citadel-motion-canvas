# secutiy-agents

## Citadel executive animation

A 30-second, 16:9 Motion Canvas executive film explaining Citadel as airport
security for AI agents: agents built across stacks enter through supported
protocols, pass through a shared governance hub, and remain observable.
The animation uses Microsoft's blue-first palette with four-color accents.

### Preview

```sh
npm install
npm run dev
```

Open the local Vite URL to preview and control the animation in the Motion
Canvas editor. Use the editor's render control to export the scene as a
30-fps PNG sequence in `output/`; the configured range is exactly 900 frames
(30 seconds).

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