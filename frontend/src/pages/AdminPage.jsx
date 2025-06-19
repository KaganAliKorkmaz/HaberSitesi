import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>
      <div className="flex gap-6">
        <Link to="/admin/news" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Haberler Yönetimi</Link>
        <Link to="/admin/announcements" className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition">Duyurular Yönetimi</Link>
      </div>
    </div>
  );
};

export default AdminPage; 