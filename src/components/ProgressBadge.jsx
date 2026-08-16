import './ProgressBadge.css'

const LABELS = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  finished: 'Finished',
}

export default function ProgressBadge({ status }) {
  return <span className={`progress-badge progress-badge--${status}`}>{LABELS[status] ?? status}</span>
}
