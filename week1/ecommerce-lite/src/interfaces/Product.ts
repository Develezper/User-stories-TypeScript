import type { Dimensions } from './Dimensions'

export interface Product {
  sku: string
  name: string
  brand: string
  quantity: number
  price: number
  isActive: boolean
  category: string
  imageUrl: string
  createdAt: string
  tags?: string[]
  dimensions?: Dimensions
  description?: string
}
