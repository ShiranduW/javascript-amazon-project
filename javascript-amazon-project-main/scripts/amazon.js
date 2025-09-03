import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

products.forEach((product) => {
  //console.log(product);
  let html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents / 100}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          
          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id='${product.id}'>
            Add to Cart
          </button>
        </div>`;

  document.querySelector(".js-products-grid").innerHTML += html;
});

let timeout;

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    //console.log('Added product');
    const productId = button.dataset.productId;
    //console.log(productId);

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

    // Make the cart interactive.
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    console.log(cartQuantity);
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    console.log(cart);

    // Create "Added" message.
    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedMessage.classList.add("added-to-cart-visible");

    clearTimeout(timeout);

    // After 2 seconds, remove the "Added" message.
    timeout = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);

  });
});
