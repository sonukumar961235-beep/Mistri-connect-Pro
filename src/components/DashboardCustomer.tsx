import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { WorkerCard } from './WorkerCard';
import { HireWorkerModal } from './HireWorkerModal';
import { NotificationCenter } from './NotificationCenter';
import { Search, Filter, History, Heart, User, MapPin, Bell, Power } from 'lucide-react';
import { dbService } from '../services/db';
import { WorkerProfile } from '../types';

export function DashboardCustomer() {
  const { userData, logout } = useAuth();
  const customer = userData;
  const [activeTab, setActiveTab] = useState<'search' | 'favourites' | 'history' | 'notifications'>('search');
  
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);

  const filteredWorkers = workers.filter(w => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      (w.name?.toLowerCase().includes(lowerQuery)) ||
      (w.profession?.toLowerCase().includes(lowerQuery)) ||
      (w.city?.toLowerCase().includes(lowerQuery))
    );
  });

  useEffect(() => {
    async function loadWorkers() {
      try {
        const realWorkers = await dbService.getWorkers();
        setWorkers(realWorkers);
      } catch (e: any) {
        console.error("Failed to load workers:", e);
        setWorkers([]);
      } finally {
        setLoading(false);
      }
    }
    loadWorkers();

    if (customer?.id) {
      dbService.getCustomerJobs(customer.id).then(setJobs).catch(console.error);
    }
  }, [customer?.id]);

  if (!customer) return <div className="py-24 text-center text-white">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="glass-panel p-6 rounded-2xl mb-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-brand rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">
              {customer.name?.charAt(0).toUpperCase() || 'C'}
            </div>
            <h3 className="text-xl font-bold text-white">{customer.name}</h3>
            <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> {customer.city || 'Unknown'}, {customer.state || ''}
            </p>
          </div>

          <nav className="glass-panel rounded-2xl p-2 flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'search' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Search className="w-4 h-4" /> Find Workers
            </button>
            <button 
              onClick={() => setActiveTab('favourites')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'favourites' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Heart className="w-4 h-4" /> Saved Favourites
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <History className="w-4 h-4" /> Hire History
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'notifications' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <span className="flex items-center gap-3"><Bell className="w-4 h-4" /> Notifications</span>
              <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
            </button>
            <button 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <User className="w-4 h-4" /> Profile Settings
            </button>
            <button 
              onClick={logout}
              className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
            >
              <Power className="w-4 h-4" /> Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'search' && (
            <div>
              <div className="flex gap-3 mb-8">
                <div className="flex-1 glass-panel px-4 py-3 rounded-xl flex items-center">
                  <Search className="w-5 h-5 text-slate-400 mr-3" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name, skill, or location..." className="bg-transparent border-none outline-none w-full text-white" />
                </div>
                <button className="glass-panel px-4 py-3 rounded-xl text-white flex items-center gap-2 hover:bg-white/10">
                  <Filter className="w-5 h-5" /> Filters
                </button>
              </div>

              {loading ? (
                 <div className="text-slate-400">Loading workers...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredWorkers.map(worker => (
                    <WorkerCard key={worker.id} worker={worker} onHire={setSelectedWorker} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favourites' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Saved Workers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Just showing first two for demo */}
                {workers.slice(0, 2).map(worker => (
                  <WorkerCard key={worker.id} worker={worker} onHire={setSelectedWorker} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Hire History</h2>
              {jobs.length === 0 ? (
                <div className="glass-panel p-8 rounded-2xl text-center">
                  <History className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No past hires yet</h3>
                  <p className="text-slate-400">Workers you hire will appear here for easy re-booking.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-white font-bold">Worker: {job.workerName}</h4>
                        <p className="text-slate-400 text-sm mt-1">{job.description}</p>
                        <p className="text-orange-400 text-sm mt-1 font-medium">Starts: {job.date} • Status: <span className="uppercase">{job.status}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <NotificationCenter />
          )}
        </div>
      </div>
      
      {selectedWorker && (
        <HireWorkerModal 
          worker={selectedWorker} 
          isOpen={true} 
          onClose={() => setSelectedWorker(null)} 
        />
      )}
    </div>
  );
}
