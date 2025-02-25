document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', function () {
        let quantityElement = this.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantityElement.innerText);
        quantityElement.innerText = quantity + 1;
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', function () {
        let quantityElement = this.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantityElement.innerText);
        if (quantity > 1) {
            quantityElement.innerText = quantity - 1;
        }
    });
});


    // Cart Object
    const cart = {
        date: new Date().toISOString().split('T')[0], // Get today's date
        products: []
    };

    // Increase Quantity
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function () {
            let quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.innerText);
            quantityElement.innerText = quantity + 1;
        });
    });

    // Decrease Quantity (Min: 1)
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function () {
            let quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.innerText);
            if (quantity > 1) {
                quantityElement.innerText = quantity - 1;
            }
        });
    });

    // Add to Cart
    document.querySelectorAll('.order-now').forEach(button => {
        button.addEventListener('click', function () {
            let card = this.closest('.bg-white'); // Get the current card
            let productName = card.querySelector('.product-name').innerText; // Get product name
            let quantity = parseInt(card.querySelector('.quantity').innerText); // Get quantity
            let productImage = card.querySelector('.product-image').src; // Get image URL
            let cartIcon = card.querySelector('.cart-icon'); // Get the cart icon

            // Check if product already exists in cart
            let existingProduct = cart.products.find(product => product.name === productName);
            if (existingProduct) {
                existingProduct.quantity += quantity; // Update quantity if already in cart
            } else {
                // Add new product to cart
                cart.products.push({
                    name: productName,
                    quantity: quantity,
                    image: productImage
                });
            }

            

            console.log(cart); 
            // alert(`${productName} added to cart!`);
        });
    });
