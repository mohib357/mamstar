// C:\Project\mamstar\main.js

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

// GitHub API configuration
const GITHUB_USERNAME = 'mohib357';
const GITHUB_REPO = 'mamstar';
const GITHUB_BRANCH = 'main';
const PRODUCTS_FILE_PATH = 'data/products.json';

// Load products from JSON file
async function loadProducts() {
    try {
        // First try to load from GitHub
        const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${PRODUCTS_FILE_PATH}`);

        if (response.ok) {
            products = await response.json();
            // Also save to localStorage as a backup
            localStorage.setItem('mamstarProducts', JSON.stringify(products));
        } else {
            // If GitHub fails, try to load from localStorage
            const savedProducts = localStorage.getItem('mamstarProducts');
            if (savedProducts) {
                products = JSON.parse(savedProducts);
            }
        }
    } catch (error) {
        console.error('Error loading products:', error);
        // If fetch fails, try to load from localStorage
        const savedProducts = localStorage.getItem('mamstarProducts');
        if (savedProducts) {
            products = JSON.parse(savedProducts);
        }
    }
}

// Save products to JSON file via GitHub API
async function saveProducts() {
    try {
        // First save to localStorage as a backup
        localStorage.setItem('mamstarProducts', JSON.stringify(products));

        // Try to save to GitHub
        const githubToken = localStorage.getItem('githubToken');

        if (!githubToken) {
            showNotification('GitHub টোকেন পাওয়া যায়নি, শুধুমাত্র লোকাল স্টোরেজে সংরক্ষিত হয়েছে', 'warning');
            showGithubTokenModal();
            return;
        }

        // Validate token before proceeding
        const isTokenValid = await validateGithubToken(githubToken);
        if (!isTokenValid) {
            showNotification('GitHub টোকেন অবৈধ বা মেয়াদ উত্তীর্ণ হয়েছে', 'error');
            localStorage.removeItem('githubToken');
            showGithubTokenModal();
            return;
        }

        // Get the current file SHA
        const getFileResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PRODUCTS_FILE_PATH}`, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });

        let sha = '';
        if (getFileResponse.ok) {
            const fileData = await getFileResponse.json();
            sha = fileData.sha;
        } else if (getFileResponse.status === 404) {
            // File doesn't exist yet, which is fine for the first time
            console.log('File does not exist yet, will create a new one');
        } else if (getFileResponse.status === 401 || getFileResponse.status === 403) {
            // Token is invalid or doesn't have permissions
            showNotification('GitHub টোকেন অবৈধ বা মেয়াদ উত্তীর্ণ হয়েছে', 'error');
            localStorage.removeItem('githubToken');
            showGithubTokenModal();
            return;
        } else {
            // Other error
            const errorData = await getFileResponse.json();
            console.error('Error getting file:', errorData);
            throw new Error(`Failed to get file: ${errorData.message}`);
        }

        // Update the file
        const content = btoa(JSON.stringify(products, null, 2));
        const updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PRODUCTS_FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update products data',
                content: content,
                sha: sha,
                branch: GITHUB_BRANCH
            })
        });

        if (updateResponse.ok) {
            showNotification('পণ্য সফলভাবে সংরক্ষিত হয়েছে!');
        } else {
            const errorData = await updateResponse.json();
            console.error('Error updating file:', errorData);

            // Check for specific errors
            if (updateResponse.status === 401 || updateResponse.status === 403) {
                showNotification('GitHub টোকেন অবৈধ বা মেয়াদ উত্তীর্ণ হয়েছে', 'error');
                localStorage.removeItem('githubToken');
                showGithubTokenModal();
            } else if (updateResponse.status === 404) {
                showNotification('GitHub রিপোজিটরি বা ফাইল পাওয়া যায়নি', 'error');
            } else {
                showNotification(`GitHub এ সংরক্ষণ করা যায়নি: ${errorData.message || 'Unknown error'}`, 'error');
            }

            throw new Error(`Failed to update file on GitHub: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error saving products:', error);
        showNotification(`GitHub এ সংরক্ষণ করা যায়নি: ${error.message}`, 'error');
    }
}

// Show GitHub token modal
function showGithubTokenModal() {
    // Check if token modal already exists
    let tokenModal = document.getElementById('githubTokenModal');

    if (!tokenModal) {
        // Create token modal if it doesn't exist
        tokenModal = document.createElement('div');
        tokenModal.id = 'githubTokenModal';
        tokenModal.className = 'modal';
        tokenModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>GitHub টোকেন সেটআপ</h2>
                    <span class="close" id="closeGithubTokenModal">&times;</span>
                </div>
                <div class="modal-body">
                    <p>পণ্য সংরক্ষণ করার জন্য আপনার GitHub টোকেন প্রয়োজন।</p>
                    <p>টোকেন তৈরি করতে:</p>
                    <ol>
                        <li>আপনার GitHub অ্যাকাউন্টে লগ ইন করুন</li>
                        <li>Settings > Developer settings > Personal access tokens > Tokens (classic) এ যান</li>
                        <li>Generate new token (classic) ক্লিক করুন</li>
                        <li>Token এর নাম দিন (যেমন: Mamstar Products)</li>
                        <li>Expiration নির্বাচন করুন (যেমন: 90 days)</li>
                        <li><strong>repo</strong> স্কোপ সিলেক্ট করুন (এটি অত্যন্ত গুরুত্বপূর্ণ)</li>
                        <li>Generate token ক্লিক করুন</li>
                        <li>টোকেন কপি করে নিচের বক্সে পেস্ট করুন</li>
                    </ol>
                    <div class="form-group">
                        <label for="githubTokenInput">GitHub টোকেন:</label>
                        <input type="password" id="githubTokenInput" class="form-control" placeholder="আপনার GitHub টোকেন লিখুন">
                    </div>
                    <div class="form-group">
                        <button id="saveGithubToken" class="btn-primary">টোকেন সংরক্ষণ করুন</button>
                        <button id="testGithubToken" class="btn-secondary">টোকেন পরীক্ষা করুন</button>
                    </div>
                    <div id="tokenTestResult" class="token-test-result"></div>
                    <div class="alert alert-warning mt-3">
                        <strong>গুরুত্বপূর্ণ:</strong> টোকেন তৈরি করার সময় অবশ্যই <strong>repo</strong> স্কোপ সিলেক্ট করতে হবে।
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(tokenModal);

        // Add event listeners
        document.getElementById('closeGithubTokenModal').addEventListener('click', () => {
            tokenModal.style.display = 'none';
        });

        document.getElementById('saveGithubToken').addEventListener('click', async () => {
            const token = document.getElementById('githubTokenInput').value;
            if (token) {
                // Validate token before saving
                const isValid = await validateGithubToken(token);
                if (isValid) {
                    localStorage.setItem('githubToken', token);
                    showNotification('GitHub টোকেন সফলভাবে সংরক্ষিত হয়েছে!');
                    tokenModal.style.display = 'none';
                } else {
                    showNotification('টোকেনটি বৈধ নয়, অনুগ্রহ করে আবার চেষ্টা করুন', 'error');
                }
            } else {
                showNotification('টোকেন প্রদান করুন!', 'error');
            }
        });

        document.getElementById('testGithubToken').addEventListener('click', async () => {
            const token = document.getElementById('githubTokenInput').value;
            const testResult = document.getElementById('tokenTestResult');

            if (!token) {
                testResult.innerHTML = '<div class="error">টোকেন প্রদান করুন!</div>';
                return;
            }

            testResult.innerHTML = '<div class="testing">টোকেন পরীক্ষা করা হচ্ছে...</div>';

            const isValid = await validateGithubToken(token);

            if (isValid) {
                testResult.innerHTML = '<div class="success">টোকেন সঠিক এবং কার্যকরী!</div>';
            } else {
                testResult.innerHTML = '<div class="error">টোকেন অবৈধ বা মেয়াদ উত্তীর্ণ হয়েছে!</div>';
            }
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === tokenModal) {
                tokenModal.style.display = 'none';
            }
        });
    }

    // Show token modal
    tokenModal.style.display = 'block';

    // Pre-fill token if it exists
    const existingToken = localStorage.getItem('githubToken');
    if (existingToken) {
        document.getElementById('githubTokenInput').value = existingToken;
    }
}

// Add CSS for token test results
const tokenTestStyle = document.createElement('style');
tokenTestStyle.textContent = `
    .token-test-result {
        margin-top: 15px;
        padding: 10px;
        border-radius: 5px;
    }
    
    .token-test-result .testing {
        color: #2196F3;
    }
    
    .token-test-result .success {
        color: #4CAF50;
        font-weight: bold;
    }
    
    .token-test-result .error {
        color: #F44336;
        font-weight: bold;
    }
    
    .btn-primary {
        background-color: var(--primary);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
    }
    
    .btn-secondary {
        background-color: #6c757d;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .btn-primary:hover, .btn-secondary:hover {
        opacity: 0.9;
    }
`;
document.head.appendChild(tokenTestStyle);

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

    // Create media array combining images and videos
    const media = [
        ...product.images.map(src => ({ type: 'image', src })),
        ...product.videos.map(src => ({ type: 'video', src }))
    ];

    // Generate thumbnails HTML
    const thumbnailsHTML = media.map((item, index) => {
        if (item.type === 'image') {
            return `<img src="${item.src}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMedia(${index})">`;
        } else {
            return `<div class="thumbnail video-thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMedia(${index})">
                        <i class="fas fa-play-circle"></i>
                        <div class="video-thumbnail-overlay">
                            <img src="https://picsum.photos/seed/video${index}/80/80.jpg" alt="Video thumbnail">
                        </div>
                    </div>`;
        }
    }).join('');

    // Get initial media
    const initialMedia = media[0] || { type: 'image', src: 'https://via.placeholder.com/500x500?text=No+Image' };

    productDetailContainer.innerHTML = `
        <div class="product-gallery">
            <div class="main-image-container" id="mainImageContainer">
                ${initialMedia.type === 'image' ?
            `<img src="${initialMedia.src}" alt="${product.name}" class="main-image" id="mainImage">` :
            `<video src="${initialMedia.src}" class="main-video" id="mainVideo" controls autoplay></video>`
        }
                <div class="zoom-lens" id="zoomLens"></div>
            </div>
            <div class="thumbnail-container">
                ${thumbnailsHTML}
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

    // Setup zoom functionality only for images
    setTimeout(() => {
        if (initialMedia.type === 'image') {
            setupImageZoom();
        }
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

// Change media (image or video)
function changeMedia(index) {
    const productId = parseInt(document.querySelector('.product-detail-modal').dataset.productId);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Create media array combining images and videos
    const media = [
        ...product.images.map(src => ({ type: 'image', src })),
        ...product.videos.map(src => ({ type: 'video', src }))
    ];

    const selectedMedia = media[index];
    const mainImageContainer = document.getElementById('mainImageContainer');

    // Clear existing content
    mainImageContainer.innerHTML = '';

    // Remove existing zoom elements if any
    const existingZoomLens = document.getElementById('zoomLens');
    if (existingZoomLens) existingZoomLens.remove();

    const existingZoomContainer = document.querySelector('.zoom-container');
    if (existingZoomContainer) existingZoomContainer.remove();

    if (selectedMedia.type === 'image') {
        // Show image
        const mainImage = document.createElement('img');
        mainImage.src = selectedMedia.src;
        mainImage.alt = product.name;
        mainImage.className = 'main-image';
        mainImage.id = 'mainImage';
        mainImageContainer.appendChild(mainImage);

        // Setup zoom for image
        setTimeout(() => {
            setupImageZoom();
        }, 100);
    } else {
        // Show video
        const mainVideo = document.createElement('video');
        mainVideo.src = selectedMedia.src;
        mainVideo.className = 'main-video';
        mainVideo.id = 'mainVideo';
        mainVideo.controls = true;
        mainVideo.autoplay = true;
        mainVideo.loop = true;
        mainVideo.muted = false; // Sound is on by default
        mainVideo.volume = 1.0; // Set volume to maximum
        mainImageContainer.appendChild(mainVideo);

        // Add a visual indicator for sound
        const soundIndicator = document.createElement('div');
        soundIndicator.className = 'sound-indicator';
        soundIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
        soundIndicator.style.position = 'absolute';
        soundIndicator.style.top = '10px';
        soundIndicator.style.right = '10px';
        soundIndicator.style.background = 'rgba(0, 0, 0, 0.7)';
        soundIndicator.style.color = 'white';
        soundIndicator.style.padding = '8px';
        soundIndicator.style.borderRadius = '50%';
        soundIndicator.style.cursor = 'pointer';
        soundIndicator.style.zIndex = '10';
        soundIndicator.style.fontSize = '16px';

        // Toggle sound on click
        soundIndicator.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent video click event
            if (mainVideo.muted) {
                mainVideo.muted = false;
                mainVideo.volume = 1.0;
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
                showNotification('সাউন্ড চালু করা হয়েছে', 'info');
            } else {
                mainVideo.muted = true;
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                showNotification('সাউন্ড বন্ধ করা হয়েছে', 'info');
            }
        });

        mainImageContainer.appendChild(soundIndicator);

        // Handle autoplay restrictions
        const playPromise = mainVideo.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started
            }).catch(error => {
                // Autoplay was prevented
                mainVideo.muted = true;
                soundIndicator.innerHTML = '<i class="fas fa-volume-mute"></i>';
                showNotification('ব্রাউজার সাউন্ড বন্ধ করে দিয়েছে, ভিডিওতে ক্লিক করুন', 'warning');

                // Add click event to unmute
                mainVideo.addEventListener('click', function () {
                    if (this.muted) {
                        this.muted = false;
                        this.volume = 1.0;
                        soundIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
                        showNotification('সাউন্ড চালু করা হয়েছে', 'info');
                    }
                });
            });
        }
    }

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Setup image zoom functionality
function setupImageZoom() {
    const mainImageContainer = document.getElementById('mainImageContainer');
    const mainImage = document.getElementById('mainImage');

    // If no image exists, don't setup zoom
    if (!mainImage) return;

    // Remove existing zoom elements if any
    const existingZoomLens = document.getElementById('zoomLens');
    if (existingZoomLens) existingZoomLens.remove();

    const existingZoomContainer = document.querySelector('.zoom-container');
    if (existingZoomContainer) existingZoomContainer.remove();

    // Create zoom lens
    const zoomLens = document.createElement('div');
    zoomLens.id = 'zoomLens';
    zoomLens.className = 'zoom-lens';
    mainImageContainer.appendChild(zoomLens);

    // Create zoom container
    const zoomContainer = document.createElement('div');
    zoomContainer.className = 'zoom-container';
    zoomContainer.style.position = 'absolute';
    zoomContainer.style.right = '-320px';
    zoomContainer.style.top = '0';
    zoomContainer.style.width = '300px';
    zoomContainer.style.height = '300px';
    zoomContainer.style.border = '1px solid #ddd';
    zoomContainer.style.borderRadius = '5px';
    zoomContainer.style.overflow = 'hidden';
    zoomContainer.style.display = 'none';
    zoomContainer.style.zIndex = '100';
    mainImageContainer.appendChild(zoomContainer);

    const zoomedImage = document.createElement('img');
    zoomedImage.className = 'zoomed-image';
    zoomedImage.style.position = 'absolute';
    zoomedImage.style.width = '600px';
    zoomedImage.style.height = '600px';
    zoomContainer.appendChild(zoomedImage);

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

// Event listener for closing product detail modal
closeProductModal.addEventListener('click', () => {
    // Pause any playing videos
    const videos = productDetailModal.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
    });
    productDetailModal.style.display = 'none';
});

