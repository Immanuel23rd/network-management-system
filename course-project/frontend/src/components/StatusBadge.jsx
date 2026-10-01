const TONE = {
  ACTIVE: 'ok',
  UP: 'ok',
  COMPLETED: 'ok',
  AVAILABLE: 'ok',
  INACTIVE: 'warn',
  DOWN: 'warn',
  SCHEDULED: 'warn',
  RESERVED: 'warn',
  MAINTENANCE: 'info',
  IN_PROGRESS: 'info',
  ALLOCATED: 'info',
  DECOMMISSIONED: 'danger',
  DISABLED: 'danger',
  CANCELLED: 'danger'
};

export default function StatusBadge({ value }) {
  if (!value) {
    return <span className="muted">—</span>;
  }
  const tone = TONE[value] || 'info';
  return <span className={`badge badge-${tone}`}>{value.replaceAll('_', ' ')}</span>;
}
