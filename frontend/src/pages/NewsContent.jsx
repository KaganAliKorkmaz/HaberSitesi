import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:8082';

  const showLoadingForAtLeast = async (promise, minMs = 400) => {
    const start = Date.now();
    const result = await promise;
    const elapsed = Date.now() - start;
    if (elapsed < minMs) {
      await new Promise(res => setTimeout(res, minMs - elapsed));
    }
    return result;
  };

  const fetchNews = async (url = `${API_BASE_URL}/User/haberler`) => {
    try {
      setLoading(true);
      const response = await showLoadingForAtLeast(axios.get(url));
      setNews(response.data);
      setError(null);
    } catch (err) {
      setError('Haberler yüklenirken bir hata oluştu.');
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = async (e) => {
    if (modalOpen) return;
    e.preventDefault();
    if (searchTerm.trim() === '') {
      fetchNews();
    } else {
      try {
        setLoading(true);
        const response = await showLoadingForAtLeast(axios.get(`${API_BASE_URL}/User/haberler/arama?baslik=${encodeURIComponent(searchTerm)}`));
        setNews(response.data);
      } catch (err) {
        setError('Arama yapılırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSortByDate = async () => {
    if (modalOpen) return;
    setSortOrder('dateDesc');
    try {
      setLoading(true);
      const response = await showLoadingForAtLeast(axios.get(`${API_BASE_URL}/User/haberler/sirala/tarih`));
      setNews(response.data);
    } catch (err) {
      setError('Tarihe göre sıralanırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSortByTitle = async () => {
    if (modalOpen) return;
    setSortOrder('titleAsc');
    try {
      setLoading(true);
      const response = await showLoadingForAtLeast(axios.get(`${API_BASE_URL}/User/haberler/sirala/baslik`));
      setNews(response.data);
    } catch (err) {
      setError('Başlığa göre sıralanırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Modal açma ve detay çekme
  const handleNewsClick = async (id) => {
    console.log('clicked news id:', id);
    setModalOpen(true);
    setDetailLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/User/haberler/${id}`);
      setSelectedNews(response.data);
    } catch (err) {
      setError('Haber detayı yüklenemedi.');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNews(null);
  };

  // Metni 94 karaktere kısaltma fonksiyonu
  const truncateText = (text, maxLength = 94) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-full min-h-screen bg-blue-50 max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Haberler</h1>
      <div className="mb-6 flex flex-wrap gap-3 items-center justify-center">
        <input
          type="text"
          placeholder="Başlığa göre ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 text-lg font-medium"
        />
        <button type="submit" onClick={handleSearch} disabled={modalOpen} className={`bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md ${modalOpen ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Ara
        </button>
        <button onClick={handleSortByDate} disabled={modalOpen} className={`bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition duration-300 shadow-md ${modalOpen ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Tarihe Göre Sırala
        </button>
        <button onClick={handleSortByTitle} disabled={modalOpen} className={`bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition duration-300 shadow-md ${modalOpen ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Başlığa Göre Sırala
        </button>
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Yükleniyor...</p>
      ) : error ? (
        <p className="text-red-500 text-center mb-4">{error}</p>
      ) : news.length > 0 ? (
        <div className="flex flex-col gap-8">
          {news.map((item) => (
            <div
                key={item.id}
                className="flex flex-row gap-4 bg-white border-2 border-blue-400 w-full max-w-3xl mx-auto rounded-xl shadow-md hover:scale-[1.01] transition-transform duration-300 p-4 items-start cursor-pointer"
                onClick={() => !modalOpen && handleNewsClick(item.id)}
                style={modalOpen ? { pointerEvents: 'none', opacity: 0.6 } : {}}
            >    
              <div className="flex flex-col flex-1 text-left justify-center">
                <h2 className="text-xl font-bold text-blue-900 mb-1 tracking-tight">{item.konu}</h2>
                <p className="text-blue-700 mb-2 text-left text-base leading-snug overflow-hidden" style={{maxWidth: '100%'}}>
                  {truncateText(item.içerik)}
                </p>
                {item.haber_Linki && <a href={item.haber_Linki} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mb-2 inline-block" onClick={e => e.stopPropagation()}>Devamını Oku</a>}
                <p className="text-sm text-blue-500 mt-1">Geçerlilik Tarihi: {new Date(item.gecerlilikTarihi).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-blue-600 text-center">Haber bulunamadı.</p>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative border-4 border-blue-400 flex flex-col items-center animate-fade-in">
            <button onClick={closeModal} className="absolute top-3 right-4 text-blue-600 hover:text-blue-800 text-3xl font-bold transition-colors">&times;</button>
            {detailLoading ? (
              <p className="text-center text-lg text-blue-600">Detay yükleniyor…</p>
            ) : (
              <>
                <h3 className="text-3xl font-extrabold mb-4 text-center text-blue-700 tracking-tight drop-shadow">{selectedNews?.konu}</h3>
                <p className="mb-6 text-blue-800 text-center text-lg leading-relaxed">{selectedNews?.içerik}</p>
                {selectedNews?.haber_Linki && (
                  <a href={selectedNews.haber_Linki} target="_blank" rel="noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors mb-4"
                    onClick={e => e.stopPropagation()}>
                    Devamını Oku
                  </a>
                )}
                <p className="text-sm text-blue-500 text-center mt-2">Geçerlilik Tarihi: {selectedNews?.gecerlilikTarihi ? new Date(selectedNews.gecerlilikTarihi).toLocaleDateString() : ''}</p>
              </>
            )}
            <button onClick={closeModal}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage; 