import React, { useState } from 'react';
import { C, IMG, ScreenName } from '../shared/data';
import { Camera, Image, X, Zap, RotateCcw, ChevronLeft } from 'lucide-react';

const TIPS = [
  'Make sure ingredients are clearly visible',
  'Good lighting helps AI detect better',
  'You can add multiple photos',
];

export function CameraScanScreen({ navigate, goBack }: { navigate: (s: ScreenName) => void; goBack: () => void }) {
  const [capturedCount, setCapturedCount] = useState(0);

  const handleCapture = () => {
    setCapturedCount(c => c + 1);
    if (capturedCount >= 0) {
      setTimeout(() => navigate('imagePreview'), 300);
    }
  };

  return (
    <div style={{
      height: '100%',
      background: '#0A0A0A',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Camera viewfinder (simulated) */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src={IMG.ingredients}
          alt="Camera preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
        />

        {/* Scan overlay grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Corner brackets */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => {
          const isTop = pos.includes('top');
          const isLeft = pos.includes('left');
          return (
            <div key={pos} style={{
              position: 'absolute',
              top: isTop ? '25%' : undefined,
              bottom: !isTop ? '30%' : undefined,
              left: isLeft ? '10%' : undefined,
              right: !isLeft ? '10%' : undefined,
              width: 40,
              height: 40,
              borderTop: isTop ? `3px solid ${C.primary}` : 'none',
              borderBottom: !isTop ? `3px solid ${C.primary}` : 'none',
              borderLeft: isLeft ? `3px solid ${C.primary}` : 'none',
              borderRight: !isLeft ? `3px solid ${C.primary}` : 'none',
              borderRadius: isTop && isLeft ? '8px 0 0 0' : isTop && !isLeft ? '0 8px 0 0' : isLeft ? '0 0 0 8px' : '0 0 8px 0',
            }} />
          );
        })}

        {/* Scanning line animation */}
        <div style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '40%',
          height: 2,
          background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`,
          boxShadow: `0 0 12px ${C.primary}`,
        }} />

        {/* Top bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '52px 20px 20px',
          background: 'linear-gradient(rgba(0,0,0,0.6), transparent)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <button
              onClick={goBack}
              style={{
                background: 'rgba(255,255,255,0.15)',
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
              <ChevronLeft size={22} color="#fff" />
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 800, color: '#fff' }}>
                Scan Ingredients
              </div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                Point at your ingredients
              </div>
            </div>
            {capturedCount > 0 && (
              <div style={{
                background: C.primary,
                borderRadius: 20,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'Nunito Sans' }}>
                  {capturedCount} photo{capturedCount > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Tips carousel */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Zap size={14} color={C.primary} fill={C.primary} />
            <span style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
              {TIPS[capturedCount % TIPS.length]}
            </span>
          </div>
        </div>

        {/* Bottom overlaid controls */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 24px 36px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Gallery */}
          <button
            onClick={() => navigate('imagePreview')}
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              border: '2px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            <img src={IMG.cuttingBoard} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </button>

          {/* Capture button */}
          <button
            onClick={handleCapture}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              border: '4px solid rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 6px rgba(255,255,255,0.15)',
            }}
          >
            <Camera size={32} color={C.primary} />
          </button>

          {/* Upload from gallery */}
          <button
            onClick={() => navigate('imagePreview')}
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              border: '2px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Image size={24} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
