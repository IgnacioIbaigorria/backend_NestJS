import { useState, useEffect } from 'react'
import api from '../services/api'

function Caja() {
  const [summary, setSummary] = useState(null)
  const [expenseForm, setExpenseForm] = useState({ description: '', amount: '' })

  useEffect(() => {
    loadCaja()
  }, [])

  const loadCaja = async () => {
    const res = await api.get('/caja/summary')
    setSummary(res.data)
  }

  const handleExpenseSubmit = async (e) => {
    e.preventDefault()
    await api.post('/caja/expenses', expenseForm)
    setExpenseForm({ description: '', amount: '' })
    loadCaja()
  }

  const handleDeleteExpense = async (id) => {
    if (!confirm('Eliminar gasto?')) return
    await api.delete(`/caja/expenses/${id}`)
    loadCaja()
  }

  if (!summary) return <div>Cargando...</div>

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Caja</h1>
      </div>

      <div className="summary-cards">
        <div className="summary-card income">
          <h4>Ventas</h4>
          <p>${summary.totalSales.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h4>Ganancias</h4>
          <p>${summary.totalProfit.toFixed(2)}</p>
        </div>
        <div className="summary-card expense">
          <h4>Gastos</h4>
          <p>${summary.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-card balance">
          <h4>Balance Neto</h4>
          <p>${summary.netBalance.toFixed(2)}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Agregar Gasto</h3>
        <form onSubmit={handleExpenseSubmit}>
          <div className="form-group">
            <label>Descripción</label>
            <input type="text" value={expenseForm.description} onChange={e => setExpenseForm({...expenseForm, description: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Monto</label>
            <input type="number" step="0.01" value={expenseForm.amount} onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Detalle de Ventas</h3>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Venta</th>
              <th>Costo</th>
              <th>Ganancia</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {summary.sales.map(s => (
              <tr key={s.id}>
                <td>{s.productName}</td>
                <td>{s.quantity}</td>
                <td>${s.total.toFixed(2)}</td>
                <td>${(s.costPrice * s.quantity).toFixed(2)}</td>
                <td style={{ color: s.profit >= 0 ? 'var(--success)' : 'var(--danger)' }}>${s.profit.toFixed(2)}</td>
                <td>{new Date(s.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="card-title">Gastos</h3>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {summary.expenses.map(e => (
              <tr key={e.id}>
                <td>{e.description}</td>
                <td>${e.amount.toFixed(2)}</td>
                <td>{new Date(e.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-danger btn-small" onClick={() => handleDeleteExpense(e.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Caja
