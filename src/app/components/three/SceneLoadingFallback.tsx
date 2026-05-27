interface SceneLoadingFallbackProps {
  size?: number;
  label?: string;
}

export function SceneLoadingFallback({ size = 280, label = 'Loading scene…' }: SceneLoadingFallbackProps) {
  return (
    <div
      className="scene-loading-fallback"
      style={{ width: size, height: size }}
      aria-busy
      aria-label={label}
    >
      <div className="scene-loading-fallback__orb" />
      <span className="scene-loading-fallback__label">{label}</span>
    </div>
  );
}
