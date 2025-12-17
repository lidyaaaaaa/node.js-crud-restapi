import db from "../config/db.js";

export const getProducts = (req, res) => {
    const query = `
        SELECT p.*, c.name as category_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};

export const getProductById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT p.*, c.name as category_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(results[0]);
    });
};

export const createProduct = (req, res) => {
    const { category_id, name, price } = req.body;

    if (!category_id || !name || !price) {
        return res.status(400).json({ message: "Category ID, Name, and Price are required" });
    }

    const query = "INSERT INTO products (category_id, name, price) VALUES (?, ?, ?)";

    db.query(query, [category_id, name, price], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: "Invalid category_id: Category does not exist" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({
            id: results.insertId,
            category_id,
            name,
            price,
            message: "Produk berhasil dibuat"
        });
    });
};

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { category_id, name, price } = req.body;

    if (!category_id || !name || !price) {
        return res.status(400).json({ message: "ID Kategori, Nama, dan Harga wajib diisi" });
    }

    const query = "UPDATE products SET category_id = ?, name = ?, price = ? WHERE id = ?";

    db.query(query, [category_id, name, price, id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: "Invalid category_id: Category does not exist" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
        res.json({
            id,
            category_id,
            name,
            price,
            message: "Produk berhasil diupdate"
        });
    });
};

export const deleteProduct = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM products WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Produk berhasil dihapus" });
    });
};
