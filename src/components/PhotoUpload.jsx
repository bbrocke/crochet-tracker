import { useRef, useState } from 'react'
import { resizeImageFile } from '../utils/imageResize'
import { MAX_PHOTOS } from '../hooks/useProjects'
import './PhotoUpload.css'

export default function PhotoUpload({ photoCount, onAdd }) {
  const inputRef = useRef(null)
  const [error, setError] = useState(null)
  const atLimit = photoCount >= MAX_PHOTOS

  async function handleChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (atLimit) {
      setError(`Up to ${MAX_PHOTOS} photos per project.`)
      return
    }
    setError(null)
    try {
      const dataUrl = await resizeImageFile(file)
      onAdd(dataUrl)
    } catch {
      setError('Could not process that photo — try a different file.')
    }
  }

  return (
    <div className="photo-upload">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => inputRef.current?.click()}
        disabled={atLimit}
      >
        Add photo
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
      {atLimit && <p className="photo-upload-hint">Up to {MAX_PHOTOS} photos per project.</p>}
      {error && <p className="photo-upload-error">{error}</p>}
    </div>
  )
}
