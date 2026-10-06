interface GlassOptions { snapshot: HTMLCanvasElement; borderRadius?: number; tintOpacity?: number; type?: string; }
export default class Container {
  constructor(options: GlassOptions);
  element: HTMLDivElement;
  updateSizeFromDOM(): void;
  dispose(): void;
}

