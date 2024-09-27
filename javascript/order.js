// script.js

// Initialize an empty cart array
let cart = [];

// Function to add items to the cart
function addToCart(item) {
    cart.push(item);
    
    // Update cart count in the navbar
    updateCartCount();
    
    // Display cart items below recipes
    displayCartItems();
    
    // Optionally save the cart to session storage to persist data
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart count
function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to display cart items below the recipes section
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items-container');
    cartContainer.innerHTML = ''; // Clear previous items

    cart.forEach((item, index) => {
        const cartItem = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartContainer.innerHTML += cartItem;
    });

    // If the cart is empty, show a message
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}

// Function to remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
    
    // Update the cart in session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Load the cart from session storage when the page loads
function loadCart() {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        displayCartItems();
    }
}

// Function to display the cart in the modal
function displayCartInModal() {
    const modalBody = document.getElementById('cart-modal-body');
    modalBody.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        modalBody.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
    });

    // If the cart is empty, show a message
    if (cart.length === 0) {
        modalBody.innerHTML = '<p>Your cart is empty.</p>';
    }
}

// Example item objects for adding to the cart
const items = [
    { id: 1, name: "Spaghetti Carbonara", price: 12.99 },
    { id: 2, name: "Margherita Pizza", price: 14.99 },
    { id: 3, name: "Lasagna", price: 11.99 },
    { id: 4, name: "Tiramisu", price: 12.99 },
    { id: 5, name: "Fettuccine Alfredo", price: 14.99 },
    { id: 6, name: "Risotto", price: 11.99 },
    { id: 7, name: "Bruschetta", price: 11.99 },
    { id: 8, name: "Gnocchi", price: 11.99 },
    { id: 9, name: "Spaghetti Carbonara Dinner", price: 8.99 },
    { id: 10, name: "Paninin Lunch", price: 8.99 },
    { id: 11, name: "Tiramisu Dessert", price: 8.99 },
    { id: 11, name: "Melanzane alla Parmigiana", price: 8.99 }
];

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach((button, index) => {
    button.addEventListener('click', () => addToCart(items[index]));
});

// Event listener to show the modal with updated cart items
document.getElementById('cart-modal-btn').addEventListener('click', displayCartInModal);

// Load the cart when the page loads
window.onload = loadCart;


document.addEventListener("DOMContentLoaded", function() {
    // Get all filter options and menu items
    const filterOptions = document.querySelectorAll('.filter-option');
    const menuItems = document.querySelectorAll('.menu-item');

    // Add event listener to all filter options
    filterOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            event.preventDefault();
            const filterType = this.getAttribute('data-filter');

            // Filter the menu items based on the selected filter
            menuItems.forEach(item => {
                if (filterType === 'all') {
                    item.style.display = 'block'; // Show all items if "All" is selected
                } else if (item.getAttribute('data-type') === filterType) {
                    item.style.display = 'block'; // Show the item if it matches the filter type
                } else {
                    item.style.display = 'none'; // Hide items that don't match the filter type
                }
            });
        });
    });
});

