import { useState, useEffect } from 'react'
import api from '../services/api'

function Categories() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', description: '' })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const res = await api.get('/categories')
    setCategories(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/categories', form)
    setForm({ name: '', description: '' })
    loadCategories()
  }

  const handleDelete = async (id) => {
    if (!confirm('Eliminar categoría?')) return
    await api.delete(`/categories/${id}`)
    loadCategories()
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Categorías</h1>
      </div>

      <div className="card">
        <h3 className="card-title">Crear Categoría</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Lista de Categorías</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.description || '-'}</td>
                <td>
                  <button className="btn btn-danger btn-small" onClick={() => handleDelete(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Categories
