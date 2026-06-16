'use client';

import { useState, FormEvent } from 'react';
import { Newspaper } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        const successMessage = data.alreadySubscribed 
          ? "✓ You're already on the list!" 
          : '✓ Subscribed successfully!';
        setMessage({ text: successMessage, type: 'success' });
        setEmail('');
        
        // Store subscription in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('pieeg_subscribed', 'true');
          localStorage.setItem('pieeg_email', email);
        }
      } else {
        setMessage({ 
          text: data.error || `Server error (${response.status})`, 
          type: 'error' 
        });
      }
    } catch (err) {
      console.error('Subscription network error:', err);
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm mb-4">
          <Newspaper className="w-5 h-5 text-cyan-500" />
        </div>
        <h2 className="text-2xl font-extrabold mb-3">Stay Updated</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
          Get the latest PiEEG news, product launches, and research highlights.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {message && (
          <p className={`mt-3 text-sm ${
            message.type === 'success' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
}
