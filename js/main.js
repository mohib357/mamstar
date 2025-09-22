// js/main.js - Core Application Initialization

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

// Initialize application
async function initializeApp() {
    try {
        await loadProducts();
        renderProducts();
        checkAdminLogin();
        setupEventListeners();
        console.log('MAM STAR Application initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Admin events
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
        productIdInput.value = '';
        submitProductBtn.textContent = 'পণ্য যোগ করুন';
    });

    // Cart events
    cartIcon.addEventListener('click', showCart);
    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Product detail events
    closeProductModal.addEventListener('click', () => {
        productDetailModal.style.display = 'none';
    });

    // Admin login events
    closeAdminLoginModal.addEventListener('click', () => {
        adminLoginModal.style.display = 'none';
    });

    passwordToggle.addEventListener('click', () => {
        const type = adminPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        adminPassword.setAttribute('type', type);
        passwordToggle.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Media upload events
    addImageBtn.addEventListener('click', addImageUpload);
    addVideoBtn.addEventListener('click', addVideoUpload);

    // Checkout events
    checkoutBtn.addEventListener('click', showCheckout);
    closeCheckoutModal.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });
    checkoutForm.addEventListener('submit', processCheckout);

    // Order confirmation events
    closeOrderConfirmationModal.addEventListener('click', () => {
        orderConfirmationModal.style.display = 'none';
    });
    continueShoppingBtn.addEventListener('click', () => {
        orderConfirmationModal.style.display = 'none';
    });

    // Order detail events
    closeOrderDetailModal.addEventListener('click', () => {
        orderDetailModal.style.display = 'none';
    });

    // Admin tabs
    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            adminTabs.forEach(t => t.classList.remove('active'));
            adminTabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');

            if (tabId === 'orders') {
                renderOrdersTable();
            } else if (tabId === 'product-list') {
                renderProductList();
            }
        });
    });

    // Product form submit
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const githubToken = localStorage.getItem('githubToken');
        if (!githubToken) {
            showNotification('GitHub টোকেন সেটআপ করুন পণ্য সংরক্ষণের জন্য', 'warning');
            showGithubTokenModal();
            return;
        }

        const isTokenValid = await validateGithubToken(githubToken);
        if (!isTokenValid) {
            showNotification('GitHub টোকেন অবৈধ বা মেয়াদ উত্তীর্ণ হয়েছে', 'error');
            showGithubTokenModal();
            return;
        }

        // Process image uploads
        const imageItems = imageUploads.querySelectorAll('.media-item');
        const images = [];

        for (const item of imageItems) {
            const fileInput = item.querySelector('input[type="file"]');
            const urlInput = item.querySelector('input[type="text"]');
            const preview = item.querySelector('.media-preview');

            if (preview && preview.src) {
                if (preview.dataset.type === 'url') {
                    images.push(preview.dataset.value || preview.src);
                } else {
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
                    videos.push(preview.dataset.value || preview.src);
                } else {
                    videos.push("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
                }
            }
        }

        if (images.length === 0) {
            images.push('https://via.placeholder.com/500x500?text=No+Image');
        }

        const productId = productIdInput.value;

        if (productId) {
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
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
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
        await saveProducts();
        productForm.reset();
        productIdInput.value = '';
        submitProductBtn.textContent = 'পণ্য যোগ করুন';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.style.display = 'none';
        if (e.target === productDetailModal) productDetailModal.style.display = 'none';
        if (e.target === adminLoginModal) adminLoginModal.style.display = 'none';
        if (e.target === checkoutModal) checkoutModal.style.display = 'none';
        if (e.target === orderConfirmationModal) orderConfirmationModal.style.display = 'none';
        if (e.target === orderDetailModal) orderDetailModal.style.display = 'none';
    });

    // Close product detail modal with video handling
    window.addEventListener('click', (e) => {
        if (e.target === productDetailModal) {
            const videos = productDetailModal.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });

            const iframes = productDetailModal.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                const src = iframe.src;
                iframe.src = '';
                iframe.src = src;
                const playButton = iframe.closest('.custom-video-container')?.querySelector('.custom-play-button');
                if (playButton) playButton.style.display = 'flex';
            });
            productDetailModal.style.display = 'none';
        }
    });
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .zoom-container { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); background-color: white; }
    .zoomed-image { object-fit: cover; }
    .media-preview { max-width: 100px; max-height: 100px; border-radius: 5px; border: 1px solid #ddd; margin-top: 10px; }
    #mainImageContainer { position: relative; overflow: visible; }
    .sound-indicator { transition: all 0.3s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
    .sound-indicator:hover { transform: scale(1.1); background: rgba(0, 0, 0, 0.9) !important; }
    .notification.warning { background-color: var(--warning); color: var(--dark); }
    .notification.info { background-color: var(--info); }
    .video-thumbnail { position: relative; width: 80px; height: 80px; border-radius: 5px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: border-color 0.3s; }
    .video-thumbnail.active { border-color: var(--primary); }
    .video-thumbnail-overlay { width: 100%; height: 100%; position: relative; }
    .video-thumbnail-overlay img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8); }
    .video-thumbnail i { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; color: white; text-shadow: 0 0 5px rgba(0, 0, 0, 0.7); z-index: 2; }
    .main-video { width: 100%; height: 350px; object-fit: cover; border-radius: 10px; }
    .zoom-lens { width: 100px; height: 100px; border: 2px solid white; border-radius: 50%; cursor: none; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); pointer-events: none; }
    #githubTokenModal .modal-content { max-width: 600px; margin: 50px auto; }
    #githubTokenModal ol { padding-left: 20px; margin: 15px 0; }
    #githubTokenModal li { margin-bottom: 8px; }
`;
document.head.appendChild(style);

// Start the application
document.addEventListener('DOMContentLoaded', initializeApp);