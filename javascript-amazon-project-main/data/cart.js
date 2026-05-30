// Get cart from local storage. Cart item is as object so in this convert it to string.
export let cart = JSON.parse(localStorage.getItem('cart'));
// Save default value. If cart is null show this items in checkout page.
if (!cart) {
  cart =[
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptions: '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptions: '2'
  }
];
}

// Save cart to local storage.
function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  // check if the product is already in the cart.
  let matchingCartItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingCartItem = item;
    }
  });

  // Create select interactive.
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);

  // if it in the cart, increase the quantity.
  if (matchingCartItem) {
    matchingCartItem.quantity += quantity;
    // if it is not in the cart, push it into the cart.
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptions: '1'
    });
  }
  saveToLocalStorage();
}

// After click delete link,
// First, Remove a productId from the cart.
// Steps, 1. create a new array.
// 2. loop through the cart.
// 3. add each product to the new array, except for this productId.

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
      console.log(newCart);
    }
  });
  cart = newCart;
  saveToLocalStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

// Find a matching productId in the cart, and update its
// quantity to the new quantity.
export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  console.log(newQuantity);

  saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptions = deliveryOptionId;

  saveToLocalStorage();
}