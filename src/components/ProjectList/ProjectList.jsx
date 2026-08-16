import { useState } from 'react'
import ProjectCard from '../ProjectCard'
import ProjectForm from '../ProjectForm'
import './ProjectList.css'

export default function ProjectList({ projects, onSelect, onCreate }) {
  const [showForm, setShowForm] = useState(false)

  function handleCreate(fields) {
    const id = onCreate(fields)
    setShowForm(false)
    onSelect(id)
  }

  return (
    <div className="project-list">
      <div className="project-list-header">
        <h1>Your projects</h1>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm(true)}>
          New project
        </button>
      </div>

      {showForm && (
        <div className="project-list-form-panel">
          <h2>New project</h2>
          <ProjectForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} submitLabel="Create project" />
        </div>
      )}

      {projects.length === 0 ? (
        <div className="project-list-empty">
          <h2>No projects yet</h2>
          <p>Start tracking your first crochet project — add the pattern, yarn, and hook, then keep your row count as you go.</p>
          <button type="button" className="btn btn-primary" onClick={() => setShowForm(true)}>
            Create your first project
          </button>
        </div>
      ) : (
        <div className="project-list-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}
