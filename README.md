# Pencerdasan Backend TPKB

Pencerdasan Backend dengan menggunakan [express.js](https://expressjs.com/) dan [Prisma](https://www.prisma.io/docs).

## Table Of Contents

-   [Prerequisites](#prerequisites)
-   [Teori](#teori)
    -   [Backend](#backend)
    -   [HTTP](#hypertext-transfer-protocol-http)
    -   [REST](#representiational-state-transfer-rest)
-   [Implementasi](#implementasi)
    -   [Quickstart](#quickstart)
    -   [Routing](#routing)
    -   [Middleware](#middleware)
    -   [Database](#database)
-   [Extras](#extras)
    -   [Struktur Proyek](#struktur-proyek)
    -   [Nodemon](#nodemon)
    -   [Environment Variables](#environment-variables)
    -   [Git](#git)
    -   [Gitignore](#gitignore)
    -   [Conventional Commits](#conventional-commits)
-   [What Now?](#what-now)
-   [Referensi](#referensi)

## Prerequisites

-   [Node.js (v22.17.0 or newer)](https://nodejs.org/en/download)
-   [Git (2.46.2 or newer)](https://git-scm.com/downloads)
-   [VSCode (atau IDE lainnya, yang penting bukan Notepad atau onlinegdb.com 😊)](https://code.visualstudio.com)
-   [Postman](https://www.postman.com)
-   (Lumayan) paham JavaScript

## Teori

<div align="center">
	<img src="https://i.imgflip.com/9zyc4x.jpg" />
</div>

### Backend

Pengguna biasanya ingin berinteraksi dengan sebuah sistem atau layanan di balik layar, seperti menyimpan data, mengambil informasi, atau melakukan autentikasi. Bagian sistem ini disebut **backend** — yaitu komponen aplikasi yang bertugas menangani logika, penyimpanan data, dan komunikasi dengan klien melalui **API** (_Application Programmable Interface_).

Cara kerja sistem ini cukup mudah. Bayangkan terdapat sebuah restoran, di mana pelanggan akan memesan makanan dari pelayan, pelayan akan mengirim pesanan tersebut ke dapur dan pelayan akan mengirimkan makanannya kembali ke pelanggan. Pelanggan dalam kasus ini adalah klien atau frontend, pelayan adalah API dan dapur adalah layanan atau backend.

![API Example](https://www.netsolutions.com/wp-content/uploads/2023/11/Understanding-eCommerce-APIs-1024x834.webp)

### Hypertext Transfer Protocol (HTTP)

Dalam internet, terdapat berbagai macam cara untuk berkomunikasi antar aplikasi yang dinamakan **protocol**. Salah satu contoh dari protocol yang sering digunakan untuk berkomunikasi dengan website adalah **Hypertext Transfer Protocol (HTTP)**.

Setiap permintaan HTTP memiliki komponen berikut.

| Nama    | Deskripsi                                                 |
| ------- | --------------------------------------------------------- |
| Method  | Metode HTTP seperti GET, POST, dll.                       |
| Path    | Alamat (endpoint) yang diminta.                           |
| Headers | Informasi tambahan seperti jenis konten atau autentikasi. |
| Body    | Data yang dikirim.                                        |

Dan setiap respons HTTP memiliki komponen berikut.

| Nama        | Deskripsi                     |
| ----------- | ----------------------------- |
| Status Code | Menunjukkan hasil permintaan. |
| Headers     | Informasi tambahan.           |
| Body        | Data hasil respon.            |

Terdapat berbagai jenis Status Code yang dikelompokkan berdasarkan rentang nilainya. Setiap kelompok merepresentasikan tipe respons tertentu dari server.

| Range | Deskripsi                          |
| ----- | ---------------------------------- |
| 100an | Permintaan diterima, akan diproses |
| 200an | Berhasil                           |
| 300an | Redirect                           |
| 400an | Kesalahan klien                    |
| 500an | Kesalahan server                   |

Untuk lebih detailnya, terdapat penjelasan setiap status code dalam [website ini](https://http.cat/).

### Representiational State Transfer (REST)

Representiational State Transfer merupakan sebuah prinsip dalam membuat API yang mudah, _scalable_, dan _stateless_. Prinsip ini menanggap semua hal sebagai resource yang dapat berinteraksi lewat method HTTP.

| Method   | Perintah               |
| -------- | ---------------------- |
| `GET`    | Baca                   |
| `POST`   | Buat                   |
| `PUT`    | Mengubah / Memperbarui |
| `PATCH`  | Memperbarui (separuh)  |
| `DELETE` | Hapus                  |

REST API umumnya mengirim dan menerima data dalam format **JSON** (JavaScript Object Notation), yang mudah dibaca dan diproses oleh aplikasi modern.

Berikut adalah contoh dari JSON.

```json
{
	"id": 1,
	"name": "Alice",
	"posts": [
		{
			"id": 1269,
			"content": "Proker Gerry Masak Nasi sangat bermutu. Aku yang sudah kenyang menjadi lebih kenyang."
		},
		{
			"id": 1341,
			"content": "proker tc susah juga sangat berguna. terima kasih mas gerry :pray:"
		}
	]
}
```

## Implementasi

![meme implementasi](https://i.imgflip.com/9zyc8h.jpg)

### Quickstart

Dalam quickstart ini, kita akan membuat sebuah aplikasi `express.js` kosongan 😄.

Untuk membuat sebuah aplikasi Node.js kosongan, lakukan `npm init -y`.

Note: flag `-y` dalam kasus ini akan mengambil nama direktori root sebagai nama aplikasi.

```shell
npm init -y
```

Setelah menjalankan perintah tersebut, sebuah file bernama `package.json` akan muncul.

```
aplikasiku/
└── package.json
```

`package.json` berisi metadata terkait proyek kalian (seperti nama, packages yang digunakan, dll). Setelah itu, jalankan perintah `npm install` atau kependekannya, yakni `npm i`, untuk mengunduh package yang kita perlukan.

```shell
npm install express dotenv cors morgan
npm install -g nodemon
```

Setelah menjalankan perintah tersebut, sebuah file bernama `package-lock.json` akan muncul. `package-lock.json` mengandung metadata dari setiap package yang kita gunakan.

```
aplikasiku/
├── package-lock.json
└── package.json
```

Lalu, kita perlu membuat file `index.js`. File inilah yang akan menjalankan aplikasi kita.

```
aplikasiku/
├── index.js
├── package-lock.json
└── package.json
```

Dalam `index.js`, kita akan menjalankan aplikasi [express.js](https://expressjs.com/). Aplikasi inilah yang akan melayani pengguna (seperti FE).

Untuk menggunakan [express.js](https://expressjs.com/), lakukan import pada package `express`

```js
const express = require('express');
```

Setelah itu, buatlah aplikasi dengan memanggil `express` secara langsung.

```js
const app = express();
```

Dan untuk menjalankan aplikasi tersebut pada port 8000, gunakan metode `listen`.

```js
const port = 8000;

app.listen(port, () => {
	console.log('Server running');
});
```

File `index.js` seharusnya terlihat seperti berikut.

```js
const express = require('express');

const app = express();
const port = 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
```

Untuk menjalankan aplikasi, jalankan perintah `node index.js` dalam terminal.

```shell
node index.js
```

Terminal akan menghasilkan kalimat berikut.

```shell
Server running on port 8000
```

Selamat, kalian telah berhasil membuat aplikasi pertama kalian ✨.

### Routing

Dalam bagian ini, kita akan tambahkan fungsi pada aplikasi kita lewat rute.

Rute dalam kasus ini adalah sebuah URL path.

Untuk menambahkan sebuah rute, kita dapat memanggil fungsi dengan method HTTP yang diinginkan. Formatnya berupa `app.METHOD(PATH, HANDLER)`

Kita akan membuat rute `GET /` yang akan mengembalikan "Hello world".

```js
app.get('/', (req, res) => {
	res.status(200).send('Hello world');
});
```

Setelah itu, simpan perubahan `index.js` tersebut dan jalankan `node index.js` lagi.

Setelah itu, kalian dapat mengirim permintaan GET dengan Postman / mengakses web browser kalian pada alamat [localhost](http://localhost:8080) dan kalian akan disambut dengan "Hello world".

![hello world lewat web](assets/hello-world-web.png)
![hello world lewat postman](assets/hello-world-postman.png)

Routing juga bisa dibuat secara modular, artinya aplikasi dapat menggunakan beberapa router terpisah yang mengelola permintaan berdasarkan fungsinya masing-masing.

Berikut adalah contoh dari penggunaan router untuk mengatasi permintaan terkait user (`/users`).

```js
const userRouter = express.Router();

const users = [
	{
		username: 'justinuschaw',
		email: 'bukanjustinchow@gmail.com',
	},
	{
		username: 'nichoger',
		email: 'bukangerrynicholas@gmail.com',
	},
];

userRouter.get('/', (req, res) => {
	res.status(200).json(users);
});

app.use('/users', userRouter);
```

![routing example](assets/routing-example.png)

### Middleware

Middleware merupakan _handler_ yang memroses permintaan sebelum permintaan mencapai handler akhir. Pemrosesan ini dapat berupa autentikasi, rate limiting, dst.

Berikut adalah beberapa middleware yang sering digunakan dalam aplikasi pada umumnya.

```js
const cors = require('cors');
const morgan = require('morgan');

app.use(cors()); // Mengatur akses domain lain terhadap aplikasi (CORS)
app.use(express.json()); // Memungkinkan pengolahan body request dalam format JSON
app.use(express.urlencoded()); // Memungkinkan pengolahan body request dengan format x-www-form-urlencoded
app.use(morgan('dev')); // Menampilkan log HTTP ke console untuk kebutuhan debugging
```

Untuk membuat sebuah middleware, kita menggunakan metode `use` dengan format `app.use(PATH, (req, res, next) => { ...; next() })`.

```js
app.use('/', (req, res, next) => {
	if (req.body?.password != 'halo') {
		res.status(401).json({ message: 'Access denied' });
		return;
	}
	next();
});
```

![middleware-no-password](assets/middleware-no-password.png)
![middleware-with-password](assets/middleware-with-password.png)

Selamat, kalian berhasil membuat middleware autentikasi sederhana pertama kalian ✨.

### Database

> Contoh ini akan menggunakan PostgreSQL

Sekarang kita akan menghubungi aplikasi kita dengan sebuah basis data. Terdapat dua cara untuk melakukan hal tersebut, yakni:

#### SQL Driver

SQL driver adalah penghubung langsung antara aplikasi dan database. Kita menggunakan library agar dapat melakukan query SQL secara manual.

| Kelebihan                                   | Kekurangan                                |
| ------------------------------------------- | ----------------------------------------- |
| Performa lebih tinggi                       | Tidak ada type safety (rentan error)      |
| Fleksibilitas penuh menulis query SQL       | Harus menulis query SQL sendiri           |
| Baik untuk kasus kompleks dan kontrol penuh | Tidak ada auto-migration atau schema sync |

Pada awalnya, kita perlu membuat sebuah koneksi kepada database.

> Environment variables dapat digunakan untuk meningkatkan keamanan (seperti menyimpan URL rahasia). Hal ini dapat dicapai dengan menggunakan fungsi `process.env.NAMA_VARIABEL`. Environment variables akan dibahas lebih lanjut.

```js
const { Client } = require('pg');

const client = new Client({
	connectionString:
		'postgresql://postgres:yourpassword@localhost:5432/testdb', // change this with supabase url
});

await client.connect();
```

Lalu kita dapat melakukan migrasi (buat tabel di database) dengan menggunakan SQL.

```js
const createTable = async () => {
	const query = `
		CREATE TABLE IF NOT EXISTS programKerja (
			id SERIAL PRIMARY KEY,
			name TEXT UNIQUE NOT NULL,
			description TEXT NOT NULL
		)
	`;

	try {
		await client.query(query);
		console.log('Table created');
	} catch (err) {
		console.error('Error creating table:', err);
	}
};

createTable();
```

Lalu query data yang dibutuhkan dengan SQL juga.

```js
app.get('/proker', async (req, res) => {
	try {
		const result = await client.query('SELECT * FROM programKerja');
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send('Database error');
	}
});
```

#### Object Relation Mapper (ORM)

ORM seperti Prisma bertindak sebagai perantara antara kode dan database dengan menyajikan database dalam bentuk objek JavaScript / TypeScript.

| Kelebihan                                    | Kekurangan                                      |
| -------------------------------------------- | ----------------------------------------------- |
| Lebih aman & nyaman                          | Lebih lambat sedikit dibanding raw SQL          |
| Tidak perlu menulis SQL (kecuali dibutuhkan) | Abstraksi menyulitkan jika perlu query kompleks |
| Dapat melakukan migration otomatis           |
| Mudah digunakan untuk pengembangan cepat     |

Lakukan inisialisasi pada Prisma.

```shell
npx prisma init
```

Inisialisasi akan menghasilkan sebuah file bernama `prisma/schema.prisma`. Tambahkan informasi berikut dalam `prisma/schema.prisma`.

> Environment variables dapat digunakan untuk meningkatkan keamanan (seperti menyimpan URL rahasia). Hal ini dapat dicapai dengan menggunakan fungsi `env("NAMA_VARIABEL")`. Environment variables akan dibahas lebih lanjut.

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:yourpassword@localhost:6543/testdb" // change this with supabase url
  directUrl = "postgresql://postgres:yourpassword@localhost:5432/testdb" // (optional, can be used as url) change this with supabase direct url
}

generator client {
  provider = "prisma-client-js"
}

model ProgramKerja {
  id    	  Int    @id @default(autoincrement())
  name  	  String @unique
  description String
}

// kalian dapat tambahkan model lain juga
```

Setelah itu, lakukan migrasi database.

> Migrasi hanya dapat dilakukan pada **direct URL**. Apabila tidak, maka migrasi tidak akan dilaksanakan dan koneksi database AFK.

```shell
npx prisma migrate dev --name init
```

Setelah melakukan migrasi, tabel baru akan muncul sesuai dengan deskripsi schema kita.

![hasil migrasi](assets/migration-result.png)

Lalu kita hanya perlu menambahkan klien Prisma pada aplikasi kita.

```js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ...

app.get('/proker', async (req, res) => {
	try {
		const result = await prisma.programKerja.findMany();
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Database error');
	}
});
```

### Extras

#### Struktur Proyek

Pada umumnya, struktur proyek [express.js](https://expressjs.com) terlihat seperti berikut.

```
express-app/
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── index.js                # Entry point of the app
│
├── config/
│   └── db.js               # Database connection setup (if any)
│
├── routes/
│   ├── index.js            # Main route file (e.g. '/')
│   └── user.routes.js      # Routes related to /users
│
├── controllers/
│   └── user.controller.js  # Business logic for user endpoints
│
├── models/
│   └── user.model.js       # Data model/schema (if using DB/ODM)
│
├── middlewares/
│   └── auth.middleware.js  # Example: authentication/validation
│
├── services/
│   └── user.service.js     # Optional: abstraction for controller logic
│
├── utils/
│   └── logger.js           # Custom utility functions
│
└── tests/
    └── user.test.js        # Unit or integration tests
```

#### Environment Variables

**Environment variables** merupakan variabel yang menyimpan konfigurasi atau informasi penting yang dibutuhkan oleh aplikasi, seperti port, kredensial database, atau secret key. Variabel ini biasanya disimpan di file `.env` agar mudah diatur dan tidak disertakan langsung di dalam kode sumber.

Untuk menggunakan environment variables dalam aplikasi kita, kita dapat menggunakan package `dotenv`. Berikut contoh pengunaannya.

`.env`

```
PORT=3000
```

`index.js`

```js
const dotenv = require('dotenv');

dotenv.config();

// ...

const port = process.env.PORT || 8000; // 8000 jika variabel PORT tidak ditemukan

// ...
```

#### Nodemon

Jika kalian malas memanggil `node index.js` secara terus menerus, maka kalian dapat menggunakan `nodemon`.

```shell
nodemon index.js
```

Setelah menjalankan perintah tersebut, semua perubahan pada file `index.js` dan file yang berhubungan dengan `index.js` akan memicu perbaruan pada `nodemon` (seperti _refresh_), sehingga kalian tidak perlu memanggil `node index.js` secara terus menerus 😎.

#### Git

Git adalah sebuah Version Control System (VCS) atau sistem kontrol versi, yang digunakan untuk mencatat perubahan pada file (biasanya kode sumber) seiring waktu. Ini memungkinkan banyak pengembang untuk bekerja secara kolaboratif pada satu proyek tanpa saling menimpa pekerjaan masing-masing.

Beberapa perintah dasar Git meliputi:

| Perintah                  | Fungsi                                            |
| ------------------------- | ------------------------------------------------- |
| `git init`                | Membuat repositori Git baru                       |
| `git clone <url>`         | Mengunduh salinan repo dari remote                |
| `git status`              | Menampilkan status perubahan di direktori kerja   |
| `git add <file>`          | Menambahkan file ke staging area                  |
| `git commit -m <message>` | Menyimpan snapshot perubahan dengan pesan         |
| `git push`                | Mengirim perubahan ke server (remote)             |
| `git pull`                | Mengambil dan menggabungkan perubahan dari remote |

#### Gitignore

Ketika ingin push perubahan kita, terdapat beberapa file yang tidak perlu dipush, seperti `node_modules` dan `.env`. Salah satu solusinya adalah untuk tidak pernah menambahkan mereka dalam commit. Solusi lainnya adalah menggunakan `.gitignore`, dimana seluruh file yang tercantum dalam `.gitignore` tidak dapat ditambahkan dalam commit apapun. Untuk `.gitignore` yang sering digunakan dalam proyek JavaScript, kalian dapat menggunakan [file ini](https://github.com/github/gitignore/blob/main/Node.gitignore).

#### Conventional Commits

Conventional commits merupakan prinsip dalam mendeskripsikan perubahan yang kalian berikan dalam commit kalian.

Format dalam sebuah commit terlihat seperti berikut.

```
<type>[!][(scope)]: <description>

[body]

[footer]
```

| Bagian      | Deskripsi                         | Wajib |
| ----------- | --------------------------------- | ----- |
| Type        | Tujuan dari commit                | ✅    |
| !           | Menandakan BREAKING CHANGE        | ❌    |
| Scope       | Bagian apa yang dipengaruhi       | ❌    |
| Description | Deskripsi singkat dari perubahan  | ✅    |
| Body        | Deskripsi rinci dari perubahan    | ❌    |
| Footer      | Informasi tambahan terkait commit | ❌    |

### What Now?

-   Sering-sering baca dokumentasi.
-   Sering-sering implementasi.
-   Berguru dengan GPT itu gapapah.
-   Kalo mau coba framework lain juga bole.
-   **Kerjain backend TPKB 😊 (ga kerja digigit gerry 😨).**

## Referensi

-   [express.js](https://expressjs.com)
-   [Prisma](https://www.prisma.io/docs)
-   [ChatGPT](https://openai.com/chatgpt/overview)
-   [Claude](https://claude.ai)
