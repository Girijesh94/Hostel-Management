# HostelMate 3D experience

The public homepage at / is a responsive student-living experience. Existing authentication, student, and warden routes remain connected. The three architectural scenes are illustrative concepts, not live room inventory.

## Integrations

| Capability | Installed version | Source |
| --- | --- | --- |
| React Three Fiber | 9.8.1 (React 19) | https://github.com/pmndrs/react-three-fiber |
| Three.js | 0.186.1 | https://github.com/mrdoob/three.js |
| ShaderGradient | @shadergradient/react 2.4.20 | https://github.com/ruucm/shadergradient |
| Paper liquid metal | @paper-design/shaders-react 0.0.81 | https://github.com/paper-design/liquid-logo |
| Refractive glass | Vendored Container at 78cb6ccb0b9987bb60a88b14ccbd13a9e6e8ab2a | https://github.com/dashersw/liquid-glass-js |

- ResidenceScene builds the exterior, room, and lounge from local geometry. Drag to rotate; use the pause button to stop automatic rotation.
- LiquidLogo applies Paper LiquidMetal to the authored public/hostel-mark.svg. The readable name remains HTML and the SVG remains a static fallback.
- Atmosphere uses a ShaderGradient plane with local 3D lighting, without downloading environment maps.
- GlassSurface wraps the vendored Container. It samples a bounded, authored gradient texture, never document content. Adaptations remove document capture, cancel pending size work and image callbacks, remove scroll listeners, release buffers/textures/programs, and lose the WebGL context on disposal.
- Geometry and materials are managed and disposed by Fiber. OrbitControls is disposed on unmount.
- Graphics load lazily. Fiber DPR is capped at 1.5; Paper is capped at 4096 pixels; ShaderGradient pixel density is 1. Scenes pause offscreen and when the page is hidden. Reduced motion stops automatic rotation and shader animation.
- A local room photograph replaces the 3D explorer when WebGL is unavailable. CSS backgrounds preserve the layout if decorative renderers cannot load.

## Compatibility

Fiber extends React's JSX elements with 3D types. This causes TypeScript TS2590 in the existing MUI v5 Box polymorphic types. Existing default Box elements now explicitly specify component="div", preserving the same HTML and behavior while avoiding the large inferred union.

## Licenses and notices

The glass source retains its MIT license at src/vendor/liquid-glass/LICENSE and public/notices/liquid-glass-LICENSE.txt. Its upstream revision is recorded alongside the source.

The referenced Paper liquid-logo project is licensed under PolyForm Shield 1.0.0, not MIT. Its notice is preserved at public/notices/paper-liquid-logo-LICENSE.txt. The installed Paper Shaders runtime also retains its own package LICENSE and NOTICE; the notice is copied to public/notices/paper-shaders-NOTICE.txt.

## Verification

Production TypeScript/Vite build passes. Browser verification covers desktop/mobile layouts, all scene tabs, pause, mobile navigation, signup/signin routes, footer gradient, reduced motion, no-WebGL fallback, and route unmount/remount. Existing repository-wide lint errors predate this work; lint passes for the new homepage and graphics components.

Run npm install and npm run dev for the local preview. API-backed authentication and resident features require the existing backend configuration.

