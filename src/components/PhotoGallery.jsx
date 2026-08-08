import './PhotoGallery.css'

export default function PhotoGallery({ photos, onDelete }) {
  if (photos.length === 0) {
    return <p className="photo-gallery-empty">No photos yet.</p>
  }

  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <div className="photo-gallery-item" key={photo.id}>
          <img src={photo.dataUrl} alt="Project progress" />
          <button
            type="button"
            className="photo-gallery-delete"
            onClick={() => onDelete(photo.id)}
            aria-label="Delete photo"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}
