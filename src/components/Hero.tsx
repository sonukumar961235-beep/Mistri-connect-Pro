import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-75"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Find Trusted <span className="text-gradient">Labour & Skilled Workers</span> Near You
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12"
        >
          Connect instantly with verified masons, electricians, plumbers, and daily wage labourers. Transparent pricing, reliable service.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-2 md:p-4 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-3"
        >
          <div className="flex-1 flex items-center bg-slate-900/50 rounded-xl px-4 py-3 border border-white/5">
            <Briefcase className="w-5 h-5 text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="Skill (e.g. Electrician, Mason)" 
              className="bg-transparent border-none outline-none w-full text-white placeholder-slate-400"
            />
          </div>
          <div className="flex-1 flex items-center bg-slate-900/50 rounded-xl px-4 py-3 border border-white/5">
            <MapPin className="w-5 h-5 text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="City or Location" 
              className="bg-transparent border-none outline-none w-full text-white placeholder-slate-400"
            />
          </div>
          <button className="bg-gradient-brand text-white font-semibold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
