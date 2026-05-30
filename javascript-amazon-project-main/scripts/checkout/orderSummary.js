import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../util/money.js";
// External library esm version.
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { updateDeliveryOption } from "../../data/cart.js";

// External library.
hello();

const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D"));

export function renderOrderSummary() {
  let cartSummaryHtml = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

        const today = dayjs();
        const deliveryDate =  today.add(
        deliveryOption.deliveryDays,
              'days' 
            );
        const dateString = deliveryDate.format(
              'dddd, MMMM D'
            );

    let html = `<div class="cart-item-container 
                js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label 
                      js-quantity-label-${matchingProduct.id}">${
      cartItem.quantity
    }</span>
                    </span>
                    <span class="update-quantity-link link-primary
                    js-update-link" data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class='quantity-input js-quantity-input'>
                    <span class="save-quantity-link link-primary js-save-link"
                    data-product-id="${matchingProduct.id}">
                      Save
                    </span>
                    <span class="delete-quantity-link link-primary
                    js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;

    cartSummaryHtml += html;

    //console.log(cartSummaryHtml);
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

    // Delivery option html.
    // 1. Loop through delivery options.
    // 2. For each oprtion, generate some HTML.
    // 3. Combine the HTML together.
    function deliveryOptionHTML(matchingProduct, cartItem) {
      let html = ''
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate =  today.add(
          deliveryOption.deliveryDays,
          'days' 
        );
        const dateString = deliveryDate.format(
          'dddd, MMMM D'
        );

        const priceString = deliveryOption.priceCents
        === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.
            priceCents)} -`;

            const isChecked = deliveryOption.id ===
            cartItem.deliveryOptionId;

            html +=
        `
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                      ${isChecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>
        `
      });
      return html;
    }

    // Delete link in the cart item.
    // After click delete link,
    // 1. Remove the productId from the cart.
    // 2. Update the HTML.
    document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
      deleteLink.addEventListener("click", () => {
        const productId = deleteLink.dataset.productId;
        console.log(productId);
        // First, Remove a productId from the cart. this function in cart.js.
        removeFromCart(productId);

        // Second, Update the HTML
        // Steps, 1. Use the DOM to get the element to remove.
        // 2. Use .remove() method to remove the element.
        const container = document.querySelector(`
          .js-cart-item-container-${productId}`);
        container.remove();

        updateCartQuantity();
      });
    });

    // Update link in the cart item.
    document.querySelectorAll('.js-update-link').forEach((updateLink) => {
      updateLink.addEventListener('click', () => {
        const productId = updateLink.dataset.productId;
        console.log(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
      })
    });

    // Save link in the cart item.
    document.querySelectorAll('.js-save-link').forEach((saveLink) => {
      saveLink.addEventListener('click', () => {
        const productId = saveLink.dataset.productId;
        console.log(productId);

        // When clicking save, get new quantity for product.
        const newQuantity = parseInt(
          document.querySelector(".js-quantity-input").value
        );
        //console.log(newQuantity);

        // Add validation for quantity.
        if (newQuantity < 0 || newQuantity >= 1000) {
          alert("Quantity must be at least 0 and less than 1000");
          return;
        }

        // Update product's quantity to this new quantity,
        // After clicking save.
        updateQuantity(productId, newQuantity);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove("is-editing-quantity");

        const quantityLabel = document.querySelector(
          `.js-quantity-label-${productId}`
        );
        quantityLabel.innerHTML = newQuantity;
        updateCartQuantity();
      });
    });
  });

  function updateCartQuantity() {
    // Checkout page header make the cart quantity interactive.
    const cartQuantity = calculateCartQuantity();
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
  }

  updateCartQuantity();

  document.querySelectorAll('.js-delivery-option')
    .forEach((deliveryOption) => {
    deliveryOption.addEventListener('click', () => {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  })
}