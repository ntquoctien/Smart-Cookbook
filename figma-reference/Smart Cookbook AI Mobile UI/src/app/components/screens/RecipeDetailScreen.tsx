import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, RECIPES, ScreenName } from '../shared/data';
import { PrimaryButton, Badge } from '../shared/UIComponents';
import { Heart, Clock, Flame, Users, Star, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

const recipe = RECIPES[0];

export function RecipeDetailScreen({ navigate, goBack }: { navigate: (s: ScreenName) => void; goBack: () => void }) {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps'>('ingredients');

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero image */}
        <div style={{ position: 'relative', height: 280 }}>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5))',
          }} />

          {/* Nav buttons */}
          <div style={{
            position: 'absolute',
            top: 52,
            left: 0,
            right: 0,
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <button
              onClick={goBack}
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: 12,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <ChevronLeft size={22} color={C.text} />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              style={{
                background: saved ? '#FFF1F1' : 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: 12,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <Heart size={20} color={saved ? C.error : C.textSec} fill={saved ? C.error : 'transparent'} />
            </button>
          </div>

          {/* Match score badge */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 20,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 12,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: C.primary }} />
            <span style={{ fontFamily: 'Nunito Sans', fontSize: 13, fontWeight: 800, color: C.text }}>
              {recipe.matchScore}% ingredient match
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{
          background: C.surface,
          borderRadius: '28px 28px 0 0',
          marginTop: -24,
          padding: '24px 20px',
        }}>
          {/* Title & rating */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: 'Nunito Sans',
                fontSize: 24,
                fontWeight: 900,
                color: C.text,
                lineHeight: 1.2,
                marginBottom: 8,
              }}>
                {recipe.name}
              </h1>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {recipe.tags.map(tag => (
                  <Badge key={tag} label={tag} color={C.secondary} bg={`${C.secondary}18`} />
                ))}
              </div>
            </div>
            {recipe.rating && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FEF3C7',
                borderRadius: 14,
                padding: '10px 14px',
                marginLeft: 12,
              }}>
                <Star size={18} color="#F59E0B" fill="#F59E0B" />
                <span style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 900, color: '#92400E' }}>
                  {recipe.rating}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.textSec, lineHeight: 1.6, marginBottom: 20 }}>
            {recipe.description}
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {[
              { icon: <Clock size={16} color={C.primary} />, label: recipe.time, sub: 'Cook time' },
              { icon: <Flame size={16} color={C.warning} />, label: `${recipe.calories}`, sub: 'Calories' },
              { icon: <Users size={16} color={C.secondary} />, label: `${recipe.servings}`, sub: 'Servings' },
              { icon: <span style={{ fontSize: 16 }}>📊</span>, label: recipe.difficulty, sub: 'Level' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: C.bg,
                  borderRadius: 14,
                  padding: '12px 8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 800, color: C.text }}>{s.label}</div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 10, color: C.textSec }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: 4,
            background: C.bg,
            borderRadius: 14,
            padding: 4,
            marginBottom: 20,
          }}>
            {(['ingredients', 'steps'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  background: activeTab === tab ? C.surface : 'transparent',
                  border: 'none',
                  borderRadius: 10,
                  padding: '10px',
                  fontFamily: 'Nunito Sans',
                  fontSize: 14,
                  fontWeight: 700,
                  color: activeTab === tab ? C.primary : C.textSec,
                  cursor: 'pointer',
                  boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'ingredients' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Available */}
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                ✅ Available ({recipe.availableIngredients.length})
              </div>
              {recipe.availableIngredients.map(ing => (
                <div
                  key={ing}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: `${C.secondary}10`,
                    border: `1.5px solid ${C.secondary}30`,
                    borderRadius: 12,
                    padding: '12px 14px',
                  }}
                >
                  <Check size={16} color={C.secondary} strokeWidth={3} />
                  <span style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.text, fontWeight: 600 }}>{ing}</span>
                </div>
              ))}
              {recipe.missingIngredients.length > 0 && (
                <>
                  <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, fontWeight: 700, color: C.warning, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 8, marginBottom: 6 }}>
                    🛒 Need to buy ({recipe.missingIngredients.length})
                  </div>
                  {recipe.missingIngredients.map(ing => (
                    <div
                      key={ing}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        background: '#FEF3C7',
                        border: '1.5px solid #FCD34D',
                        borderRadius: 12,
                        padding: '12px 14px',
                      }}
                    >
                      <X size={16} color={C.warning} />
                      <span style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: '#92400E', fontWeight: 600 }}>{ing}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recipe.steps.map((step, i) => (
                <div
                  key={step.step}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: '14px 0',
                    borderBottom: i < recipe.steps.length - 1 ? `1px solid ${C.divider}` : 'none',
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    background: `${C.primary}15`,
                    border: `2px solid ${C.primary}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'Nunito Sans', fontSize: 13, fontWeight: 800, color: C.primary }}>
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.text, lineHeight: 1.5 }}>
                      {step.instruction}
                    </p>
                    {step.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                        <Clock size={12} color={C.textSec} />
                        <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>
                          ~{step.time} min
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ height: 24 }} />
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '12px 20px 36px',
        background: C.surface,
        borderTop: `1px solid ${C.divider}`,
        flexShrink: 0,
      }}>
        <PrimaryButton
          label="Start Cooking 🍳"
          onClick={() => navigate('cookingAssistant')}
        />
      </div>
    </div>
  );
}
