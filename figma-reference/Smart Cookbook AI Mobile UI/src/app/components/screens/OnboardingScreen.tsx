import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { C, IMG, ScreenName } from '../shared/data';
import { PrimaryButton, SecondaryButton } from '../shared/UIComponents';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    emoji: '📸',
    title: 'Snap Your Ingredients',
    subtitle: 'Take a photo of whatever\'s in your fridge or pantry. Our AI instantly recognizes everything.',
    image: IMG.ingredients,
    accent: C.primary,
  },
  {
    emoji: '🤖',
    title: 'AI-Powered Detection',
    subtitle: 'Advanced AI analyzes your ingredients in seconds and suggests the best recipes for you.',
    image: IMG.spices,
    accent: C.secondary,
  },
  {
    emoji: '👨‍🍳',
    title: 'Cook with Guidance',
    subtitle: 'Follow step-by-step instructions with your personal AI cooking assistant always by your side.',
    image: IMG.cooking,
    accent: '#7C3AED',
  },
];

export function OnboardingScreen({ navigate }: { navigate: (s: ScreenName) => void }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1);
    else navigate('login');
  };

  const slide = slides[current];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: '52%', overflow: 'hidden', flexShrink: 0 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slide.image}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AnimatePresence>
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: `linear-gradient(transparent, ${C.bg})`,
        }} />
        {/* Skip button */}
        <button
          onClick={() => navigate('login')}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: 20,
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'Nunito Sans',
            color: C.textSec,
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '16px 28px 36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 52, marginBottom: 12 }}>{slide.emoji}</div>
            <h1 style={{
              fontFamily: 'Nunito Sans',
              fontSize: 26,
              fontWeight: 900,
              color: C.text,
              marginBottom: 12,
              lineHeight: 1.2,
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontFamily: 'Nunito Sans',
              fontSize: 15,
              color: C.textSec,
              lineHeight: 1.6,
            }}>
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots + button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {slides.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === current ? 24 : 8 }}
                style={{
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? C.primary : '#D1D5DB',
                }}
              />
            ))}
          </div>
          <PrimaryButton
            label={current < slides.length - 1 ? 'Continue' : 'Get Started'}
            onClick={next}
            icon={<ChevronRight size={18} />}
          />
          {current === slides.length - 1 && (
            <SecondaryButton label="Already have an account? Login" onClick={() => navigate('login')} />
          )}
        </div>
      </div>
    </div>
  );
}
