import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LogMood from './pages/LogMood';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import { MoodProvider } from './contexts/MoodContext';

function App() {
  return (
    <MoodProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="log" element={<LogMood />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="achievements" element={<LogMood />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </MoodProvider>
  );
}

export default App;