import { useState } from 'react'
import { useProjects } from './hooks/useProjects'
import ProjectList from './components/ProjectList/ProjectList'
import ProjectDetail from './components/ProjectDetail/ProjectDetail'
import './App.css'

function App() {
  const { projects, storageError, createProject, updateProject, deleteProject, addPhoto, deletePhoto } =
    useProjects()
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null

  function handleDelete(id) {
    deleteProject(id)
    setSelectedProjectId(null)
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
            onBack={() => setSelectedProjectId(null)}
            onUpdate={updateProject}
            onDelete={handleDelete}
            onAddPhoto={addPhoto}
            onDeletePhoto={deletePhoto}
          />
        ) : (
          <ProjectList projects={projects} onSelect={setSelectedProjectId} onCreate={createProject} />
        )}
      </main>
    </div>
  )
}

export default App
