export const state = () => ({
  cartItems: [],
  cartSubTotal: null,
  cartGrandTotall: null,
})

export const mutations = {
  loadCart(state, localCartItems) {
    state.cartItems = localCartItems
  },
  addItem(state, newItem) {
    // Check if the product already exists
    const alreadyExists = state.cartItems.find(item => item.product.id === newItem.product.id);
    if (alreadyExists) {
      // Increment the Quantity
      alreadyExists.qty += newItem.qty
    } else {
      // Add new item to the cart
      state.cartItems.push(newItem)
    }
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

  },
  deleteItem(state, deleteItem) {
    state.cartItems = state.cartItems.filter(item => item.product.id !== deleteItem.product.id)
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

  },
  increaseQty(state, qtyItem) {
    const alreadyExists = state.cartItems.find(item => item.product.id === qtyItem.product.id);
    alreadyExists.qty++
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

  },
  decreaseQty(state, qtyItem) {
    const alreadyExists = state.cartItems.find(item => item.product.id === qtyItem.product.id);
    if (alreadyExists.qty > 1) {
      alreadyExists.qty--
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

    }
  },
  clearCart(state) {
    state.cartItems = []
  }

}

export const getters = {
  cartItems(state) {
    return state.cartItems
  },
  cartSubTotal(state) {
    const subTotal = state.cartItems.reduce((subTotal, item) => (item.product.price * item.qty) + subTotal, 0)
    return subTotal.toFixed(2)
  }
}
