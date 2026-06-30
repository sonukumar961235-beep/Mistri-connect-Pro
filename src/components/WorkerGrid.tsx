import React, { useEffect, useState } from 'react';
import { WorkerCard } from './WorkerCard';
import { motion } from 'motion/react';
import { dbService } from '../services/db';
import { WorkerProfile } from '../types';

export function WorkerGrid() {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <section className="py-16 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Workers</h2>
            <p className="text-slate-400">Highly rated professionals ready to work</p>
          </div>
          <button className="hidden sm:block text-orange-400 hover:text-orange-300 font-medium text-sm">
            View All Workers &rarr;
          </button>
        </div>

        {loading ? (
          <div className="text-slate-400">Loading workers...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((worker, index) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <WorkerCard worker={worker} onHire={() => alert('Please login to hire a worker.')} />
              </motion.div>
            ))}
          </div>
        )}
        
        <button className="sm:hidden mt-8 w-full glass-panel text-white py-3 rounded-xl font-medium">
          View All Workers
        </button>
      </div>
    </section>
  );
}
