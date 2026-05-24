import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { C, RECIPES, ScreenName } from '../shared/data';
import { PrimaryButton, SecondaryButton, StarRating } from '../shared/UIComponents';
import { Heart, RotateCcw, Home } from 'lucide-react';

const recipe = RECIPES[0];

export function CookingCompletedScreen({ navigate }: { navigate: (s: ScreenName) => void }) {
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#FF7A45', '#4CAF50', '#F59E0B', '#7C3AED'],
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
        padding: '72px 28px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Background circles */}
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          style={{
            fontSize: 80,
            marginBottom: 16,
            display: 'block',
            position: 'relative',
            zIndex: 1,
          }}
        >
          🎉
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h1 style={{
            fontFamily: 'Nunito Sans',
            fontSize: 30,
            fontWeight: 900,
            color: '#fff',
            marginBottom: 8,
          }}>
            You did it!
          </h1>
          <p style={{ fontFamily: 'Nunito Sans', fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
            {recipe.name} is ready to serve 🍽️
          </p>
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          flex: 1,
          background: C.surface,
          borderRadius: '28px 28px 0 0',
          marginTop: -24,
          padding: '28px 24px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Recipe preview */}
        <div style={{
          display: 'flex',
          gap: 14,
          background: C.bg,
          borderRadius: 20,
          padding: '14px',
          alignItems: 'center',
        }}>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              objectFit: 'cover',
            }}
          />
          <div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>
              {recipe.name}
            </div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.textSec }}>
              Cooked in {recipe.time} • {recipe.calories} kcal
            </div>
            <div style={{
              marginTop: 6,
              background: `${C.secondary}20`,
              borderRadius: 8,
              padding: '3px 10px',
              display: 'inline-block',
            }}>
              <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, fontWeight: 700, color: C.secondary }}>
                ✓ Successfully cooked!
              </span>
            </div>
          </div>
        </div>

        {/* Rating section */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 6 }}>
            How did it taste?
          </div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.textSec, marginBottom: 16 }}>
            Your feedback helps us suggest better recipes
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StarRating rating={rating} onRate={setRating} />
          </div>
          {rating > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: 10,
                fontFamily: 'Nunito Sans',
                fontSize: 15,
                color: C.primary,
                fontWeight: 700,
              }}
            >
              {['', 'Needs work 😅', 'It was okay 😊', 'Pretty good! 👍', 'Loved it! 😍', 'Perfect! 🌟'][rating]}
            </motion.div>
          )}
        </div>

        {/* Notes */}
        <div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8 }}>
            Add a note (optional)
          </div>
          <textarea
            placeholder="What did you change? What worked well? Notes for next time..."
            value={note}
            onChange={e => setNote(e.target.value)}
            style={{
              width: '100%',
              background: '#F9FAFB',
              border: `1.5px solid ${C.border}`,
              borderRadius: 14,
              padding: '14px 16px',
              fontSize: 14,
              fontFamily: 'Nunito Sans',
              color: C.text,
              outline: 'none',
              resize: 'none',
              height: 80,
              boxSizing: 'border-box',
              lineHeight: 1.5,
            }}
          />
        </div>

        {/* Stats achieved */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { emoji: '🔥', value: '2', label: 'Day streak' },
            { emoji: '🍽️', value: '12', label: 'Recipes cooked' },
            { emoji: '⭐', value: '4.3', label: 'Avg rating' },
          ].map(s => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: C.bg,
                borderRadius: 14,
                padding: '12px 8px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.emoji}</div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 18, fontWeight: 900, color: C.primary }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, color: C.textSec }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => setSaved(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: saved ? `${C.secondary}15` : C.surface,
              border: `2px solid ${saved ? C.secondary : C.border}`,
              borderRadius: 16,
              padding: '14px',
              fontFamily: 'Nunito Sans',
              fontSize: 15,
              fontWeight: 700,
              color: saved ? C.secondary : C.text,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Heart size={20} color={saved ? C.secondary : C.textSec} fill={saved ? C.secondary : 'transparent'} />
            {saved ? 'Saved to Favorites! ✓' : 'Save to Favorites'}
          </button>

          <PrimaryButton
            label="Cook Again"
            onClick={() => navigate('recipeDetail')}
            icon={<RotateCcw size={18} />}
          />

          <button
            onClick={() => navigate('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              color: C.textSec,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'Nunito Sans',
              cursor: 'pointer',
              padding: '12px',
            }}
          >
            <Home size={16} />
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
