import React from 'react';
import { C } from './data';
import {
  Home, Search, Heart, Clock, User, ChevronLeft, Star, Flame,
  Check, Plus, X, Mic, Send, Camera, Zap
} from 'lucide-react';

// ─── Buttons ──────────────────────────────────────────────────────────────────

export function PrimaryButton({
  label, onClick, disabled, icon, fullWidth = true, small = false
}: {
  label: string; onClick: () => void; disabled?: boolean;
  icon?: React.ReactNode; fullWidth?: boolean; small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? '#D1D5DB' : `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
        color: '#fff',
        border: 'none',
        borderRadius: 16,
        padding: small ? '10px 20px' : '16px 24px',
        fontSize: small ? 14 : 16,
        fontWeight: 700,
        fontFamily: 'Nunito Sans, sans-serif',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: fullWidth ? '100%' : 'auto',
        boxShadow: disabled ? 'none' : `0 4px 16px ${C.primary}40`,
        transition: 'all 0.2s',
      }}
    >
      {icon && icon}
      {label}
    </button>
  );
}

export function SecondaryButton({
  label, onClick, fullWidth = true, small = false, icon
}: {
  label: string; onClick: () => void;
  fullWidth?: boolean; small?: boolean; icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#fff',
        color: C.primary,
        border: `2px solid ${C.primary}`,
        borderRadius: 16,
        padding: small ? '10px 20px' : '16px 24px',
        fontSize: small ? 14 : 16,
        fontWeight: 700,
        fontFamily: 'Nunito Sans, sans-serif',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s',
      }}
    >
      {icon && icon}
      {label}
    </button>
  );
}

export function IconButton({ icon, onClick, bg }: { icon: React.ReactNode; onClick: () => void; bg?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: bg || 'rgba(255,255,255,0.9)',
        border: 'none',
        borderRadius: 12,
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        flexShrink: 0,
      }}
    >
      {icon}
    </button>
  );
}

// ─── Input ─────────────────────────────────────────────────────────────────

export function InputField({
  label, placeholder, value, onChange, type = 'text', icon
}: {
  label?: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; icon?: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && (
        <span style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 600, color: C.text }}>
          {label}
        </span>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <div style={{ position: 'absolute', left: 16, color: C.textSec }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%',
            background: '#F9FAFB',
            border: `1.5px solid ${C.border}`,
            borderRadius: 14,
            padding: icon ? '14px 16px 14px 48px' : '14px 16px',
            fontSize: 15,
            fontFamily: 'Nunito Sans, sans-serif',
            color: C.text,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </div>
  );
}

export function SearchBar({
  placeholder = 'Search recipes...', value, onChange
}: {
  placeholder?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: C.surface,
      border: `1.5px solid ${C.border}`,
      borderRadius: 16,
      padding: '12px 16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <Search size={20} color={C.textSec} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: 15,
          fontFamily: 'Nunito Sans, sans-serif',
          color: C.text,
          flex: 1,
        }}
      />
    </div>
  );
}

// ─── Chips ──────────────────────────────────────────────────────────────────

export function IngredientChip({
  emoji, name, confidence, onDelete, onEdit
}: {
  emoji: string; name: string; confidence: number;
  onDelete: () => void; onEdit?: () => void;
}) {
  return (
    <div style={{
      background: C.surface,
      border: `1.5px solid ${C.border}`,
      borderRadius: 14,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 700, color: C.text }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <div style={{
            width: 50,
            height: 4,
            background: '#E5E7EB',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${confidence}%`,
              height: '100%',
              background: confidence > 85 ? C.secondary : confidence > 70 ? C.warning : C.error,
              borderRadius: 2,
            }} />
          </div>
          <span style={{ fontSize: 11, color: C.textSec, fontFamily: 'Nunito Sans' }}>{confidence}%</span>
        </div>
      </div>
      <button
        onClick={onDelete}
        style={{
          background: '#FEE2E2',
          border: 'none',
          borderRadius: 8,
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <X size={14} color={C.error} />
      </button>
    </div>
  );
}

export function PreferenceChip({
  label, selected, onToggle, emoji
}: {
  label: string; selected: boolean; onToggle: () => void; emoji?: string;
}) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: selected ? C.primary : C.surface,
        color: selected ? '#fff' : C.text,
        border: `1.5px solid ${selected ? C.primary : C.border}`,
        borderRadius: 24,
        padding: '10px 16px',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'Nunito Sans, sans-serif',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        boxShadow: selected ? `0 4px 12px ${C.primary}30` : 'none',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </button>
  );
}

// ─── Recipe Card ────────────────────────────────────────────────────────────

