import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8082';

const AdminAnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
  const [newAnnouncement, setNewAnnouncement] = useState({ 
    konu: '', 
    içerik: '', 
    gecerlilikTarihi: '', 
    imagePath: '' 
  });
  const [editId, setEditId] = useState(null);
  const [editAnnouncement, setEditAnnouncement] = useState({ 
    konu: '', 
    içerik: '', 
    gecerlilikTarihi: '', 
    imagePath: '' 
  });

  // Simple popup system
  const showPopup = (message, type = 'success') => {
    setPopup({ show: true, message, type });
  };

  const closePopup = () => {
    setPopup({ show: false, message: '', type: 'success' });
  };

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/User/duyurular`);
      setAnnouncements(res.data);
    } catch (err) {
      showPopup('Duyurular yüklenemedi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleInputChange = (e) => {
    setNewAnnouncement({ ...newAnnouncement, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditAnnouncement({ ...editAnnouncement, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/duyuru`, {
        konu: newAnnouncement.konu,
        içerik: newAnnouncement.içerik,
        gecerlilikTarihi: newAnnouncement.gecerlilikTarihi,
        imagePath: newAnnouncement.imagePath
      });
      
      const newItem = response.data;
      setAnnouncements(prev => [newItem, ...prev]);
      setNewAnnouncement({ konu: '', içerik: '', gecerlilikTarihi: '', imagePath: '' });
      showPopup('Duyuru başarıyla eklendi!', 'success');
    } catch (err) {
      showPopup('Duyuru eklenemedi.', 'error');
    }
  };

  const handleEdit = (announcement) => {
    setEditId(announcement.id);
    setEditAnnouncement({
      konu: announcement.konu,
      içerik: announcement.içerik,
      gecerlilikTarihi: announcement.gecerlilikTarihi,
      imagePath: announcement.imagePath || ''
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/duyuru/${id}`, {
        konu: editAnnouncement.konu,
        içerik: editAnnouncement.içerik,
        gecerlilikTarihi: editAnnouncement.gecerlilikTarihi,
        imagePath: editAnnouncement.imagePath
      });
      
      setAnnouncements(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item, ...editAnnouncement }
            : item
        )
      );
      
      setEditId(null);
      showPopup('Duyuru başarıyla güncellendi!', 'success');
    } catch (err) {
      showPopup('Duyuru güncellenemedi.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu duyuruyu silmek istediğinize emin misiniz?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/duyuru/${id}`);
      setAnnouncements(prev => prev.filter(item => item.id !== id));
      showPopup('Duyuru başarıyla silindi!', 'success');
    } catch (err) {
      showPopup('Duyuru silinemedi.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
      {/* Popup Component */}
      {popup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`max-w-md w-full mx-4 p-6 rounded-lg shadow-xl ${
            popup.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {popup.type === 'success' ? (
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                )}
                <h3 className={`text-lg font-semibold ${
                  popup.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {popup.type === 'success' ? 'Başarılı!' : 'Hata!'}
                </h3>
              </div>
              <button
                onClick={closePopup}
                className={`p-1 rounded-full hover:bg-opacity-20 ${
                  popup.type === 'success' 
                    ? 'text-green-600 hover:bg-green-600' 
                    : 'text-red-600 hover:bg-red-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <p className={`${
              popup.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {popup.message}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closePopup}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  popup.type === 'success'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
            Admin - Duyurular Yönetimi
          </h1>
          <Link 
            to="/admin" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Ana Sayfaya Dön
          </Link>
        </div>

        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-xl mb-8 border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input 
              name="konu" 
              value={newAnnouncement.konu} 
              onChange={handleInputChange} 
              required 
              placeholder="Başlık" 
              className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
            />
            <input 
              name="imagePath" 
              value={newAnnouncement.imagePath} 
              onChange={handleInputChange} 
              placeholder="Görsel URL" 
              className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
            />
            <input 
              name="gecerlilikTarihi" 
              value={newAnnouncement.gecerlilikTarihi} 
              onChange={handleInputChange} 
              required 
              type="date" 
              className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
            />
            <input 
              name="içerik" 
              value={newAnnouncement.içerik} 
              onChange={handleInputChange} 
              required 
              placeholder="İçerik (max 75 char)" 
              className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
              maxLength={74}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              type="submit" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Duyuru Ekle
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Başlık</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">İçerik</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Tarih</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">Görsel</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-900">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-100">
                  {announcements.map((item) => (
                    <tr key={item.id} className="hover:bg-green-50 transition-colors duration-200">
                      {editId === item.id ? (
                        <>
                          <td className="px-6 py-4">
                            <input 
                              name="konu" 
                              value={editAnnouncement.konu} 
                              onChange={handleEditInputChange} 
                              className="w-full px-3 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              name="içerik" 
                              value={editAnnouncement.içerik} 
                              onChange={handleEditInputChange} 
                              className="w-full px-3 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
                              maxLength={74}
                              placeholder="İçerik (max 75 ch)"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              name="gecerlilikTarihi" 
                              value={editAnnouncement.gecerlilikTarihi} 
                              onChange={handleEditInputChange} 
                              type="date" 
                              className="w-full px-3 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              name="imagePath" 
                              value={editAnnouncement.imagePath} 
                              onChange={handleEditInputChange} 
                              className="w-full px-3 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
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
                            {item.imagePath && (
                              <img 
                                src={item.imagePath} 
                                alt={item.konu} 
                                className="w-16 h-16 object-cover rounded-lg shadow-md"
                              />
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

export default AdminAnnouncementsPage; 