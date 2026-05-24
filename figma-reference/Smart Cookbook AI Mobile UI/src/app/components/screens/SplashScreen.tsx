import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { C, IMG } from '../shared/data';
import { Zap } from 'lucide-react';

export function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background food image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${IMG.ingredients})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
      }} />

      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: -80,
        right: -80,
        width: 240,
        height: 240,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -60,
        left: -60,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
      }} />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 1 }}
      >
        {/* Logo icon */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 28,
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}>
          <span style={{ fontSize: 50 }}>🍳</span>
        </div>

        {/* App name */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: 32,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}>
            Smart Cookbook
          </div>
          <div style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: 18,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: 6,
            marginTop: 4,
          }}>
            AI
          </div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 20,
            padding: '8px 16px',
          }}
        >
          <Zap size={14} color="#fff" fill="#fff" />
          <span style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
            Cook smarter with AI
          </span>
        </motion.div>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          bottom: 80,
          display: 'flex',
          gap: 8,
        }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.8)',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
