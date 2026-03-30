import type { Product } from '../interfaces/Product'

export interface ProductCardProps {
  product: Product
}

const categoryLabelMap: Record<string, string> = {
  Computers: 'Computadores',
  Accessories: 'Accesorios',
  Phones: 'Celulares',
  Audio: 'Audio',
  Wearables: 'Dispositivos inteligentes',
  Monitors: 'Monitores',
  Storage: 'Almacenamiento',
  Furniture: 'Muebles',
  Networking: 'Redes',
  Creativity: 'Creatividad',
  Streaming: 'Streaming',
  'Home Office': 'Oficina en casa',
}

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})
const integerFormatter = new Intl.NumberFormat('es-CO')

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = categoryLabelMap[product.category] ?? product.category
  const quantityLabel = integerFormatter.format(product.quantity)

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img className="product-card__image" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p className="product-card__brand">Marca: {product.brand}</p>
        <p className="product-card__category">Categoria: {categoryLabel}</p>
        <p className="product-card__sku">SKU: {product.sku}</p>
        <p className="product-card__quantity">Cantidad disponible: {quantityLabel}</p>
        <p className="product-card__price">{currencyFormatter.format(product.price)}</p>
      </div>
    </article>
  )
}
