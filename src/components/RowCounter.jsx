import './RowCounter.css'

export default function RowCounter({ count, onIncrement, onDecrement, onReset }) {
  return (
    <div className="row-counter">
      <h3 className="row-counter-label">Row count</h3>
      <div className="row-counter-controls">
        <button
          type="button"
          className="row-counter-btn"
          onClick={onDecrement}
          disabled={count <= 0}
          aria-label="Decrement row count"
        >
          &minus;
        </button>
        <span className="row-counter-value">{count}</span>
        <button
          type="button"
          className="row-counter-btn row-counter-btn--primary"
          onClick={onIncrement}
          aria-label="Increment row count"
        >
          +
        </button>
      </div>
      <button type="button" className="btn btn-ghost row-counter-reset" onClick={onReset}>
        Reset to 0
      </button>
    </div>
  )
}
