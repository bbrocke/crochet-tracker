import { useState } from 'react'
import './ProjectForm.css'

const EMPTY = {
  name: '',
  pattern: '',
  status: 'not-started',
  yarn: '',
  hookSize: '',
  gauge: '',
  targetRows: '',
  notes: '',
}

export default function ProjectForm({ initial, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [fields, setFields] = useState(() => ({
    ...EMPTY,
    ...initial,
    targetRows: initial?.targetRows ?? '',
  }))

  function set(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(fields)
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="pf-name">Project name</label>
        <input
          id="pf-name"
          value={fields.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Granny Square Blanket"
          required
          autoFocus
        />
      </div>

      <div className="field">
        <label htmlFor="pf-pattern">Pattern</label>
        <input
          id="pf-pattern"
          value={fields.pattern}
          onChange={(e) => set('pattern', e.target.value)}
          placeholder="Pattern name or source"
        />
      </div>

      <div className="field">
        <label htmlFor="pf-status">Status</label>
        <select id="pf-status" value={fields.status} onChange={(e) => set('status', e.target.value)}>
          <option value="not-started">Not started</option>
          <option value="in-progress">In progress</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      <div className="project-form-row">
        <div className="field">
          <label htmlFor="pf-yarn">Yarn</label>
          <input id="pf-yarn" value={fields.yarn} onChange={(e) => set('yarn', e.target.value)} placeholder="Brand, weight, color" />
        </div>
        <div className="field">
          <label htmlFor="pf-hook">Hook size</label>
          <input id="pf-hook" value={fields.hookSize} onChange={(e) => set('hookSize', e.target.value)} placeholder="5.5mm (I-9)" />
        </div>
      </div>

      <div className="project-form-row">
        <div className="field">
          <label htmlFor="pf-gauge">Gauge</label>
          <input id="pf-gauge" value={fields.gauge} onChange={(e) => set('gauge', e.target.value)} placeholder="14 sts x 18 rows / 4in" />
        </div>
        <div className="field">
          <label htmlFor="pf-target">Target rows (optional)</label>
          <input
            id="pf-target"
            type="number"
            min="0"
            value={fields.targetRows}
            onChange={(e) => set('targetRows', e.target.value)}
            placeholder="e.g. 120"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="pf-notes">Pattern notes</label>
        <textarea
          id="pf-notes"
          value={fields.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Repeat rows 3-6 for body..."
        />
      </div>

      <div className="project-form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
