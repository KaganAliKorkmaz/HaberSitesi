<h1>Haber Sitesi Web Uygulaması</h1>

<h2>Açıklama</h2>
<p>Bu proje, bir derneğin web sitesinde dinamik olarak yönetilebilen Haberler ve Duyurular bölümlerini içerir. Admin paneli üzerinden Haber ve Duyuru ekleme, düzenleme ve silme işlemleri yapılabilir; kullanıcı ekranında ise listelenen Haberler ve Duyurular detaylı bir şekilde görüntülenir.</p>

<h2>Teknolojiler</h2>
<ul>
  <li><strong>Backend:</strong> Java, Spring Boot, Hibernate</li>
  <li><strong>Database:</strong> PostgreSQL</li>
  <li><strong>Frontend:</strong> React, Vite, Tailwind CSS</li>
  <li><strong>Gerçek Zamanlı İletişim:</strong> WebSocket (SockJS + STOMP)</li>
</ul>

<h2>Özellikler</h2>
<ul>
  <li>Haberler ve Duyurular tek bir <code>Etkinlik</code> abstract sınıfından extend edilerek tek tabloda saklanır.</li>
  <li>Haberler için: başlık, içerik, geçerlilik tarihi, link</li>
  <li>Duyurular için: başlık, içerik, geçerlilik tarihi, resim (dosya sistemi)</li>
  <li>Admin ekranı: Haberler ve Duyurular için CRUD işlemleri</li>
  <li>Kullanıcı ekranı: Listeleme, popup ile detay gösterimi</li>
  <li>WebSocket ile yeni duyurular anlık olarak tüm kullanıcı ekranlarına iletilir</li>
</ul>

<h2>Gereksinimler</h2>
<ul>
  <li>Java 17 veya üstü</li>
  <li>Maven 3.6+ veya Maven Wrapper (<code>./mvnw</code>)</li>
  <li>Node.js 18+ ve npm 8+ (veya yarn)</li>
  <li>PostgreSQL veritabanı</li>
</ul>

<h2>Kurulum ve Çalıştırma</h2>

<h3>Backend</h3>
<pre><code>cd backend
./mvnw clean install
./mvnw spring-boot:run
</code></pre>

<h3>Frontend</h3>
<pre><code>cd frontend
npm install
npm run dev
</code></pre>

<h2>Kullanım</h2>
<ul>
  <li><code>http://localhost:8082/admin</code> - Admin paneli</li>
  <li><code>http://localhost:5173</code> - Kullanıcı sayfası (Vite geliştirme sunucusu)</li>
</ul>

<h2>Bilinen Eksiklikler ve Yapılacaklar</h2>
<ul>
  <li><strong>Şifreleme yöntemleri</strong> henüz eklenmedi, kullanıcı doğrulama ve veri şifreleme işlemleri uygulanmalı.</li>
  <li>Mevcut <strong>güvenlik açıkları</strong> (örneğin CSRF, XSS korumaları) iyileştirilmeli.</li>
  <li><strong>WebSocket</strong> tasarımı yalnızca duyurulara uygulanmış durumda; tüm gerçek zamanlı işlemler (Haber ekleme, silme vb.) için genişletilebilir.</li>
  <li>Kullanıcı arayüzü daha <strong>kullanışlı</strong> ve <strong>erişilebilir</strong> olacak şekilde iyileştirilmeli.</li>
</ul>

<h2>Lisans</h2>
<p>Bu proje açık kaynaklıdır. Dilediğiniz gibi kullanabilir ve katkıda bulunabilirsiniz.</p>
