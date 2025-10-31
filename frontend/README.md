# Frontend - Haber Sitesi

React ve Vite ile geliştirilmiş modern web arayüzü.

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları kurun
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Production build oluşturun
npm run build

# Production build'i önizleyin
npm run preview
```

## 📦 Kullanılan Teknolojiler

- **React 19** - UI framework
- **Vite 6** - Build tool
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **React Router 7** - Routing
- **@stomp/stompjs** - WebSocket client

## 🗂️ Proje Yapısı

```
src/
├── pages/                # Sayfa bileşenleri
│   ├── UserPage.jsx      # Kullanıcı ana sayfası
│   ├── AdminPage.jsx     # Admin ana sayfası
│   ├── NewsContent.jsx   # Haberler içeriği
│   ├── DuyurularPage.jsx # Duyurular içeriği
│   ├── AdminNewsPage.jsx # Haber yönetimi (Admin)
│   └── AdminAnnouncementsPage.jsx # Duyuru yönetimi (Admin)
├── components/           # Yeniden kullanılabilir bileşenler
├── App.jsx               # Ana uygulama
├── main.jsx              # Giriş noktası
└── index.css             # Global stiller
```

## 🔗 API Entegrasyonu

Backend ile iletişim için `axios` kullanılır:

```javascript
const API_BASE_URL = 'http://localhost:8082';
```

## 🎨 Styling

Proje **Tailwind CSS** kullanır. Tüm UI bileşenleri utility class'lar ile oluşturulmuştur.

## 🔌 WebSocket Entegrasyonu

Gerçek zamanlı duyuru bildirimleri için WebSocket kullanılır:

```javascript
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const client = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8082/ws'),
    onConnect: () => {
        client.subscribe('/topic/duyurular', ({ body }) => {
            // Yeni duyuru geldi
        });
    },
});
```

## 🔐 Authentication

Kullanıcı authentication state'i `localStorage` ile yönetilir:

```javascript
// Login sonrası
localStorage.setItem('user', JSON.stringify(userData));

// Logout
localStorage.removeItem('user');
```

## 📱 Responsive Design

Tüm sayfalar responsive olarak tasarlanmıştır:
- Mobil: Tam genişlik
- Tablet: Orta genişlik
- Desktop: Max genişlik sınırlı

## 🎯 Özellikler

### Admin Paneli
- ✅ CRUD işlemleri (Haber ve Duyuru)
- ✅ Anında WebSocket bildirimleri
- ✅ Başarı/Hata mesajları
- ✅ Modal onayları

### Kullanıcı Paneli
- ✅ Haberleri listeleme
- ✅ Arama fonksiyonu
- ✅ Sıralama seçenekleri
- ✅ Detaylı görüntüleme
- ✅ Canlı duyuru bildirimleri
- ✅ Loading states

## 🔧 Konfigürasyon

### ESLint
Proje ESLint ile yapılandırılmıştır:
```bash
npm run lint
```

### Tailwind
Tailwind konfigürasyonu `tailwind.config.cjs` içinde:
- Content: `./index.html, ./src/**/*.{js,jsx}`

## 🚨 Bilinen Sorunlar

- `UserNewsPage.jsx` dosyası mevcut değil, `UserPage.jsx` ve `NewsContent.jsx` kullanılır
- Inline styles kullanımı minimalize edilmiştir
- Bazı konsol log'ları temizlenmemiş olabilir

## 📝 Notlar

- Frontend development server otomatik hot reload yapar
- Backend 8082 portunda çalışmalıdır
- CORS ayarları backend tarafında yapılır
- WebSocket bağlantısı duyurular için kullanılır

## 🛠️ Geliştirme

### Yeni Sayfa Ekleme
1. `src/pages/` klasörüne yeni dosya ekle
2. `App.jsx` içinde route tanımla:
```jsx
<Route path="/yeni-sayfa" element={<YeniSayfa />} />
```

### Yeni Component Ekleme
1. `src/components/` klasörüne ekle
2. Gerekirse `App.jsx` veya ilgili sayfada import et

### Stil Ekleme
Tailwind utility class'larını kullan:
```jsx
<div className="bg-blue-600 text-white p-4 rounded-lg">
  İçerik
</div>
```

## 📚 Referanslar

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)
