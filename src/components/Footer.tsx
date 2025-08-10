
import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const quickLinks = [
    { name: 'GitHub Guide', path: '/guides/github' },
    { name: 'LinkedIn Guide', path: '/guides/linkedin' },
    { name: 'Portfolio Guide', path: '/guides/portfolio' },
    { name: 'Resume Guide', path: '/guides/resume' }
  ];

  const resources = [
    { name: 'Templates & Tools', path: '/resources/templates' },
    { name: 'Learning Resources', path: '/resources/learning' },
    { name: 'Community', path: '/resources/community' },
    { name: 'Profile', path: '/profile' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-indigo-950 text-gray-300 shadow-2xl pt-12">
      <div className="section-divider absolute top-0 left-0 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              FirstPush
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Empowering the next generation of developers to take their first step into tech with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="mr-4 hover:text-white" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              <a href="mailto:firstpush.delta@gmail.com" className="hover:text-white" aria-label="Email"><Mail className='h-5 w-5' /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Guides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link 
                    to={resource.path} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest guides and resources delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-gray-800 pt-10 mt-10">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-bold tracking-wide">© 2025 FirstPush.</span> Empowering your tech journey.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
            <a href="mailto:firstpush.delta@gmail.com" className="hover:underline" aria-label="Contact Email">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
