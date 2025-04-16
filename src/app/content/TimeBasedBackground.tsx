"use client";
import { useState, useEffect, createContext, useContext } from 'react';

type TimeOfDay = 'dawn' | 'day' | 'evening' | 'night';

export const TimeContext = createContext<{
  timeOfDay: TimeOfDay;
  colors: {
    text: string;
    accent: string;
    background: string;
    secondary: string;
    border: string;
    headings: string;
  };
}>({
  timeOfDay: 'day',
  colors: {
    text: 'text-[#C5C6C7]',
    accent: 'text-[#66FCF1]',
    background: 'bg-[#0B0C10]',
    secondary: 'bg-[#1F2833]',
    border: 'border-[#1F2833]',
    headings: 'text-[#66FCF1]',
  }
});

export const useTimeContext = () => useContext(TimeContext);

interface TimeBasedBackgroundProps {
  forcedTime?: TimeOfDay;
  showControls?: boolean;
}

export default function TimeBasedBackground({
  forcedTime,
  showControls = true
}: TimeBasedBackgroundProps = {}) {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(forcedTime || 'day');
  const [loaded, setLoaded] = useState(false);

  // Determine time of day based on user's local time or forcedTime
  useEffect(() => {
    if (forcedTime) {
      setTimeOfDay(forcedTime);
      setLoaded(true);
      return;
    }

    const determineTimeOfDay = (): TimeOfDay => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 10) return 'dawn';
      if (hour >= 10 && hour < 17) return 'day';
      if (hour >= 17 && hour < 20) return 'evening';
      return 'night';
    };

    setTimeOfDay(determineTimeOfDay());
    setLoaded(true);

    const interval = setInterval(() => {
      setTimeOfDay(determineTimeOfDay());
    }, 60000);

    return () => clearInterval(interval);
  }, [forcedTime]);

  // Update CSS variables based on time mode (same as before)
  useEffect(() => {
    if (loaded) {
      const root = document.documentElement;
      switch (timeOfDay) {
        case 'dawn':
          root.style.setProperty('--color-accent', '#003366');
          root.style.setProperty('--color-main', '#FF9E80');
          root.style.setProperty('--color-darkest', '#1F2833');
          root.style.setProperty('--color-gray', '#1A1A1A');
          break;
        case 'day':
          root.style.setProperty('--color-accent', '#0056b3');
          root.style.setProperty('--color-main', '#45A29E');
          root.style.setProperty('--color-darkest', '#0B0C10');
          root.style.setProperty('--color-gray', '#333333');
          break;
        case 'evening':
          root.style.setProperty('--color-accent', '#b34700');
          root.style.setProperty('--color-main', '#FF7043');
          root.style.setProperty('--color-darkest', '#1F2833');
          root.style.setProperty('--color-gray', '#FFFFFF');
          break;
        case 'night':
          root.style.setProperty('--color-accent', '#66FCF1');
          root.style.setProperty('--color-main', '#5C6BC0');
          root.style.setProperty('--color-darkest', '#0B0C10');
          root.style.setProperty('--color-gray', '#E0E0E0');
          break;
      }
    }
  }, [timeOfDay, loaded]);

  // **** New Effect to control dark mode ****
  useEffect(() => {
    if (loaded) {
      if (timeOfDay === 'night') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [timeOfDay, loaded]);

  const getColorPalette = () => {
    switch (timeOfDay) {
      case 'dawn':
        return {
          text: 'text-[#333333]',
          accent: 'text-[#003366]',
          background: 'bg-[#1F2833]',
          secondary: 'bg-[#2C3E50]',
          border: 'border-[#FF9E80]',
          headings: 'text-[#003366]'
        };
      case 'day':
        return {
          text: 'text-[#333333]',
          accent: 'text-[#0056b3]',
          background: 'bg-[#0B0C10]',
          secondary: 'bg-[#1F2833]',
          border: 'border-[#1F2833]',
          headings: 'text-[#0056b3]'
        };
      case 'evening':
        return {
          text: 'text-[#FFFFFF]',
          accent: 'text-[#FF9E80]',
          background: 'bg-[#1F2833]',
          secondary: 'bg-[#2C3E50]',
          border: 'border-[#FF7043]',
          headings: 'text-[#FF9E80]'
        };
      case 'night':
        return {
          text: 'text-[#E0E0E0]',
          accent: 'text-[#66FCF1]',
          background: 'bg-[#0B0C10]',
          secondary: 'bg-[#1A237E]',
          border: 'border-[#3F51B5]',
          headings: 'text-[#66FCF1]'
        };
    }
  };

  // Helper functions for clouds, sky, sun/moon properties (unchanged for brevity)
  const getCloudFillColor = () => {
    switch (timeOfDay) {
      case 'dawn': return 'rgba(255, 255, 255, 0.9)';
      case 'day': return 'rgba(255, 255, 255, 0.95)';
      case 'evening': return 'rgba(255, 228, 196, 0.85)';
      case 'night': return 'rgba(200, 200, 230, 0.5)';
    }
  };

  const getCloudStrokeColor = () => {
    switch (timeOfDay) {
      case 'dawn': return 'rgba(255, 200, 120, 0.6)';
      case 'day': return 'rgba(135, 206, 250, 0.8)';
      case 'evening': return 'rgba(255, 160, 100, 0.7)';
      case 'night': return 'rgba(120, 150, 230, 0.6)';
    }
  };

  const getSkyColors = () => {
    switch (timeOfDay) {
      case 'dawn':
        return 'bg-gradient-to-t from-[#FF9E80] via-[#FFCC80] to-[#64B5F6]';
      case 'day':
        return 'bg-gradient-to-t from-[#87CEEB] via-[#87CEFA] to-[#0D47A1]';
      case 'evening':
        return 'bg-gradient-to-t from-[#FF7043] via-[#E64A19] to-[#512DA8]';
      case 'night':
        return 'bg-gradient-to-t from-[#1A237E] via-[#0D47A1] to-[#000000]';
    }
  };

  const getSunMoonColor = () => {
    switch (timeOfDay) {
      case 'dawn': return 'bg-[#FFECB3]';
      case 'day': return 'bg-[#FFEB3B]';
      case 'evening': return 'bg-[#FF5722]';
      case 'night': return 'bg-[#F5F5F5]';
    }
  };

  const getSunMoonGlow = () => {
    switch (timeOfDay) {
      case 'dawn': return '0 0 70px 35px rgba(255, 236, 179, 0.6)';
      case 'day': return '0 0 80px 40px rgba(255, 235, 59, 0.7)';
      case 'evening': return '0 0 60px 35px rgba(255, 87, 34, 0.6)';
      case 'night': return '0 0 50px 25px rgba(255, 255, 255, 0.4)';
    }
  };

  if (!loaded) return null;

  const colorPalette = getColorPalette();

  // UI control helpers (unchanged)
  const getControlsBgColor = () => {
    switch (timeOfDay) {
      case 'dawn': return 'bg-[#2A3542]/70';
      case 'day': return 'bg-[#1F2833]/70';
      case 'evening': return 'bg-[#2C3E50]/70';
      case 'night': return 'bg-[#0B0C10]/80';
    }
  };

  const getControlsTextColor = () => {
    switch (timeOfDay) {
      case 'dawn': return 'text-white';
      case 'day': return 'text-[#E0E0E0]';
      case 'evening': return 'text-white';
      case 'night': return 'text-white';
    }
  };

  return (
    <TimeContext.Provider value={{ timeOfDay, colors: colorPalette }}>
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Sky backdrop */}
        <div className={`absolute inset-0 transition-colors duration-3000 ease-in-out ${getSkyColors()}`} />

        {/* Stars (only visible at night) */}
        {timeOfDay === 'night' && (
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Sun/Moon */}
        <div
          className={`absolute rounded-full animate-float shadow-lg ${getSunMoonColor()}`}
          style={{
            width: timeOfDay === 'night' ? '100px' : '150px',
            height: timeOfDay === 'night' ? '100px' : '150px',
            top: timeOfDay === 'dawn'
              ? '60%'
              : timeOfDay === 'day'
              ? '20%'
              : timeOfDay === 'evening'
              ? '70%'
              : '40%',
            left: timeOfDay === 'dawn'
              ? '20%'
              : timeOfDay === 'day'
              ? '80%'
              : timeOfDay === 'evening'
              ? '20%'
              : '80%',
            boxShadow: getSunMoonGlow(),
            animationDuration: '10s',
            opacity: 0.9,
          }}
        />

        {/* Clouds */}
        {[...Array(8)].map((_, i) => {
          const scale = 0.4 + Math.random() * 1.0;
          const top = Math.random() * 60;
          const animationDelay = Math.random() * -30;
          return (
            <div
              key={`cloud-${i}`}
              className="absolute animate-cloud"
              style={{
                top: `${top}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${scale})`,
                animationDuration: `${Math.random() * 60 + 120}s`,
                animationDelay: `${animationDelay}s`,
                zIndex: Math.floor(Math.random() * 3),
              }}
            >
              <svg
                width="240"
                height="160"
                viewBox="0 0 240 160"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))' }}
              >
                <path
                  d="M194,100 C215,100 230,80 230,65 C230,50 215,35 194,35 C190,15 170,5 145,5 C120,5 100,15 96,35 
                     C90,25 80,20 65,20 C40,20 20,35 20,60 C20,85 40,100 65,100 Z"
                  fill={getCloudFillColor()}
                  stroke={getCloudStrokeColor()}
                  strokeWidth="3"
                />
              </svg>
            </div>
          );
        })}

        {/* Filter overlay */}
        <div className={`absolute inset-0 ${timeOfDay === 'night' ? 'bg-background/70' : 'bg-background/30'}`}></div>

        {/* Mode indicator */}
        <div className={`pointer-events-auto absolute bottom-4 left-20 ${getControlsBgColor()} backdrop-blur-sm ${getControlsTextColor()} px-4 py-2 rounded-lg text-sm z-10`}>
          Current Mode: <span className="font-medium">Code Time! :D</span>
        </div>

        {/* Time controls */}
        {showControls && (
          <div className={`pointer-events-auto absolute bottom-4 right-4 ${getControlsBgColor()} backdrop-blur-sm ${getControlsTextColor()} p-3 rounded-lg z-10 flex flex-col gap-2`}>
            <p className="text-xs uppercase tracking-wider text-center mb-1">Test Backgrounds</p>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeOfDay('dawn')}
                className={`w-12 h-8 rounded transition-all flex items-center justify-center text-xs ${timeOfDay === 'dawn' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
                style={{ background: 'linear-gradient(to top, #FF9E80, #FFCC80)' }}
              >
                Dawn
              </button>
              <button
                onClick={() => setTimeOfDay('day')}
                className={`w-12 h-8 rounded transition-all flex items-center justify-center text-xs ${timeOfDay === 'day' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
                style={{ background: 'linear-gradient(to top, #87CEEB, #0D47A1)' }}
              >
                Day
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeOfDay('evening')}
                className={`w-12 h-8 rounded transition-all flex items-center justify-center text-xs ${timeOfDay === 'evening' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
                style={{ background: 'linear-gradient(to top, #FF7043, #512DA8)' }}
              >
                Evening
              </button>
              <button
                onClick={() => setTimeOfDay('night')}
                className={`w-12 h-8 rounded transition-all flex items-center justify-center text-xs shadow-inner ${timeOfDay === 'night' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
                style={{ background: 'linear-gradient(to top, #1A237E, #000000)' }}
              >
                Night
              </button>
            </div>
          </div>
        )}
      </div>
    </TimeContext.Provider>
  );
}
