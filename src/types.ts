export interface WorkerProfile {
  id: string;
  name: string;
  profession: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  location: string;
  city: string;
  state: string;
  dailyWage: number;
  phone: string;
  availability: boolean;
  photoUrl: string;
  skills: string[];
  about: string;
  isFavourite?: boolean;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  city: string;
}

export type ViewState = 'home' | 'customer_dash' | 'worker_dash' | 'register_worker' | 'register_customer';

export interface Notification {
  id: string;
  type: 'job_request' | 'hiring_update' | 'review' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}
