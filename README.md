<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=170&section=header&text=Hazza%20Bike&fontSize=56&fontColor=ffffff&animation=twinkling&fontAlignY=38&desc=Digital%20Twin%20Pengelolaan%20Penyewaan%20Sepeda&descAlignY=60&descSize=18" alt="header" width="100%"/>

<img src="assets/bike-banner.svg" alt="Hazza Bike animated banner" width="100%"/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1000&color=FF6FA5&center=true&vCenter=true&width=620&lines=Halo!+Selamat+datang+di+Hazza+Bike+🚲;Sewa+sepeda+jadi+lebih+rapi+✨;Status+%26+kondisi+sepeda+real-time+di+dashboard+💖;Dibuat+dengan+Vue.js+%2B+Express.js+💚" alt="Typing SVG" />
</a>

<br/>

![Vue.js](https://img.shields.io/badge/Vue.js-3-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-ff6fa5?style=for-the-badge)

</div>

---

## 📖 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Tujuan Proyek](#-tujuan-proyek)
- [Fitur Utama](#-fitur-utama)
- [Ruang Lingkup](#-ruang-lingkup)
- [Aturan Bisnis](#-aturan-bisnis)
- [Tim Pengembang](#-tim-pengembang)
- [Stakeholder](#-stakeholder)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Diagram](#-diagram)
- [WBS & Jadwal](#-wbs--jadwal)
- [Estimasi Function Point](#-estimasi-function-point)
- [Tech Stack](#-tech-stack)
- [Struktur Folder](#-struktur-folder)
- [Cara Menjalankan](#-cara-menjalankan)
- [Dokumentasi API](#-dokumentasi-api)
- [Animasi Lucu di Frontend](#-animasi-lucu-di-frontend)
- [Pengujian](#-pengujian)
- [Dokumentasi Survey](#-dokumentasi-survey-lapangan)

---

## 🌸 Tentang Proyek

**Hazza Bike** adalah usaha penyewaan sepeda. Berdasarkan wawancara dengan pemilik, proses penyewaan melibatkan data **sepeda**, **pelanggan**, **transaksi penyewaan**, **tarif**, dan **kondisi sepeda**.

Proyek ini membangun sistem **Digital Twin berbasis web** yang merepresentasikan status dan kondisi sepeda dunia nyata ke dalam bentuk digital, sehingga pemilik dan petugas dapat mengelola armada, penyewaan, pengembalian, dan riwayat transaksi secara terstruktur.

> 💰 **Tarif:** Rp30.000 untuk durasi 6 jam.

## 🎯 Tujuan Proyek

1. Membangun sistem Digital Twin berbasis web untuk mengelola dan merepresentasikan data, status, dan kondisi armada sepeda Hazza Bike.
2. Menyediakan fitur pengelolaan pelanggan, penyewaan, pengembalian, dan riwayat transaksi.
3. Menyediakan dashboard ketersediaan, status, dan kondisi sepeda sehingga perubahan di dunia nyata tercermin di sistem.

## ✨ Fitur Utama

| | Fitur | Keterangan |
|---|---|---|
| 🔐 | Login Pengelola | Autentikasi petugas dengan username & password |
| 🚲 | Manajemen Sepeda | Tambah, edit, hapus, lihat daftar & detail sepeda (ID unik) |
| 🧑‍🤝‍🧑 | Manajemen Pelanggan | Input dan lihat data pelanggan |
| 🧾 | Transaksi Penyewaan | Catat sewa, hubungkan pelanggan + sepeda, tarif Rp30.000 / 6 jam |
| 🔁 | Pengembalian | Catat pengembalian & kondisi sepeda saat kembali |
| 🛠️ | Status & Kondisi | Update status (Tersedia / Disewa / Tidak Tersedia) dan kondisi |
| 📜 | Riwayat Transaksi | Riwayat penyewaan tersimpan dan bisa dilihat |
| 📊 | Dashboard Digital Twin | Ringkasan status dan kondisi seluruh armada |

## 🧭 Ruang Lingkup

| ✅ In-Scope | ❌ Out-of-Scope |
|---|---|
| Pengelolaan data sepeda & ID sepeda | Pelacakan lokasi GPS real-time |
| Pengelolaan status & kondisi sepeda | Payment gateway / pembayaran online otomatis |
| Pengelolaan data pelanggan | Integrasi aplikasi pihak ketiga |
| Pencatatan transaksi penyewaan | Pengembangan perangkat IoT |
| Pencatatan pengembalian | Sistem penjualan sepeda |
| Pencatatan riwayat transaksi | Pengelolaan usaha lain di luar penyewaan |
| Dashboard Digital Twin armada | |
| Tarif Rp30.000 / 6 jam | |
| Representasi perubahan kondisi dunia nyata ke data digital | |

## 📏 Aturan Bisnis

- [x] Setiap sepeda memiliki **ID unik**.
- [x] Setiap sepeda memiliki **status ketersediaan** dan **kondisi**.
- [x] Tarif sewa **Rp30.000 untuk 6 jam**.
- [x] Sepeda berstatus **"Disewa"** tidak dapat disewa pelanggan lain pada waktu yang sama.
- [x] Setiap transaksi harus terhubung dengan **data pelanggan** dan **data sepeda**.
- [x] Sepeda yang dikembalikan berstatus **"Tersedia"** jika kondisinya masih baik.
- [x] Sepeda yang rusak dapat berstatus **"Tidak Tersedia"** sampai diperbaiki.
- [x] Riwayat transaksi disimpan di sistem.
- [x] Perubahan status & kondisi di dunia nyata harus direpresentasikan di data Digital Twin.

## 👩‍💻 Tim Pengembang

| Nama | Peran |
|---|---|
| **Darma** | Project Manager |
| **Hilda Natasya** | System Analyst |
| **Difana Syakila** | UI/UX Designer |
| **Aulia Yudistira** | Developer |

**Dosen / Supervisor:** Ibu Cut Alna Fadillah

## 👥 Stakeholder

| ID | Stakeholder | Peran | Kategori | Interest | Influence |
|---|---|---|---|---|---|
| S01 | Pemilik Hazza Bike | Owner | Internal / Business | High | High |
| S02 | Pengelola / Petugas | Operational Staff | Internal / Business | High | High |
| S03 | Pelanggan | End User | External | Medium | Medium |
| S04 | Darma | Project Manager | Internal / Project Team | High | Medium |
| S05 | Hilda Natasya | System Analyst | Internal / Project Team | High | Medium |
| S06 | Difana Syakila | UI/UX Designer | Internal / Project Team | High | Medium |
| S07 | Aulia Yudistira | Developer | Internal / Project Team | High | Medium |
| S08 | Ibu Cut Alna Fadillah | Dosen / Supervisor | External / Academic | High | High |

---

## 🏗️ Arsitektur Sistem

```mermaid
flowchart LR
    subgraph Client["🌸 Frontend - Vue.js 3"]
        V1[Login]
        V2[Dashboard Digital Twin]
        V3[Kelola Sepeda]
        V4[Kelola Pelanggan]
        V5[Penyewaan & Pengembalian]
        V6[Riwayat Transaksi]
    end

    subgraph Server["🍃 Backend - Express.js"]
        M[Middleware<br/>CORS - JWT - Validator]
        R[Routes]
        C[Controllers]
        S[Services<br/>Aturan Bisnis]
    end

    DB[(🗄️ MySQL)]

    Client -- "HTTP / REST (JSON)" --> M --> R --> C --> S --> DB
    DB --> S --> C --> R -->|Response| Client

    style Client fill:#e8fff3,stroke:#42b883,stroke-width:2px
    style Server fill:#fff0f6,stroke:#ff6fa5,stroke-width:2px
    style DB fill:#e8f1ff,stroke:#4479A1,stroke-width:2px
```

## 📊 Diagram

### 1. Use Case

```mermaid
flowchart LR
    P(("🧑‍💼<br/>Pengelola"))
    O(("👑<br/>Pemilik"))

    subgraph Sistem["Sistem Hazza Bike"]
        U1([Login])
        U2([Kelola Data Sepeda])
        U3([Kelola Data Pelanggan])
        U4([Catat Penyewaan])
        U5([Catat Pengembalian])
        U6([Update Status & Kondisi])
        U7([Lihat Dashboard Armada])
        U8([Lihat Riwayat Transaksi])
    end

    P --> U1 & U2 & U3 & U4 & U5 & U6 & U7 & U8
    O --> U7 & U8

    style Sistem fill:#fff8fb,stroke:#ff6fa5,stroke-dasharray: 5 5
```

### 2. Siklus Status Sepeda (Digital Twin)

```mermaid
stateDiagram-v2
    [*] --> Tersedia: Sepeda didaftarkan 🚲
    Tersedia --> Disewa: Transaksi penyewaan dibuat
    Disewa --> Tersedia: Dikembalikan (kondisi baik ✅)
    Disewa --> TidakTersedia: Dikembalikan (rusak ⚠️)
    Tersedia --> TidakTersedia: Ditemukan kerusakan
    TidakTersedia --> Tersedia: Selesai diperbaiki 🛠️
    Tersedia --> [*]: Data dihapus

    state "Tidak Tersedia" as TidakTersedia
```

### 3. Alur Penyewaan & Pengembalian

```mermaid
flowchart TD
    A([🙋 Pelanggan datang]) --> B{Data pelanggan<br/>sudah ada?}
    B -- Belum --> C[Input data pelanggan]
    B -- Sudah --> D[Pilih sepeda]
    C --> D
    D --> E{Status sepeda<br/>Tersedia?}
    E -- Tidak --> F[Pilih sepeda lain]
    F --> D
    E -- Ya --> G[Buat transaksi<br/>Rp30.000 / 6 jam]
    G --> H[Status sepeda → Disewa]
    H --> I([🚴 Sepeda digunakan])
    I --> J[Pelanggan mengembalikan sepeda]
    J --> K[Pengelola cek kondisi]
    K --> L{Kondisi baik?}
    L -- Ya --> M[Status → Tersedia ✅]
    L -- Tidak --> N[Status → Tidak Tersedia ⚠️]
    M --> O[(Riwayat transaksi tersimpan)]
    N --> O
    O --> P([Selesai 🎉])

    style A fill:#ffe3ef,stroke:#ff6fa5
    style P fill:#e8fff3,stroke:#42b883
    style H fill:#fff4d6,stroke:#e0a800
    style M fill:#e8fff3,stroke:#42b883
    style N fill:#ffe0e0,stroke:#d9534f
```

### 4. Sequence Diagram - Penyewaan

```mermaid
sequenceDiagram
    autonumber
    actor P as Pengelola
    participant FE as Vue.js
    participant BE as Express.js
    participant DB as MySQL

    P->>FE: Pilih pelanggan & sepeda, klik "Sewa"
    FE->>BE: POST /api/penyewaan
    BE->>DB: Cek status sepeda
    DB-->>BE: status = Tersedia
    alt Sepeda tersedia
        BE->>DB: INSERT penyewaan (tarif 30.000, 6 jam)
        BE->>DB: UPDATE sepeda SET status = 'Disewa'
        DB-->>BE: OK
        BE-->>FE: 201 Created
        FE-->>P: 🎉 Penyewaan berhasil
    else Sepeda tidak tersedia
        BE-->>FE: 409 Conflict
        FE-->>P: 😿 Sepeda sedang tidak tersedia
    end
```

### 5. ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    PENGELOLA ||--o{ PENYEWAAN : mencatat
    PELANGGAN ||--o{ PENYEWAAN : melakukan
    SEPEDA ||--o{ PENYEWAAN : disewa
    PENYEWAAN ||--o| PENGEMBALIAN : berakhir

    PENGELOLA {
        int id_pengelola PK
        string nama
        string username UK
        string password_hash
        datetime created_at
    }
    SEPEDA {
        string id_sepeda PK "contoh HZB-001"
        string nama_sepeda
        string jenis
        enum status "Tersedia, Disewa, Tidak Tersedia"
        enum kondisi "Baik, Perlu Perawatan, Rusak"
        datetime updated_at
    }
    PELANGGAN {
        int id_pelanggan PK
        string nama
        string no_hp
        string alamat
        string no_identitas
    }
    PENYEWAAN {
        int id_penyewaan PK
        string id_sepeda FK
        int id_pelanggan FK
        int id_pengelola FK
        datetime waktu_sewa
        datetime batas_waktu
        int tarif "30000"
        enum status_transaksi "Berjalan, Selesai"
    }
    PENGEMBALIAN {
        int id_pengembalian PK
        int id_penyewaan FK
        datetime waktu_kembali
        enum kondisi_kembali "Baik, Perlu Perawatan, Rusak"
        string catatan
    }
```

> 💡 **Riwayat transaksi** diambil dari gabungan tabel `penyewaan` + `pengembalian` (bukan tabel terpisah), sesuai perhitungan Function Point (5 ILF).

### 6. Struktur Halaman Frontend

```mermaid
flowchart TD
    L[/login/] --> D[/dashboard/]
    D --> S[/sepeda/]
    D --> PL[/pelanggan/]
    D --> PN[/penyewaan/]
    D --> PG[/pengembalian/]
    D --> RW[/riwayat/]
    S --> SD[/sepeda/:id - Detail/]
    S --> SF[/sepeda/tambah & edit/]
```

---

## 🗓️ WBS & Jadwal

### Work Breakdown Structure

```mermaid
mindmap
  root((🚲 Hazza Bike))
    1.0 Manajemen & Perencanaan
      1.1 Wawancara pemilik UMKM
      1.2 Identifikasi kebutuhan & aturan bisnis
      1.3 Project Charter, Stakeholder Register, WBS, Workspace
    2.0 Perancangan & Desain
      2.1 Wireframe / Mockup
      2.2 Rancang database
      2.3 Rancang alur status & kondisi
      2.4 Rancang dashboard
    3.0 Pengembangan
      3.1 Database & koneksi
      3.2 Fitur sepeda, pelanggan, sewa, kembali
      3.3 Fitur status & kondisi
      3.4 Fitur riwayat transaksi
      3.5 Dashboard armada
    4.0 Pengujian
      4.1 Uji sewa & kembali
      4.2 Uji status, kondisi, riwayat
      4.3 Perbaikan error
    5.0 Penyelesaian
      5.1 Dokumentasi & laporan
      5.2 Presentasi & demo
```

### Contoh Jadwal (Gantt)

> ⚠️ Tanggal di bawah hanya **contoh**. Sesuaikan dengan jadwal tim.

```mermaid
gantt
    title Jadwal Pengembangan Hazza Bike
    dateFormat  YYYY-MM-DD
    axisFormat  %d %b
    section 1.0 Perencanaan
    Wawancara pemilik           :done, a1, 2026-10-01, 3d
    Identifikasi kebutuhan      :done, a2, after a1, 3d
    Charter, Stakeholder, WBS   :done, a3, after a2, 4d
    section 2.0 Desain
    Wireframe / Mockup          :b1, after a3, 5d
    Rancang database            :b2, after a3, 4d
    Alur status & dashboard     :b3, after b1, 4d
    section 3.0 Pengembangan
    Database & koneksi          :c1, after b2, 3d
    Fitur CRUD & transaksi      :c2, after c1, 10d
    Fitur status & kondisi      :c3, after c2, 4d
    Riwayat & dashboard         :c4, after c3, 6d
    section 4.0 Pengujian
    Pengujian sistem            :d1, after c4, 5d
    Perbaikan error             :d2, after d1, 3d
    section 5.0 Penyelesaian
    Dokumentasi & laporan       :e1, after d2, 5d
    Presentasi & demo           :milestone, e2, after e1, 1d
```

---

## 📐 Estimasi Function Point

### Komposisi Weighted Count

```mermaid
pie showData
    title Kontribusi Komponen terhadap Count Total (100)
    "EI (Input)" : 30
    "EO (Output)" : 15
    "EQ (Inquiry)" : 14
    "ILF (File Internal)" : 41
    "EIF (File Eksternal)" : 0
```

### Rekapitulasi

| Komponen | Low | Average | High | Total |
|---|---|---|---|---|
| External Input (EI) | 6 × 3 = 18 | 3 × 4 = 12 | 0 | **30** |
| External Output (EO) | 0 | 3 × 5 = 15 | 0 | **15** |
| External Inquiry (EQ) | 2 × 3 = 6 | 2 × 4 = 8 | 0 | **14** |
| Internal Logical File (ILF) | 3 × 7 = 21 | 2 × 10 = 20 | 0 | **41** |
| External Interface File (EIF) | 0 | 0 | 0 | **0** |
| **Count Total** | | | | **100** |

### Complexity Adjustment (ΣFi = 25)

| Faktor | Nilai | Faktor | Nilai |
|---|---|---|---|
| F1 Data Communications | 3 | F8 Online Update | 3 |
| F2 Distributed Data Processing | 0 | F9 Complex Processing | 1 |
| F3 Performance | 2 | F10 Reusability | 1 |
| F4 Heavily Used Configuration | 1 | F11 Installation Ease | 2 |
| F5 Transaction Rate | 2 | F12 Operational Ease | 2 |
| F6 Online Data Entry | 3 | F13 Multiple Sites | 0 |
| F7 End-User Efficiency | 3 | F14 Facilitate Change | 2 |

```
VAF = 0,65 + (0,01 × ΣFi) = 0,65 + 0,25 = 0,90
FP  = Count Total × VAF   = 100 × 0,90   = 90 FP
```

> 🎀 **Hasil akhir: 90 Function Point.**

---

## 🧰 Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Vue.js 3 (Composition API), Vue Router, Pinia, Axios, Vite |
| UI & Animasi | CSS Keyframes, `<Transition>`, Animate.css / `@vueuse/motion` (opsional), Chart.js (`vue-chartjs`) |
| Backend | Node.js, Express.js |
| Database | MySQL (`mysql2`) - dapat diganti sesuai kebutuhan tim |
| Auth | JWT + bcrypt |
| Validasi | express-validator / Joi |

## 📁 Struktur Folder

```
hazza-bike/
├── assets/
│   └── bike-banner.svg
├── backend/
│   ├── src/
│   │   ├── config/          # koneksi database, env
│   │   ├── controllers/     # sepeda, pelanggan, penyewaan, pengembalian, auth
│   │   ├── middlewares/     # auth JWT, error handler, validator
│   │   ├── routes/
│   │   ├── services/        # aturan bisnis (cek status, hitung tarif)
│   │   └── app.js
│   ├── database/
│   │   └── schema.sql
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/             # axios instance
│   │   ├── assets/          # gambar, css animasi
│   │   ├── components/      # BikeCard, StatusBadge, StatCard, ...
│   │   ├── layouts/
│   │   ├── router/
│   │   ├── stores/          # Pinia
│   │   ├── views/           # Dashboard, Sepeda, Pelanggan, Penyewaan, ...
│   │   └── main.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js 20+
- MySQL 8+
- Git

### 1. Clone repository

```bash
git clone https://github.com/<username>/hazza-bike.git
cd hazza-bike
```

### 2. Setup database

```bash
mysql -u root -p -e "CREATE DATABASE hazza_bike;"
mysql -u root -p hazza_bike < backend/database/schema.sql
```

Contoh `schema.sql`:

```sql
CREATE TABLE pengelola (
  id_pengelola INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sepeda (
  id_sepeda VARCHAR(20) PRIMARY KEY,           -- contoh: HZB-001
  nama_sepeda VARCHAR(100) NOT NULL,
  jenis VARCHAR(50),
  status ENUM('Tersedia','Disewa','Tidak Tersedia') DEFAULT 'Tersedia',
  kondisi ENUM('Baik','Perlu Perawatan','Rusak') DEFAULT 'Baik',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE pelanggan (
  id_pelanggan INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  no_hp VARCHAR(20),
  alamat TEXT,
  no_identitas VARCHAR(50)
);

CREATE TABLE penyewaan (
  id_penyewaan INT AUTO_INCREMENT PRIMARY KEY,
  id_sepeda VARCHAR(20) NOT NULL,
  id_pelanggan INT NOT NULL,
  id_pengelola INT NOT NULL,
  waktu_sewa DATETIME DEFAULT CURRENT_TIMESTAMP,
  batas_waktu DATETIME NOT NULL,
  tarif INT NOT NULL DEFAULT 30000,
  status_transaksi ENUM('Berjalan','Selesai') DEFAULT 'Berjalan',
  FOREIGN KEY (id_sepeda) REFERENCES sepeda(id_sepeda),
  FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan),
  FOREIGN KEY (id_pengelola) REFERENCES pengelola(id_pengelola)
);

CREATE TABLE pengembalian (
  id_pengembalian INT AUTO_INCREMENT PRIMARY KEY,
  id_penyewaan INT NOT NULL UNIQUE,
  waktu_kembali DATETIME DEFAULT CURRENT_TIMESTAMP,
  kondisi_kembali ENUM('Baik','Perlu Perawatan','Rusak') NOT NULL,
  catatan TEXT,
  FOREIGN KEY (id_penyewaan) REFERENCES penyewaan(id_penyewaan)
);
```

### 3. Jalankan Backend (Express.js)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

`.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hazza_bike
JWT_SECRET=ganti_dengan_secret_yang_aman
TARIF_6_JAM=30000
```

### 4. Jalankan Frontend (Vue.js)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

`.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Buka **http://localhost:5173** 🎉

## 🔌 Dokumentasi API

Base URL: `http://localhost:5000/api`  (semua endpoint kecuali login memerlukan header `Authorization: Bearer <token>`)

| Method | Endpoint | Fungsi | FP |
|---|---|---|---|
| POST | `/auth/login` | Login pengelola | EI-01 |
| GET | `/sepeda` | Daftar sepeda | EQ-01 |
| GET | `/sepeda/:id` | Detail sepeda | EQ-02 |
| POST | `/sepeda` | Tambah sepeda | EI-02 |
| PUT | `/sepeda/:id` | Edit sepeda | EI-03 |
| DELETE | `/sepeda/:id` | Hapus sepeda | EI-04 |
| PATCH | `/sepeda/:id/status` | Update status | EI-09 |
| PATCH | `/sepeda/:id/kondisi` | Update kondisi | EI-08 |
| GET | `/pelanggan` | Daftar pelanggan | EQ-03 |
| POST | `/pelanggan` | Input pelanggan | EI-05 |
| POST | `/penyewaan` | Buat transaksi sewa | EI-06 |
| GET | `/penyewaan/:id` | Informasi transaksi | EO-02 |
| POST | `/pengembalian` | Catat pengembalian | EI-07 |
| GET | `/riwayat` | Riwayat penyewaan | EO-03, EQ-04 |
| GET | `/dashboard/armada` | Ringkasan status & kondisi armada | EO-01 |

### Contoh: Buat Penyewaan

**Request**

```http
POST /api/penyewaan
Content-Type: application/json

{
  "id_sepeda": "HZB-001",
  "id_pelanggan": 3
}
```

**Response `201`**

```json
{
  "message": "Penyewaan berhasil dibuat",
  "data": {
    "id_penyewaan": 12,
    "id_sepeda": "HZB-001",
    "tarif": 30000,
    "waktu_sewa": "2026-10-03T09:00:00.000Z",
    "batas_waktu": "2026-10-03T15:00:00.000Z"
  }
}
```

**Response `409`** (sepeda tidak tersedia)

```json
{ "message": "Sepeda sedang disewa atau tidak tersedia" }
```

### Contoh Logika Aturan Bisnis (Express)

```js
// backend/src/services/penyewaan.service.js
const db = require('../config/db');
const TARIF = Number(process.env.TARIF_6_JAM || 30000);
const DURASI_JAM = 6;

exports.buatPenyewaan = async ({ id_sepeda, id_pelanggan, id_pengelola }) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [[sepeda]] = await conn.query(
      'SELECT status FROM sepeda WHERE id_sepeda = ? FOR UPDATE',
      [id_sepeda]
    );
    if (!sepeda) throw { status: 404, message: 'Sepeda tidak ditemukan' };
    if (sepeda.status !== 'Tersedia')
      throw { status: 409, message: 'Sepeda sedang disewa atau tidak tersedia' };

    const [hasil] = await conn.query(
      `INSERT INTO penyewaan (id_sepeda, id_pelanggan, id_pengelola, batas_waktu, tarif)
       VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL ? HOUR), ?)`,
      [id_sepeda, id_pelanggan, id_pengelola, DURASI_JAM, TARIF]
    );

    await conn.query("UPDATE sepeda SET status = 'Disewa' WHERE id_sepeda = ?", [id_sepeda]);

    await conn.commit();
    return { id_penyewaan: hasil.insertId, tarif: TARIF };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
```

---

## 🎀 Animasi Lucu di Frontend

Supaya website terasa **cute & friendly**, berikut ide dan contoh siap pakai.

### Palet Warna Saran

| Warna | Hex | Pemakaian |
|---|---|---|
| 🌸 Pink | `#FF6FA5` | Aksen utama, tombol |
| 🍃 Mint | `#42B883` | Status "Tersedia" |
| 🌼 Kuning | `#FFD966` | Status "Disewa" |
| 🍓 Merah muda | `#FF8A8A` | Status "Tidak Tersedia" |
| ☁️ Langit | `#BDE7FF` | Latar / kartu |

### `frontend/src/assets/cute.css`

```css
:root {
  --pink: #ff6fa5;
  --mint: #42b883;
  --yellow: #ffd966;
  --coral: #ff8a8a;
  --sky: #bde7ff;
}

/* Sepeda berjalan di header */
@keyframes ride {
  from { transform: translateX(-120px); }
  to   { transform: translateX(110vw); }
}
.bike-ride { animation: ride 9s linear infinite; }

/* Melompat lucu */
@keyframes bounce-cute {
  0%, 100% { transform: translateY(0) scale(1, 1); }
  40%      { transform: translateY(-14px) scale(0.97, 1.05); }
  60%      { transform: translateY(0) scale(1.05, 0.95); }
}
.bounce { animation: bounce-cute 1.4s ease-in-out infinite; }

/* Goyang saat hover */
@keyframes wiggle {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-4deg); }
  75% { transform: rotate(4deg); }
}
.card-cute {
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(255, 111, 165, 0.18);
  transition: transform .25s ease, box-shadow .25s ease;
}
.card-cute:hover {
  animation: wiggle .5s ease;
  transform: translateY(-4px);
  box-shadow: 0 12px 26px rgba(255, 111, 165, 0.3);
}

/* Denyut untuk badge "Disewa" */
@keyframes pulse-soft {
  0%   { box-shadow: 0 0 0 0 rgba(255, 217, 102, .7); }
  70%  { box-shadow: 0 0 0 12px rgba(255, 217, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 217, 102, 0); }
}
.badge-disewa { animation: pulse-soft 1.8s infinite; }

/* Hati melayang */
@keyframes float-heart {
  0%   { transform: translateY(0) scale(.8); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateY(-80px) scale(1.2); opacity: 0; }
}
.heart { position: absolute; animation: float-heart 2.4s ease-out forwards; }

/* Transisi halaman */
.page-enter-active, .page-leave-active { transition: all .35s cubic-bezier(.34, 1.56, .64, 1); }
.page-enter-from { opacity: 0; transform: translateY(20px) scale(.97); }
.page-leave-to   { opacity: 0; transform: translateY(-20px) scale(.97); }
```

### Transisi Antar Halaman (`App.vue`)

```vue
<script setup>
import '@/assets/cute.css';
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
```

### Komponen Kartu Sepeda (`BikeCard.vue`)

```vue
<script setup>
defineProps({ sepeda: Object });

const warna = {
  'Tersedia': 'var(--mint)',
  'Disewa': 'var(--yellow)',
  'Tidak Tersedia': 'var(--coral)',
};
const emoji = { 'Tersedia': '😸', 'Disewa': '🚴', 'Tidak Tersedia': '🛠️' };
</script>

<template>
  <div class="card-cute bike-card">
    <div class="bike-icon bounce">🚲</div>
    <h3>{{ sepeda.nama_sepeda }}</h3>
    <small>{{ sepeda.id_sepeda }}</small>

    <span
      class="badge"
      :class="{ 'badge-disewa': sepeda.status === 'Disewa' }"
      :style="{ background: warna[sepeda.status] }"
    >
      {{ emoji[sepeda.status] }} {{ sepeda.status }}
    </span>

    <p>Kondisi: <b>{{ sepeda.kondisi }}</b></p>
  </div>
</template>

<style scoped>
.bike-card { padding: 20px; text-align: center; }
.bike-icon { font-size: 40px; }
.badge { display: inline-block; padding: 4px 14px; border-radius: 999px; font-weight: 600; color: #fff; }
</style>
```

### Animasi Angka Dashboard (`StatCard.vue`)

```vue
<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({ label: String, value: Number, icon: String });
const tampil = ref(0);

function hitung(ke) {
  const mulai = tampil.value;
  const durasi = 800;
  const t0 = performance.now();
  const step = (t) => {
    const p = Math.min((t - t0) / durasi, 1);
    tampil.value = Math.round(mulai + (ke - mulai) * p);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

onMounted(() => hitung(props.value));
watch(() => props.value, hitung);
</script>

<template>
  <div class="card-cute stat">
    <div class="bounce">{{ icon }}</div>
    <h2>{{ tampil }}</h2>
    <p>{{ label }}</p>
  </div>
</template>
```

### Ide Animasi Tambahan

| Lokasi | Animasi |
|---|---|
| Halaman login | Sepeda lewat di bawah form (`.bike-ride`) |
| Dashboard | Angka naik perlahan, kartu muncul bergantian (`animation-delay`) |
| Sukses sewa | Hati / confetti melayang 🎉 (`canvas-confetti`) |
| Sepeda rusak | Ikon obeng goyang pelan |
| Tabel kosong | Maskot sepeda tidur 😴 + teks "Belum ada data" |
| Loading | Roda sepeda berputar (SVG `rotate`) |
| Toast | Notifikasi muncul memantul dari kanan atas |

> 💡 Hormati pengguna yang sensitif terhadap gerakan: tambahkan
> ```css
> @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
> ```

---

## 🧪 Pengujian

| ID | Skenario | Hasil yang Diharapkan |
|---|---|---|
| T-01 | Login dengan akun valid | Masuk ke dashboard |
| T-02 | Tambah sepeda dengan ID baru | Data tersimpan, status awal "Tersedia" |
| T-03 | Tambah sepeda dengan ID duplikat | Ditolak (ID harus unik) |
| T-04 | Sewa sepeda "Tersedia" | Transaksi dibuat, status → "Disewa", tarif Rp30.000 |
| T-05 | Sewa sepeda "Disewa" | Ditolak (409) |
| T-06 | Sewa sepeda "Tidak Tersedia" | Ditolak (409) |
| T-07 | Kembalikan sepeda kondisi baik | Status → "Tersedia" |
| T-08 | Kembalikan sepeda kondisi rusak | Status → "Tidak Tersedia" |
| T-09 | Perbaikan selesai, status diubah manual | Status → "Tersedia" |
| T-10 | Lihat riwayat transaksi | Semua transaksi tampil lengkap |
| T-11 | Dashboard setelah perubahan status | Jumlah per status ter-update |

## 📸 Dokumentasi Survey Lapangan

Survei dan wawancara dilakukan langsung di toko **Hazza Bike** (Jalan Murni, Gampong Sidodadi). Letakkan foto dokumentasi pada folder `assets/` lalu tampilkan di sini:

```md
![Survey 1](assets/survey-1.jpg)
![Survey 2](assets/survey-2.jpg)
```

---

<div align="center">

### 💖 Dibuat dengan semangat oleh Tim Hazza Bike 💖

**Darma • Hilda Natasya • Difana Syakila • Aulia Yudistira**

<sub>Dosen Pembimbing: Ibu Cut Alna Fadillah</sub>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=120&section=footer" width="100%" alt="footer"/>

</div>
