import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface FormProps {
  type: 'worker' | 'customer';
  onComplete: () => void;
}

export function RegistrationForm({ type, onComplete }: FormProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  
  // Worker fields
  const [profession, setProfession] = useState('');
  const [experience, setExperience] = useState('');
  const [dailyWage, setDailyWage] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [about, setAbout] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onComplete();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (type === 'worker') {
          await setDoc(doc(db, 'workers', user.uid), {
            name,
            email,
            phone,
            city,
            state,
            profession,
            experience,
            dailyWage: Number(dailyWage),
            aadhaar,
            about,
            isApproved: false,
            availability: true,
            rating: 0,
            reviewsCount: 0,
            photoUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200&h=200' // Default
          });
        } else {
          await setDoc(doc(db, 'customers', user.uid), {
            name,
            email,
            phone,
            city,
            state,
            photoUrl: ''
          });
        }
        onComplete();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="glass-panel p-8 md:p-10 rounded-2xl w-full max-w-2xl relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-[80px] opacity-20 -z-10 ${type === 'worker' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin 
              ? (type === 'worker' ? 'Worker Login' : 'Customer Login') 
              : (type === 'worker' ? 'Join as a Professional' : 'Create Customer Account')}
          </h2>
          <p className="text-slate-400">
            {isLogin 
              ? 'Welcome back to Mistri Connect'
              : (type === 'worker' ? 'Create your profile to start receiving job requests directly.' : 'Sign up to find, hire, and manage skilled workers easily.')}
          </p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="your@email.com" />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="********" />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Full Name</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. Rahul Kumar" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Mobile Number</label>
                  <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="+91" />
                </div>
                
                {type === 'worker' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Profession</label>
                      <select required value={profession} onChange={e => setProfession(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                        <option value="">Select Category</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="mason">Mason</option>
                        <option value="carpenter">Carpenter</option>
                        <option value="painter">Painter</option>
                        <option value="labour">Daily Labour</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Experience (Years)</label>
                      <input required type="number" value={experience} onChange={e => setExperience(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. 5" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Daily Wage Expected (₹)</label>
                      <input required type="number" value={dailyWage} onChange={e => setDailyWage(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. 800" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Aadhaar Number</label>
                      <input required type="text" value={aadhaar} onChange={e => setAadhaar(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="XXXX XXXX XXXX" />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">City</label>
                  <input required type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. Mumbai" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">State</label>
                  <input required type="text" value={state} onChange={e => setState(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. Maharashtra" />
                </div>
              </>
            )}
          </div>

          {!isLogin && type === 'worker' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">About / Skills Description</label>
              <textarea rows={3} value={about} onChange={e => setAbout(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Briefly describe your expertise..."></textarea>
            </div>
          )}

          <div className="pt-4">
            <button disabled={loading} type="submit" className="w-full bg-gradient-brand text-white font-bold text-lg py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20 disabled:opacity-50">
              {loading ? 'Processing...' : (isLogin ? 'Login' : (type === 'worker' ? 'Submit Application' : 'Create Account'))}
            </button>
          </div>
          
          <p className="text-center text-slate-400 text-sm mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-orange-400 hover:underline">
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
