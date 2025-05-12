import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, PlusCircle, Award, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/log', icon: <PlusCircle size={24} />, label: 'Log Mood' },
    { path: '/analytics', icon: <BarChart3 size={24} />, label: 'Analytics' },
    { path: '/achievements', icon: <Award size={24} />, label: 'Achievements' },
    { path: '/settings', icon: <Settings size={24} />, label: 'Settings' },
  ];

  return (
    <motion.nav 
      className="sticky bottom-0 bg-white shadow-lg border-t border-neutral-200"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-3 px-2 ${
                  isActive
                    ? 'text-primary-500'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`
              }
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;