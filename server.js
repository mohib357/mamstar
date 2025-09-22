// C:\Project\mamstar\server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware with increased payload size limit
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase payload size limit to 50mb
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname)));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Products JSON file path
const productsFilePath = path.join(dataDir, 'products.json');

// Initialize products file if it doesn't exist
if (!fs.existsSync(productsFilePath)) {
    // Initial sample products
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
}

// API to get all products
app.get('/api/products', (req, res) => {
    try {
        const productsData = fs.readFileSync(productsFilePath, 'utf8');
        res.json(JSON.parse(productsData));
    } catch (error) {
        console.error('Error reading products file:', error);
        res.status(500).json({ error: 'Failed to read products data' });
    }
});

// API to save products
app.post('/api/products', (req, res) => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(req.body, null, 2));
        res.json({ success: true, message: 'Products saved successfully' });
    } catch (error) {
        console.error('Error writing products file:', error);
        res.status(500).json({ error: 'Failed to save products data' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});