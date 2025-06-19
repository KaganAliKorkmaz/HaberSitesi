import React, { useEffect, useState } from 'react';

function UserNewsPage() {
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:8082'; // Backend'in çalıştığı port

  useEffect(() => {
    const fetchNewsAndAnnouncements = async () => {
      try {
        // Haberleri çek
        const newsResponse = await fetch(`${API_BASE_URL}/api/news`); // Haber endpoint'i varsayıyorum
        if (!newsResponse.ok) {
          throw new Error('Haberler çekilemedi.');
        }
        const newsData = await newsResponse.json();
        setNews(newsData);

        // Duyuruları çek
        const announcementsResponse = await fetch(`${API_BASE_URL}/api/announcements`); // Duyuru endpoint'i varsayıyorum
        if (!announcementsResponse.ok) {
          throw new Error('Duyurular çekilemedi.');
        }
        const announcementsData = await announcementsResponse.json();
        setAnnouncements(announcementsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsAndAnnouncements();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem', marginBottom: '2rem' }}>Haberler ve Duyurular</h1>

      <h2 style={{ marginBottom: '1rem' }}>Haberler</h2>
      {news.length === 0 ? (
        <p>Henüz haber bulunmamaktadır.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {news.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                border: '1px solid #374151',
                borderRadius: '12px',
                padding: '16px',
                minHeight: '80px',
                maxWidth: '900px',
                margin: '0 auto',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '4px' }}>{item.konu}</h3>
                <p style={{ margin: 0, fontSize: '1rem', color: '#374151', maxWidth: '600px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.içerik}</p>
                {item.haber_Linki && <a href={item.haber_Linki} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', fontSize: '0.95rem', display: 'inline-block', marginTop: '4px' }}>Devamını Oku</a>}
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '4px' }}>Geçerlilik Tarihi: {item.gecerlilik_Tarihi}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ margin: '2rem 0 1rem 0' }}>Duyurular</h2>
      {announcements.length === 0 ? (
        <p>Henüz duyuru bulunmamaktadır.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {announcements.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                border: '1px solid #374151',
                borderRadius: '12px',
                padding: '16px',
                minHeight: '80px',
                maxWidth: '900px',
                margin: '0 auto',
                background: '#f9fafb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              {item.imagePath && (
                <img src={item.imagePath} alt="Duyuru Görseli" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', marginRight: '16px' }} />
              )}
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '4px' }}>{item.konu}</h3>
                <p style={{ margin: 0, fontSize: '1rem', color: '#374151', maxWidth: '600px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.içerik}</p>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '4px' }}>Geçerlilik Tarihi: {item.gecerlilik_Tarihi}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserNewsPage; 