// Also pause videos when clicking outside the modal
window.addEventListener('click', (e) => {
    if (e.target === productDetailModal) {
        // Pause any playing videos
        const videos = productDetailModal.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
        productDetailModal.style.display = 'none';
    }
});

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
    saveProducts(); // Save to JSON file

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
async function deleteProduct(productId) {
    if (confirm('আপনি কি এই পণ্যটি ডিলিট করতে চান?')) {
        products = products.filter(p => p.id !== productId);
        renderProducts();
        renderProductList();
        await saveProducts(); // Save to JSON file
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

    // Check if GitHub token exists and is valid
    const githubToken = localStorage.getItem('githubToken');
    if (githubToken) {
        validateGithubToken(githubToken).then(isValid => {
            if (!isValid) {
                showNotification('GitHub টোকেন অবৈধ বা মেয়াদ উত্তীর্ণ হয়েছে', 'warning');
                // Remove invalid token
                localStorage.removeItem('githubToken');
            }
        });
    } else {
        setTimeout(() => {
            showNotification('GitHub টোকেন সেটআপ করুন পণ্য সংরক্ষণের জন্য', 'info');
            showGithubTokenModal();
        }, 1000);
    }
}

// Validate GitHub token
async function validateGithubToken(token) {
    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
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
        // Check if preview already exists
        let preview = button.closest('.media-item').querySelector('.media-preview');

        // If preview doesn't exist, create it
        if (!preview) {
            preview = document.createElement('img');
            preview.className = 'media-preview';
            const removeBtn = button.closest('.media-item').querySelector('.remove-media');
            button.closest('.media-item').insertBefore(preview, removeBtn);
        }

        // Set preview source and show it
        preview.src = input.value;
        preview.style.display = 'block';

        // Add a data attribute to mark this as URL
        preview.dataset.type = 'url';
        preview.dataset.value = input.value;

        // Clear the input
        input.value = '';

        showNotification('ছবির ইউআরএল যোগ করা হয়েছে!');
    }
}

