export const cart = [
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
