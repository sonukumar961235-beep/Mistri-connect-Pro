import React from 'react';
import { WorkerProfile } from '../types';
import { MapPin, Star, Phone, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface WorkerCardProps {
  worker: WorkerProfile;
  key?: string | number;
  onHire?: (worker: WorkerProfile) => void;
}

export function WorkerCard({ worker, onHire }: WorkerCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={worker.photoUrl} 
          alt={worker.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Verified
          </span>
          {worker.availability ? (
            <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-medium px-2 py-1 rounded backdrop-blur-sm">
              Available Now
            </span>
          ) : (
            <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-medium px-2 py-1 rounded backdrop-blur-sm">
              Busy
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-white">{worker.name}</h3>
            <p className="text-orange-400 font-medium">{worker.profession}</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-white">{worker.rating}</span>
          </div>
        </div>

        <div className="space-y-2 mt-3 mb-6">
          <div className="flex items-center text-sm text-slate-300">
            <Clock className="w-4 h-4 mr-2 text-slate-400" />
            {worker.experience} Experience
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
            {worker.location}, {worker.city}
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <span className="font-semibold text-white mr-1">₹{worker.dailyWage}</span> / day
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 flex gap-3">
          <button onClick={() => onHire && onHire(worker)} className="flex-1 bg-white text-slate-900 font-semibold py-2 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
            Hire Now
          </button>
          <a 
            href={`tel:${worker.phone}`}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-white/5"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a 
            href={`https://wa.me/91${worker.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-600/20 text-green-500 hover:bg-green-600/30 transition-colors border border-green-500/20"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
