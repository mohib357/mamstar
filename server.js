const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Products JSON file path
const productsFilePath = path.join(dataDir, 'products.json');

// Initialize products file if it doesn't exist
if (!fs.existsSync(productsFilePath)) {
    fs.writeFileSync(productsFilePath, JSON.stringify([]));
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

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});