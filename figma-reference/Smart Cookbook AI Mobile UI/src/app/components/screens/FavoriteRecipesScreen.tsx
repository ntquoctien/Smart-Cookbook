import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, RECIPES, ScreenName } from '../shared/data';
import { SearchBar, RecipeCard, BottomNav, EmptyState } from '../shared/UIComponents';
import { SlidersHorizontal } from 'lucide-react';

const FAV_RECIPES = [RECIPES[0], RECIPES[2], RECIPES[4]];
const FILTER_TAGS = ['All', 'Healthy', 'Easy', 'Quick', 'Vegan'];

export function FavoriteRecipesScreen({ navigate }: { navigate: (s: ScreenName) => void }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filtered = FAV_RECIPES.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (activeFilter === 'All' || r.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())))
  );

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        {/* Header */}
        <div style={{
          background: C.surface,
          padding: '52px 20px 20px',
          borderBottom: `1px solid ${C.divider}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.textSec, marginBottom: 2 }}>
                My Collection
              </div>
              <h1 style={{ fontFamily: 'Nunito Sans', fontSize: 24, fontWeight: 900, color: C.text }}>
                ❤️ Favorites
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setViewMode(v => v === 'list' ? 'grid' : 'list')}
                style={{
                  background: '#F3F4F6',
                  border: 'none',
                  borderRadius: 12,
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 18,
                }}
              >
                {viewMode === 'list' ? '⊞' : '☰'}
              </button>
              <button
                style={{
                  background: '#F3F4F6',
                  border: 'none',
                  borderRadius: 12,
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <SlidersHorizontal size={18} color={C.text} />
              </button>
            </div>
          </div>
          <SearchBar placeholder="Search favorites..." value={search} onChange={setSearch} />
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Saved', value: FAV_RECIPES.length, emoji: '❤️' },
              { label: 'Cooked', value: 2, emoji: '🍳' },
              { label: 'Avg score', value: '4.6★', emoji: '⭐' },
            ].map(s => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: C.surface,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 14,
                  padding: '12px 10px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 900, color: C.primary }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, color: C.textSec }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
            {FILTER_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                style={{
                  background: activeFilter === tag ? C.primary : C.surface,
                  color: activeFilter === tag ? '#fff' : C.textSec,
                  border: `1.5px solid ${activeFilter === tag ? C.primary : C.border}`,
                  borderRadius: 20,
                  padding: '8px 16px',
                  fontFamily: 'Nunito Sans',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Recipe list/grid */}
          {filtered.length === 0 ? (
            <EmptyState
              emoji="💔"
              title="No favorites yet"
              subtitle="Cook a recipe and tap the heart icon to save it here"
            />
          ) : viewMode === 'list' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filtered.map((recipe, i) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <RecipeCard recipe={recipe} onClick={() => navigate('recipeDetail')} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
            }}>
              {filtered.map((recipe, i) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <RecipeCard recipe={recipe} onClick={() => navigate('recipeDetail')} compact />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav active="favorites" onNavigate={tab => navigate(tab)} />
    </div>
  );
}
