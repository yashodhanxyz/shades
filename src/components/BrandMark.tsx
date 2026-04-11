export function BrandMark() {
  return (
    <div className="brand-mark">
      <div className="brand-frame">
        <div className="brand-icon-shell" aria-hidden="true">
          <svg viewBox="0 0 72 72" className="brand-icon">
            <rect x="8" y="14" width="10" height="44" rx="3" />
            <rect x="24" y="10" width="18" height="52" rx="4" />
            <rect x="48" y="6" width="16" height="60" rx="4" />
          </svg>
        </div>

        <div className="brand-copy">
          <span className="brand-name">HueThere</span>
          <span className="brand-rail" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
