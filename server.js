// C:\Project\mamstar\server.js
// MAM STAR E-commerce Backend Server - Enhanced Version
// Safe improvements only - no breaking changes

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// ===== ENHANCED MIDDLEWARE =====
// Request logging middleware (Safe improvement)
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString('bn-BD');
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname)));

// ===== DATA DIRECTORY SETUP =====
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('📁 Data directory created:', dataDir);
}

// Products JSON file path
const productsFilePath = path.join(dataDir, 'products.json');

// ===== ENHANCED INITIALIZATION =====
if (!fs.existsSync(productsFilePath)) {
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

    fs.writeFileSync(productsFilePath, JSON.stringify(initialProducts, null, 2));
    console.log('📦 Initial products file created with', initialProducts.length, 'sample products');
}

// ===== ENHANCED API ROUTES =====

// GET /api/products - Retrieve all products with improved error handling
app.get('/api/products', (req, res) => {
    try {
        console.log('🔍 Fetching products...');

        if (!fs.existsSync(productsFilePath)) {
            return res.status(404).json({
                error: 'Products file not found',
                solution: 'Server will create it automatically on next request'
            });
        }

        const productsData = fs.readFileSync(productsFilePath, 'utf8');
        const products = JSON.parse(productsData);

        console.log('✅ Sent', products.length, 'products to client');
        res.json(products);

    } catch (error) {
        console.error('❌ Error reading products file:', error.message);
        res.status(500).json({
            error: 'Failed to read products data',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// POST /api/products - Save products with validation
app.post('/api/products', (req, res) => {
    try {
        console.log('💾 Saving products...');

        // Basic validation (Safe improvement)
        if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).json({
                error: 'Invalid data format',
                message: 'Expected an array of products'
            });
        }

        // Additional validation: check if products have required fields
        const invalidProducts = req.body.filter(product =>
            !product.name || !product.category || !product.price
        );

        if (invalidProducts.length > 0) {
            console.warn('⚠️', invalidProducts.length, 'products missing required fields');
        }

        fs.writeFileSync(productsFilePath, JSON.stringify(req.body, null, 2));
        console.log('✅ Saved', req.body.length, 'products successfully');

        res.json({
            success: true,
            message: 'Products saved successfully',
            count: req.body.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error saving products:', error.message);
        res.status(500).json({
            error: 'Failed to save products data',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// ===== NEW SAFE ENDPOINTS =====

// Health check endpoint (New safe addition)
app.get('/api/health', (req, res) => {
    const healthStatus = {
        status: 'healthy',
        server: 'MAM STAR API',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
        },
        environment: process.env.NODE_ENV || 'development'
    };

    console.log('❤️ Health check requested');
    res.json(healthStatus);
});

// Server info endpoint (New safe addition)
app.get('/api/info', (req, res) => {
    res.json({
        name: 'MAM STAR E-commerce API',
        version: '1.0.0',
        description: 'Product management system for MAM STAR',
        endpoints: [
            'GET /api/products - Get all products',
            'POST /api/products - Save products',
            'GET /api/health - Server health check',
            'GET /api/info - This information'
        ]
    });
});

// ===== ENHANCED ERROR HANDLING =====

// 404 handler for undefined routes (Safe improvement)
app.use('*', (req, res) => {
    console.log('❓ Unknown endpoint accessed:', req.originalUrl);
    res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET /api/products',
            'POST /api/products',
            'GET /api/health',
            'GET /api/info'
        ],
        currentUrl: req.originalUrl
    });
});

// Global error handler (Enhanced but safe)
app.use((err, req, res, next) => {
    console.error('🔥 Server Error:', {
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method
    });

    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong on our end',
        ...(process.env.NODE_ENV === 'development' && {
            details: err.message,
            stack: err.stack
        })
    });
});

// ===== GRACEFUL SHUTDOWN HANDLER =====
// Safe addition for better process management
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    console.log('👋 Thank you for using MAM STAR Server!');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Server received termination signal');
    process.exit(0);
});

// ===== ENHANCED SERVER STARTUP =====
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🚀 MAM STAR Server - Enhanced Version');
    console.log('='.repeat(50));
    console.log('📍 Port:', PORT);
    console.log('🌐 URL: http://localhost:' + PORT);
    console.log('📊 Environment:', process.env.NODE_ENV || 'development');
    console.log('🕒 Started at:', new Date().toLocaleString('bn-BD'));
    console.log('='.repeat(50));
    console.log('✅ Safe improvements applied:');
    console.log('   • Enhanced logging');
    console.log('   • Request validation');
    console.log('   • Health check endpoint');
    console.log('   • Better error handling');
    console.log('   • Graceful shutdown');
    console.log('   • No breaking changes');
    console.log('='.repeat(50));
    console.log('📋 Available endpoints:');
    console.log('   GET  /api/products - Get products');
    console.log('   POST /api/products - Save products');
    console.log('   GET  /api/health   - Health check');
    console.log('   GET  /api/info     - Server info');
    console.log('='.repeat(50) + '\n');
});

// Export app for potential testing (Safe addition)
module.exports = app;