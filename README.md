# Haber Sitesi Web Uygulaması

## 📋 Açıklama

Bu proje, bir web sitesinde dinamik olarak yönetilebilen **Haberler** ve **Duyurular** bölümlerini içerir. Admin paneli üzerinden Haber ve Duyuru ekleme, düzenleme ve silme işlemleri yapılabilir; kullanıcı ekranında ise listelenen Haberler ve Duyurular detaylı bir şekilde görüntülenir.

## 🛠️ Teknolojiler

### Backend
- **Java 17**
- **Spring Boot 3.4.5** (Spring Web, Spring Data JPA, Spring WebSocket)
- **Hibernate / JPA**
- **MySQL**
- **Lombok**
- **Maven**

### Frontend
- **React 19**
- **Vite 6**
- **Tailwind CSS 4**
- **Axios**
- **React Router 7**
- **WebSocket** (SockJS + STOMP)

## ✨ Özellikler

- **Haberler ve Duyurular** tek bir `Etkinlik` abstract sınıfından extend edilerek **Single Table Inheritance** ile tek tabloda saklanır
- **Haberler** için: başlık, içerik, geçerlilik tarihi, link
- **Duyurular** için: başlık, içerik, geçerlilik tarihi, resim (dosya sistemi)
- **Admin ekranı:** Haberler ve Duyurular için CRUD işlemleri
- **Kullanıcı ekranı:** Listeleme, popup ile detay gösterimi, arama ve sıralama
- **WebSocket** ile yeni duyurular anlık olarak tüm kullanıcı ekranlarına iletilir
- **Responsive Design:** Mobil, tablet ve desktop uyumlu

## 📦 Gereksinimler

- Java 17 veya üstü
- Maven 3.6+ 
- Node.js 18+ ve npm 8+
- MySQL veritabanı

## 🚀 Kurulum ve Çalıştırma

### 1. Veritabanı Ayarları

MySQL'de `projedb` veritabanını oluşturun:

```sql
CREATE DATABASE projedb;
CREATE USER 'springuser'@'localhost' IDENTIFIED BY 'springpass';
GRANT ALL PRIVILEGES ON projedb.* TO 'springuser'@'localhost';
FLUSH PRIVILEGES;
```

Backend konfigürasyonu: `backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/projedb?...
spring.datasource.username=springuser
spring.datasource.password=springpass
```

### 2. Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend `http://localhost:8082` adresinde çalışacaktır.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışacaktır.

## 🎯 Kullanım

### Yönetici Hesabı

Admin panelini kullanabilmek için önce kayıt olup ardından giriş yapmanız gerekmektedir:

- **Kullanıcı adı:** `admin123`
- **Şifre:** `123456`

### Erişim URL'leri

- `http://localhost:5173/` - Kullanıcı arayüzü (Vite sunucusu)
- `http://localhost:5173/admin` - Admin paneli
- `http://localhost:8082` - Backend API

## 📚 Detaylı Dokümantasyon

- **[Backend Geliştirici Notları](./backend/HELP.md)** - API endpoints, veritabanı yapısı, konfigürasyon
- **[Frontend Geliştirici Notları](./frontend/README.md)** - Proje yapısı, teknolojiler, özellikler

## 🔧 Proje Yapısı

```
HaberSitesi/
├── backend/               # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/     # Java kaynak kodları
│   │       └── resources/ # Konfigürasyon dosyaları
│   ├── pom.xml           # Maven bağımlılıkları
│   └── HELP.md           # Backend dokümantasyonu
├── frontend/              # React frontend
│   ├── src/
│   │   ├── pages/        # Sayfa bileşenleri
│   │   ├── components/   # Yeniden kullanılabilir bileşenler
│   │   ├── App.jsx       # Ana uygulama
│   │   └── main.jsx      # Giriş noktası
│   ├── package.json      # NPM bağımlılıkları
│   └── README.md         # Frontend dokümantasyonu
└── README.md             # Ana dokümantasyon
```

## ⚠️ Bilinen Eksiklikler ve Yapılacaklar

- **Şifreleme yöntemleri** henüz eklenmedi, kullanıcı doğrulama ve veri şifreleme işlemleri uygulanmalı
- **WebSocket** tasarımı yalnızca duyurulara uygulanmış durumda; tüm gerçek zamanlı işlemler (Haber ekleme, silme vb.) için genişletilebilir
- Kullanıcı arayüzü daha **kullanışlı** ve **erişilebilir** olacak şekilde iyileştirilmeli
- **Spring Security** entegrasyonu
- **JWT** token tabanlı authentication

## 🔒 Güvenlik Notları

⚠️ **BU PROJE ÜRETIM ORTAMI İÇİN TASARLANMAMIŞTIR!**

- Şifreler plain text olarak saklanır
- JWT/Spring Security kullanılmaz
- Sadece role-based basit auth var
- CORS tüm header'lara açık

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👤 Yazar

Bu proje eğitim/öğretim amaçlı geliştirilmiştir.

## 📖 Referanslar

- [Spring Boot Dokümantasyonu](https://spring.io/projects/spring-boot)
- [React Dokümantasyonu](https://react.dev)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com)
- [MySQL Dokümantasyonu](https://dev.mysql.com/doc/)
