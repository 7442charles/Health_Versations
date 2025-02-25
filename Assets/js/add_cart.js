// Cart Object
let cart = JSON.parse(localStorage.getItem("cart")) || { date: new Date().toISOString().split("T")[0], products: [] };

// Function to update the price dynamically
function updatePrice(card) {
    let quantity = parseInt(card.querySelector(".quantity").innerText);
    let priceElement = card.querySelector(".price-value");

    // Get base price from the HTML (not hardcoded)
    let basePrice = parseInt(card.querySelector(".product-price").getAttribute("data-price"));

    let totalPrice = basePrice * quantity;
    priceElement.innerText = totalPrice;
}

// Increase Quantity
document.querySelectorAll(".increase").forEach(button => {
    button.addEventListener("click", function () {
        let card = this.closest(".bg-white");
        let quantityElement = card.querySelector(".quantity");
        let quantity = parseInt(quantityElement.innerText);
        quantityElement.innerText = quantity + 1;
        updatePrice(card);
    });
});

// Decrease Quantity (Min: 1)
document.querySelectorAll(".decrease").forEach(button => {
    button.addEventListener("click", function () {
        let card = this.closest(".bg-white");
        let quantityElement = card.querySelector(".quantity");
        let quantity = parseInt(quantityElement.innerText);
        if (quantity > 1) {
            quantityElement.innerText = quantity - 1;
            updatePrice(card);
        }
    });
});

// Add to Cart
document.querySelectorAll(".order-now").forEach(button => {
    button.addEventListener("click", function () {
        let card = this.closest(".bg-white");
        let productName = card.querySelector(".product-name").innerText;
        let quantity = parseInt(card.querySelector(".quantity").innerText);
        let productImage = card.querySelector(".product-image").src;
        let price = parseInt(card.querySelector(".price-value").innerText);
        let cartIcon = card.querySelector(".cart-icon");

        // Animate cart icon
        cartIcon.classList.add("scale-125");
        setTimeout(() => cartIcon.classList.remove("scale-125"), 300);

        // Check if product already exists in cart
        let existingProduct = cart.products.find(product => product.name === productName);
        if (existingProduct) {
            existingProduct.quantity += quantity;
            existingProduct.price += price;
        } else {
            // Add new product to cart
            cart.products.push({
                name: productName,
                quantity: quantity,
                image: productImage,
                price: price
            });
        }

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
    });
});
