        // Sample initial products
        let products = [
            {
                id: 1,
                name: "ক্লাসিক ব্ল্যাক চশমা",
                category: "চশমা",
                price: 850,
                oldPrice: 1200,
                discount: 29,
                stock: 15,
                images: [
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                ],
                videos: [
                    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
                ],
                description: "আধুনিক ডিজাইনের UV প্রোটেক্টেড চশমা, যা আপনার চোখকে সূর্যের ক্ষতিকারক রশ্মি থেকে রক্ষা করবে। এটি হালকা ওজনের এবং দীর্ঘক্ষণ পরতে স্বাচ্ছন্দ্যবোধ করায়।"
            },
            {
                id: 2,
                name: "ইলেক্ট্রনিক ঘড়ি",
                category: "ঘড়ি",
                price: 1500,
                oldPrice: 2000,
                discount: 25,
                stock: 8,
                images: [
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                ],
                videos: [],
                description: "ওয়াটার রেসিস্ট্যান্ট ডিজিটাল ঘড়ি, যা দৈনন্দিন ব্যবহারের জন্য আদর্শ। এতে রয়েছে ডেট, অ্যালার্ম এবং স্টপওয়াচ ফিচার।"
            },
            {
                id: 3,
                name: "নিগারিয়া বোরকা",
                category: "বোরকা",
                price: 1200,
                oldPrice: 0,
                discount: 0,
                stock: 12,
                images: [
                    "https://images.unsplash.com/photo-1618365908648-e71bd572fd9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1618365908648-e71bd572fd9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                ],
                videos: [],
                description: "আরামদায়ক ফেব্রিকের নিগাব, যা আধুনিক নারীদের জন্য নিখুঁত পছন্দ। এটি শ্বাসপ্রশ্বাসের জন্য উন্মুক্ত এবং সহজে পরিষ্কার করা যায়।"
            }
        ];

        // Cart data
        let cart = [];

        // Orders data
        let orders = [];

        // DOM Elements
        const productGrid = document.getElementById('productGrid');
        const adminIcon = document.getElementById('adminIcon');
        const adminPanel = document.getElementById('adminPanel');
        const productForm = document.getElementById('productForm');
        const cancelBtn = document.getElementById('cancelBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const cartIcon = document.getElementById('cartIcon');
        const cartCount = document.getElementById('cartCount');
        const cartModal = document.getElementById('cartModal');
        const closeCartModal = document.getElementById('closeCartModal');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const productDetailModal = document.getElementById('productDetailModal');
        const closeProductModal = document.getElementById('closeProductModal');
        const productDetailContainer = document.getElementById('productDetailContainer');
        const adminLoginModal = document.getElementById('adminLoginModal');
        const closeAdminLoginModal = document.getElementById('closeAdminLoginModal');
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        const adminPassword = document.getElementById('adminPassword');
        const passwordToggle = document.getElementById('passwordToggle');
        const addImageBtn = document.getElementById('addImageBtn');
        const addVideoBtn = document.getElementById('addVideoBtn');
        const imageUploads = document.getElementById('imageUploads');
        const videoUploads = document.getElementById('videoUploads');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const checkoutModal = document.getElementById('checkoutModal');
        const closeCheckoutModal = document.getElementById('closeCheckoutModal');
        const checkoutForm = document.getElementById('checkoutForm');
        const orderSummary = document.getElementById('orderSummary');
        const orderConfirmationModal = document.getElementById('orderConfirmationModal');
        const closeOrderConfirmationModal = document.getElementById('closeOrderConfirmationModal');
        const continueShoppingBtn = document.getElementById('continueShoppingBtn');
        const ordersTableBody = document.getElementById('ordersTableBody');
        const productListBody = document.getElementById('productListBody');
        const adminTabs = document.querySelectorAll('.admin-tab');
        const adminTabContents = document.querySelectorAll('.admin-tab-content');
        const orderDetailModal = document.getElementById('orderDetailModal');
        const closeOrderDetailModal = document.getElementById('closeOrderDetailModal');
        const orderDetailContainer = document.getElementById('orderDetailContainer');
        const submitProductBtn = document.getElementById('submitProductBtn');
        const productIdInput = document.getElementById('productId');

        // Check if admin is logged in
        function checkAdminLogin() {
            if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
                adminPanel.classList.add('active');
            }
        }

        // Render products
        function renderProducts() {
            productGrid.innerHTML = '';

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                const discountBadge = product.discount > 0 ?
                    `<div class="discount-badge">${product.discount}% ছাড়</div>` : '';

                const stockBadge = product.stock > 0 ?
                    `<div class="stock-badge">স্টক: ${product.stock}</div>` :
                    `<div class="stock-badge" style="background-color: var(--danger);">স্টক শেষ</div>`;

                const oldPriceHtml = product.oldPrice > 0 ?
                    `<span class="old-price">৳${product.oldPrice}</span>` : '';

                productCard.innerHTML = `
                    <div class="product-img" onclick="showProductDetail(${product.id})">
                        <img src="${product.images[0]}" alt="${product.name}">
                        ${discountBadge}
                        ${stockBadge}
                        <button class="quick-add" onclick="event.stopPropagation(); quickAddToCart(${product.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title" onclick="showProductDetail(${product.id})">${product.name}</h3>
                        <div class="product-price">
                            <span class="price">৳${product.price}</span>
                            ${oldPriceHtml}
                        </div>
                    </div>
                `;

                productGrid.appendChild(productCard);
            });
        }

        // Quick add to cart
        function quickAddToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product || product.stock <= 0) return;

            addToCart(product, 1);
        }

        // Show product detail
        function showProductDetail(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            // Store product ID in modal
            document.querySelector('.product-detail-modal').dataset.productId = productId;

            productDetailContainer.innerHTML = `
                <div class="product-gallery">
                    <div class="main-image-container" id="mainImageContainer">
                        <img src="${product.images[0]}" alt="${product.name}" class="main-image" id="mainImage">
                        <div class="zoom-lens" id="zoomLens"></div>
                    </div>
                    <div class="thumbnail-container">
                        ${product.images.map((img, index) => `
                            <img src="${img}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage(${index})">
                        `).join('')}
                    </div>
                </div>
                <div class="product-info-detail">
                    <div class="product-category-detail">${product.category}</div>
                    <h2 class="product-title-detail">${product.name}</h2>
                    <div class="product-price-detail">
                        <span class="price-detail">৳${product.price}</span>
                        ${product.oldPrice > 0 ? `<span class="old-price-detail">৳${product.oldPrice}</span>` : ''}
                    </div>
                    <div class="stock-info">
                        <span>স্টক সংখ্যা: </span>
                        <span class="stock-count">${product.stock}</span>
                    </div>
                    <div class="add-to-cart-form">
                        <div class="quantity-selector">
                            <button type="button" id="decreaseQty">-</button>
                            <input type="number" id="productQty" value="1" min="1" max="${product.stock}">
                            <button type="button" id="increaseQty">+</button>
                        </div>
                        <div class="total-price" id="totalPrice">মোট: ৳${product.price}</div>
                        <button class="add-to-cart-btn" id="addToCartBtn">কার্টে যোগ করুন</button>
                    </div>
                    <div class="product-description">
                        <h3>বর্ণনা</h3>
                        <p>${product.description}</p>
                    </div>
                </div>
            `;

            // Setup zoom functionality
            setTimeout(() => {
                setupImageZoom();
            }, 100);

            // Add event listeners
            document.getElementById('decreaseQty').addEventListener('click', () => {
                const qtyInput = document.getElementById('productQty');
                if (qtyInput.value > 1) {
                    qtyInput.value = parseInt(qtyInput.value) - 1;
                    updateTotalPrice(product.price);
                }
            });

            document.getElementById('increaseQty').addEventListener('click', () => {
                const qtyInput = document.getElementById('productQty');
                if (qtyInput.value < product.stock) {
                    qtyInput.value = parseInt(qtyInput.value) + 1;
                    updateTotalPrice(product.price);
                }
            });

            document.getElementById('productQty').addEventListener('input', () => {
                updateTotalPrice(product.price);
            });

            document.getElementById('addToCartBtn').addEventListener('click', () => {
                const qty = parseInt(document.getElementById('productQty').value);
                addToCart(product, qty);
                productDetailModal.style.display = 'none';
            });

            productDetailModal.style.display = 'block';
        }

        // Setup image zoom functionality
        function setupImageZoom() {
            const mainImageContainer = document.getElementById('mainImageContainer');
            const mainImage = document.getElementById('mainImage');
            const zoomLens = document.getElementById('zoomLens');

            // Create zoom container
            const zoomContainer = document.createElement('div');
            zoomContainer.className = 'zoom-container';
            zoomContainer.style.position = 'absolute';
            zoomContainer.style.right = '-320px'; // Show on the right side of the image
            zoomContainer.style.top = '0';
            zoomContainer.style.width = '300px';
            zoomContainer.style.height = '300px';
            zoomContainer.style.border = '1px solid #ddd';
            zoomContainer.style.borderRadius = '5px';
            zoomContainer.style.overflow = 'hidden';
            zoomContainer.style.display = 'none';
            zoomContainer.style.zIndex = '100';

            const zoomedImage = document.createElement('img');
            zoomedImage.className = 'zoomed-image';
            zoomedImage.style.position = 'absolute';
            zoomedImage.style.width = '600px'; // Larger image for zoom
            zoomedImage.style.height = '600px';

            zoomContainer.appendChild(zoomedImage);
            mainImageContainer.appendChild(zoomContainer);

            mainImageContainer.addEventListener('mousemove', (e) => {
                const rect = mainImageContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Position the zoom lens
                zoomLens.style.left = (x - 50) + 'px';
                zoomLens.style.top = (y - 50) + 'px';
                zoomLens.style.display = 'block';

                // Show zoom container
                zoomContainer.style.display = 'block';

                // Calculate background position for zoom effect
                const bgX = -((x / rect.width) * 600) + 150;
                const bgY = -((y / rect.height) * 600) + 150;

                zoomedImage.src = mainImage.src;
                zoomedImage.style.left = bgX + 'px';
                zoomedImage.style.top = bgY + 'px';
            });

            mainImageContainer.addEventListener('mouseleave', () => {
                zoomLens.style.display = 'none';
                zoomContainer.style.display = 'none';
            });
        }

        // Change main image
        function changeImage(index) {
            const productId = parseInt(document.querySelector('.product-detail-modal').dataset.productId);
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const mainImage = document.getElementById('mainImage');
            mainImage.src = product.images[index];

            document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }

        // Update total price
        function updateTotalPrice(price) {
            const qty = parseInt(document.getElementById('productQty').value);
            document.getElementById('totalPrice').textContent = `মোট: ৳${price * qty}`;
        }

        // Add to cart
        function addToCart(product, quantity) {
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                // Show notification if already in cart
                showNotification('এই পণ্যটি ইতিমধ্যেই আপনার কার্টে রয়েছে!', 'warning');
                return;
            } else {
                // Add new item to cart
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

        // Update cart count
        function updateCartCount() {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = count;
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

        // Update cart total
        function updateCartTotal() {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `৳${total}`;
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

            // Generate order summary
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

            // Update orders table if admin is logged in
            if (adminPanel.classList.contains('active')) {
                renderOrdersTable();
            }
        }

        // Render orders table
        function renderOrdersTable() {
            ordersTableBody.innerHTML = '';

            if (orders.length === 0) {
                ordersTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">কোন অর্ডার নেই</td></tr>';
            } else {
                orders.forEach(order => {
                    const row = document.createElement('tr');
                    row.className = 'clickable';
                    row.onclick = () => showOrderDetail(order.id);

                    let statusClass = '';
                    switch (order.status) {
                        case 'pending': statusClass = 'status-pending'; break;
                        case 'processing': statusClass = 'status-processing'; break;
                        case 'shipped': statusClass = 'status-shipped'; break;
                        case 'delivered': statusClass = 'status-delivered'; break;
                        case 'cancelled': statusClass = 'status-cancelled'; break;
                    }

                    row.innerHTML = `
                        <td>#${order.id}</td>
                        <td>${order.customer.firstName} ${order.customer.lastName}</td>
                        <td>৳${order.total}</td>
                        <td>${order.date}</td>
                        <td>
                            <select class="form-control" onchange="updateOrderStatus(${order.id}, this.value)">
                                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>পেন্ডিং</option>
                                <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>প্রসেসিং</option>
                                <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>শিপড</option>
                                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>ডেলিভারড</option>
                                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>বাতিল</option>
                            </select>
                        </td>
                    `;

                    ordersTableBody.appendChild(row);
                });
            }
        }

        // Render product list
        function renderProductList() {
            productListBody.innerHTML = '';

            if (products.length === 0) {
                productListBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">কোন পণ্য নেই</td></tr>';
            } else {
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="${product.images[0]}" alt="${product.name}" class="product-thumbnail"></td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>৳${product.price}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button class="btn-warning" onclick="editProduct(${product.id})">এডিট</button>
                            <button class="btn-danger" onclick="deleteProduct(${product.id})">ডিলিট</button>
                        </td>
                    `;

                    productListBody.appendChild(row);
                });
            }
        }

        // Edit product
        function editProduct(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            // Populate form with product data
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productOldPrice').value = product.oldPrice || '';
            document.getElementById('productDiscount').value = product.discount || '';
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productDescription').value = product.description;

            // Change button text
            document.getElementById('submitProductBtn').textContent = 'আপডেট পণ্য';

            // Switch to add product tab
            adminTabs.forEach(tab => tab.classList.remove('active'));
            adminTabContents.forEach(content => content.classList.remove('active'));
            document.querySelector('[data-tab="products"]').classList.add('active');
            document.getElementById('products-tab').classList.add('active');
        }

        // Delete product
        function deleteProduct(productId) {
            if (confirm('আপনি কি এই পণ্যটি ডিলিট করতে চান?')) {
                products = products.filter(p => p.id !== productId);
                renderProducts();
                renderProductList();
                showNotification('পণ্যটি ডিলিট করা হয়েছে!');
            }
        }

        // Show order detail
        function showOrderDetail(orderId) {
            const order = orders.find(o => o.id === orderId);
            if (!order) return;

            let statusClass = '';
            switch (order.status) {
                case 'pending': statusClass = 'status-pending'; break;
                case 'processing': statusClass = 'status-processing'; break;
                case 'shipped': statusClass = 'status-shipped'; break;
                case 'delivered': statusClass = 'status-delivered'; break;
                case 'cancelled': statusClass = 'status-cancelled'; break;
            }

            let orderItemsHTML = `
                <table class="order-items-table">
                    <thead>
                        <tr>
                            <th>পণ্য</th>
                            <th>পরিমাণ</th>
                            <th>মূল্য</th>
                            <th>মোট</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            order.items.forEach(item => {
                orderItemsHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>৳${item.price}</td>
                        <td>৳${item.price * item.quantity}</td>
                    </tr>
                `;
            });

            orderItemsHTML += `
                    </tbody>
                </table>
            `;

            orderDetailContainer.innerHTML = `
                <div class="order-detail-section">
                    <h3>অর্ডার তথ্য</h3>
                    <div class="order-info-grid">
                        <div class="order-info-item">
                            <div class="order-info-label">অর্ডার ID:</div>
                            <div>#${order.id}</div>
                        </div>
                        <div class="order-info-item">
                            <div class="order-info-label">তারিখ:</div>
                            <div>${order.date}</div>
                        </div>
                        <div class="order-info-item">
                            <div class="order-info-label">স্ট্যাটাস:</div>
                            <div><span class="status-badge ${statusClass}">${order.status}</span></div>
                        </div>
                        <div class="order-info-item">
                            <div class="order-info-label">পেমেন্ট পদ্ধতি:</div>
                            <div>${order.paymentMethod}</div>
                        </div>
                    </div>
                </div>
                
                <div class="order-detail-section">
                    <h3>গ্রাহক তথ্য</h3>
                    <div class="order-info-grid">
                        <div class="order-info-item">
                            <div class="order-info-label">নাম:</div>
                            <div>${order.customer.firstName} ${order.customer.lastName}</div>
                        </div>
                        <div class="order-info-item">
                            <div class="order-info-label">ইমেল:</div>
                            <div>${order.customer.email}</div>
                        </div>
                        <div class="order-info-item">
                            <div class="order-info-label">ফোন:</div>
                            <div>${order.customer.phone}</div>
                        </div>
                        <div class="order-info-item">
                            <div class="order-info-label">ঠিকানা:</div>
                            <div>${order.customer.address}</div>
                        </div>
                    </div>
                </div>
                
                <div class="order-detail-section">
                    <h3>অর্ডার আইটেম</h3>
                    ${orderItemsHTML}
                    <div class="order-summary-total">
                        <span>মোট:</span>
                        <span>৳${order.total}</span>
                    </div>
                </div>
                
                ${order.status !== 'cancelled' && order.status !== 'delivered' ?
                    `<button class="cancel-order-btn" onclick="cancelOrder(${order.id})">অর্ডার বাতিল করুন</button>` : ''
                }
            `;

            orderDetailModal.style.display = 'block';
        }

        // Cancel order
        function cancelOrder(orderId) {
            if (confirm('আপনি কি এই অর্ডারটি বাতিল করতে চান?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'cancelled';
                    showNotification('অর্ডারটি বাতিল করা হয়েছে!');
                    orderDetailModal.style.display = 'none';
                    renderOrdersTable();
                }
            }
        }

        // Update order status
        function updateOrderStatus(orderId, newStatus) {
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.status = newStatus;
                showNotification('অর্ডার স্ট্যাটাস আপডেট করা হয়েছে!');
            }
        }

        // Admin login
        function showAdminLogin() {
            adminLoginModal.style.display = 'block';
            adminPassword.value = '';
            adminPassword.focus();
        }

        // Admin panel
        function showAdminPanel() {
            adminPanel.classList.add('active');
            adminLoginModal.style.display = 'none';
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            renderOrdersTable();
        }

        // Admin logout
        function adminLogout() {
            sessionStorage.removeItem('isAdminLoggedIn');
            adminPanel.classList.remove('active');
            showNotification('লগআউট সফল!');
        }

        // Process image upload
        function processImageUpload(input) {
            return new Promise((resolve) => {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        resolve(e.target.result); // Local file data URL
                    };
                    reader.readAsDataURL(input.files[0]);
                } else {
                    resolve(''); // No file selected
                }
            });
        }

        // Process video upload
        function processVideoUpload(input) {
            return new Promise((resolve) => {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        resolve(e.target.result); // Local file data URL
                    };
                    reader.readAsDataURL(input.files[0]);
                } else {
                    resolve(''); // No file selected
                }
            });
        }

        // Preview image
        async function previewImage(input) {
            if (input.files && input.files[0]) {
                const imageData = await processImageUpload(input);
                const preview = input.closest('.media-item').querySelector('.media-preview');
                preview.src = imageData;
                preview.style.display = 'block';
            }
        }

        // Preview video
        async function previewVideo(input) {
            if (input.files && input.files[0]) {
                const videoData = await processVideoUpload(input);
                const preview = input.closest('.media-item').querySelector('.media-preview');
                if (preview) {
                    preview.src = videoData;
                    preview.style.display = 'block';
                } else {
                    // Create preview element if it doesn't exist
                    const videoPreview = document.createElement('video');
                    videoPreview.className = 'media-preview';
                    videoPreview.src = videoData;
                    videoPreview.controls = true;
                    videoPreview.style.display = 'block';
                    videoPreview.style.width = '100%';
                    videoPreview.style.maxHeight = '200px';
                    input.closest('.media-item').appendChild(videoPreview);
                }
            }
        }

        // Preview URL image
        function previewUrlImage(input) {
            if (input.value) {
                const preview = input.closest('.media-item').querySelector('.media-preview');
                preview.src = input.value;
                preview.style.display = 'block';
            }
        }

        // Preview URL video
        function previewUrlVideo(input) {
            if (input.value) {
                const preview = input.closest('.media-item').querySelector('.media-preview');
                if (preview) {
                    preview.src = input.value;
                    preview.style.display = 'block';
                } else {
                    // Create preview element if it doesn't exist
                    const videoPreview = document.createElement('video');
                    videoPreview.className = 'media-preview';
                    videoPreview.src = input.value;
                    videoPreview.controls = true;
                    videoPreview.style.display = 'block';
                    videoPreview.style.width = '100%';
                    videoPreview.style.maxHeight = '200px';
                    input.closest('.media-item').appendChild(videoPreview);
                }
            }
        }

        // Add image URL
        function addImageUrl(button) {
            const input = button.previousElementSibling;
            if (input.value) {
                // Create a preview element
                const preview = document.createElement('img');
                preview.className = 'media-preview';
                preview.src = input.value;
                preview.style.display = 'block';

                // Add a data attribute to mark this as URL
                preview.dataset.type = 'url';
                preview.dataset.value = input.value;

                // Insert preview before the remove button
                const removeBtn = button.closest('.media-item').querySelector('.remove-media');
                button.closest('.media-item').insertBefore(preview, removeBtn);

                // Clear the input
                input.value = '';

                showNotification('ছবির ইউআরএল যোগ করা হয়েছে!');
            }
        }

        // Add video URL
        function addVideoUrl(button) {
            const input = button.previousElementSibling;
            if (input.value) {
                // Create a preview element
                const preview = document.createElement('video');
                preview.className = 'media-preview';
                preview.src = input.value;
                preview.controls = true;
                preview.style.display = 'block';
                preview.style.width = '100%';
                preview.style.maxHeight = '200px';

                // Add a data attribute to mark this as URL
                preview.dataset.type = 'url';
                preview.dataset.value = input.value;

                // Insert preview before the remove button
                const removeBtn = button.closest('.media-item').querySelector('.remove-media');
                button.closest('.media-item').insertBefore(preview, removeBtn);

                // Clear the input
                input.value = '';

                showNotification('ভিডিওর ইউআরএল যোগ করা হয়েছে!');
            }
        }

        // Add image upload field
        function addImageUpload() {
            const imageItem = document.createElement('div');
            imageItem.className = 'media-item';
            imageItem.innerHTML = `
                <div class="media-type-tabs">
                    <div class="media-type-tab active" data-type="file">ফাইল আপলোড</div>
                    <div class="media-type-tab" data-type="url">ইউআরএল</div>
                </div>
                <div class="media-type-content active" data-type="file">
                    <input type="file" class="form-control" accept="image/*" onchange="previewImage(this)">
                </div>
                <div class="media-type-content" data-type="url">
                    <div class="url-input-group">
                        <input type="text" class="form-control" placeholder="ছবির ইউআরএল লিখুন" onchange="previewUrlImage(this)">
                        <button type="button" onclick="addImageUrl(this)">যোগ করুন</button>
                    </div>
                </div>
                <img class="media-preview" style="display: none;">
                <button type="button" class="remove-media">সরান</button>
            `;
            imageUploads.appendChild(imageItem);

            // Add event listeners for media type tabs
            const mediaTypeTabs = imageItem.querySelectorAll('.media-type-tab');
            const mediaTypeContents = imageItem.querySelectorAll('.media-type-content');

            mediaTypeTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    mediaTypeTabs.forEach(t => t.classList.remove('active'));
                    mediaTypeContents.forEach(c => c.classList.remove('active'));

                    tab.classList.add('active');
                    const type = tab.getAttribute('data-type');
                    imageItem.querySelector(`.media-type-content[data-type="${type}"]`).classList.add('active');
                });
            });

            imageItem.querySelector('.remove-media').addEventListener('click', () => {
                imageItem.remove();
            });
        }

        // Add video upload field
        function addVideoUpload() {
            const videoItem = document.createElement('div');
            videoItem.className = 'media-item';
            videoItem.innerHTML = `
                <div class="media-type-tabs">
                    <div class="media-type-tab active" data-type="file">ফাইল আপলোড</div>
                    <div class="media-type-tab" data-type="url">ইউআরএল</div>
                </div>
                <div class="media-type-content active" data-type="file">
                    <input type="file" class="form-control" accept="video/*" onchange="previewVideo(this)">
                </div>
                <div class="media-type-content" data-type="url">
                    <div class="url-input-group">
                        <input type="text" class="form-control" placeholder="ভিডিওর ইউআরএল লিখুন" onchange="previewUrlVideo(this)">
                        <button type="button" onclick="addVideoUrl(this)">যোগ করুন</button>
                    </div>
                </div>
                <button type="button" class="remove-media">সরান</button>
            `;
            videoUploads.appendChild(videoItem);

            // Add event listeners for media type tabs
            const mediaTypeTabs = videoItem.querySelectorAll('.media-type-tab');
            const mediaTypeContents = videoItem.querySelectorAll('.media-type-content');

            mediaTypeTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    mediaTypeTabs.forEach(t => t.classList.remove('active'));
                    mediaTypeContents.forEach(c => c.classList.remove('active'));

                    tab.classList.add('active');
                    const type = tab.getAttribute('data-type');
                    videoItem.querySelector(`.media-type-content[data-type="${type}"]`).classList.add('active');
                });
            });

            videoItem.querySelector('.remove-media').addEventListener('click', () => {
                videoItem.remove();
            });
        }

        // Show notification
        function showNotification(message, type = 'success') {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notification => notification.remove());

            const notification = document.createElement('div');
            notification.className = `notification ${type}`;

            let icon = 'fa-check-circle';
            if (type === 'error') icon = 'fa-exclamation-circle';
            if (type === 'warning') icon = 'fa-exclamation-triangle';

            notification.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            `;

            document.body.appendChild(notification);

            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);

            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }

        // Event Listeners
        adminIcon.addEventListener('click', () => {
            if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
                showAdminLogin();
            } else {
                adminPanel.classList.add('active');
            }
        });

        adminLoginBtn.addEventListener('click', () => {
            if (adminPassword.value === 'mamstar123') {
                showAdminPanel();
            } else {
                showNotification('ভুল পাসওয়ার্ড!', 'error');
            }
        });

        logoutBtn.addEventListener('click', adminLogout);

        cancelBtn.addEventListener('click', () => {
            adminPanel.classList.remove('active');
            productForm.reset();
            document.getElementById('productId').value = '';
            document.getElementById('submitProductBtn').textContent = 'পণ্য যোগ করুন';
        });

        cartIcon.addEventListener('click', showCart);

        closeCartModal.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });

        closeProductModal.addEventListener('click', () => {
            productDetailModal.style.display = 'none';
        });

        closeAdminLoginModal.addEventListener('click', () => {
            adminLoginModal.style.display = 'none';
        });

        passwordToggle.addEventListener('click', () => {
            const type = adminPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            adminPassword.setAttribute('type', type);
            passwordToggle.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });

        addImageBtn.addEventListener('click', addImageUpload);
        addVideoBtn.addEventListener('click', addVideoUpload);

        checkoutBtn.addEventListener('click', showCheckout);

        closeCheckoutModal.addEventListener('click', () => {
            checkoutModal.style.display = 'none';
        });

        checkoutForm.addEventListener('submit', processCheckout);

        closeOrderConfirmationModal.addEventListener('click', () => {
            orderConfirmationModal.style.display = 'none';
        });

        continueShoppingBtn.addEventListener('click', () => {
            orderConfirmationModal.style.display = 'none';
        });

        closeOrderDetailModal.addEventListener('click', () => {
            orderDetailModal.style.display = 'none';
        });

        // Admin tabs
        adminTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                adminTabs.forEach(t => t.classList.remove('active'));
                adminTabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');

                // Render orders table if orders tab is active
                if (tabId === 'orders') {
                    renderOrdersTable();
                } else if (tabId === 'product-list') {
                    renderProductList();
                }
            });
        });

        // Add remove media event listeners to existing items
        document.querySelectorAll('.remove-media').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
            });
        });

        // Product form submit
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Process image uploads
            const imageItems = imageUploads.querySelectorAll('.media-item');
            const images = [];

            for (const item of imageItems) {
                const fileInput = item.querySelector('input[type="file"]');
                const urlInput = item.querySelector('input[type="text"]');
                const preview = item.querySelector('.media-preview');

                if (preview && preview.src) {
                    if (preview.dataset.type === 'url') {
                        // URL image
                        images.push(preview.dataset.value || preview.src);
                    } else {
                        // File upload
                        const imageData = await processImageUpload(fileInput);
                        if (imageData) {
                            images.push(imageData);
                        }
                    }
                }
            }

            // Process video uploads
            const videoItems = videoUploads.querySelectorAll('.media-item');
            const videos = [];

            for (const item of videoItems) {
                const fileInput = item.querySelector('input[type="file"]');
                const urlInput = item.querySelector('input[type="text"]');
                const preview = item.querySelector('.media-preview');

                if (preview && preview.src) {
                    if (preview.dataset.type === 'url') {
                        // URL video
                        videos.push(preview.dataset.value || preview.src);
                    } else {
                        // File upload
                        const videoData = await processVideoUpload(fileInput);
                        if (videoData) {
                            videos.push(videoData);
                        }
                    }
                }
            }

            // If no images were uploaded, use a default
            if (images.length === 0) {
                images.push('https://via.placeholder.com/500x500?text=No+Image');
            }

            const productId = document.getElementById('productId').value;

            if (productId) {
                // Update existing product
                const product = products.find(p => p.id === parseInt(productId));
                if (product) {
                    product.name = document.getElementById('productName').value;
                    product.category = document.getElementById('productCategory').value;
                    product.price = parseInt(document.getElementById('productPrice').value);
                    product.oldPrice = parseInt(document.getElementById('productOldPrice').value) || 0;
                    product.discount = parseInt(document.getElementById('productDiscount').value) || 0;
                    product.stock = parseInt(document.getElementById('productStock').value);
                    product.images = images;
                    product.videos = videos;
                    product.description = document.getElementById('productDescription').value;

                    showNotification('পণ্যটি আপডেট করা হয়েছে!');
                }
            } else {
                // Add new product
                const newProduct = {
                    id: products.length + 1,
                    name: document.getElementById('productName').value,
                    category: document.getElementById('productCategory').value,
                    price: parseInt(document.getElementById('productPrice').value),
                    oldPrice: parseInt(document.getElementById('productOldPrice').value) || 0,
                    discount: parseInt(document.getElementById('productDiscount').value) || 0,
                    stock: parseInt(document.getElementById('productStock').value),
                    images: images,
                    videos: videos,
                    description: document.getElementById('productDescription').value
                };

                products.push(newProduct);
                showNotification('পণ্য সফলভাবে যোগ করা হয়েছে!');
            }

            renderProducts();
            productForm.reset();
            document.getElementById('productId').value = '';
            document.getElementById('submitProductBtn').textContent = 'পণ্য যোগ করুন';
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
            if (e.target === productDetailModal) {
                productDetailModal.style.display = 'none';
            }
            if (e.target === adminLoginModal) {
                adminLoginModal.style.display = 'none';
            }
            if (e.target === checkoutModal) {
                checkoutModal.style.display = 'none';
            }
            if (e.target === orderConfirmationModal) {
                orderConfirmationModal.style.display = 'none';
            }
            if (e.target === orderDetailModal) {
                orderDetailModal.style.display = 'none';
            }
        });

        // Add CSS styles
        const style = document.createElement('style');
        style.textContent = `
            .zoom-container {
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                background-color: white;
            }
            
            .zoomed-image {
                object-fit: cover;
            }
            
            .media-preview {
                max-width: 100px;
                max-height: 100px;
                border-radius: 5px;
                border: 1px solid #ddd;
                margin-top: 10px;
            }
            
            #mainImageContainer {
                position: relative;
                overflow: visible;
            }
        `;
        document.head.appendChild(style);

        // Initialize
        checkAdminLogin();
        renderProducts();
