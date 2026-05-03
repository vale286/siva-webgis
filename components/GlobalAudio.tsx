'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function GlobalAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Attempt to play automatically (many browsers will block this until user interaction)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Start muted or wait for interaction. We'll try playing muted first,
      // or just wait for the user to click unmute.
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented. The user will have to click the button.
          setIsMuted(true);
        });
      }
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      
      // If we are unmuting and it was paused due to autoplay restrictions, play it now
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src="/assets/bg_music.mp3" 
        loop 
        autoPlay
        muted={isMuted}
        className="hidden"
      />
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-[10000] bg-slate-900/90 text-white p-3 rounded-full shadow-2xl border border-slate-700 hover:bg-slate-800 transition-all hover:scale-110"
        title={isMuted ? "Unmute Background Music" : "Mute Background Music"}
      >
        {isMuted ? <VolumeX size={20} className="text-gray-400" /> : <Volume2 size={20} className="text-emerald-400" />}
      </button>
    </>
  );
}
