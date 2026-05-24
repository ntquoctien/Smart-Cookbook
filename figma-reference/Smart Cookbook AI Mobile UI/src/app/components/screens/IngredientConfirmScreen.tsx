import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, DETECTED_INGREDIENTS, ScreenName } from '../shared/data';
import { PrimaryButton, IngredientChip, TopAppBar } from '../shared/UIComponents';
import { Plus, Zap } from 'lucide-react';

export function IngredientConfirmScreen({ navigate, goBack }: { navigate: (s: ScreenName) => void; goBack: () => void }) {
  const [ingredients, setIngredients] = useState(DETECTED_INGREDIENTS);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');

  const removeIngredient = (id: string) => {
    setIngredients(prev => prev.filter(i => i.id !== id));
  };

  const addIngredient = () => {
    if (!newName.trim()) return;
    setIngredients(prev => [...prev, {
      id: `custom_${Date.now()}`,
      name: newName,
      quantity: '1 piece',
      confidence: 100,
      emoji: '🍽️',
    }]);
    setNewName('');
    setShowAdd(false);
  };

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar title="Confirm Ingredients" onBack={goBack} />

      {/* AI summary banner */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${C.primary}15, ${C.primary}25)`,
          border: `1.5px solid ${C.primary}30`,
          borderRadius: 18,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 14,
            background: C.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Zap size={20} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 800, color: C.text }}>
              AI detected {ingredients.length} ingredients
            </div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>
              Review, edit quantities, or add missing items
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ingredients.map((ing, i) => (
          <motion.div
            key={ing.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <IngredientChip
              emoji={ing.emoji}
              name={ing.name}
              confidence={ing.confidence}
              onDelete={() => removeIngredient(ing.id)}
            />
          </motion.div>
        ))}

        {/* Add ingredient */}
        {showAdd ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: C.surface,
              border: `2px solid ${C.primary}`,
              borderRadius: 14,
              padding: '14px',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 24 }}>🍽️</span>
            <input
              autoFocus
              placeholder="Ingredient name..."
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addIngredient()}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Nunito Sans',
                fontSize: 14,
                color: C.text,
                background: 'transparent',
              }}
            />
            <button
              onClick={addIngredient}
              style={{
                background: C.primary,
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontFamily: 'Nunito Sans',
                fontSize: 13,
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
            <button
              onClick={() => setShowAdd(false)}
              style={{
                background: '#F3F4F6',
                border: 'none',
                borderRadius: 8,
                padding: '6px 10px',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'transparent',
              border: `2px dashed ${C.primary}50`,
              borderRadius: 14,
              padding: '14px 16px',
              cursor: 'pointer',
              color: C.primary,
              fontFamily: 'Nunito Sans',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            <Plus size={18} />
            Add ingredient manually
          </button>
        )}

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginTop: 4,
        }}>
          {[
            { label: 'Detected', value: ingredients.length, color: C.primary },
            { label: 'High confidence', value: ingredients.filter(i => i.confidence >= 85).length, color: C.secondary },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                background: C.surface,
                border: `1.5px solid ${C.border}`,
                borderRadius: 14,
                padding: '12px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 22, fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '12px 20px 36px', flexShrink: 0 }}>
        <PrimaryButton
          label={`Find Recipes with ${ingredients.length} Ingredients`}
          onClick={() => navigate('preferences')}
        />
      </div>
    </div>
  );
}
