// Import necessary Vuex components
import { createStore } from 'vuex';

// Create a new Vuex store instance
export default createStore({
  state: {
    cartItems: [], // Initialize cartItems as an empty array
  },
  getters: {
    cartItems: (state) => state.cartItems, // Getter to retrieve cart items
    totalItems: (state) => {
      return state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
    totalCost: (state) => {
      return state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    },
  },
  mutations: {
    // Mutation to add a product to the cart
    ADD_TO_CART(state, product) {
      // Check if the product is already in the cart
      const existingProduct = state.cartItems.find(item => item.sku === product.sku);

      if (existingProduct) {
        // If the product already exists, increase its quantity
        existingProduct.quantity++;
      } else {
        // Otherwise, add the product to the cart with quantity 1
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    // Mutation to remove a product from the cart
    REMOVE_FROM_CART(state, product) {
      const index = state.cartItems.findIndex(item => item.sku === product.sku);

      if (index !== -1) {
        // If the product is found in the cart, decrease its quantity
        const item = state.cartItems[index];
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          // If quantity is 1, remove the product from the cart
          state.cartItems.splice(index, 1);
        }
      }
    },
    // Mutation to clear all items from the cart
    CLEAR_CART(state) {
      state.cartItems = [];
    },
  },
  actions: {
    // Action to add a product to the cart
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    // Action to remove a product from the cart
    removeFromCart({ commit }, product) {
      commit('REMOVE_FROM_CART', product);
    },
    // Action to clear all items from the cart
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
  },
});
