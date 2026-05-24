import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, HISTORY_ITEMS, ScreenName } from '../shared/data';
import { BottomNav, EmptyState, SearchBar } from '../shared/UIComponents';
import { Star, Clock, ChevronRight, Trophy } from 'lucide-react';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function CookingHistoryScreen({ navigate }: { navigate: (s: ScreenName) => void }) {
  const [search, setSearch] = useState('');

  const filtered = HISTORY_ITEMS.filter(h =>
    h.recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalCooked = HISTORY_ITEMS.length;
  const avgRating = (HISTORY_ITEMS.reduce((s, h) => s + (h.rating || 0), 0) / HISTORY_ITEMS.length).toFixed(1);

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        {/* Header */}
        <div style={{
          background: C.surface,
          padding: '52px 20px 20px',
          borderBottom: `1px solid ${C.divider}`,
        }}>
          <h1 style={{ fontFamily: 'Nunito Sans', fontSize: 24, fontWeight: 900, color: C.text, marginBottom: 4 }}>
            🕐 Cooking History
          </h1>
          <p style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.textSec, marginBottom: 16 }}>
            Your culinary journey
          </p>
          <SearchBar placeholder="Search history..." value={search} onChange={setSearch} />
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Achievement banner */}
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
            }}>
              <Trophy size={24} color="#FFD700" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 800, color: '#fff' }}>
                Home Chef Level Unlocked! 🏆
              </div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                You've cooked {totalCooked}+ recipes this month
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Total cooked', value: totalCooked, emoji: '🍽️', color: C.primary },
              { label: 'Avg rating', value: avgRating + '★', emoji: '⭐', color: C.warning },
              { label: 'This month', value: totalCooked, emoji: '📅', color: C.secondary },
            ].map(s => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: C.surface,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 14,
                  padding: '12px 8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 900, color: s.color }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, color: C.textSec }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* History list */}
          {filtered.length === 0 ? (
            <EmptyState
              emoji="📭"
              title="No history yet"
              subtitle="Cook your first recipe to see it appear here"
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => navigate('recipeDetail')}
                  style={{
                    background: C.surface,
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 0 }}>
                    <img
                      src={item.recipe.image}
                      alt={item.recipe.name}
                      style={{ width: 90, height: 90, objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontFamily: 'Nunito Sans', fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 4 }}>
                          {item.recipe.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={12} color={C.textSec} />
                            <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>
                              {item.recipe.time}
                            </span>
                          </div>
                          <div style={{
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            background: C.border,
                          }} />
                          <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>
                            {formatDate(item.cookedAt)}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {item.rating ? (
                          <div style={{ display: 'flex', gap: 3 }}>
                            {[1, 2, 3, 4, 5].map(n => (
                              <Star
                                key={n}
                                size={14}
                                color="#F59E0B"
                                fill={n <= item.rating! ? '#F59E0B' : 'transparent'}
                              />
                            ))}
                          </div>
                        ) : (
                          <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>No rating</span>
                        )}
                        <ChevronRight size={16} color={C.textSec} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav active="history" onNavigate={tab => navigate(tab)} />
    </div>
  );
}
