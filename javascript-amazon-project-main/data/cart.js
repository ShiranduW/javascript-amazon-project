export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }
];

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
    });
  }
}

// After click delete link,
// Remove a productId from the cart.
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
}