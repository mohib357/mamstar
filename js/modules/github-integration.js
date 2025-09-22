// js/modules/github-integration.js - GitHub API Integration

const GITHUB_CONFIG = {
    username: 'mohib357',
    repo: 'mamstar',
    branch: 'main',
    filePath: 'data/products.json'
};

// Load products from JSON file
async function loadProducts() {
    try {
        // First try to load from GitHub
        const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.filePath}`);

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

// Validate GitHub token
async function validateGithubToken(token) {
    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}`, {
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

// Save products to GitHub
async function saveProducts() {
    try {
        // Create a version of products without large video data for localStorage
        const productsForLocalStorage = products.map(product => ({
            ...product,
            videos: product.videos.map(video => {
                // If video is a base64 string (large), replace with a placeholder
                if (video && video.startsWith('data:video')) {
                    return "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
                }
                return video;
            })
        }));

        // Try to save to localStorage
        try {
            localStorage.setItem('mamstarProducts', JSON.stringify(productsForLocalStorage));
        } catch (e) {
            console.warn('localStorage quota exceeded, skipping local backup');
            if (e.name === 'QuotaExceededError') {
                showNotification('লোকাল স্টোরেজে সংরক্ষণ করা যায়নি, শুধুমাত্র GitHub-এ সংরক্ষিত হবে', 'warning');
            }
        }

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
        const getFileResponse = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.filePath}`, {
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

        // Update the file - Fix for Unicode characters
        const jsonString = JSON.stringify(products, null, 2);
        const content = btoa(unescape(encodeURIComponent(jsonString)));

        const updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.filePath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update products data',
                content: content,
                sha: sha,
                branch: GITHUB_CONFIG.branch
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