import { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { WorkerGrid } from './components/WorkerGrid';
import { Footer } from './components/Footer';
import { DashboardCustomer } from './components/DashboardCustomer';
import { DashboardWorker } from './components/DashboardWorker';
import { RegistrationForm } from './components/RegistrationForms';
import { TESTIMONIALS } from './data';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { App as CapacitorApp } from '@capacitor/app';

function HomeView({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  return (
    <>
      <Hero />
      <Categories />
      <WorkerGrid />
      
      {/* Testimonials Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-slate-400">Trusted by thousands of customers and workers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={t.id} 
                className="glass-panel p-6 rounded-2xl"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{t.review}"</p>
                <p className="text-white font-bold text-sm">- {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-lg text-slate-300 mb-8">Whether you need to hire a skilled worker or looking for daily jobs, Mistri Connect is the place.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => onNavigate('register_customer')} className="bg-white text-slate-900 font-bold py-3 px-8 rounded-xl hover:bg-slate-200 transition-colors">Find a Worker</button>
            <button onClick={() => onNavigate('register_worker')} className="glass-panel text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors border border-white/20">Join as Worker</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  useEffect(() => {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (currentView !== 'home') {
        setCurrentView('home');
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />;
      case 'customer_dash':
        return <DashboardCustomer />;
      case 'worker_dash':
        return <DashboardWorker />;
      case 'register_worker':
        return <RegistrationForm type="worker" onComplete={() => setCurrentView('worker_dash')} />;
      case 'register_customer':
        return <RegistrationForm type="customer" onComplete={() => setCurrentView('customer_dash')} />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
