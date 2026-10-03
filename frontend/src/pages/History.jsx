import { useState, useEffect } from 'react'
import api from '../services/api'

function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    const res = await api.get('/history')
    setHistory(res.data)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Historial de Cambios</h1>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Campo</th>
              <th>Valor Anterior</th>
              <th>Nuevo Valor</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {history.map(h => (
              <tr key={h.id}>
                <td>{h.product?.name || '-'}</td>
                <td>{h.field}</td>
                <td>{h.oldValue || '-'}</td>
                <td>{h.newValue || '-'}</td>
                <td>{new Date(h.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History
