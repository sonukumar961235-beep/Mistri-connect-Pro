import React, { useState, useEffect } from 'react';
import { Bell, Briefcase, Star, Info, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { dbService } from '../services/db';
import { useAuth } from '../contexts/AuthContext';
import { Notification } from '../types';

export function NotificationCenter() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      dbService.getNotifications(currentUser.uid)
        .then(setNotifications)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const markAsRead = async (id: string) => {
    await dbService.markNotificationRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'job_request':
        return <Briefcase className="w-5 h-5 text-orange-500" />;
      case 'hiring_update':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-orange-400" /> Notifications
        </h2>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-slate-400">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="text-slate-400">No notifications yet.</div>
        ) : (
          notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-panel p-5 rounded-2xl border-l-4 ${notif.read ? 'border-l-transparent opacity-75' : 'border-l-orange-500'}`}
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-bold ${notif.read ? 'text-slate-300' : 'text-white'}`}>
                      {notif.message}
                    </h4>
                    {!notif.read && (
                      <button onClick={() => markAsRead(notif.id)} className="text-xs text-orange-400 hover:text-orange-300">Mark read</button>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{notif.type}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
