// js/modules/admin-panel.js - Admin Panel Management

// Orders data
let orders = [];

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

    // Check if GitHub token exists and is valid
    const githubToken = localStorage.getItem('githubToken');
    if (githubToken) {
        validateGithubToken(githubToken).then(isValid => {
            if (!isValid) {
                showNotification('GitHub টোকেন অবৈধ বা মেয়াদ উত্তীর্ণ হয়েছে', 'warning');
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

// Admin logout
function adminLogout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    adminPanel.classList.remove('active');
    showNotification('লগআউট সফল!');
}

// Check if admin is logged in
function checkAdminLogin() {
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        adminPanel.classList.add('active');
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