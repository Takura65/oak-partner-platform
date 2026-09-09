import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registration from './pages/Registration';

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '15px', background: '#f4f4f4', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <strong>OAK Platform</strong>
        <Link to="/">Registration</Link>
      </nav>
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Registration />} />
        </Routes>
      </main>
    </Router>
  );
}