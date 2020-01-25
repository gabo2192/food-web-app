export const findProductIndex = (cart, productId) => {
  return cart.findIndex(p => p.title === productId)
}

export const updateProductUnits = (cart, product) => {
  const productIndex = findProductIndex(cart, product.title)

  const updatedCart = [...cart]
  const existingProduct = updatedCart[productIndex]
  const updatedUnitsProduct = {
    ...existingProduct,
  }

  updatedCart[productIndex] = updatedUnitsProduct

  return updatedCart
}