export function RecipeCard({
  recipe, onClick, compact = false
}: {
  recipe: { id: string; name: string; image: string; time: string; difficulty: string; matchScore: number; calories: number; tags: string[]; missingIngredients: string[]; rating?: number };
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.surface,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        flexShrink: 0,
        width: compact ? 180 : '100%',
      }}
    >
      <div style={{ position: 'relative', height: compact ? 120 : 180 }}>
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 10,
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <Zap size={12} color={C.primary} fill={C.primary} />
          <span style={{ fontSize: 12, fontWeight: 800, color: C.primary, fontFamily: 'Nunito Sans' }}>
            {recipe.matchScore}%
          </span>
        </div>
        {recipe.missingIngredients.length === 0 && (
          <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: C.secondary,
            borderRadius: 8,
            padding: '3px 8px',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'Nunito Sans' }}>
              Ready!
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: compact ? '10px 12px' : '14px 16px' }}>
        <div style={{ fontFamily: 'Nunito Sans', fontSize: compact ? 13 : 16, fontWeight: 700, color: C.text, marginBottom: 6, whiteSpace: compact ? 'nowrap' : undefined, overflow: compact ? 'hidden' : undefined, textOverflow: compact ? 'ellipsis' : undefined }}>
          {recipe.name}
        </div>
        {!compact && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={14} color={C.textSec} />
              <span style={{ fontSize: 13, color: C.textSec, fontFamily: 'Nunito Sans' }}>{recipe.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Flame size={14} color={C.primary} />
              <span style={{ fontSize: 13, color: C.textSec, fontFamily: 'Nunito Sans' }}>{recipe.calories} kcal</span>
            </div>
            {recipe.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <span style={{ fontSize: 13, color: C.textSec, fontFamily: 'Nunito Sans' }}>{recipe.rating}</span>
              </div>
            )}
          </div>
        )}
        {!compact && recipe.missingIngredients.length > 0 && (
          <div style={{
            background: '#FEF3C7',
            borderRadius: 10,
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ fontSize: 12, color: '#92400E', fontFamily: 'Nunito Sans', fontWeight: 600 }}>
              Missing: {recipe.missingIngredients.join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Top App Bar ─────────────────────────────────────────────────────────────

export function TopAppBar({
  title, onBack, rightAction, transparent = false
}: {
  title?: string; onBack?: () => void;
  rightAction?: React.ReactNode; transparent?: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px',
      background: transparent ? 'transparent' : C.surface,
      borderBottom: transparent ? 'none' : `1px solid ${C.divider}`,
      minHeight: 56,
      flexShrink: 0,
    }}>
      {onBack ? (
        <button
          onClick={onBack}
          style={{
            background: transparent ? 'rgba(255,255,255,0.9)' : '#F3F4F6',
            border: 'none',
            borderRadius: 12,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: transparent ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
          }}
        >
          <ChevronLeft size={22} color={C.text} />
        </button>
      ) : (
        <div style={{ width: 40 }} />
      )}
      {title && (
        <span style={{
          fontFamily: 'Nunito Sans',
          fontSize: 18,
          fontWeight: 800,
          color: transparent ? '#fff' : C.text,
          textShadow: transparent ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
        }}>
          {title}
        </span>
      )}
      {rightAction || <div style={{ width: 40 }} />}
    </div>
  );
}

// ─── Bottom Navigation ───────────────────────────────────────────────────────

export function BottomNav({
  active, onNavigate
}: {
  active: 'home' | 'favorites' | 'history' | 'profile';
  onNavigate: (tab: 'home' | 'favorites' | 'history' | 'profile') => void;
}) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'favorites' as const, icon: Heart, label: 'Saved' },
    { id: 'history' as const, icon: Clock, label: 'History' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: C.surface,
      borderTop: `1px solid ${C.divider}`,
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0 24px',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
      zIndex: 50,
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 0',
          }}
        >
          {active === tab.id ? (
            <div style={{
              background: `${C.primary}15`,
              borderRadius: 12,
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <tab.icon size={20} color={C.primary} fill={C.primary} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, fontFamily: 'Nunito Sans' }}>
                {tab.label}
              </span>
            </div>
          ) : (
            <>
              <tab.icon size={22} color={C.textSec} />
              <span style={{ fontSize: 11, color: C.textSec, fontFamily: 'Nunito Sans' }}>{tab.label}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── AI Chat Bubble ─────────────────────────────────────────────────────────

export function AIChatBubble({ message, isAI }: { message: string; isAI: boolean }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: isAI ? 'row' : 'row-reverse',
      gap: 10,
      alignItems: 'flex-end',
    }}>
      {isAI && (
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Zap size={16} color="#fff" fill="#fff" />
        </div>
      )}
      <div style={{
        maxWidth: '75%',
        background: isAI ? C.surface : C.primary,
        color: isAI ? C.text : '#fff',
        borderRadius: isAI ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
        padding: '12px 14px',
        fontSize: 14,
        fontFamily: 'Nunito Sans, sans-serif',
        lineHeight: 1.5,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: isAI ? `1px solid ${C.divider}` : 'none',
      }}>
        {message}
      </div>
    </div>
  );
}

