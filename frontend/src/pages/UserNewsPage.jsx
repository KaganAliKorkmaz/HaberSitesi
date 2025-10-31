import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserNewsPage() {
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:8082';

  useEffect(() => {
    const fetchNewsAndAnnouncements = async () => {
      try {
        const newsResponse = await axios.get(`${API_BASE_URL}/User/haberler`);
        setNews(newsResponse.data);

        const announcementsResponse = await axios.get(`${API_BASE_URL}/User/duyurular`);
        setAnnouncements(announcementsResponse.data);

      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsAndAnnouncements();
  }, []);

  if (loading) {
    return <div className="text-center text-blue-600">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-center font-bold text-3xl mb-8">Haberler ve Duyurular</h1>

      <h2 className="mb-4 text-xl font-semibold">Haberler</h2>
      {news.length === 0 ? (
        <p>Henüz haber bulunmamaktadır.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {news.map(item => (
            <div
              key={item.id}
              className="flex flex-row items-center border border-gray-600 rounded-xl p-4 min-h-[80px] max-w-[900px] mx-auto bg-white shadow-sm"
            >
              <div className="flex-1 text-left">
                <h3 className="font-bold text-xl mb-1">{item.konu}</h3>
                <p className="m-0 text-base text-gray-600 max-w-[600px] whitespace-normal overflow-hidden text-ellipsis">{item.içerik}</p>
                {item.haber_Linki && <a href={item.haber_Linki} target="_blank" rel="noopener noreferrer" className="text-indigo-500 text-sm inline-block mt-1 hover:underline">Devamını Oku</a>}
                <div className="text-sm text-gray-500 mt-1">Geçerlilik Tarihi: {item.gecerlilik_Tarihi}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-8 mb-4 text-xl font-semibold">Duyurular</h2>
      {announcements.length === 0 ? (
        <p>Henüz duyuru bulunmamaktadır.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {announcements.map(item => (
            <div
              key={item.id}
              className="flex flex-row items-center border border-gray-600 rounded-xl p-4 min-h-[80px] max-w-[900px] mx-auto bg-gray-50 shadow-sm"
            >
              {item.imagePath && (
                <img src={item.imagePath} alt="Duyuru Görseli" className="w-16 h-16 object-cover rounded-lg mr-4" />
              )}
              <div className="flex-1 text-left">
                <h3 className="font-bold text-xl mb-1">{item.konu}</h3>
                <p className="m-0 text-base text-gray-600 max-w-[600px] whitespace-normal overflow-hidden text-ellipsis">{item.içerik}</p>
                <div className="text-sm text-gray-500 mt-1">Geçerlilik Tarihi: {item.gecerlilik_Tarihi}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserNewsPage; 