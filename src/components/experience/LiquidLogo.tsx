import { LiquidMetal } from '@paper-design/shaders-react';

export default function LiquidLogo({ animated }: { animated: boolean }) {
  return <LiquidMetal className="liquid-logo" aria-hidden="true" image="/hostel-mark.svg" colorBack="#00000000" colorTint="#9e7680" shape="none" scale={1} fit="contain" speed={animated ? .22 : 0} distortion={.08} repetition={2} shiftRed={.05} shiftBlue={.05} maxPixelCount={4096} minPixelRatio={1} style={{ width:38, height:38, pointerEvents:'none' }} />;
}

