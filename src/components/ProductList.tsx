import type { Product } from '../interfaces/Product'
import { ProductCard } from './ProductCard'

export interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  )
}