// ─── Cooking Step Card ───────────────────────────────────────────────────────

export function CookingStepCard({
  step, instruction, tip, isActive
}: {
  step: number; instruction: string; tip?: string; isActive: boolean;
}) {
  return (
    <div style={{
      background: isActive ? `linear-gradient(135deg, ${C.primary}08, ${C.primary}15)` : C.surface,
      border: `2px solid ${isActive ? C.primary : C.border}`,
      borderRadius: 20,
      padding: '18px 20px',
      boxShadow: isActive ? `0 4px 20px ${C.primary}20` : '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          background: isActive ? C.primary : '#F3F4F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {isActive ? (
            <Flame size={18} color="#fff" />
          ) : (
            <span style={{ fontSize: 14, fontWeight: 800, color: C.textSec, fontFamily: 'Nunito Sans' }}>
              {step}
            </span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, fontFamily: 'Nunito Sans', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
            Step {step}
          </div>
          <div style={{ fontSize: 15, color: C.text, fontFamily: 'Nunito Sans', lineHeight: 1.5 }}>
            {instruction}
          </div>
          {tip && (
            <div style={{
              marginTop: 10,
              background: '#FEF3C7',
              borderRadius: 10,
              padding: '8px 12px',
              display: 'flex',
              gap: 6,
            }}>
              <span>💡</span>
              <span style={{ fontSize: 13, color: '#92400E', fontFamily: 'Nunito Sans' }}>{tip}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Timer Card ─────────────────────────────────────────────────────────────

export function TimerCard({ seconds, onToggle, isRunning }: { seconds: number; onToggle: () => void; isRunning: boolean }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
      borderRadius: 20,
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: `0 8px 24px ${C.primary}40`,
    }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: 'Nunito Sans', marginBottom: 2 }}>
          STEP TIMER
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', fontFamily: 'Nunito Sans', letterSpacing: -1 }}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
      </div>
      <button
        onClick={onToggle}
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 20,
        }}
      >
        {isRunning ? '⏸' : '▶️'}
      </button>
    </div>
  );
}

// ─── Empty / Error State ─────────────────────────────────────────────────────

export function EmptyState({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      gap: 12,
    }}>
      <div style={{ fontSize: 64 }}>{emoji}</div>
      <div style={{ fontFamily: 'Nunito Sans', fontSize: 18, fontWeight: 800, color: C.text, textAlign: 'center' }}>{title}</div>
      <div style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.textSec, textAlign: 'center', lineHeight: 1.5 }}>{subtitle}</div>
    </div>
  );
}

export function DifficultySelector({
  value, onChange
}: {
  value: 'Easy' | 'Medium' | 'Hard';
  onChange: (v: 'Easy' | 'Medium' | 'Hard') => void;
}) {
  const options: Array<{ v: 'Easy' | 'Medium' | 'Hard'; color: string; emoji: string }> = [
    { v: 'Easy', color: C.secondary, emoji: '😊' },
    { v: 'Medium', color: C.warning, emoji: '🧑‍🍳' },
    { v: 'Hard', color: C.error, emoji: '🔥' },
  ];
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {options.map(opt => (
        <button
          key={opt.v}
          onClick={() => onChange(opt.v)}
          style={{
            flex: 1,
            background: value === opt.v ? opt.color : C.surface,
            color: value === opt.v ? '#fff' : C.text,
            border: `2px solid ${value === opt.v ? opt.color : C.border}`,
            borderRadius: 14,
            padding: '12px 8px',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'Nunito Sans, sans-serif',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: 20 }}>{opt.emoji}</span>
          {opt.v}
        </button>
      ))}
    </div>
  );
}

// ─── Star Rating ─────────────────────────────────────────────────────────────

export function StarRating({ rating, onRate }: { rating: number; onRate: (n: number) => void }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onClick={() => onRate(n)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <Star
            size={32}
            color="#F59E0B"
            fill={n <= rating ? "#F59E0B" : 'transparent'}
          />
        </button>
      ))}
    </div>
  );
}

export function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{
      background: bg,
      color,
      borderRadius: 8,
      padding: '3px 8px',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'Nunito Sans, sans-serif',
    }}>
      {label}
    </span>
  );
}
