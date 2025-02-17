// Initialize cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count on homepage
    updateCartCount();
}

// Update the cart count in the navigation bar
function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Display cart items on the cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // Clear any existing items
    let total = 0;

    // Loop through the cart and display each item
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.name} x ${item.quantity} - $${item.price * item.quantity}</p>
            </div>
        `;
    });

    // Display the total price
    const cartTotal = document.getElementById('cart-total');
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Handle checkout form submission
document.getElementById('checkout-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';  // Redirect to home after checkout
});

// Run the updateCartCount function when the page loads
updateCartCount();

// If we're on the cart page, call displayCartItems
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}
