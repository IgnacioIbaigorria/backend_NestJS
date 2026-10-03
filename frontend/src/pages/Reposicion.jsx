import { useState, useEffect } from 'react'
import api from '../services/api'

function Reposicion() {
  const [reposiciones, setReposiciones] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ productId: '', quantity: '', supplier: '', cost: '' })

  useEffect(() => {
    loadReposicion()
    loadProducts()
  }, [])

  const loadReposicion = async () => {
    const res = await api.get('/reposicion')
    setReposiciones(res.data)
  }

  const loadProducts = async () => {
    const res = await api.get('/products')
    setProducts(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/reposicion', form)
    setForm({ productId: '', quantity: '', supplier: '', cost: '' })
    loadReposicion()
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reposición</h1>
      </div>

      <div className="card">
        <h3 className="card-title">Registrar Reposición</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Producto</label>
            <select value={form.productId} onChange={e => setForm({...form, productId: e.target.value})} required>
              <option value="">Selecciona un producto</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name} (stock: {p.stock})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" min="1" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Proveedor</label>
            <input type="text" value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Costo total</label>
            <input type="number" step="0.01" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary">Reposición</button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Historial de Reposiciones</h3>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Proveedor</th>
              <th>Costo</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reposiciones.map(r => (
              <tr key={r.id}>
                <td>{r.product?.name || '-'}</td>
                <td>{r.quantity}</td>
                <td>{r.supplier || '-'}</td>
                <td>{r.cost ? '$' + parseFloat(r.cost).toFixed(2) : '-'}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reposicion
