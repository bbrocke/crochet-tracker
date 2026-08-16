import ProgressBadge from './ProgressBadge'
import './ProjectCard.css'

export default function ProjectCard({ project, onSelect }) {
  const progressLabel =
    project.targetRows && project.targetRows > 0
      ? `Row ${project.rowCount} / ${project.targetRows}`
      : `Row ${project.rowCount}`

  const progressPct = project.targetRows
    ? Math.min(100, Math.round((project.rowCount / project.targetRows) * 100))
    : null

  return (
    <button type="button" className="project-card" onClick={() => onSelect(project.id)}>
      <div className="project-card-top">
        <h3 className="project-card-name">{project.name}</h3>
        <ProgressBadge status={project.status} />
      </div>
      {project.pattern && <p className="project-card-pattern">{project.pattern}</p>}
      <div className="project-card-progress">
        <span>{progressLabel}</span>
        {progressPct !== null && (
          <div className="project-card-bar">
            <div className="project-card-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
        )}
      </div>
    </button>
  )
}
