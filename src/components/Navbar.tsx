
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Guides', id: 'guides' },
    { name: 'Resources', id: 'resources' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-b-2xl ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-transparent'
    }`} style={{boxShadow: isScrolled ? '0 4px 24px 0 rgba(80,80,180,0.07)' : undefined}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg transition-all duration-300 hover:scale-105">
              FirstPush
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { scrollToSection(item.id); setActive(item.name); }}
                  className={`relative px-3 py-2 text-base font-semibold rounded-lg transition-all duration-200
                    ${active === item.name ? 'text-blue-600' : 'text-gray-700'}
                    hover:text-blue-600
                    hover:bg-blue-50
                    focus:outline-none
                    group
                  `}
                  style={{fontWeight: active === item.name ? 700 : 500}}
                >
                  <span className="transition-transform duration-200 group-hover:scale-105 group-hover:underline">
                    {item.name}
                  </span>
                  {active === item.name && (
                    <span className="absolute left-1/2 -bottom-1 w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -translate-x-1/2"></span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50"
              >
                <User className="h-4 w-4 mr-1" />
                Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50"
              >
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg rounded-b-2xl animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { scrollToSection(item.id); setActive(item.name); }}
                className={`block w-full text-left px-3 py-2 text-base font-semibold rounded-lg transition-all duration-200
                  ${active === item.name ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}
                  hover:text-blue-600 hover:bg-blue-50
                `}
                style={{fontWeight: active === item.name ? 700 : 500}}
              >
                {item.name}
              </button>
            ))}
            <Link
              to="/profile"
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
