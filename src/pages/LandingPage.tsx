import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, User, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import SignInModal from '@/components/SignInModal';
import SignUpModal from '@/components/SignUpModal';

const LandingPage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleCloseModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Custom Header for Landing Page */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FirstPush
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleSignInClick}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
              <Button
                onClick={handleSignUpClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Branding */}
          <div className="mb-12">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FirstPush
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-600 font-light">
              Code. Connect. Grow.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/home">
              <Button 
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              onClick={handleSignUpClick}
              className="px-8 py-4 text-lg border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
            >
              Get Started Free
            </Button>
          </div>

          {/* Quick Access Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg w-fit mx-auto mb-4">
                <Github className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">GitHub Mastery</h3>
              <p className="text-gray-600 mb-4">Build your developer presence from scratch</p>
              <Link to="/guides/github">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg w-fit mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Portfolio Building</h3>
              <p className="text-gray-600 mb-4">Create stunning portfolios that stand out</p>
              <Link to="/guides/portfolio">
                <Button variant="outline" className="w-full">
                  Build Portfolio
                </Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg w-fit mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Grow</h3>
              <p className="text-gray-600 mb-4">Join our community of developers</p>
              <Link to="/contact">
                <Button variant="outline" className="w-full">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FirstPush?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the tools, guidance, and community you need to succeed in tech
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn</h3>
              <p className="text-gray-600">Step-by-step guides for beginners</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build</h3>
              <p className="text-gray-600">Create amazing projects and portfolios</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">Join a supportive developer community</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow</h3>
              <p className="text-gray-600">Advance your career in tech</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Your First Push?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who started their journey with FirstPush
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/home">
              <Button 
                size="lg"
                className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              onClick={handleSignUpClick}
              className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <SignInModal 
        isOpen={showSignIn} 
        onClose={handleCloseModals} 
        onSwitchToSignUp={handleSwitchToSignUp} 
      />
      <SignUpModal 
        isOpen={showSignUp} 
        onClose={handleCloseModals} 
        onSwitchToSignIn={handleSwitchToSignIn} 
      />
    </div>
  );
};

export default LandingPage;
