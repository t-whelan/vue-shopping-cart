<template>
  <v-container>
    <!-- Order Summary Section -->
    <div class="summary-container">
      <p class="summary-1">Total Items: {{ totalItems }}</p>
      <p class="summary-2">Total Cost: ${{ totalCost.toFixed(2) }}</p>
    </div>

    <h2 class="mt-9 mb-9 text-align-center bg-blue">Items List</h2>
    <v-row>
      <v-col v-for="product in products" :key="product.sku" cols="12" lg="6" md="6" sm="12">
        <v-card class="item-card">
          <v-row class="d-flex align-center justify-space-between">
            <!-- Item Name and Details -->
            <v-col cols="12" md="8" sm="8">
              <div class="item-name">{{ product.name }}</div>
              <div class="item-descr">{{ product.descr }}</div>
              <div class="item-price">Price: ${{ product.price.toFixed(2) }}</div>
            </v-col>

            <!-- Buttons to the right, responsive for mobile -->
            <v-col cols="12" md="4" sm="4" class="cart-btn d-flex justify-end align-center">
              <v-btn class="mb-2 add-btn" @click="addToCart(product)" color="primary">Add</v-btn>
              <v-btn class="mb-2 remove-btn" @click="removeFromCart(product)" color="error">Remove</v-btn>
            </v-col>
          </v-row>

          <!-- Quantity Input -->
          <v-row class="item-actions mt-2">
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="quantity[product.sku]"
                label="Quantity"
                type="number"
                :max="product.basketLimit"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Checkout Button -->
    <div class="checkout-container">
      <v-btn class="checkout" @click="goToCheckout" color="primary">Go to Checkout</v-btn>
    </div>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import productsData from '@/data/products.js';

export default {
  setup() {
    const router = useRouter();
    const products = ref(productsData);
    const quantity = ref({});

    products.value.forEach(product => {
      quantity.value[product.sku] = 0;
    });

    const totalItems = computed(() => {
      return Object.values(quantity.value).reduce((acc, val) => acc + val, 0);
    });

    const totalCost = computed(() => {
      return Object.keys(quantity.value).reduce((acc, sku) => {
        const product = products.value.find(p => p.sku === parseInt(sku));
        if (product) {
          return acc + (product.price * quantity.value[sku]);
        }
        return acc;
      }, 0);
    });

    const addToCart = (product) => {
      const qty = quantity.value[product.sku] || 0;
      const newQty = qty + 1;
      if (newQty <= product.basketLimit) {
        quantity.value[product.sku] = newQty;
      } else {
        alert(`Cannot add more than ${product.basketLimit} of ${product.name}`);
      }
    };

    const removeFromCart = (product) => {
      const qty = quantity.value[product.sku] || 0;
      if (qty > 0) {
        const newQty = qty - 1;
        quantity.value[product.sku] = newQty;
      }
    };

    const goToCheckout = () => {
  const cartItems = products.value.map(product => ({
    sku: product.sku,
    name: product.name,
    descr: product.descr,
    price: product.price,
    quantity: quantity.value[product.sku]
  }));
  router.push({
    name: 'checkout',
    query: {
      cartItems: JSON.stringify(cartItems),
      totalItems: totalItems.value,
      totalCost: totalCost.value.toFixed(2)
    }
  });
};

    return {
      products,
      quantity,
      totalItems,
      totalCost,
      addToCart,
      removeFromCart,
      goToCheckout
    };
  }
};
</script>

<style scoped>
/* Layout adjustments for the summary container */
.summary-container {
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
}

.summary-1, .summary-2 {
  background-color: #d9d9d9;
  padding: 10px;
  border-radius: 4px;
  font-size: 1rem;
}

.summary-1 {
  text-align: center;
}

.summary-2 {
  text-align: center;
}

/* Item card styles */
.item-card {
  padding: 15px;
  margin-bottom: 20px;
}

.item-name {
  color: #1976d2; /* Blue for item name */
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
}

.item-descr {
  font-style: italic;
  font-size: 17px;
  margin: 20px;
}

.item-price {
  font-size: 17px;
  font-weight: bold;
  color: #333;
  margin: 20px;
}

/* Responsive button layout */
.cart-btn {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding-right: 15px;
}

.add-btn, .remove-btn {
  width: 100%; /* Ensures both buttons take the full width */
  padding: 12px; /* Same padding for both buttons */
  font-size: 16px; /* Consistent font size */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Specific button styles */
.add-btn {
  background-color: #0078e8;
  color: white;
}

.add-btn:hover {
  background-color: #0857ff;
  cursor: pointer;
}

.remove-btn {
  background-color: #f44336;
  color: white;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

/* Stack buttons on smaller screens */
@media (max-width: 600px) {
  .cart-btn {
    justify-content: space-around;
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }
}

/* Checkout button styles */
.checkout-container {
  margin-top: 20px;
  text-align: center;
}

.checkout {
  border: solid rgb(255, 255, 255) 1px;
  border-radius: 5px;
  padding: 12px;
  font-size: 20px;
  background-color: rgb(0, 0, 254);
  color: white;
}

.checkout:hover {
  background-color: rgb(12, 68, 255);
  cursor: pointer;
}
</style>
