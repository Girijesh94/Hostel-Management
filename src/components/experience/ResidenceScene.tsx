import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three-stdlib';
import type { Group } from 'three';

type Vec = [number, number, number];
function Block({ at, size, color = '#e2d0b8', glow = false }: { at: Vec; size: Vec; color?: string; glow?: boolean }) {
  return <mesh position={at} castShadow receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.7} metalness={0.08} emissive={glow ? color : '#000'} emissiveIntensity={glow ? 0.45 : 0} /></mesh>;
}
function Plant({ at, scale = 1 }: { at: Vec; scale?: number }) {
  return <group position={at} scale={scale}>
    <mesh position={[0, 0.19, 0]} castShadow><cylinderGeometry args={[.24, .18, .38, 16]} /><meshStandardMaterial color="#a56e59" /></mesh>
    <mesh position={[0,.65,0]} castShadow><cylinderGeometry args={[.035,.05,.7,8]} /><meshStandardMaterial color="#795c44" /></mesh>
    {[[-.19,.88,0],[.16,1,0],[0,1.17,.06]].map((p,i) => <mesh key={i} position={p as Vec} scale={[.36,.43,.31]} castShadow><icosahedronGeometry args={[1,1]} /><meshStandardMaterial color={['#6c7856','#82906a','#94a47c'][i]} roughness={1} /></mesh>)}
  </group>;
}
function Residence() {
  return <group position={[0,-1.65,0]}>
    <Block at={[0,-.27,0]} size={[6.4,.5,4.9]} color="#a4806b" />
    <Block at={[0,.01,0]} size={[6.35,.08,4.85]} color="#d3baa1" />
    <Block at={[-.25,2,-.35]} size={[4.6,3.9,3]} />
    <Block at={[-.25,4.03,-.35]} size={[4.85,.16,3.25]} color="#cfb697" />
    <Block at={[.9,4.24,-.6]} size={[1.9,.28,1.5]} color="#b1967c" />
    {[.72,1.9,3.08].map((y,row) => <group key={y}>
      <Block at={[-.25,y+.52,-.35]} size={[4.74,.1,3.15]} color="#b8997c" />
      {[-1.72,-.45,.83].map((x,col) => <group key={x}>
        <Block at={[x,y,1.166]} size={[.89,.87,.08]} color="#725e54" />
        <Block at={[x,y,1.219]} size={[.74,.72,.04]} color={(row+col)%2 ? '#d7b781' : '#acb5ac'} glow={(row+col)%2===1} />
        <Block at={[x,y,1.25]} size={[.04,.75,.04]} color="#61564d" />
        <Block at={[x,y+.13,1.27]} size={[.78,.035,.03]} color="#61564d" />
        {row > 0 && <><Block at={[x,y-.45,1.49]} size={[1.05,.09,.55]} color="#ac8a73" /><Block at={[x,y-.21,1.74]} size={[1.05,.055,.045]} color="#695c51" />{[-.48,0,.48].map(a => <Block key={a} at={[x+a,y-.32,1.74]} size={[.035,.28,.035]} color="#695c51" />)}</>}
      </group>)}
      {[-1.13,.35].map(z => <group key={z}><Block at={[2.067,y,z]} size={[.04,.83,.8]} color="#8f9f99" /><Block at={[2.1,y,z]} size={[.025,.85,.035]} color="#63574d" /><Block at={[2.1,y+.16,z]} size={[.025,.035,.83]} color="#63574d" /></group>)}
    </group>)}
    <Block at={[2.16,1.96,-1.12]} size={[.18,4.02,.16]} color="#bc8c69" />
    <Block at={[-2.46,1.96,1.17]} size={[.18,4.02,.16]} color="#bc8c69" />
    <Block at={[1.83,.47,1.29]} size={[.68,.9,.1]} color="#514844" />
    <Block at={[1.83,.51,1.35]} size={[.49,.74,.04]} color="#9baaa2" />
    <Block at={[1.72,1.1,1.53]} size={[1.23,.1,.95]} color="#8c6958" />
    <Block at={[1.72,.1,1.66]} size={[1.36,.18,1]} color="#dac5ad" />
    <Block at={[1.72,.03,2.12]} size={[1.52,.12,.42]} color="#d3baa1" />
    <Plant at={[-2.69,.08,1.45]} scale={1.25} /><Plant at={[2.68,.08,-1.5]} scale={1.65} /><Plant at={[2.66,.08,1.12]} scale={.65} />
    <Block at={[-.9,.2,1.9]} size={[1.25,.25,.38]} color="#8b735e" />
    <Block at={[-.9,.36,1.9]} size={[1.2,.1,.36]} color="#677455" />
    <Block at={[-2.7,.06,-.45]} size={[.55,.1,.7]} color="#697854" />
    <Block at={[.3,.06,2.05]} size={[.5,.08,.42]} color="#b39983" />
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.58,0]}><ringGeometry args={[4.03,4.045,96]} /><meshBasicMaterial color="#bd947e" transparent opacity={.38} /></mesh>
  </group>;
}
function Bed({ x }: { x: number }) {
  return <group position={[x,0,-.25]}>
    <Block at={[0,.33,0]} size={[1.25,.38,2.25]} color="#895e54" />
    <Block at={[0,.59,0]} size={[1.21,.22,2.2]} color="#f2e9db" />
    <Block at={[0,.75,.37]} size={[1.25,.09,1.45]} color="#a46d6a" />
    <Block at={[0,.78,-.73]} size={[.88,.17,.48]} color="#f6f0e5" />
    <Block at={[0,.75,-1.15]} size={[1.3,.9,.12]} color="#8a6856" />
    {[-.5,.5].map(a => <Block key={a} at={[a,.13,.9]} size={[.1,.26,.1]} color="#634d44" />)}
  </group>;
}
function Interior({ lounge }: { lounge: boolean }) {
  return <group position={[0,-1.3,0]}>
    <Block at={[0,-.2,0]} size={[5.3,.4,4.4]} color="#a88169" />
    <Block at={[0,.015,0]} size={[5.26,.04,4.36]} color="#dec5a8" />
    <Block at={[0,1.5,-2.1]} size={[5.3,3,.14]} color="#e3d3bf" />
    <Block at={[-2.58,1.5,0]} size={[.14,3,4.4]} color="#d2b89e" />
    <Block at={[.4,1.82,-1.995]} size={[2.12,1.64,.1]} color="#aa8b6d" />
    <Block at={[.4,1.82,-1.92]} size={[1.92,1.45,.06]} color="#b9cbc5" />
    <Block at={[.4,1.82,-1.87]} size={[.055,1.5,.05]} color="#816e5b" />
    <Block at={[.4,1.85,-1.86]} size={[1.95,.055,.05]} color="#816e5b" />
    <Block at={[.4,1,-1.77]} size={[2.26,.1,.42]} color="#a88169" />
    <Block at={[.2,.045,.3]} size={[3.5,.035,2.4]} color={lounge ? '#b89178' : '#b6b5a2'} />
    {lounge ? <>
      <Block at={[-1.65,.4,.1]} size={[1.1,.65,2.9]} color="#7e8a70" />
      <Block at={[-2.13,.85,.1]} size={[.2,1,2.9]} color="#7e8a70" />
      {[-1,.1,1.2].map(z => <Block key={z} at={[-1.65,.8,z]} size={[.9,.18,.94]} color="#9eaa8f" />)}
      <Block at={[1.5,.42,.7]} size={[1.05,.65,1.12]} color="#b17a6d" />
      <Block at={[1.5,.82,1.2]} size={[1.05,.75,.15]} color="#b17a6d" />
      <Block at={[0,.5,.5]} size={[1.2,.12,1.35]} color="#815e4d" />
      <Block at={[0,.24,.5]} size={[.52,.46,.6]} color="#97705a" />
      <Block at={[-.22,.6,.48]} size={[.38,.07,.48]} color="#ede0bd" />
    </> : <>
      <Bed x={-.98} /><Bed x={.82} />
      <Block at={[1.75,.82,-1.6]} size={[1.1,.12,.62]} color="#a07c5e" />
      <Block at={[1.75,.41,-1.6]} size={[.75,.78,.46]} color="#cfb69b" />
      <Block at={[1.75,1.12,-1.68]} size={[.57,.43,.04]} color="#524e4b" />
      <Block at={[1.75,.9,-1.48]} size={[.58,.02,.27]} color="#746c63" />
    </>}
    <Plant at={[2.1,.03,-.8]} scale={1.15} />
    <Block at={[-2.47,1.94,-.5]} size={[.04,.7,.65]} color="#8e614f" />
    <Block at={[-2.43,1.94,-.5]} size={[.03,.56,.5]} color="#e6ac85" />
    <mesh position={[1.8,2.38,.4]}><sphereGeometry args={[.23,20,12]} /><meshStandardMaterial color="#e6c99c" emissive="#e6b476" emissiveIntensity={.6} /></mesh>
    <mesh position={[1.8,1.2,.4]}><cylinderGeometry args={[.023,.023,2.4,8]} /><meshStandardMaterial color="#745e4d" /></mesh>
  </group>;
}
function CameraControls({ animated }: { animated: boolean }) {
  const { camera, gl, invalidate, size } = useThree();
  const controls = useRef<OrbitControls | null>(null);
  useEffect(() => {
    const orbit = new OrbitControls(camera, gl.domElement);
    orbit.enablePan = false;
    orbit.enableZoom = false;
    orbit.enableDamping = false;
    orbit.minPolarAngle = .55;
    orbit.maxPolarAngle = 1.35;
    orbit.autoRotateSpeed = .35;
    const onChange = () => invalidate();
    orbit.addEventListener('change', onChange);
    controls.current = orbit;
    return () => { orbit.removeEventListener('change', onChange); orbit.dispose(); controls.current = null; };
  }, [camera, gl, invalidate]);
  useEffect(() => {
    if ('zoom' in camera) { camera.zoom = Math.min(size.width / 9.3, size.height / 7.6); camera.updateProjectionMatrix(); invalidate(); }
  }, [camera, size, invalidate]);
  useFrame(() => { if (controls.current) { controls.current.autoRotate = animated; controls.current.update(); } });
  return null;
}
function Model({ space }: { space: number }) {
  const group = useRef<Group>(null);
  return <group ref={group}>{space === 0 ? <Residence /> : <Interior lounge={space === 2} />}</group>;
}
export default function ResidenceScene({ space, animated }: { space: number; animated: boolean }) {
  return <Canvas orthographic shadows dpr={[1,1.5]} frameloop={animated ? 'always' : 'demand'} camera={{ position:[8,6.5,10], zoom:50, near:.1, far:60 }} gl={{ alpha:true, antialias:true }} fallback={<span>3D view unavailable</span>}>
    <ambientLight intensity={1.4} /><hemisphereLight args={['#ffe9d0','#6f505d',1.5]} />
    <directionalLight position={[3,8,5]} intensity={3.2} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} shadow-normalBias={.04} />
    <directionalLight position={[-5,3,-3]} intensity={1.7} color="#d9a6a6" />
    <Suspense fallback={null}><Model space={space} /></Suspense>
    <CameraControls animated={animated} />
  </Canvas>;
}


