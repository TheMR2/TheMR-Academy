export function SettingRow({ icon: Icon, title, description, children }) {
  return (
    <div className="setting-row">
      <span className="setting-icon">
        <Icon size={15} />
      </span>
      <div className="setting-copy">
        <b>{title}</b>
        <small>{description}</small>
      </div>
      {children}
    </div>
  );
}
