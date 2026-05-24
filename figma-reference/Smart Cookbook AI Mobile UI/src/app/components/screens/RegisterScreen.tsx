import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, ScreenName } from '../shared/data';
import { PrimaryButton, InputField, TopAppBar } from '../shared/UIComponents';
import { Mail, Lock, User } from 'lucide-react';

export function RegisterScreen({ navigate, goBack }: { navigate: (s: ScreenName) => void; goBack: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.secondary}, #388E3C)`,
        padding: '60px 28px 40px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        <button
          onClick={goBack}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: 12,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <span style={{ color: '#fff', fontSize: 20 }}>←</span>
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontFamily: 'Nunito Sans', fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 6 }}>
            Create Account
          </h1>
          <p style={{ fontFamily: 'Nunito Sans', fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
            Start your cooking journey today
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          flex: 1,
          background: C.surface,
          borderRadius: '28px 28px 0 0',
          marginTop: -24,
          padding: '32px 24px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <InputField
          label="Full Name"
          placeholder="Your full name"
          value={name}
          onChange={setName}
          icon={<User size={18} />}
        />
        <InputField
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          type="email"
          icon={<Mail size={18} />}
        />
        <InputField
          label="Password"
          placeholder="Create a strong password"
          value={password}
          onChange={setPassword}
          type="password"
          icon={<Lock size={18} />}
        />

        {/* Password strength */}
        {password.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>Password strength</span>
              <span style={{ fontFamily: 'Nunito Sans', fontSize: 12, fontWeight: 700, color: password.length > 8 ? C.secondary : C.warning }}>
                {password.length > 8 ? 'Strong' : 'Moderate'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    background: i <= Math.min(Math.floor(password.length / 2), 4)
                      ? (password.length > 8 ? C.secondary : C.warning)
                      : C.border,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cooking level */}
        <div>
          <span style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 600, color: C.text, display: 'block', marginBottom: 10 }}>
            Cooking Level
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { level: 'Beginner', emoji: '🌱' },
              { level: 'Home Cook', emoji: '🍳' },
              { level: 'Pro Chef', emoji: '👨‍🍳' },
            ].map(({ level, emoji }) => (
              <button
                key={level}
                style={{
                  flex: 1,
                  background: C.bg,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '12px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  fontFamily: 'Nunito Sans',
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.text,
                }}
              >
                <span style={{ fontSize: 22 }}>{emoji}</span>
                {level}
              </button>
            ))}
          </div>
        </div>

        <PrimaryButton
          label="Create Account"
          onClick={() => navigate('home')}
        />

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.textSec }}>Already have an account? </span>
          <button
            onClick={goBack}
            style={{ background: 'none', border: 'none', color: C.primary, fontSize: 14, fontWeight: 700, fontFamily: 'Nunito Sans', cursor: 'pointer' }}
          >
            Sign In
          </button>
        </div>

        <p style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec, textAlign: 'center', lineHeight: 1.5 }}>
          By creating an account, you agree to our{' '}
          <span style={{ color: C.primary, fontWeight: 600 }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color: C.primary, fontWeight: 600 }}>Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
}
