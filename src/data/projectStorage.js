const STORAGE_KEY = 'crochet-tracker/projects'

export function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    return true
  } catch {
    return false
  }
}

export function createId(prefix) {
  const random = Math.random().toString(36).slice(2, 8)
  return `${prefix}_${Date.now()}_${random}`
}
