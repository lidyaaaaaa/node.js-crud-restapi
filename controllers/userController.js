import db from "../config/db.js";

export const getUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};

export const saveUser = (req, res) => {
    const { nama, email, password } = req.body;
    console.log("Request Body:", req.body);


    db.query(
        "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)",
        [nama, email, password],
        (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            res.json({
                id: results.insertId,
                nama,
                email,
                password
            });
        });
};

export const getUserById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(results[0]);
    });
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { nama, email, password } = req.body;

    db.query(
        "UPDATE users SET nama = ?, email = ?, password = ? WHERE id = ?",
        [nama, email, password, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            res.json({message: "User updated successfully"});
        }
    );
};

export const deleteUser = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        res.json({message: "User deleted successfully"});
    });
};