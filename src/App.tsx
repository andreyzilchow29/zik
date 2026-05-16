/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Radio, AtSign, Play } from 'lucide-react';

export default function App() {
  const TOTAL_DURATION_SECONDS = 300; // 5 minutes
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_DURATION_SECONDS);

  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const progressPercentage = Math.floor(
    ((TOTAL_DURATION_SECONDS - secondsRemaining) / TOTAL_DURATION_SECONDS) * 100
  );

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <div className="bg-background text-on-background h-screen w-screen overflow-hidden relative font-body-md flex flex-col justify-between selection:bg-primary selection:text-on-primary">
      {/* Background Layers */}
      <div aria-hidden="true" className="absolute inset-0 shard-bg z-0 pointer-events-none"></div>
      <div aria-hidden="true" className="absolute inset-0 vignette z-0 pointer-events-none"></div>
      <div aria-hidden="true" className="glitch-layer z-0"></div>

      {/* Decorative Diagonal Lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 diagonal-line z-0 opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 right-[20%] w-[2px] h-full bg-gradient-to-b from-primary/0 via-primary/80 to-primary/0 diagonal-line z-0 opacity-40 pointer-events-none"></div>
      <div className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -skew-y-[5deg] z-0 opacity-20 pointer-events-none"></div>

      {/* Top Branding Header */}
      <header className="relative z-10 p-margin-desktop flex justify-between items-start w-full">
        <div className="flex flex-col">
          <h1 className="font-display-lg text-display-lg text-primary neon-glow uppercase tracking-tighter italic m-0">
            ZIKRID_STREAM
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(255,85,64,0.8)]"></span>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.2em]">
              Live Connection Establishing
            </span>
          </div>
        </div>

        {/* Stream Status Box */}
        <div className="bg-surface-container-low/80 backdrop-blur-xl border border-primary/30 px-6 py-3 flex items-center gap-4 shadow-[0_0_15px_rgba(255,0,0,0.2)] skew-x-[-5deg]">
          <Radio className="text-primary w-6 h-6" />
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-on-surface-variant leading-none mb-1">
              UPLINK STATUS
            </span>
            <span className="font-label-caps text-sm text-primary font-bold leading-none">
              STABLE
            </span>
          </div>
        </div>
      </header>

      {/* Main Content: Countdown */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="font-headline-lg text-headline-lg text-on-background uppercase tracking-widest mb-8 opacity-80 m-0">
          STARTING SOON
        </h2>

        {/* Timer Container */}
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/30 transition-all duration-500 pointer-events-none"></div>
          <div className="font-display-lg text-[180px] leading-none text-on-background font-black tracking-tighter drop-shadow-[0_0_30px_rgba(255,85,64,0.4)] flex items-baseline gap-4 relative z-10 animate-timer-pulse animate-glitch-rhythmic select-none">
            <span>{formattedMinutes}</span>
            <span className="text-primary opacity-50 animate-pulse">:</span>
            <span>{formattedSeconds}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl mt-16 flex flex-col gap-2">
          <div className="flex justify-between w-full font-label-caps text-label-caps text-on-surface-variant">
            <span>INITIALIZING_SYSTEMS</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-surface-container-highest overflow-hidden skew-x-[-15deg]">
            <div
              className="h-full bg-gradient-to-r from-primary-container to-primary relative transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              <div className="absolute right-0 top-0 h-full w-4 bg-white/50 blur-sm"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Socials & Info */}
      <footer className="relative z-10 p-margin-desktop flex justify-between items-end w-full">
        {/* Social Links */}
        <div className="flex gap-6 bg-surface-container-low/60 backdrop-blur-md p-4 border border-outline-variant/30 skew-x-[-5deg]">
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
          >
            <AtSign className="w-5 h-5" />
            <span className="font-label-caps text-label-caps skew-x-[5deg]">
              @ZIKRID
            </span>
          </a>
          <div className="w-[1px] h-4 bg-outline-variant/50 self-center"></div>
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span className="font-label-caps text-label-caps skew-x-[5deg]">
              /ZIKRID
            </span>
          </a>
        </div>
        
        {/* Empty System Info Box (from mockup) */}
        <div className="flex flex-col items-end gap-1 font-label-caps text-[10px] text-on-surface-variant opacity-60 uppercase text-right">
        </div>
      </footer>
    </div>
  );
}
