export function SettingSwitch({ checked, onChange, label }) {
  return (
    <label className="settings-switch">
      <input
        type="checkbox"
        checked={checked}
        aria-label={label}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span />
    </label>
  );
}
