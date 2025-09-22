// js/modules/modal-controller.js - Modal Window Management

// Process image upload
function processImageUpload(input) {
    return new Promise((resolve) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            resolve('');
        }
    });
}

// Process video upload
function processVideoUpload(input) {
    return new Promise((resolve) => {
        if (input.files && input.files[0]) {
            resolve("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
        } else {
            resolve('');
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
        let preview = button.closest('.media-item').querySelector('.media-preview');
        if (!preview) {
            preview = document.createElement('img');
            preview.className = 'media-preview';
            const removeBtn = button.closest('.media-item').querySelector('.remove-media');
            button.closest('.media-item').insertBefore(preview, removeBtn);
        }
        preview.src = input.value;
        preview.style.display = 'block';
        preview.dataset.type = 'url';
        preview.dataset.value = input.value;
        input.value = '';
        showNotification('ছবির ইউআরএল যোগ করা হয়েছে!');
    }
}

// Add video URL
function addVideoUrl(button) {
    const input = button.previousElementSibling;
    if (input.value) {
        let preview = button.closest('.media-item').querySelector('.media-preview');
        if (!preview) {
            preview = document.createElement('video');
            preview.className = 'media-preview';
            preview.controls = true;
            const removeBtn = button.closest('.media-item').querySelector('.remove-media');
            button.closest('.media-item').insertBefore(preview, removeBtn);
        }
        preview.src = input.value;
        preview.style.display = 'block';
        preview.style.width = '100%';
        preview.style.maxHeight = '200px';
        preview.dataset.type = 'url';
        preview.dataset.value = input.value;
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
    setupMediaItemEvents(imageItem);
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
    setupMediaItemEvents(videoItem);
}

// Setup media item events
function setupMediaItemEvents(item) {
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

    item.querySelector('.remove-media').addEventListener('click', () => {
        item.remove();
    });
}

// Setup existing media items
document.querySelectorAll('.media-item').forEach(item => {
    setupMediaItemEvents(item);
});