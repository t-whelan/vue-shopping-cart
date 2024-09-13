<template>
  <v-container>
    <!-- Back Button -->
    <v-btn @click="goBack" class="back-btn">Back to Items</v-btn>

    <h2 class="text-center">Checkout Page</h2>

    <!-- Order Summary Section -->
    <div class="summary-container">
      <p class="summary-1">Total Items: {{ totalItems }}</p>
      <p class="summary-2">Total Cost: ${{ totalCost.toFixed(2) }}</p>
    </div>

    <!-- Cart Items List -->
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="item in cartItems" :key="item.sku">
          <v-list-item-content>
            <!-- Item Name -->
            <v-list-item-title class="item-name">{{ item.name }}</v-list-item-title>

            <!-- Item Quantity and Price -->
            <div class="item-details">
              <div class="item-quantity">Quantity: {{ item.quantity }}</div>
              <div class="item-price">Price: ${{ item.price.toFixed(2) }}</div>
              <div class="item-total">Total: ${{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </v-list-item-content>

          <!-- Add/Remove Buttons -->
          <v-list-item-action class="action-buttons">
            <v-btn @click="addItem(item)" class="add-btn">Add</v-btn>
            <v-btn @click="removeItem(item)" class="remove-btn">Remove</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const cartItems = ref([]);
const maxQuantityLimit = 5; // Example maximum quantity limit, can be adjusted

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});
const totalCost = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const updateRoute = () => {
  router.push({
    name: 'checkout',
    query: {
      cartItems: JSON.stringify(cartItems.value),
      totalItems: totalItems.value,
      totalCost: totalCost.value.toFixed(2),
    },
  });
};

const addItem = (item) => {
  const updatedItems = cartItems.value.map(cartItem =>
    cartItem.sku === item.sku
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
  
  if (updatedItems.find(cartItem => cartItem.sku === item.sku).quantity > maxQuantityLimit) {
    alert(`Quantity limit (${maxQuantityLimit}) for SKU ${item.sku} exceeded!`);
    return;
  }
  
  cartItems.value = updatedItems;
  updateRoute();
};

const removeItem = (item) => {
  const updatedItems = cartItems.value.map(cartItem =>
    cartItem.sku === item.sku
      ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
      : cartItem
  ).filter(cartItem => cartItem.quantity > 0);
  
  cartItems.value = updatedItems;
  updateRoute();
};

const goBack = () => {
  router.push({ name: 'items-list' });
};

onMounted(() => {
  try {
    const initialCartItems = JSON.parse(route.query.cartItems || '[]');
    cartItems.value = initialCartItems.map(item => ({
      ...item,
      quantity: item.quantity || 0,
      price: parseFloat(item.price) || 0
    }));
  } catch (e) {
    console.error('Error parsing cartItems:', e);
    cartItems.value = [];
  }
});
</script>

<style scoped>
/* Order summary container */
.summary-container {
  display: flex;
  gap: 6px;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.summary-1, .summary-2 {
  background-color: #d9d9d9;
  padding: 10px;
  border-radius: 4px;
  font-size: 1rem;
  margin: 0;
}

.summary-1 {
  flex: 1;
  text-align: center;
}

.summary-2 {
  flex: 1;
  text-align: center;
}

/* Item details styles */
.item-name {
  padding: 20px;
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 10px; /* Adds space between name and details */
}

.item-details {
  
  padding: 15px;
  display: flex;
  justify-content: space-between; /* Aligns quantity and price side by side */
}

.item-quantity, .item-price, .item-total {
  padding: 10px;
  font-size: 18px;
  font-style: italic;
  margin-bottom: 4px;
}

/* Button styles */
.add-btn {
  background-color: #007bff;
  color: white;

  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
}

.add-btn:hover {
  background-color: #0056b3;
  cursor: pointer;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  margin-left: 8px; /* Space between buttons */
}

.remove-btn:hover {
  background-color: #c82333;
  cursor: pointer;
}

/* Align buttons to the right */
.action-buttons {
  display: flex;
  justify-content: flex-end;
}

/* Back button styles */
.back-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 4px;
}

.back-btn:hover {
  background-color: #0056b3;
  cursor: pointer;
}
</style>
