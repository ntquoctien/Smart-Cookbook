import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, RECIPES, ScreenName } from '../shared/data';
import { RecipeCard, TopAppBar, SearchBar } from '../shared/UIComponents';
import { SlidersHorizontal, Zap, Check } from 'lucide-react';

const SORT_OPTIONS = ['Best Match', 'Fewest Missing', 'Fastest', 'Lowest Calories'];

export function RecipeRecommendScreen({ navigate, goBack }: { navigate: (s: ScreenName) => void; goBack: () => void }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Best Match');
  const [showFilter, setShowFilter] = useState(false);

  const filtered = RECIPES.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sort === 'Best Match') return b.matchScore - a.matchScore;
    if (sort === 'Fewest Missing') return a.missingIngredients.length - b.missingIngredients.length;
    if (sort === 'Fastest') return parseInt(a.time) - parseInt(b.time);
    if (sort === 'Lowest Calories') return a.calories - b.calories;
    return 0;
  });

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar
        title="Recipe Suggestions"
        onBack={goBack}
        rightAction={
          <button
            onClick={() => setShowFilter(!showFilter)}
            style={{
              background: showFilter ? C.primary : '#F3F4F6',
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
            <SlidersHorizontal size={18} color={showFilter ? '#fff' : C.text} />
          </button>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* AI summary */}
        <div style={{
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
          borderRadius: 20,
          padding: '16px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Zap size={22} color="#fff" fill="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 800, color: '#fff' }}>
              {filtered.length} recipes found!
            </div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>
              Based on 7 detected ingredients
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Top match</div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 22, fontWeight: 900, color: '#fff' }}>
              {Math.max(...filtered.map(r => r.matchScore))}%
            </div>
          </div>
        </div>

        {/* Search */}
        <SearchBar placeholder="Filter recipes..." value={search} onChange={setSearch} />

        {/* Sort options */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              style={{
                background: sort === opt ? C.primary : C.surface,
                color: sort === opt ? '#fff' : C.textSec,
                border: `1.5px solid ${sort === opt ? C.primary : C.border}`,
                borderRadius: 20,
                padding: '8px 14px',
                fontFamily: 'Nunito Sans',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {sort === opt && <Check size={12} strokeWidth={3} />}
              {opt}
            </button>
          ))}
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: 'Ready to cook', value: RECIPES.filter(r => r.missingIngredients.length === 0).length, emoji: '✅', color: C.secondary },
            { label: 'Need 1 item', value: RECIPES.filter(r => r.missingIngredients.length === 1).length, emoji: '🛒', color: C.warning },
          ].map(s => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: C.surface,
                borderRadius: 14,
                padding: '12px 14px',
                border: `1.5px solid ${C.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>{s.emoji}</span>
              <div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 18, fontWeight: 900, color: s.color }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, color: C.textSec }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <RecipeCard recipe={recipe} onClick={() => navigate('recipeDetail')} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
