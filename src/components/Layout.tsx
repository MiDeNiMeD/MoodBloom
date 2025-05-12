import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.h1 
            className="text-xl font-semibold text-primary-600 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl">🌱</span> MoodBloom
          </motion.h1>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default Layout;