import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8082";

export default function UserPage() {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/User/haberler`);
      setNewsList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = newsList.filter((news) =>
    news.konu?.toLowerCase().includes(search.toLowerCase())
  );

  const sortByDate = () => {
    setNewsList([...newsList].sort((a, b) => new Date(b.gecerlilikTarihi) - new Date(a.gecerlilikTarihi)));
  };

  const sortByTitle = () => {
    setNewsList([...newsList].sort((a, b) => (a.konu || '').localeCompare(b.konu || '')));
  };

  const gotoAnnouncements = () => {
    navigate("/user/announcements");
  };

  const handleNewsClick = async (id) => {
    setModalOpen(true);
    setSelectedNews(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/User/haberler/${id}`);
      setSelectedNews(response.data);
    } catch (err) {
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
          📢 Haberler
        </h1>

        {/* Search + Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Başlığa göre ara..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={sortByDate}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Tarihe Göre Sırala
          </button>

          <button
            onClick={sortByTitle}
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Başlığa Göre Sırala
          </button>
        </div>

        {/* Announcements Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={gotoAnnouncements}
            className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition shadow-sm"
          >
            Duyurulara Git →
          </button>
        </div>

        {/* News Cards */}
        <div className="space-y-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <div
                key={news.id}
                onClick={() => !modalOpen && handleNewsClick(news.id)}
                className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
                style={modalOpen ? { pointerEvents: 'none', opacity: 0.6 } : {}}
              >
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {news.konu}
                </h2>
                <p className="text-gray-700 mb-2 line-clamp-2">
                  {news.içerik || "İçerik bulunamadı"}
                </p>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>📅 {news.gecerlilikTarihi || "Tarih yok"}</span>
                  {news.haber_Linki && (
                    <a 
                      href={news.haber_Linki} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Devamını Oku →
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              Haber bulunamadı...
            </p>
          )}
        </div>

      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative border-4 border-blue-400 flex flex-col items-center animate-fade-in">
            <button onClick={closeModal} className="absolute top-3 right-4 text-blue-600 hover:text-blue-800 text-3xl font-bold transition-colors">&times;</button>
            {!selectedNews ? (
              <p className="text-center text-lg text-blue-600">Detay yükleniyor…</p>
            ) : (
              <>
                <h3 className="text-3xl font-extrabold mb-4 text-center text-blue-700 tracking-tight drop-shadow">{selectedNews.konu}</h3>
                <p className="mb-6 text-blue-800 text-center text-lg leading-relaxed">{selectedNews.içerik}</p>
                {selectedNews.haber_Linki && (
                  <a href={selectedNews.haber_Linki} target="_blank" rel="noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors mb-4"
                    onClick={(e) => e.stopPropagation()}>
                    Devamını Oku
                  </a>
                )}
                <p className="text-sm text-blue-500 text-center mt-2">Geçerlilik Tarihi: {selectedNews.gecerlilikTarihi ? new Date(selectedNews.gecerlilikTarihi).toLocaleDateString() : ''}</p>
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
}
