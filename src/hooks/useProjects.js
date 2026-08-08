import { useCallback, useState } from 'react'
import { createId, loadProjects, saveProjects } from '../data/projectStorage'

export const MAX_PHOTOS = 6

export function useProjects() {
  const [projects, setProjects] = useState(() => loadProjects())
  const [storageError, setStorageError] = useState(null)

  const persist = useCallback((next) => {
    const ok = saveProjects(next)
    setStorageError(ok ? null : 'Storage is full — try removing an older photo.')
    return ok
  }, [])

  const createProject = useCallback(
    (fields) => {
      const now = Date.now()
      const project = {
        id: createId('proj'),
        name: fields.name?.trim() || 'Untitled project',
        pattern: fields.pattern?.trim() || '',
        status: fields.status || 'not-started',
        yarn: fields.yarn?.trim() || '',
        hookSize: fields.hookSize?.trim() || '',
        gauge: fields.gauge?.trim() || '',
        rowCount: 0,
        targetRows: fields.targetRows ? Number(fields.targetRows) : null,
        notes: fields.notes?.trim() || '',
        photos: [],
        createdAt: now,
        updatedAt: now,
      }
      setProjects((prev) => {
        const next = [project, ...prev]
        persist(next)
        return next
      })
      return project.id
    },
    [persist],
  )

  const updateProject = useCallback(
    (id, patch) => {
      setProjects((prev) => {
        const next = prev.map((p) =>
          p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p,
        )
        persist(next)
        return next
      })
    },
    [persist],
  )

  const deleteProject = useCallback(
    (id) => {
      setProjects((prev) => {
        const next = prev.filter((p) => p.id !== id)
        persist(next)
        return next
      })
    },
    [persist],
  )

  const addPhoto = useCallback(
    (id, dataUrl) => {
      setProjects((prev) => {
        const next = prev.map((p) => {
          if (p.id !== id) return p
          if (p.photos.length >= MAX_PHOTOS) return p
          const photo = { id: createId('photo'), dataUrl, caption: '', createdAt: Date.now() }
          return { ...p, photos: [...p.photos, photo], updatedAt: Date.now() }
        })
        persist(next)
        return next
      })
    },
    [persist],
  )

  const deletePhoto = useCallback(
    (id, photoId) => {
      setProjects((prev) => {
        const next = prev.map((p) =>
          p.id === id
            ? { ...p, photos: p.photos.filter((ph) => ph.id !== photoId), updatedAt: Date.now() }
            : p,
        )
        persist(next)
        return next
      })
    },
    [persist],
  )

  return {
    projects,
    storageError,
    createProject,
    updateProject,
    deleteProject,
    addPhoto,
    deletePhoto,
  }
}
