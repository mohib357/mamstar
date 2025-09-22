// C:\Project\mamstar\server.js
// MAM STAR E-commerce Backend Server
// Express.js server for product management and API endpoints

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE CONFIGURATION =====
// Configure CORS and request body parsing with increased limits for media uploads
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased payload size limit for image/video uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname)));

// ===== DATA DIRECTORY SETUP =====
// Ensure data directory exists for storing product information
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// ===== PRODUCTS DATA FILE CONFIGURATION =====
// Define path for products JSON file
const productsFilePath = path.join(dataDir, 'products.json');

// ===== INITIAL DATA SETUP =====
// Initialize products file with sample data if it doesn't exist
if (!fs.existsSync(productsFilePath)) {
    // Sample product data for demonstration
    const initialProducts = [
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

    // Write initial products to JSON file
    fs.writeFileSync(productsFilePath, JSON.stringify(initialProducts, null, 2));
    console.log('Products file initialized with sample data');
}

// ===== API ROUTES =====

// GET /api/products - Retrieve all products
app.get('/api/products', (req, res) => {
    try {
        console.log('Fetching all products...');
        const productsData = fs.readFileSync(productsFilePath, 'utf8');
        const products = JSON.parse(productsData);
        console.log(`Successfully retrieved ${products.length} products`);
        res.json(products);
    } catch (error) {
        console.error('Error reading products file:', error);
        res.status(500).json({
            error: 'Failed to read products data',
            details: error.message
        });
    }
});

// POST /api/products - Save/update all products
app.post('/api/products', (req, res) => {
    try {
        console.log('Saving products data...');
        const products = req.body;

        // Validate request body
        if (!Array.isArray(products)) {
            return res.status(400).json({
                error: 'Invalid data format. Expected an array of products.'
            });
        }

        // Write products to file with proper formatting
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        console.log(`Successfully saved ${products.length} products`);

        res.json({
            success: true,
            message: 'Products saved successfully',
            count: products.length
        });
    } catch (error) {
        console.error('Error writing products file:', error);
        res.status(500).json({
            error: 'Failed to save products data',
            details: error.message
        });
    }
});

// GET /api/products/:id - Get single product by ID
app.get('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        console.log(`Fetching product with ID: ${productId}`);

        const productsData = fs.readFileSync(productsFilePath, 'utf8');
        const products = JSON.parse(productsData);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        console.log('Product found:', product.name);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            error: 'Failed to fetch product data',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'Server is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// ===== ERROR HANDLING MIDDLEWARE =====
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 Handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'API endpoint not found',
        availableEndpoints: [
            'GET /api/products',
            'GET /api/products/:id',
            'POST /api/products',
            'GET /api/health'
        ]
    });
});

// ===== SERVER INITIALIZATION =====
app.listen(PORT, () => {
    console.log('===================================');
    console.log('🚀 MAM STAR E-commerce Server');
    console.log('===================================');
    console.log(`📍 Server running on port ${PORT}`);
    console.log(`🌐 Access the application at: http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
    console.log('===================================');

    // Display server environment information
    console.log('Environment Information:');
    console.log(`- Node.js Version: ${process.version}`);
    console.log(`- Platform: ${process.platform}`);
    console.log(`- Data Directory: ${dataDir}`);
    console.log(`- Products File: ${productsFilePath}`);
    console.log('===================================');
});

// ===== GRACEFUL SHUTDOWN HANDLER =====
process.on('SIGINT', () => {
    console.log('\n===================================');
    console.log('🛑 Server is shutting down...');
    console.log('===================================');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n===================================');
    console.log('🛑 Server received termination signal');
    console.log('===================================');
    process.exit(0);
});

// Export app for testing purposes
module.exports = app;