import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode, setAccentColor, setAnimationSpeed } from '../../store/themeSlice';
import { resetProfile } from '../../store/profileSlice';
import { ACCENT_COLORS } from '../../utils/constants';

const ThemeControls = () => {
  const dispatch = useDispatch();
  const { mode, accentColor, animationSpeed } = useSelector((state) => state.theme);

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div>
        <p className="font-heading font-semibold text-sm text-lumina-text mb-4">Appearance</p>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(toggleMode())}
            className={`flex-1 glass rounded-xl px-4 py-4 flex flex-col items-center gap-2 transition-all duration-300 ${
              mode === 'dark' ? 'ring-2 ring-[var(--accent)] shadow-glow' : ''
            }`}
          >
            <span className="text-2xl">🌙</span>
            <span className="font-body text-sm text-lumina-text">Dark</span>
          </button>
          <button
            onClick={() => dispatch(toggleMode())}
            className={`flex-1 glass rounded-xl px-4 py-4 flex flex-col items-center gap-2 transition-all duration-300 ${
              mode === 'light' ? 'ring-2 ring-[var(--accent)] shadow-glow' : ''
            }`}
          >
            <span className="text-2xl">☀️</span>
            <span className="font-body text-sm text-lumina-text">Light</span>
          </button>
        </div>
      </div>

      {/* Accent color */}
      <div>
        <p className="font-heading font-semibold text-sm text-lumina-text mb-4">Accent Color</p>
        <div className="grid grid-cols-4 gap-3">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.class}
              onClick={() => dispatch(setAccentColor(color.class))}
              className={`relative w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${
                accentColor === color.class ? 'ring-2 ring-white scale-110 shadow-lg' : 'hover:scale-105'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {accentColor === color.class && (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Animation speed */}
      <div>
        <div className="flex justify-between mb-4">
          <p className="font-heading font-semibold text-sm text-lumina-text">Animation Speed</p>
          <span className="font-mono text-xs text-[var(--accent)]">{animationSpeed}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={animationSpeed}
          onChange={(e) => dispatch(setAnimationSpeed(parseFloat(e.target.value)))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(90deg, var(--accent) ${((animationSpeed - 0.5) / 1.5) * 100}%, var(--bg-tertiary) ${((animationSpeed - 0.5) / 1.5) * 100}%)`,
          }}
        />
        <div className="flex justify-between mt-2">
          <span className="font-body text-xs text-lumina-text-muted">Slow</span>
          <span className="font-body text-xs text-lumina-text-muted">Fast</span>
        </div>
      </div>

      {/* Danger zone */}
      <div className="pt-4 border-t border-[var(--border-glass)]">
        <p className="font-heading font-semibold text-sm text-red-400 mb-3">Danger Zone</p>
        <button
          onClick={() => {
            if (window.confirm('Are you sure? This will reset all your profile data.')) {
              dispatch(resetProfile());
              localStorage.removeItem('lumina_profile');
              window.location.reload();
            }
          }}
          className="w-full px-4 py-3 rounded-xl border border-red-400/30 text-red-400 text-sm font-body hover:bg-red-400/10 transition-all duration-300"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
};

export default ThemeControls;
