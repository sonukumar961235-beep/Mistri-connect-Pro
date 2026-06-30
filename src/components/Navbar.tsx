import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { Menu, X, Hammer, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, userData, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboardClick = () => {
    if (userData?.role === 'worker' || userData?.profession) {
      onNavigate('worker_dash');
    } else {
      onNavigate('customer_dash');
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Mistri <span className="text-orange-500">Connect</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className={`text-sm font-medium hover:text-white transition-colors ${currentView === 'home' ? 'text-white' : 'text-slate-300'}`}>Home</button>
            <button onClick={() => onNavigate('home')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Find Workers</button>
            <div className="h-6 w-px bg-white/20 mx-2"></div>
            
            {currentUser ? (
              <div className="flex items-center gap-4">
                <button onClick={handleDashboardClick} className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/10 flex items-center gap-2">
                  <User className="w-4 h-4" /> Dashboard
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => onNavigate('register_worker')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Join as Worker</button>
                <button onClick={() => onNavigate('register_customer')} className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/10">Login</button>
                <button onClick={() => onNavigate('register_customer')} className="text-sm font-medium text-white bg-gradient-brand px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">Register</button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300 hover:text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-x-0 border-t-0 border-b border-white/10 absolute top-full left-0 w-full px-4 py-4 flex flex-col gap-4">
          <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-200 py-2 border-b border-white/5">Home</button>
          
          {currentUser ? (
             <button onClick={() => { handleDashboardClick(); setMobileMenuOpen(false); }} className="text-left text-slate-200 py-2 border-b border-white/5">Dashboard</button>
          ) : (
            <>
              <button onClick={() => { onNavigate('register_worker'); setMobileMenuOpen(false); }} className="text-left text-slate-200 py-2 border-b border-white/5">Join as Worker</button>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { onNavigate('register_customer'); setMobileMenuOpen(false); }} className="flex-1 text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-lg border border-white/10">Login</button>
                <button onClick={() => { onNavigate('register_customer'); setMobileMenuOpen(false); }} className="flex-1 text-sm font-medium text-white bg-gradient-brand px-4 py-2 rounded-lg">Register</button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
