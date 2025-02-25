// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || { date: new Date().toISOString().split("T")[0], products: [] };
const cartContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("cart-total");

// Function to update cart display
function loadCart() {
    cartContainer.innerHTML = ""; // Clear previous data
    let totalPrice = 0;

    cart.products.forEach((product, index) => {
        let itemTotalPrice = product.price;
        totalPrice += itemTotalPrice;

        let cartItem = document.createElement("div");
        cartItem.classList.add("flex", "items-center", "justify-between", "border-b", "border-gray-300", "py-4");

        cartItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${product.image}" alt="${product.name}" class="h-16 w-16 object-cover rounded">
                <div>
                    <h4 class="text-lg font-medium text-[#0A4040]">${product.name}</h4>
                    <div class="flex items-center space-x-3 mt-2">
                        <button class="decrease p-2 bg-gray-200 rounded">
                            <img src="Assets/images/minus.svg" alt="Minus" class="h-4 w-4">
                        </button>
                        <span class="quantity text-lg font-medium">${product.quantity}</span>
                        <button class="increase p-2 bg-gray-200 rounded">
                            <img src="Assets/images/plus.svg" alt="Plus" class="h-4 w-4">
                        </button>
                    </div>
                </div>
            </div>
            <span class="text-lg font-bold text-[#52823C] price">Ksh ${itemTotalPrice}</span>
        `;

        // Add event listeners for quantity buttons
        let decreaseBtn = cartItem.querySelector(".decrease");
        let increaseBtn = cartItem.querySelector(".increase");
        let quantityElement = cartItem.querySelector(".quantity");
        let priceElement = cartItem.querySelector(".price");

        increaseBtn.addEventListener("click", () => {
            product.quantity++;
            product.price = (product.price / (product.quantity - 1)) * product.quantity; // Recalculate price
            quantityElement.innerText = product.quantity;
            priceElement.innerText = `Ksh ${product.price}`;
            updateCartTotal();
            saveCart();
        });

        decreaseBtn.addEventListener("click", () => {
            if (product.quantity > 1) {
                product.quantity--;
                product.price = (product.price / (product.quantity + 1)) * product.quantity;
                quantityElement.innerText = product.quantity;
                priceElement.innerText = `Ksh ${product.price}`;
                updateCartTotal();
                saveCart();
            }
        });

        cartContainer.appendChild(cartItem);
    });

    totalPriceElement.innerText = `Ksh ${totalPrice}`;
}

// Function to update total price
function updateCartTotal() {
    let total = cart.products.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.innerText = `Ksh ${total}`;
}

// Function to save cart data to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart data when the page loads
loadCart();
