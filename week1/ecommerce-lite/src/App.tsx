import './App.css'
import { ProductList } from './components/ProductList'
import { UserCard } from './components/UserCard'
import { products, users } from './data/data'

function App() {
  const integerFormatter = new Intl.NumberFormat('es-CO')
  const activeProducts = products.filter((product) => product.isActive).length
  const activeUsers = users.filter((user) => user.isActive).length
  const totalStock = products.reduce((sum, product) => sum + product.quantity, 0)
  // Stats are derived from the current data source to avoid hardcoded values.
  const stats = [
    { id: 'total-products', value: integerFormatter.format(products.length), label: 'Productos registrados' },
    { id: 'active-products', value: integerFormatter.format(activeProducts), label: 'Productos activos' },
    { id: 'active-users', value: integerFormatter.format(activeUsers), label: 'Usuarios activos' },
    { id: 'total-stock', value: integerFormatter.format(totalStock), label: 'Unidades en inventario' },
  ]

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Comercio Electronico Lite</p>
          <h1>Catalogo de productos</h1>
        </div>
      </header>

      <div className="app__stats">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.id}>
            <p className="stat-card__value">{stat.value}</p>
            <p className="stat-card__label">{stat.label}</p>
          </article>
        ))}
      </div>

      <section className="app__section">
        <h2 className="section-title">Productos disponibles</h2>
        <ProductList products={products} />
      </section>

      <section className="app__section">
        <h2 className="section-title">Usuarios registrados</h2>
        <div className="user-grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
