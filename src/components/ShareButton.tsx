'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          // Fallback to copy
          fallbackCopy();
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      fallbackCopy();
    }
  };

  const fallbackCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      aria-label="Share article"
    >
      <Share2 className="w-4 h-4" />
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
}
