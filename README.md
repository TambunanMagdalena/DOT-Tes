<<<<<<< HEAD
# Backend Test - REST API TypeScript

Proyek ini merupakan implementasi REST API menggunakan **TypeScript**, **Express**, dan **PostgreSQL** dengan autentikasi berbasis **JWT (JSON Web Token)** serta relasi data antara entitas User dan Post.

---

# 🏗 Arsitektur & Pattern yang Digunakan

## Pattern: Clean MVC (Layered Architecture)

Pada proyek ini saya menggunakan pendekatan **Clean MVC (Layered Architecture)** dengan pemisahan tanggung jawab yang jelas antar layer.


---

# 📌 Penjelasan Setiap Layer

## 1️⃣ cmd/
Berfungsi sebagai entry point aplikasi.

- `cmd/main.ts` digunakan untuk menjalankan aplikasi.
- Bertanggung jawab melakukan bootstrap dan memanggil `MainApp`.

Layer ini tidak mengandung business logic.

---

## 2️⃣ app/app.ts
Merupakan pengatur utama (orchestrator) aplikasi.

Fungsi:
- Memuat konfigurasi dari environment variable
- Menginisialisasi koneksi database
- Menginisialisasi repository, usecase, dan controller
- Mendaftarkan route ke Express

File ini menghubungkan seluruh komponen aplikasi.

---

## 3️⃣ routes/
Menangani request HTTP dan meneruskannya ke controller.

Contoh:
- `POST /auth/register`
- `POST /auth/login`
- `POST /posts`
- `GET /posts`

Route hanya bertanggung jawab terhadap:
- Mapping endpoint
- Middleware (JWT)
- Response HTTP

Tidak ada logic bisnis di layer ini.

---

## 4️⃣ controllers/
Menghubungkan request dari route ke usecase.

Tanggung jawab:
- Menerima input
- Memanggil usecase
- Membentuk response JSON

Controller tidak berisi:
- Query database
- Validasi bisnis kompleks
- Proses autentikasi langsung

---

## 5️⃣ usecase/
Layer ini berisi **business logic utama aplikasi**.

Contoh:
- Validasi email saat register
- Hash password menggunakan bcrypt
- Generate JWT saat login
- Validasi akses post berdasarkan user

Business logic dipisahkan dari Express sehingga mudah diuji dan dikembangkan.

---

## 6️⃣ repositories/
Layer ini bertanggung jawab terhadap akses database.

Tugas:
- Query PostgreSQL
- Insert, select, update data
- Mapping hasil query

Repository tidak mengetahui konteks HTTP atau autentikasi.

---

## 7️⃣ middleware/
Berisi cross-cutting concern seperti autentikasi JWT.

Contoh:
- Verifikasi token
- Menyisipkan data user ke dalam request

Middleware dijalankan sebelum controller untuk memastikan endpoint terlindungi.

---

## 8️⃣ helpers/
Berisi fungsi utilitas seperti:
- Hash password
- Generate JWT
- Verify JWT

Helper tidak memiliki ketergantungan terhadap HTTP maupun database.

---

## 9️⃣ pkg/
Berisi komponen infrastruktur yang digunakan lintas layer:

- `config/` → Pengelolaan environment variable
- `database/` → Inisialisasi koneksi PostgreSQL
- `customerror/` → Standarisasi error response

---

# 🔐 Sistem Autentikasi

Autentikasi menggunakan JWT dengan alur sebagai berikut:

1. User melakukan login
2. Server memverifikasi password
3. Server membuat JWT berisi `id` dan `email`
4. Client mengirim token melalui header:



2. Buat file `.env`

3. Jalankan server


---

# 📬 Endpoint

## Public
- POST /auth/register
- POST /auth/login

## Protected
- POST /posts
- GET /posts

---

# ✅ Kesimpulan

Proyek ini menunjukkan implementasi:

- REST API dengan TypeScript
- Autentikasi JWT
- Relasi data SQL
- Clean Architecture
- Dependency injection sederhana
- Error handling terstruktur

Dengan struktur ini, aplikasi lebih terorganisir, aman, dan mudah dikembangkan.


=======
# DOT-Tes
>>>>>>> 1b85e79b353a8e7bb8433a4ab3764f0a1d38a66e
