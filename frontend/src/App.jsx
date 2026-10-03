import { Routes, Route, NavLink } from 'react-router-dom'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Caja from './pages/Caja'
import Categories from './pages/Categories'
import Tags from './pages/Tags'
import Reposicion from './pages/Reposicion'
import History from './pages/History'

function App() {
  return (
    <div className="app">
      <nav className="sidebar">
        <h1 className="logo">Stock</h1>
        <ul className="nav-list">
          <li><NavLink to="/products">Productos</NavLink></li>
          <li><NavLink to="/sales">Ventas</NavLink></li>
          <li><NavLink to="/caja">Caja</NavLink></li>
          <li><NavLink to="/categories">Categorías</NavLink></li>
          <li><NavLink to="/tags">Etiquetas</NavLink></li>
          <li><NavLink to="/reposicion">Reposición</NavLink></li>
          <li><NavLink to="/history">Historial</NavLink></li>
        </ul>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/caja" element={<Caja />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/reposicion" element={<Reposicion />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
