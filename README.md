## Initiate Automation Project
Project automation menggunakan [Node.js](https://nodejs.org/en/download) sebagai package manager

Run command berikut pada terminal:
```
npm install selenium-webdriver
npm install chromedriver // jika menggunakan chrome pastikan versi chromedriver sama dengan versi browser
npm install dotenv
```
---
### Setup Allure Report
- Install dependencies yaitu allure-report run command berikut:
```
npm install allure-commandline
npm install allure-mocha
```

---

### Run Selenium dan Allure Report
- Pertama command untuk menjalankan test tanpa generate file `.json` gunakan `npm test` atau `npm test <path>`.
- Jalankan `npm run report` untuk generate folder `allure-report` 
- Kemudian jalankan `npm run start` pada terminal untuk meluncurkan allure-report pada browser dengan port `8080` (jangan stop/close/ctrl+c terminal)
- Kemudian run selenium test yang diinginkan pada terminal lain dan akan generate folder `allure-results` secara otomatis.
```
npm run generate
npm run generate <path> // untuk path spesifik
```
- Dan jalankan `npm run report` dan klik tombol refresh halaman port 8080.

---

