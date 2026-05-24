import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, IMG, RECIPES, ScreenName } from '../shared/data';
import { SearchBar, RecipeCard, BottomNav, PreferenceChip } from '../shared/UIComponents';
import { Camera, Bell, ChevronRight, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { label: 'Healthy', emoji: '🥗' },
  { label: 'Budget', emoji: '💰' },
  { label: 'High Protein', emoji: '💪' },
  { label: 'Under 30 min', emoji: '⚡' },
  { label: 'Vegan', emoji: '🌱' },
  { label: 'Keto', emoji: '🥩' },
];

export function HomeScreen({ navigate }: { navigate: (s: ScreenName) => void }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredRecipes = RECIPES.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (!activeCategory || r.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase())))
  );

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`,
          padding: '52px 20px 28px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 160, height: 160, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                Good morning, Chef! 👋
              </div>
              <h1 style={{
                fontFamily: 'Nunito Sans',
                fontSize: 24,
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.2,
              }}>
                What are we<br />cooking today?
              </h1>
            </div>
            <button
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: 14,
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <Bell size={20} color="#fff" />
              <div style={{
                position: 'absolute', top: 8, right: 8,
                width: 8, height: 8, borderRadius: 4,
                background: C.warning, border: '2px solid transparent',
              }} />
            </button>
          </div>

          {/* Search bar */}
          <div style={{ marginTop: 20, position: 'relative', zIndex: 1 }}>
            <SearchBar placeholder="Search recipes..." value={search} onChange={setSearch} />
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Scan CTA */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('camera')}
            style={{
              background: `linear-gradient(135deg, ${C.primary}15, ${C.primary}25)`,
              border: `2px dashed ${C.primary}60`,
              borderRadius: 24,
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              cursor: 'pointer',
              marginBottom: 24,
            }}
          >
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: C.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 24px ${C.primary}50`,
              flexShrink: 0,
            }}>
              <Camera size={28} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 4 }}>
                Scan Ingredients
              </div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.textSec, lineHeight: 1.4 }}>
                Take a photo and let AI find the perfect recipe for you
              </div>
            </div>
            <ChevronRight size={20} color={C.primary} />
          </motion.div>

          {/* Category chips */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 12 }}>
              Browse by Category
            </div>
            <div style={{
              display: 'flex',
              gap: 10,
              overflowX: 'auto',
              paddingBottom: 4,
              scrollbarWidth: 'none',
            }}>
              {CATEGORIES.map(cat => (
                <PreferenceChip
                  key={cat.label}
                  label={cat.label}
                  emoji={cat.emoji}
                  selected={activeCategory === cat.label}
                  onToggle={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                />
              ))}
            </div>
          </div>

          {/* AI Pick of the day */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              background: `linear-gradient(135deg, #7C3AED, #5B21B6)`,
              borderRadius: 20,
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Sparkles size={22} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                  AI Pick of the Day
                </div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 15, fontWeight: 800, color: '#fff' }}>
                  Mediterranean Pasta
                </div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                  Based on your taste profile ✨
                </div>
              </div>
              <button
                onClick={() => navigate('recipeDetail')}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 14px',
                  fontFamily: 'Nunito Sans',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Cook
              </button>
            </div>
          </div>

          {/* Recommended Recipes */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 17, fontWeight: 800, color: C.text }}>
                Recommended
              </div>
              <button style={{ background: 'none', border: 'none', color: C.primary, fontSize: 14, fontWeight: 700, fontFamily: 'Nunito Sans', cursor: 'pointer' }}>
                See all
              </button>
            </div>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
              {RECIPES.slice(0, 4).map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => navigate('recipeDetail')}
                  compact
                />
              ))}
            </div>
          </div>

          {/* Recently Cooked */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 17, fontWeight: 800, color: C.text }}>
                Recently Cooked
              </div>
              <button
                onClick={() => navigate('history')}
                style={{ background: 'none', border: 'none', color: C.primary, fontSize: 14, fontWeight: 700, fontFamily: 'Nunito Sans', cursor: 'pointer' }}
              >
                History
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filteredRecipes.slice(0, 3).map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => navigate('recipeDetail')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="home" onNavigate={tab => navigate(tab)} />
    </div>
  );
}
