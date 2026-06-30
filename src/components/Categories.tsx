import React from 'react';
import { CATEGORIES } from '../data';
import { motion } from 'motion/react';

export function Categories() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Top Categories</h2>
          <p className="text-slate-400">Browse skilled workers by their profession</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full glass-panel hover:bg-white/10 hover:border-orange-500/50 transition-all text-sm font-medium text-slate-200"
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
