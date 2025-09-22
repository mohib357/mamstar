// js/modules/cart-system.js - Shopping Cart Management

// Cart data
let cart = [];

// Add to cart
function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        showNotification('এই পণ্যটি ইতিমধ্যেই আপনার কার্টে রয়েছে!', 'warning');
        return;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
        showNotification('পণ্যটি কার্টে যোগ করা হয়েছে!');
    }

    updateCartCount();
}

// Show cart
function showCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>আপনার কার্টে কোন পণ্য নেই</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">৳${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                    <button type="button" onclick="decreaseCartItem(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" onclick="increaseCartItem(${item.id})">+</button>
                </div>
                <div class="cart-item-total">৳${item.price * item.quantity}</div>
                <button class="remove-cart-item" onclick="removeFromCart(${item.id})">সরান</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    updateCartTotal();
    cartModal.style.display = 'block';
}

// Decrease cart item
function decreaseCartItem(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCartCount();
        showCart();
    }
}

// Increase cart item
function increaseCartItem(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const product = products.find(p => p.id === productId);
        if (item.quantity < product.stock) {
            item.quantity++;
            updateCartCount();
            showCart();
        } else {
            showNotification('স্টকে পর্যাপ্ত পণ্য নেই!', 'warning');
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart();
}

// Show checkout
function showCheckout() {
    if (cart.length === 0) {
        showNotification('আপনার কার্টে কোন পণ্য নেই!', 'warning');
        return;
    }

    let orderSummaryHTML = '<h3>অর্ডার সারাংশ</h3>';
    cart.forEach(item => {
        orderSummaryHTML += `
            <div class="order-summary-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>৳${item.price * item.quantity}</span>
            </div>
        `;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderSummaryHTML += `
        <div class="order-summary-total">
            <span>মোট:</span>
            <span>৳${total}</span>
        </div>
    `;

    orderSummary.innerHTML = orderSummaryHTML;
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
}

// Process checkout
function processCheckout(event) {
    event.preventDefault();

    const formData = new FormData(checkoutForm);
    const orderData = {
        id: orders.length + 1,
        customer: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        },
        paymentMethod: document.getElementById('paymentMethod').value,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toLocaleDateString('bn-BD'),
        status: 'pending'
    };

    orders.push(orderData);

    // Update product stock
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    // Clear cart
    cart = [];
    updateCartCount();

    // Show confirmation
    checkoutModal.style.display = 'none';
    orderConfirmationModal.style.display = 'block';

    // Reset form
    checkoutForm.reset();

    // Update products display
    renderProducts();
    saveProducts();

    // Update orders table if admin is logged in
    if (adminPanel.classList.contains('active')) {
        renderOrdersTable();
    }
}