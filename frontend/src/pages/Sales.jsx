import { useState, useEffect } from 'react'
import api from '../services/api'

function Sales() {
  const [sales, setSales] = useState([])
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [payments, setPayments] = useState([{ amount: '', paymentMethod: 'efectivo' }])

  const selectedProductData = products.find(p => p.id === selectedProduct)
  const total = selectedProductData ? parseFloat(selectedProductData.price) * quantity : 0
  const paid = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
  const pending = total - paid

  const paymentSummary = payments.reduce((acc, p) => {
    const method = p.paymentMethod
    const amount = parseFloat(p.amount) || 0
    acc[method] = (acc[method] || 0) + amount
    return acc
  }, {})

  useEffect(() => {
    loadSales()
    loadProducts()
  }, [])

  const loadSales = async () => {
    const res = await api.get('/sales')
    setSales(res.data)
  }

  const loadProducts = async () => {
    try {
      const res = await api.get('/products')
      console.log('Productos cargados:', res.data)
      setProducts(res.data)
      setFilteredProducts(res.data)
    } catch (err) {
      console.error('Error cargando productos:', err)
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    const filtered = products.filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
    console.log('Buscando:', value, '| Products:', products.length, '| Encontrados:', filtered.length)
    setFilteredProducts(filtered)
  }

  const selectProduct = (id) => {
    setSelectedProduct(id)
    const product = products.find(p => p.id === id)
    if (product) {
      setSearch(`${product.name} ($${parseFloat(product.price).toFixed(2)})`)
    }
    setFilteredProducts([])
  }

  const addPayment = () => {
    setPayments([...payments, { amount: '', paymentMethod: 'efectivo' }])
  }

  const removePayment = (index) => {
    setPayments(payments.filter((_, i) => i !== index))
  }

  const updatePayment = (index, field, value) => {
    const newPayments = [...payments]
    newPayments[index][field] = value
    setPayments(newPayments)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validPayments = payments.filter(p => p.amount > 0)
    await api.post('/sales', {
      productId: selectedProduct,
      quantity,
      payments: validPayments.length > 0 ? validPayments : undefined
    })
    setSearch('')
    setSelectedProduct('')
    setQuantity(1)
    setPayments([{ amount: '', paymentMethod: 'efectivo' }])
    loadSales()
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Ventas</h1>
      </div>

      <div className="card">
        <h3 className="card-title">Registrar Venta</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group search-container">
            <label>Buscar producto</label>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              onBlur={() => setTimeout(() => setFilteredProducts([]), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredProducts.length > 0) {
                  selectProduct(filteredProducts[0].id)
                }
              }}
              placeholder="Escribe para buscar..."
            />
            {search && filteredProducts.length > 0 && (
              <div className="product-results">
                {filteredProducts.map(p => (
                  <div key={p.id} className="product-result-item" onClick={() => selectProduct(p.id)}>
                    <div className="product-name">{p.name}</div>
                    <div className="product-price">${parseFloat(p.price).toFixed(2)} | Stock: {p.stock}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} required />
          </div>
          <div className="form-group">
            <label>Pagos</label>
            {payments.map((payment, index) => (
              <div key={index} className="payment-row">
                <select value={payment.paymentMethod} onChange={e => updatePayment(index, 'paymentMethod', e.target.value)}>
                  <option value="efectivo">Efectivo</option>
                  <option value="qr">QR</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="credito">Crédito</option>
                  <option value="debito">Débito</option>
                </select>
                <input type="number" step="0.01" min="0" placeholder="Monto" value={payment.amount} onChange={e => updatePayment(index, 'amount', e.target.value)} />
                <button type="button" className="btn-remove" onClick={() => removePayment(index)}>×</button>
              </div>
            ))}
            <button type="button" className="btn-add-payment" onClick={addPayment}>+ Agregar otro pago</button>
          </div>
          <div className="sale-summary">
            <div className="summary-row">
              <span className="summary-label">Total venta</span>
              <span className="summary-value">${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Pagado</span>
              <span className="summary-value paid">${paid.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Pendiente</span>
              <span className="summary-value pending">${pending.toFixed(2)}</span>
            </div>
            {Object.entries(paymentSummary).length > 0 && (
              <div className="summary-row">
                <span className="summary-label">Pagos por método</span>
                <span className="summary-value">
                  {Object.entries(paymentSummary).map(([method, amount]) => (
                    <span key={method}>{method}: ${amount.toFixed(2)} </span>
                  ))}
                </span>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">Vender</button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Historial de Ventas</h3>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Total</th>
              <th>Método de Pago</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <tr key={s.id}>
                <td>{s.product?.name || '-'}</td>
                <td>{s.quantity}</td>
                <td>${parseFloat(s.unitPrice).toFixed(2)}</td>
                <td>${parseFloat(s.total).toFixed(2)}</td>
                <td>{s.payments?.map(p => `${p.paymentMethod}: $${parseFloat(p.amount).toFixed(2)}`).join(', ') || '-'}</td>
                <td>{new Date(s.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Sales
