import { useState } from 'react'
import ProgressBadge from '../ProgressBadge'
import RowCounter from '../RowCounter'
import ProjectForm from '../ProjectForm'
import PhotoUpload from '../PhotoUpload'
import PhotoGallery from '../PhotoGallery'
import ConfirmDialog from '../ConfirmDialog'
import './ProjectDetail.css'

export default function ProjectDetail({ project, onBack, onUpdate, onDelete, onAddPhoto, onDeletePhoto }) {
  const [editing, setEditing] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  function handleEditSubmit(fields) {
    onUpdate(project.id, {
      ...fields,
      targetRows: fields.targetRows ? Number(fields.targetRows) : null,
    })
    setEditing(false)
  }

  function handleDeleteConfirmed() {
    setConfirmingDelete(false)
    onDelete(project.id)
  }

  return (
    <div className="project-detail">
      <button type="button" className="btn btn-ghost project-detail-back" onClick={onBack}>
        &larr; Back to projects
      </button>

      {editing ? (
        <div className="project-detail-edit-panel">
          <h2>Edit project</h2>
          <ProjectForm initial={project} onSubmit={handleEditSubmit} onCancel={() => setEditing(false)} submitLabel="Save changes" />
        </div>
      ) : (
        <>
          <div className="project-detail-header">
            <div>
              <h1>{project.name}</h1>
              {project.pattern && <p className="project-detail-pattern">{project.pattern}</p>}
            </div>
            <ProgressBadge status={project.status} />
          </div>

          <div className="project-detail-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setEditing(true)}>
              Edit details
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setConfirmingDelete(true)}>
              Delete project
            </button>
          </div>

          <div className="project-detail-layout">
            <RowCounter
              count={project.rowCount}
              onIncrement={() => onUpdate(project.id, { rowCount: project.rowCount + 1 })}
              onDecrement={() => onUpdate(project.id, { rowCount: Math.max(0, project.rowCount - 1) })}
              onReset={() => onUpdate(project.id, { rowCount: 0 })}
            />

            <div className="project-detail-info">
              <section className="project-detail-section">
                <h2>Details</h2>
                <dl className="project-detail-fields">
                  <div>
                    <dt>Yarn</dt>
                    <dd>{project.yarn || '—'}</dd>
                  </div>
                  <div>
                    <dt>Hook size</dt>
                    <dd>{project.hookSize || '—'}</dd>
                  </div>
                  <div>
                    <dt>Gauge</dt>
                    <dd>{project.gauge || '—'}</dd>
                  </div>
                </dl>
              </section>

              <section className="project-detail-section">
                <div className="project-detail-section-header">
                  <h2>Photos</h2>
                  <PhotoUpload photoCount={project.photos.length} onAdd={(dataUrl) => onAddPhoto(project.id, dataUrl)} />
                </div>
                <PhotoGallery photos={project.photos} onDelete={(photoId) => onDeletePhoto(project.id, photoId)} />
              </section>

              <section className="project-detail-section">
                <h2>Pattern notes</h2>
                <p className="project-detail-notes">{project.notes || 'No notes yet.'}</p>
              </section>
            </div>
          </div>
        </>
      )}

      {confirmingDelete && (
        <ConfirmDialog
          title="Delete this project?"
          message={`"${project.name}" and all its photos will be permanently deleted.`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  )
}
