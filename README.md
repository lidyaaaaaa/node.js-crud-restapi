# Aplikasi Kasir (REST API)

Project backend sederhana untuk aplikasi kasir yang dibangun menggunakan **Node.js**, **Express.js**, dan **MySQL**. API ini menyediakan fitur CRUD untuk pengguna (users), kategori (categories), dan produk (products).

## Prasyarat

Sebelum menjalankan project ini, pastikan Anda telah menginstal:
*   [Node.js](https://nodejs.org/)
*   [MySQL Database](https://www.mysql.com/)

## Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer lokal Anda.

### 1. Instalasi Dependencies

Buka terminal di folder project, lalu jalankan perintah berikut untuk menginstall semua library yang dibutuhkan:

```bash
npm install
```

### 2. Konfigurasi Database

1.  Buat file baru bernama `.env` di folder root project.
2.  Salin konfigurasi berikut ke dalam file `.env` dan sesuaikan dengan setting MySQL Anda:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_db_anda
DB_NAME=nama_database_anda
```

> **Catatan:** Ganti `password_db_anda` dengan password MySQL Anda (kosongkan jika tidak ada), dan `nama_database_anda` dengan nama database yang ingin digunakan.

### 3. Setup Database (SQL)

Buat database di MySQL, lalu jalankan query SQL berikut untuk membuat tabel yang dibutuhkan:

```sql
-- Buat Database (opsional nama bebas)
CREATE DATABASE aplikasi_kasir;
USE aplikasi_kasir;

-- 1. Tabel Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Tabel Products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 4. Menjalankan Server

Setelah konfigurasi selesai, jalankan server mode development dengan perintah:

```bash
npm run dev
# atau
nodemon server.js
```

Jika berhasil, akan muncul pesan:
`Server is running on port http://localhost:3000`
`Connected to MySQL database`

---

## API Endpoints

Berikut adalah daftar endpoint yang tersedia:

### Users
*   `GET /users` - Mengambil semua data user
*   `GET /users/:id` - Mengambil detail user berdasarkan ID
*   `POST /users` - Menambah user baru
*   `PUT /users/:id` - Mengupdate data user
*   `DELETE /users/:id` - Menghapus user

### Categories
*   `GET /categories` - Mengambil semua kategori
*   `GET /categories/:id` - Mengambil detail kategori
*   `POST /categories` - Membuat kategori baru
    *   Body: `{ "name": "Makanan" }`
*   `PUT /categories/:id` - Update kategori
*   `DELETE /categories/:id` - Hapus kategori

### Products
*   `GET /products` - Mengambil semua produk
*   `GET /products/:id` - Mengambil detail produk
*   `POST /products` - Membuat produk baru
    *   Body: `{ "category_id": 1, "name": "Nasi Goreng", "price": 15000 }`
*   `PUT /products/:id` - Update produk
*   `DELETE /products/:id` - Hapus produk

---

## Cara Testing di Postman

Berikut langkah-langkah untuk melakukan testing API menggunakan Postman:

1.  **Buka Postman** dan buat Collection baru.
2.  **Buat Request Baru**:
    *   Klik `Add Request` atau ikon `+`.
    *   Setel method ke **GET**, **POST**, **PUT**, atau **DELETE** sesuai kebutuhan.
3.  **Masukkan URL**:
    *   Format: `http://localhost:3000/[endpoint]`
    *   Contoh: `http://localhost:3000/products`
4.  **Untuk Method POST dan PUT** (Mengirim Data):
    *   Pilih tab **Body**.
    *   Pilih opsi **raw**.
    *   Ganti format dari `Text` menjadi **JSON**.
    *   Masukkan data JSON di area editor.
    *   Contoh Body untuk POST /products:
        ```json
        {
          "category_id": 1,
          "name": "Es Teh Manis",
          "price": 5000
        }
        ```
5.  Klik tombol **Send**.
6.  Periksa respons di bagian bawah (status 200/201 berarti berhasil).

---

