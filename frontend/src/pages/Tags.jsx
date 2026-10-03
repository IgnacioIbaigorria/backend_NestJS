import { useState, useEffect } from 'react'
import api from '../services/api'

function Tags() {
  const [tags, setTags] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    const res = await api.get('/tags')
    setTags(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/tags', { name })
    setName('')
    loadTags()
  }

  const handleDelete = async (id) => {
    if (!confirm('Eliminar etiqueta?')) return
    await api.delete(`/tags/${id}`)
    loadTags()
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Etiquetas</h1>
      </div>

      <div className="card">
        <h3 className="card-title">Crear Etiqueta</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Lista de Etiquetas</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>
                  <button className="btn btn-danger btn-small" onClick={() => handleDelete(t.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tags
