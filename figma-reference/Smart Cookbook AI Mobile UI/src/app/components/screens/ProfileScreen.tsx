import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, ScreenName } from '../shared/data';
import { BottomNav } from '../shared/UIComponents';
import { ChevronRight, Bell, Lock, HelpCircle, LogOut, Edit3, Shield, Star, Flame } from 'lucide-react';

const DIET_OPTIONS = ['Normal', 'Healthy', 'Weight Loss', 'Muscle Gain', 'Vegan', 'Keto'];
const LEVEL_OPTIONS = ['Beginner', 'Home Cook', 'Advanced', 'Pro Chef'];

export function ProfileScreen({ navigate }: { navigate: (s: ScreenName) => void }) {
  const [diet, setDiet] = useState('Healthy');
  const [level, setLevel] = useState('Home Cook');

  const menuItems = [
    { icon: Bell, label: 'Notifications', sublabel: 'Recipe reminders', color: '#7C3AED' },
    { icon: Lock, label: 'Privacy & Security', sublabel: 'Account safety', color: C.primary },
    { icon: Shield, label: 'Dietary Restrictions', sublabel: 'Manage allergens', color: C.secondary },
    { icon: HelpCircle, label: 'Help & Support', sublabel: 'FAQs and contact', color: C.warning },
  ];

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`,
          padding: '52px 20px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 20, fontWeight: 900, color: '#fff' }}>My Profile</div>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: 12,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Edit3 size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* Avatar card - overlaps header */}
        <div style={{ padding: '0 20px', marginTop: -40 }}>
          <div style={{
            background: C.surface,
            borderRadius: 24,
            padding: '24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #fff',
                boxShadow: `0 4px 16px ${C.primary}40`,
              }}>
                <span style={{ fontSize: 36 }}>👨‍🍳</span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                width: 24,
                height: 24,
                borderRadius: 12,
                background: C.secondary,
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: 12 }}>✓</span>
              </div>
            </div>

            {/* User info */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 20, fontWeight: 900, color: C.text }}>
                Alex Johnson
              </div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.textSec, marginBottom: 8 }}>
                alex@example.com
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: `${C.primary}15`,
                borderRadius: 10,
                padding: '4px 10px',
              }}>
                <Flame size={12} color={C.primary} />
                <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, fontWeight: 700, color: C.primary }}>
                  Home Cook
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Achievement stats */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Recipes', value: '24', emoji: '🍽️' },
              { label: 'Streak', value: '7d', emoji: '🔥' },
              { label: 'Rating', value: '4.8', emoji: '⭐' },
            ].map(s => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: C.surface,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 16,
                  padding: '14px 10px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 20, fontWeight: 900, color: C.primary }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, color: C.textSec }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Diet preference */}
          <div style={{ background: C.surface, borderRadius: 20, padding: '20px', border: `1.5px solid ${C.border}` }}>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 12 }}>
              Diet Goal
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DIET_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setDiet(opt)}
                  style={{
                    background: diet === opt ? C.primary : C.bg,
                    color: diet === opt ? '#fff' : C.text,
                    border: `1.5px solid ${diet === opt ? C.primary : C.border}`,
                    borderRadius: 20,
                    padding: '8px 14px',
                    fontFamily: 'Nunito Sans',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Cooking level */}
          <div style={{ background: C.surface, borderRadius: 20, padding: '20px', border: `1.5px solid ${C.border}` }}>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 12 }}>
              Cooking Level
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {LEVEL_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setLevel(opt)}
                  style={{
                    flex: 1,
                    background: level === opt ? `${C.primary}15` : C.bg,
                    color: level === opt ? C.primary : C.textSec,
                    border: `1.5px solid ${level === opt ? C.primary : C.border}`,
                    borderRadius: 12,
                    padding: '10px 6px',
                    fontFamily: 'Nunito Sans',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Settings menu */}
          <div style={{
            background: C.surface,
            borderRadius: 20,
            border: `1.5px solid ${C.border}`,
            overflow: 'hidden',
          }}>
            {menuItems.map((item, i) => (
              <div key={item.label}>
                <button
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px 18px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${item.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.icon size={18} color={item.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 700, color: C.text }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>
                      {item.sublabel}
                    </div>
                  </div>
                  <ChevronRight size={16} color={C.textSec} />
                </button>
                {i < menuItems.length - 1 && (
                  <div style={{ height: 1, background: C.divider, marginLeft: 72 }} />
                )}
              </div>
            ))}
          </div>

          {/* App version */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.textSec }}>
              Smart Cookbook AI v2.4.1
            </div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: `${C.textSec}80`, marginTop: 2 }}>
              Made with ❤️ for food lovers
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => navigate('login')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: '#FEF2F2',
              border: `1.5px solid #FECACA`,
              borderRadius: 16,
              padding: '16px',
              fontFamily: 'Nunito Sans',
              fontSize: 15,
              fontWeight: 700,
              color: C.error,
              cursor: 'pointer',
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      <BottomNav active="profile" onNavigate={tab => navigate(tab)} />
    </div>
  );
}
