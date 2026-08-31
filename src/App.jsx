import { useEffect, useState } from 'react'
import { useProjects } from './hooks/useProjects'
import ProjectList from './components/ProjectList/ProjectList'
import ProjectDetail from './components/ProjectDetail/ProjectDetail'
import './App.css'

function App() {
  const { projects, storageError, createProject, updateProject, deleteProject, addPhoto, deletePhoto } =
    useProjects()
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null

  useEffect(() => {
    function syncRoute() {
      const match = window.location.hash.match(/^#\/project\/(.+)$/)
      const requestedId = match ? decodeURIComponent(match[1]) : null
      const nextId = requestedId && projects.some((project) => project.id === requestedId) ? requestedId : null

      if (requestedId && !nextId) {
        window.history.replaceState(null, '', '#/')
      }
      setSelectedProjectId(nextId)
    }

    syncRoute()
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [projects])

  function handleSelect(id) {
    window.location.hash = `/project/${encodeURIComponent(id)}`
  }

  function handleBack() {
    window.location.hash = '/'
  }

  function handleDelete(id) {
    deleteProject(id)
    handleBack()
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-header-logo" aria-hidden="true">
          🧶
        </span>
        <span className="app-header-title">Crochet Tracker</span>
      </header>

      {storageError && <div className="app-storage-banner">{storageError}</div>}

      <main className="app-main">
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={handleBack}
            onUpdate={updateProject}
            onDelete={handleDelete}
            onAddPhoto={addPhoto}
            onDeletePhoto={deletePhoto}
          />
        ) : (
          <ProjectList projects={projects} onSelect={handleSelect} onCreate={createProject} />
        )}
      </main>
    </div>
  )
}

export default App
