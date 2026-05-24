import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, ScreenName } from '../shared/data';
import { PrimaryButton, PreferenceChip, DifficultySelector, TopAppBar } from '../shared/UIComponents';

const DIET_GOALS = [
  { label: 'Normal', emoji: '🍽️' },
  { label: 'Healthy', emoji: '🥗' },
  { label: 'Weight Loss', emoji: '⚖️' },
  { label: 'Muscle Gain', emoji: '💪' },
  { label: 'Budget Meal', emoji: '💰' },
  { label: 'Under 30 min', emoji: '⚡' },
  { label: 'Vegan', emoji: '🌱' },
  { label: 'Keto', emoji: '🥩' },
];

const TIMES = ['Any', '< 15 min', '< 30 min', '< 60 min'];

export function PreferenceScreen({ navigate, goBack }: { navigate: (s: ScreenName) => void; goBack: () => void }) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Healthy']);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [cookTime, setCookTime] = useState('< 30 min');
  const [servings, setServings] = useState(2);

  const toggleGoal = (label: string) => {
    setSelectedGoals(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar title="Your Preferences" onBack={goBack} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: `linear-gradient(135deg, ${C.secondary}15, ${C.secondary}25)`,
            borderRadius: 20,
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 36 }}>🎯</span>
          <div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 15, fontWeight: 800, color: C.text }}>
              Customize Your Experience
            </div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.textSec }}>
              We'll find the perfect recipes for you
            </div>
          </div>
        </motion.div>

        {/* Diet Goals */}
        <div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>
            Diet Goals
          </div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.textSec, marginBottom: 12 }}>
            Select all that apply
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {DIET_GOALS.map(g => (
              <PreferenceChip
                key={g.label}
                label={g.label}
                emoji={g.emoji}
                selected={selectedGoals.includes(g.label)}
                onToggle={() => toggleGoal(g.label)}
              />
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 12 }}>
            Difficulty Level
          </div>
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
        </div>

        {/* Cooking time */}
        <div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 12 }}>
            Max Cooking Time
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {TIMES.map(t => (
              <button
                key={t}
                onClick={() => setCookTime(t)}
                style={{
                  flex: 1,
                  background: cookTime === t ? C.primary : C.surface,
                  color: cookTime === t ? '#fff' : C.text,
                  border: `1.5px solid ${cookTime === t ? C.primary : C.border}`,
                  borderRadius: 12,
                  padding: '10px 6px',
                  fontFamily: 'Nunito Sans',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Servings */}
        <div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 12 }}>
            Servings
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            background: C.surface,
            borderRadius: 16,
            padding: '16px 20px',
            border: `1.5px solid ${C.border}`,
          }}>
            <button
              onClick={() => setServings(s => Math.max(1, s - 1))}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: C.bg,
                border: `1.5px solid ${C.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 20,
                fontWeight: 700,
                color: C.text,
              }}
            >
              −
            </button>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 28, fontWeight: 900, color: C.primary }}>
                {servings}
              </div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>
                {servings === 1 ? 'person' : 'people'}
              </div>
            </div>
            <button
              onClick={() => setServings(s => Math.min(10, s + 1))}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: C.primary,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 20,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Allergens */}
        <div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 12 }}>
            Avoid (Allergens)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['Nuts 🥜', 'Dairy 🧀', 'Gluten 🌾', 'Eggs 🥚', 'Soy 🫘', 'Shellfish 🦐'].map(a => (
              <PreferenceChip key={a} label={a} selected={false} onToggle={() => {}} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '12px 20px 36px', flexShrink: 0 }}>
        <PrimaryButton
          label="Find My Recipes 🍳"
          onClick={() => navigate('recipeRecommend')}
        />
      </div>
    </div>
  );
}
