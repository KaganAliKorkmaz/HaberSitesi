import React, { useState, useEffect } from 'react';
import NewsContent from './NewsContent'; // Eski UserPage.jsx içeriği
import DuyurularPage from './DuyurularPage';

const UserPage = () => {
  const [activeContent, setActiveContent] = useState('news'); // 'news' veya 'announcements'
  const [showWelcome, setShowWelcome] = useState(true); // Welcome mesajının görünürlüğünü kontrol eder

  useEffect(() => {
    // Sayfa yüklendiğinde veya user değiştiğinde (login sonrası gibi) welcome mesajını göster
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000); // 5 saniye sonra gizle

    return () => clearTimeout(timer); // Bileşen unmount edildiğinde zamanlayıcıyı temizle
  }, []); // Bağımlılık dizisi boş olduğu için sadece bir kez çalışır

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col items-center"> {/* En üst wrapper gri arka plan */}
      {showWelcome && (
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 animate-fade-in">Welcome, User!</h1>
      )}
      <div className="flex justify-center gap-4 mb-8"> {/* Butonlar için boşluk ve ortalama */}
        <button
          onClick={() => setActiveContent('news')}
          className={`px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out
            ${activeContent === 'news' ? 'bg-blue-600 text-white transform scale-105' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Haberler
        </button>
        <button
          onClick={() => setActiveContent('announcements')}
          className={`px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out
            ${activeContent === 'announcements' ? 'bg-green-600 text-white transform scale-105' : 'bg-green-500 text-white hover:bg-green-600'}`}
        >
          Duyurular
        </button>
      </div>

      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl"> {/* İçerik kutusu beyaz */}
        {activeContent === 'news' ? <NewsContent /> : <DuyurularPage />}
      </div>
    </div>
  );
};

export default UserPage; 