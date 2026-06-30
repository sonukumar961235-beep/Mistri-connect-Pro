import React, { useState } from 'react';
import { WorkerProfile } from '../types';
import { dbService } from '../services/db';
import { useAuth } from '../contexts/AuthContext';
import { X, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HireWorkerModalProps {
  worker: WorkerProfile;
  isOpen: boolean;
  onClose: () => void;
}

export function HireWorkerModal({ worker, isOpen, onClose }: HireWorkerModalProps) {
  const { userData, currentUser } = useAuth();
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !userData) return;
    setLoading(true);

    try {
      await dbService.createJobRequest({
        customerId: currentUser.uid,
        customerName: userData.name,
        customerPhone: userData.phone,
        workerId: worker.id,
        workerName: worker.name,
        date,
        address,
        description,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error creating job request:", error);
      alert("Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-panel w-full max-w-lg rounded-2xl overflow-hidden relative z-10"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-xl font-bold text-white">Hire {worker.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
            <p className="text-slate-400">Your job request has been sent to {worker.name}. You will be notified when they accept.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="flex gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 items-center mb-6">
              <img src={worker.photoUrl} alt={worker.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-white font-bold">{worker.profession}</p>
                <p className="text-sm text-slate-400">₹{worker.dailyWage} / day</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-400" /> Start Date
              </label>
              <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" /> Work Address
              </label>
              <input required type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Full address..." className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Job Description</label>
              <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the work required..." className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"></textarea>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 bg-gradient-brand text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
