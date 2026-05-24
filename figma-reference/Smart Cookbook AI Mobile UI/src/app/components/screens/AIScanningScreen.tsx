import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { C, IMG, ScreenName } from '../shared/data';
import { Check, Loader } from 'lucide-react';

const STEPS = [
  { label: 'Analyzing image quality', duration: 900 },
  { label: 'Detecting ingredients', duration: 1200 },
  { label: 'Estimating quantities', duration: 900 },
  { label: 'Preparing recipe suggestions', duration: 700 },
];

export function AIScanningScreen({ navigate }: { navigate: (s: ScreenName) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let step = 0;
    const run = () => {
      if (step < STEPS.length - 1) {
        step++;
        setCurrentStep(step);
        setTimeout(run, STEPS[step].duration);
      } else {
        setDone(true);
        setTimeout(() => navigate('ingredientConfirm'), 800);
      }
    };
    const t = setTimeout(run, STEPS[0].duration);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 28px',
      position: 'relative',
    }}>
      {/* Background blob */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: `radial-gradient(${C.primary}20, transparent 70%)`,
      }} />

      {/* Scanned image preview */}
      <div style={{ position: 'relative', marginBottom: 40, zIndex: 1 }}>
        <div style={{
          width: 160,
          height: 160,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: `0 16px 48px ${C.primary}30`,
          border: `3px solid ${C.primary}40`,
        }}>
          <img src={IMG.ingredients} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Orbiting AI indicator */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: -16,
            borderRadius: '50%',
            border: `3px solid transparent`,
            borderTopColor: C.primary,
            borderRightColor: C.primary,
          }}
        />

        {/* Center badge */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: C.primary,
            borderRadius: 20,
            padding: '6px 16px',
            boxShadow: `0 4px 16px ${C.primary}50`,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, fontWeight: 800, color: '#fff' }}>
            🤖 AI Analyzing...
          </span>
        </motion.div>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 36, zIndex: 1 }}>
        <h2 style={{
          fontFamily: 'Nunito Sans',
          fontSize: 24,
          fontWeight: 900,
          color: C.text,
          marginBottom: 8,
        }}>
          {done ? 'Analysis Complete! 🎉' : 'Detecting your ingredients...'}
        </h2>
        <p style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.textSec }}>
          {done ? 'Found 7 ingredients, ready to show' : 'Our AI is working its magic'}
        </p>
      </div>

      {/* Steps */}
      <div style={{
        width: '100%',
        background: C.surface,
        borderRadius: 24,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        zIndex: 1,
      }}>
        {STEPS.map((step, i) => {
          const isComplete = i < currentStep || done;
          const isActive = i === currentStep && !done;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                background: isComplete ? C.secondary : isActive ? C.primary : '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {isComplete ? (
                  <Check size={16} color="#fff" strokeWidth={3} />
                ) : isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader size={16} color="#fff" />
                  </motion.div>
                ) : (
                  <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, fontWeight: 700, color: C.textSec }}>
                    {i + 1}
                  </span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'Nunito Sans',
                  fontSize: 14,
                  fontWeight: 600,
                  color: isComplete ? C.secondary : isActive ? C.text : C.textSec,
                }}>
                  {step.label}
                </div>
                {isActive && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: step.duration / 1000 }}
                    style={{
                      height: 3,
                      background: C.primary,
                      borderRadius: 2,
                      marginTop: 4,
                    }}
                  />
                )}
              </div>
              {isComplete && (
                <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.secondary, fontWeight: 700 }}>
                  Done
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Ingredient preview chips */}
      <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', zIndex: 1 }}>
        {currentStep >= 1 && ['🍅 Tomatoes', '🍝 Pasta', '🧄 Garlic'].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            style={{
              background: C.surface,
              border: `1.5px solid ${C.border}`,
              borderRadius: 20,
              padding: '6px 14px',
              fontFamily: 'Nunito Sans',
              fontSize: 13,
              fontWeight: 600,
              color: C.text,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {item}
          </motion.div>
        ))}
        {currentStep >= 2 && ['🌿 Basil', '🫒 Olive Oil', '🧅 Onion'].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            style={{
              background: C.surface,
              border: `1.5px solid ${C.border}`,
              borderRadius: 20,
              padding: '6px 14px',
              fontFamily: 'Nunito Sans',
              fontSize: 13,
              fontWeight: 600,
              color: C.text,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
