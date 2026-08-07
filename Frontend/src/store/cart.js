// cart.js — Zustand cart store

import { create } from 'zustand'

const useCart = create((set, get) => ({
  items: [], // [{ product, qty }]

  add(product, qty) {
    const items = get().items
    const existing = items.find((i) => i.product.id === product.id)
    if (existing) {
      set({ items: items.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i) })
    } else {
      set({ items: [...items, { product, qty }] })
    }
  },

  update(productId, qty) {
    if (qty <= 0) return get().remove(productId)
    set({ items: get().items.map((i) => i.product.id === productId ? { ...i, qty } : i) })
  },

  remove(productId) {
    set({ items: get().items.filter((i) => i.product.id !== productId) })
  },

  clear() {
    set({ items: [] })
  },

  get total() {
    return get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  },

  get count() {
    return get().items.reduce((sum, i) => sum + i.qty, 0)
  },
}))

export default useCart
