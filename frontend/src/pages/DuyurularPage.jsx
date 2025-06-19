import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const DuyurularPage = () => {
    const [duyurular, setDuyurular] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const showLoadingForAtLeast = async (promise, minMs = 1000) => {
        const start = Date.now();
        const result = await promise;
        const elapsed = Date.now() - start;
        if (elapsed < minMs) {
            await new Promise(res => setTimeout(res, minMs - elapsed));
        }
        return result;
    };

    const fetchDuyurular = async () => {
        try {
            setLoading(true);
            const response = await showLoadingForAtLeast(axios.get('http://localhost:8082/User/duyurular'));
            setDuyurular(response.data);
            setError(null);
        } catch (err) {
            setError('Duyurular yüklenirken bir hata oluştu.');
            setDuyurular([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            fetchDuyurular();
            return;
        }
        try {
            setLoading(true);
            const response = await showLoadingForAtLeast(axios.get(`http://localhost:8082/User/duyurular/arama?konu=${searchTerm}`));
            setDuyurular(response.data);
        } catch (err) {
            setError('Arama yapılırken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleSortByDate = async () => {
        try {
            setLoading(true);
            const response = await showLoadingForAtLeast(axios.get('http://localhost:8082/User/duyurular/sirala/tarih'));
            setDuyurular(response.data);
        } catch (err) {
            setError('Sıralama yapılırken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleSortByTitle = async () => {
        try {
            setLoading(true);
            const response = await showLoadingForAtLeast(axios.get('http://localhost:8082/User/duyurular/sirala/konu'));
            setDuyurular(response.data);
        } catch (err) {
            setError('Sıralama yapılırken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    // Metni 74 karaktere kısaltma fonksiyonu
    const truncateText = (text, maxLength = 74) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    useEffect(() => {
        // Başlangıçta listeyi çek
        axios.get('http://localhost:8082/User/duyurular')
            .then(res => {
                setDuyurular(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // STOMP client oluştur
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8082/ws'),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/duyurular', ({ body }) => {
                    const newDuyuru = JSON.parse(body);
                    setDuyurular(prev => [newDuyuru, ...prev]);
                });
            },
        });
        client.activate();
        return () => client.deactivate();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center tracking-tight">Duyurular</h1>
            <div className="mb-8 flex flex-wrap gap-4 items-center justify-center">
                <input
                    type="text"
                    placeholder="Konuya göre ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow border border-green-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-14 text-xl font-medium max-w-md"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-7 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md text-lg font-bold"
                >
                    Ara
                </button>
                <button
                    onClick={handleSortByDate}
                    className="bg-green-600 text-white px-7 py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md text-lg font-bold"
                >
                    Tarihe Göre Sırala
                </button>
                <button
                    onClick={handleSortByTitle}
                    className="bg-purple-600 text-white px-7 py-3 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md text-lg font-bold"
                >
                    Başlığa Göre Sırala
                </button>
            </div>

            {loading ? (
                <p className="text-center text-green-500 text-xl">Yükleniyor...</p>
            ) : error ? (
                <p className="text-red-500 text-center mb-4 text-lg">{error}</p>
            ) : duyurular.length > 0 ? (
                <div className="flex flex-col gap-6 w-full">
                    {duyurular.map((duyuru) => (
                        <div
                            key={duyuru.id}
                            className="flex flex-row items-center gap-6 bg-white border-2 border-green-400 w-full rounded-2xl shadow-lg hover:scale-[1.01] transition-transform duration-300 p-6"
                        >
                            <div className="flex items-center justify-center w-28 h-28 bg-green-50 border border-green-200 rounded-xl overflow-hidden mr-6 flex-shrink-0">
                                {duyuru.imagePath ? (
                                    <img 
                                        src={duyuru.imagePath} 
                                        alt={duyuru.konu} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-green-400 text-5xl">📢</span>
                                )}
                            </div>
                            <div className="flex flex-col flex-1 justify-center">
                                <h2 className="text-2xl font-extrabold text-green-900 mb-2 leading-tight">{duyuru.konu}</h2>
                                <p className="text-green-800 text-lg font-medium mb-2 leading-snug" style={{maxWidth: '100%'}}>
                                    {truncateText(duyuru.içerik)}
                                </p>
                                <p className="text-base text-green-500 mt-1 font-semibold">Geçerlilik Tarihi: {new Date(duyuru.gecerlilikTarihi).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-green-600 text-center text-lg">Duyuru bulunamadı.</p>
            )}
        </div>
    );
};

export default DuyurularPage; 