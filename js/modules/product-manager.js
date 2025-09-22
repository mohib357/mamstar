// js/modules/product-manager.js - Product Management System

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
            "https://www.youtube.com/watch?v=jNQXAC9IVRw"
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
            if (isYouTubeUrl(item.src)) {
                const videoId = item.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)[1];
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                return `<div class="thumbnail video-thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMedia(${index})">
                            <i class="fab fa-youtube"></i>
                            <div class="video-thumbnail-overlay">
                                <img src="${thumbnailUrl}" alt="YouTube thumbnail">
                            </div>
                        </div>`;
            } else {
                return `<div class="thumbnail video-thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMedia(${index})">
                            <i class="fas fa-play-circle"></i>
                            <div class="video-thumbnail-overlay">
                                <img src="https://picsum.photos/seed/video${index}/80/80.jpg" alt="Video thumbnail">
                            </div>
                        </div>`;
            }
        }
    }).join('');

    // Get initial media
    const initialMedia = media[0] || { type: 'image', src: 'https://via.placeholder.com/500x500?text=No+Image' };
    productDetailContainer.innerHTML = `
        <div class="product-gallery">
            <div class="main-image-container" id="mainImageContainer">
                ${initialMedia.type === 'image' ?
            `<img src="${initialMedia.src}" alt="${product.name}" class="main-image" id="mainImage">` :
            (isYouTubeUrl(initialMedia.src) ?
                `<iframe src="${getYouTubeEmbedUrl(initialMedia.src)}" class="main-video" id="mainVideo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` :
                `<video src="${initialMedia.src}" class="main-video" id="mainVideo" controls autoplay></video>`)
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

    const media = [
        ...product.images.map(src => ({ type: 'image', src })),
        ...product.videos.map(src => ({ type: 'video', src }))
    ];

    const selectedMedia = media[index];
    const mainImageContainer = document.getElementById('mainImageContainer');
    mainImageContainer.innerHTML = '';

    const existingZoomLens = document.getElementById('zoomLens');
    if (existingZoomLens) existingZoomLens.remove();
    const existingZoomContainer = document.querySelector('.zoom-container');
    if (existingZoomContainer) existingZoomContainer.remove();

    if (selectedMedia.type === 'image') {
        const mainImage = document.createElement('img');
        mainImage.src = selectedMedia.src;
        mainImage.alt = product.name;
        mainImage.className = 'main-image';
        mainImage.id = 'mainImage';
        mainImageContainer.appendChild(mainImage);

        setTimeout(() => {
            setupImageZoom();
        }, 100);
    } else {
        if (isYouTubeUrl(selectedMedia.src)) {
            const customVideoContainer = document.createElement('div');
            customVideoContainer.className = 'custom-video-container';
            customVideoContainer.style.position = 'relative';
            customVideoContainer.style.width = '100%';
            customVideoContainer.style.height = '350px';
            customVideoContainer.style.borderRadius = '10px';
            customVideoContainer.style.overflow = 'hidden';

            const overlay = document.createElement('div');
            overlay.className = 'video-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.zIndex = '1';
            overlay.style.pointerEvents = 'none';

            const iframe = document.createElement('iframe');
            iframe.src = getYouTubeEmbedUrl(selectedMedia.src);
            iframe.className = 'main-video';
            iframe.id = 'mainVideo';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.zIndex = '0';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            customVideoContainer.appendChild(iframe);
            customVideoContainer.appendChild(overlay);
            mainImageContainer.appendChild(customVideoContainer);

            const playButton = document.createElement('div');
            playButton.className = 'custom-play-button';
            playButton.style.position = 'absolute';
            playButton.style.top = '50%';
            playButton.style.left = '50%';
            playButton.style.transform = 'translate(-50%, -50%)';
            playButton.style.width = '60px';
            playButton.style.height = '60px';
            playButton.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            playButton.style.borderRadius = '50%';
            playButton.style.display = 'flex';
            playButton.style.alignItems = 'center';
            playButton.style.justifyContent = 'center';
            playButton.style.cursor = 'pointer';
            playButton.style.zIndex = '2';
            playButton.style.transition = 'all 0.3s ease';

            const playIcon = document.createElement('i');
            playIcon.className = 'fas fa-play';
            playIcon.style.color = '#FF0000';
            playIcon.style.fontSize = '24px';
            playIcon.style.marginLeft = '4px';
            playButton.appendChild(playIcon);
            customVideoContainer.appendChild(playButton);

            playButton.addEventListener('click', () => {
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                playButton.style.display = 'none';
                iframe.contentWindow.postMessage('{"event":"command","func":"setLoop","args":[true]}', '*');
            });

            const soundIndicator = document.createElement('div');
            soundIndicator.className = 'sound-indicator';
            soundIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
            soundIndicator.style.position = 'absolute';
            soundIndicator.style.top = '10px';
            soundIndicator.style.right = '10px';
            soundIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            soundIndicator.style.color = 'white';
            soundIndicator.style.padding = '8px';
            soundIndicator.style.borderRadius = '50%';
            soundIndicator.style.cursor = 'pointer';
            soundIndicator.style.zIndex = '3';
            soundIndicator.style.fontSize = '16px';
            soundIndicator.style.transition = 'all 0.3s ease';

            soundIndicator.addEventListener('click', () => {
                const isMuted = soundIndicator.innerHTML.includes('fa-volume-mute');
                if (isMuted) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                    soundIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
                } else {
                    iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
                    soundIndicator.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            });
            customVideoContainer.appendChild(soundIndicator);

            const infoButtonOverlay = document.createElement('div');
            infoButtonOverlay.style.position = 'absolute';
            infoButtonOverlay.style.bottom = '0';
            infoButtonOverlay.style.right = '0';
            infoButtonOverlay.style.width = '50px';
            infoButtonOverlay.style.height = '50px';
            infoButtonOverlay.style.backgroundColor = 'transparent';
            infoButtonOverlay.style.zIndex = '4';
            infoButtonOverlay.style.pointerEvents = 'auto';
            customVideoContainer.appendChild(infoButtonOverlay);

            infoButtonOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            window.addEventListener('message', function (event) {
                if (event.data && event.data.event === 'infoDelivery') {
                    const info = event.data.info;
                    if (info && info.playerState === 0) {
                        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    }
                }
            });
        } else {
            const mainVideo = document.createElement('video');
            mainVideo.src = selectedMedia.src;
            mainVideo.className = 'main-video';
            mainVideo.id = 'mainVideo';
            mainVideo.controls = true;
            mainVideo.autoplay = false;
            mainVideo.loop = true;
            mainVideo.muted = false;
            mainVideo.volume = 1.0;
            mainImageContainer.appendChild(mainVideo);

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

            soundIndicator.addEventListener('click', function (e) {
                e.stopPropagation();
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

            mainVideo.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            });
        }
    }

    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Setup image zoom functionality
function setupImageZoom() {
    const mainImageContainer = document.getElementById('mainImageContainer');
    const mainImage = document.getElementById('mainImage');
    if (!mainImage) return;

    const existingZoomLens = document.getElementById('zoomLens');
    if (existingZoomLens) existingZoomLens.remove();
    const existingZoomContainer = document.querySelector('.zoom-container');
    if (existingZoomContainer) existingZoomContainer.remove();

    const zoomLens = document.createElement('div');
    zoomLens.id = 'zoomLens';
    zoomLens.className = 'zoom-lens';
    mainImageContainer.appendChild(zoomLens);

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

        zoomLens.style.left = (x - 50) + 'px';
        zoomLens.style.top = (y - 50) + 'px';
        zoomLens.style.display = 'block';
        zoomContainer.style.display = 'block';

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

// Render product list for admin
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

    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOldPrice').value = product.oldPrice || '';
    document.getElementById('productDiscount').value = product.discount || '';
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description;

    document.getElementById('submitProductBtn').textContent = 'আপডেট পণ্য';

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
        await saveProducts();
        showNotification('পণ্যটি ডিলিট করা হয়েছে!');
    }
}