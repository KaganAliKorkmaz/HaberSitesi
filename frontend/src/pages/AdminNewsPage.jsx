import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8082';

const AdminNewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNews, setNewNews] = useState({ konu: '', içerik: '', gecerlilikTarihi: '', haber_Linki: '' });
  const [editId, setEditId] = useState(null);
  const [editNews, setEditNews] = useState({ konu: '', içerik: '', gecerlilikTarihi: '', haber_Linki: '' });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/User/haberler`);
      setNews(res.data);
      setError(null);
    } catch (err) {
      setError('Haberler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleInputChange = (e) => {
    setNewNews({ ...newNews, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditNews({ ...editNews, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/haber`, {
        konu: newNews.konu,
        içerik: newNews.içerik,
        gecerlilikTarihi: newNews.gecerlilikTarihi,
        haber_Linki: newNews.haber_Linki
      });
      setNewNews({ konu: '', içerik: '', gecerlilikTarihi: '', haber_Linki: '' });
      fetchNews();
    } catch (err) {
      setError('Haber eklenemedi.');
    }
  };

  const handleEdit = (newsItem) => {
    setEditId(newsItem.id);
    setEditNews({
      konu: newsItem.konu,
      içerik: newsItem.içerik,
      gecerlilikTarihi: newsItem.gecerlilikTarihi,
      haber_Linki: newsItem.haber_Linki || ''
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/haber/${id}`, {
        konu: editNews.konu,
        içerik: editNews.içerik,
        gecerlilikTarihi: editNews.gecerlilikTarihi,
        haber_Linki: editNews.haber_Linki
      });
      setEditId(null);
      fetchNews();
    } catch (err) {
      setError('Haber güncellenemedi.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu haberi silmek istediğinize emin misiniz?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/haber/${id}`);
      fetchNews();
    } catch (err) {
      setError('Haber silinemedi.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Admin - Haberler Yönetimi
          </h1>
          <Link 
            to="/admin" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Ana Sayfaya Dön
          </Link>
        </div>

        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-xl mb-8 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input 
              name="konu" 
              value={newNews.konu} 
              onChange={handleInputChange} 
              required 
              placeholder="Başlık" 
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
            />
            <input 
              name="haber_Linki" 
              value={newNews.haber_Linki} 
              onChange={handleInputChange} 
              placeholder="Haber Linki" 
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
            />
            <input 
              name="gecerlilikTarihi" 
              value={newNews.gecerlilikTarihi} 
              onChange={handleInputChange} 
              required 
              type="date" 
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
            />
            <input 
              name="içerik" 
              value={newNews.içerik} 
              onChange={handleInputChange} 
              required 
              placeholder="İçerik" 
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Haber Ekle
            </button>
          </div>
      </form>

      {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
      ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
      ) : (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
          <thead>
                  <tr className="bg-blue-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Başlık</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">İçerik</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Tarih</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Link</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">İşlemler</th>
            </tr>
          </thead>
                <tbody className="divide-y divide-blue-100">
            {news.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50 transition-colors duration-200">
                {editId === item.id ? (
                  <>
                          <td className="px-6 py-4">
                            <input 
                              name="konu" 
                              value={editNews.konu} 
                              onChange={handleEditInputChange} 
                              className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              name="içerik" 
                              value={editNews.içerik} 
                              onChange={handleEditInputChange} 
                              className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              name="gecerlilikTarihi" 
                              value={editNews.gecerlilikTarihi} 
                              onChange={handleEditInputChange} 
                              type="date" 
                              className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              name="haber_Linki" 
                              value={editNews.haber_Linki} 
                              onChange={handleEditInputChange} 
                              className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleUpdate(item.id)} 
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Kaydet
                              </button>
                              <button 
                                onClick={() => setEditId(null)} 
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Vazgeç
                              </button>
                            </div>
                    </td>
                  </>
                ) : (
                  <>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.konu}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 line-clamp-2 max-w-xs">{item.içerik}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.gecerlilikTarihi}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.haber_Linki && (
                              <a 
                                href={item.haber_Linki} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                              >
                                {item.haber_Linki}
                              </a>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEdit(item)} 
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Düzenle
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)} 
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Sil
                              </button>
                            </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
            </div>
          </div>
      )}
      </div>
    </div>
  );
};

export default AdminNewsPage; 