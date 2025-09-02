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
            <select>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          
          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-name='${product.id}'>
            Add to Cart
          </button>
        </div>`;

  document.querySelector(".js-products-grid").innerHTML += html;
});

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    //console.log('Added product');
    const productName = button.dataset.productId;
    console.log(productName);

    // check if the product is already in the cart.
    let matchingCartItem;
    cart.forEach((item) => {
      if (productId === item.productName) {
        matchingCartItem = item;
      }
    });
    // if it in the cart, increase the quantity.
    if (matchingCartItem) {
      matchingCartItem.quantity++;
      // if it is not in the cart, push it into the cart.
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
      });
    }
    console.log(cart);
  });
});