// Add video URL
function addVideoUrl(button) {
    const input = button.previousElementSibling;
    if (input.value) {
        // Check if preview already exists
        let preview = button.closest('.media-item').querySelector('.media-preview');

        // If preview doesn't exist, create it
        if (!preview) {
            preview = document.createElement('video');
            preview.className = 'media-preview';
            preview.controls = true;
            const removeBtn = button.closest('.media-item').querySelector('.remove-media');
            button.closest('.media-item').insertBefore(preview, removeBtn);
        }

        // Set preview source and show it
        preview.src = input.value;
        preview.style.display = 'block';
        preview.style.width = '100%';
        preview.style.maxHeight = '200px';

        // Add a data attribute to mark this as URL
        preview.dataset.type = 'url';
        preview.dataset.value = input.value;

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
    if (type === 'info') icon = 'fa-info-circle';

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

    // Check if GitHub token exists
    const githubToken = localStorage.getItem('githubToken');
    if (!githubToken) {
        showNotification('GitHub টোকেন সেটআপ করুন পণ্য সংরক্ষণের জন্য', 'warning');
        showGithubTokenModal();
        return;
    }

    // Validate token before proceeding
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
    await saveProducts(); // Save to JSON file
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
    
    .product-videos {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }
    
    .product-videos h3 {
        margin-bottom: 15px;
        color: var(--secondary);
    }
    
    .video-container {
        margin-top: 10px;
    }
    
    /* Sound indicator style */
    .sound-indicator {
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .sound-indicator:hover {
        transform: scale(1.1);
        background: rgba(0, 0, 0, 0.9) !important;
    }
    
    /* Warning notification style */
    .notification.warning {
        background-color: var(--warning);
        color: var(--dark);
    }
    
    /* Info notification style */
    .notification.info {
        background-color: var(--info);
    }
    
    /* Video thumbnail styles */
    .video-thumbnail {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border-color 0.3s;
    }

    .video-thumbnail.active {
        border-color: var(--primary);
    }

    .video-thumbnail-overlay {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .video-thumbnail-overlay img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.8);
    }

    .video-thumbnail i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: white;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
        z-index: 2;
    }
    
    /* Main video styles */
    .main-video {
        width: 100%;
        height: 350px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    /* Zoom lens styling */
    .zoom-lens {
        width: 100px;
        height: 100px;
        border: 2px solid white;
        border-radius: 50%;
        cursor: none;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        pointer-events: none;
    }
    
    /* GitHub token modal styling */
    #githubTokenModal .modal-content {
        max-width: 600px;
        margin: 50px auto;
    }
    
    #githubTokenModal ol {
        padding-left: 20px;
        margin: 15px 0;
    }
    
    #githubTokenModal li {
        margin-bottom: 8px;
    }
`;
document.head.appendChild(style);

// Initialize
checkAdminLogin();
loadProducts().then(() => {
    renderProducts();
});

// Add event listeners for media type tabs in existing items
document.querySelectorAll('.media-item').forEach(item => {
    const mediaTypeTabs = item.querySelectorAll('.media-type-tab');
    const mediaTypeContents = item.querySelectorAll('.media-type-content');

    mediaTypeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            mediaTypeTabs.forEach(t => t.classList.remove('active'));
            mediaTypeContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const type = tab.getAttribute('data-type');
            item.querySelector(`.media-type-content[data-type="${type}"]`).classList.add('active');
        });
    });
});