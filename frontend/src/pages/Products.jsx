import { useState, useEffect } from 'react'
import api from '../services/api'

function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [form, setForm] = useState({ name: '', price: '', costPrice: '', stock: '', categoryId: '', tagIds: [] })
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    loadProducts()
    loadCategories()
    loadTags()
  }, [])

  const loadProducts = async () => {
    const res = await api.get('/products')
    console.log("Products", res.data)
    setProducts(res.data)
  }

  const loadCategories = async () => {
    const res = await api.get('/categories')
    setCategories(res.data)
  }

  const loadTags = async () => {
    const res = await api.get('/tags')
    setTags(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing) {
      await api.patch(`/products/${editing}`, form)
    } else {
      await api.post('/products', form)
    }
    setForm({ name: '', price: '', costPrice: '', stock: '', categoryId: '', tagIds: [] })
    setEditing(null)
    loadProducts()
  }

  const handleEdit = (product) => {
    setEditing(product.id)
    setForm({
      name: product.name,
      price: product.price,
      costPrice: product.costPrice,
      stock: product.stock,
      categoryId: product.categoryId || '',
      tagIds: product.tags?.map(t => t.id) || []
    })
  }

  const handleDelete = async (id) => {
    if (!confirm('Eliminar producto?')) return
    await api.delete(`/products/${id}`)
    loadProducts()
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Productos</h1>
      </div>

      <div className="card">
        <h3 className="card-title">{editing ? 'Editar Producto' : 'Crear Producto'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Precio Costo</label>
            <input type="number" step="0.01" value={form.costPrice} onChange={e => setForm({ ...form, costPrice: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Precio Venta</label>
            <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
              <option value="">Sin categoría</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Etiquetas</label>
            <select multiple value={form.tagIds} onChange={e => setForm({ ...form, tagIds: Array.from(e.target.selectedOptions, o => o.value) })}>
              {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">{editing ? 'Actualizar' : 'Crear'}</button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Lista de Productos</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio Costo</th>
              <th>Precio Venta</th>
              <th>Margen</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Etiquetas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const price = parseFloat(p.price) || 0
              const costPrice = parseFloat(p.costPrice) || 0
              const margin = costPrice > 0 ? ((price - costPrice) / costPrice) * 100 : 0
              return (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>${costPrice.toFixed(2)}</td>
                  <td>${price.toFixed(2)}</td>
                  <td style={{ color: margin >= 0 ? 'var(--success)' : 'var(--danger)' }}>{margin.toFixed(1)}%</td>
                  <td>{p.stock}</td>
                  <td>{p.category?.name || '-'}</td>
                  <td>{p.tags?.map(t => t.name).join(', ') || '-'}</td>
                  <td>
                    <button className="btn btn-small" onClick={() => handleEdit(p)}>Editar</button>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(p.id)}>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products
