import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NotificationCenter } from './NotificationCenter';
import { Bell, Briefcase, Star, Settings, DollarSign, Power, LayoutDashboard } from 'lucide-react';
import { dbService } from '../services/db';

export function DashboardWorker() {
  const { userData, logout } = useAuth();
  const worker = userData; 
  const [isAvailable, setIsAvailable] = useState(worker?.availability ?? true);
  const [activeTab, setActiveTab] = useState<'overview' | 'notifications'>('overview');
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    if (worker?.id) {
      dbService.getWorkerJobs(worker.id).then(setJobs).catch(console.error);
    }
  }, [worker?.id]);

  if (!worker) return <div className="py-24 text-center text-white">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Profile Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <img src={worker.photoUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200&h=200'} alt={worker.name} className="w-full h-full object-cover rounded-full border-4 border-slate-800" />
              <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-slate-900 ${isAvailable ? 'bg-green-500' : 'bg-slate-500'}`}></div>
            </div>
            <h2 className="text-2xl font-bold text-white">{worker.name}</h2>
            <p className="text-orange-400 font-medium">{worker.profession}</p>
            <p className="text-sm text-slate-400">{worker.city}, {worker.state}</p>
            
            <div className="w-full border-t border-white/10 my-6"></div>
            
            <div className="w-full flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-white/5 mb-4">
              <span className="text-slate-300 font-medium text-sm">Status</span>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${isAvailable ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
              >
                <Power className="w-4 h-4" />
                {isAvailable ? 'Available' : 'Offline'}
              </button>
            </div>

            <nav className="w-full flex flex-col gap-1 mb-4 text-left">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <LayoutDashboard className="w-4 h-4" /> Overview
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'notifications' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <span className="flex items-center gap-3"><Bell className="w-4 h-4" /> Notifications</span>
                <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
              </button>
            </nav>

            <button className="w-full glass-panel py-3 mb-2 rounded-xl text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" /> Edit Profile
            </button>
            <button onClick={logout} className="w-full glass-panel py-3 rounded-xl text-red-400 font-medium hover:bg-red-500/10 border-red-500/20 transition-colors flex items-center justify-center gap-2">
              <Power className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 space-y-6">
          
          {activeTab === 'overview' ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-orange-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Monthly Earnings</p>
                  <h3 className="text-2xl font-bold text-white mt-1">₹18,500</h3>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <DollarSign className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Jobs Completed</p>
                  <h3 className="text-2xl font-bold text-white mt-1">24</h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Average Rating</p>
                  <h3 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                    {worker.rating} <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </h3>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Job Requests */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-400" /> New Job Requests
              </h3>
              {jobs.filter(j => j.status === 'pending').length > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">{jobs.filter(j => j.status === 'pending').length} New</span>
              )}
            </div>

            <div className="space-y-4">
              {jobs.length === 0 ? (
                <div className="text-slate-400 text-center py-4">No job requests yet.</div>
              ) : (
                jobs.map(job => (
                  <div key={job.id} className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-bold">{job.description || 'General Work Request'}</h4>
                      <p className="text-slate-400 text-sm mt-1">Requested by: {job.customerName} • {job.address}</p>
                      <p className="text-orange-400 text-sm mt-1 font-medium">Starts: {job.date} • Status: <span className="uppercase">{job.status}</span></p>
                    </div>
                    {job.status === 'pending' && (
                      <div className="flex gap-2 shrink-0">
                        <button 
                          onClick={() => {
                            dbService.updateJobStatus(job.id, 'declined');
                            setJobs(jobs.map(j => j.id === job.id ? {...j, status: 'declined'} : j));
                          }}
                          className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Decline
                        </button>
                        <button 
                          onClick={() => {
                            dbService.updateJobStatus(job.id, 'accepted');
                            setJobs(jobs.map(j => j.id === job.id ? {...j, status: 'accepted'} : j));
                          }}
                          className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Accept
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Recent Reviews */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Recent Reviews</h3>
            <div className="space-y-4">
              <div className="border-b border-white/5 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-medium">Rajesh Verma</span>
                  <div className="flex text-yellow-400"><Star className="w-4 h-4 fill-yellow-400"/><Star className="w-4 h-4 fill-yellow-400"/><Star className="w-4 h-4 fill-yellow-400"/><Star className="w-4 h-4 fill-yellow-400"/><Star className="w-4 h-4 fill-yellow-400"/></div>
                </div>
                <p className="text-slate-400 text-sm">Ramesh did a fantastic job fixing the main switchboard. Very polite and professional.</p>
              </div>
            </div>
          </div>
            </>
          ) : (
            <NotificationCenter />
          )}

        </div>
      </div>
    </div>
  );
}
