import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, ScreenName } from '../shared/data';
import { PrimaryButton, SecondaryButton, InputField } from '../shared/UIComponents';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function LoginScreen({ navigate }: { navigate: (s: ScreenName) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div style={{
      height: '100%',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* Header wave */}
      <div style={{
        background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
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
        <div style={{
          position: 'absolute',
          bottom: -20,
          left: -20,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
          <h1 style={{
            fontFamily: 'Nunito Sans',
            fontSize: 28,
            fontWeight: 900,
            color: '#fff',
            marginBottom: 6,
          }}>
            Welcome back!
          </h1>
          <p style={{ fontFamily: 'Nunito Sans', fontSize: 15, color: 'rgba(255,255,255,0.75)' }}>
            Sign in to continue cooking
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
          gap: 20,
        }}
      >
        <InputField
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          type="email"
          icon={<Mail size={18} />}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'Nunito Sans', fontSize: 14, fontWeight: 600, color: C.text }}>Password</span>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 16, color: C.textSec }}>
              <Lock size={18} />
            </div>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                background: '#F9FAFB',
                border: `1.5px solid ${C.border}`,
                borderRadius: 14,
                padding: '14px 48px',
                fontSize: 15,
                fontFamily: 'Nunito Sans, sans-serif',
                color: C.text,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{
                position: 'absolute',
                right: 16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: C.textSec,
              }}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: C.primary,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'Nunito Sans',
            cursor: 'pointer',
          }}>
            Forgot Password?
          </button>
        </div>

        <PrimaryButton
          label="Sign In"
          onClick={() => navigate('home')}
        />

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.textSec }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        {/* Social login */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['🍎 Apple', '🔵 Google'].map(s => (
            <button
              key={s}
              onClick={() => navigate('home')}
              style={{
                flex: 1,
                background: C.bg,
                border: `1.5px solid ${C.border}`,
                borderRadius: 14,
                padding: '14px',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'Nunito Sans',
                color: C.text,
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <span style={{ fontFamily: 'Nunito Sans', fontSize: 14, color: C.textSec }}>Don't have an account? </span>
          <button
            onClick={() => navigate('register')}
            style={{
              background: 'none',
              border: 'none',
              color: C.primary,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Nunito Sans',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
}
