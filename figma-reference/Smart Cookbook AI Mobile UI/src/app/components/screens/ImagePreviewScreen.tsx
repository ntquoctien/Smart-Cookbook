import React, { useState } from 'react';
import { motion } from 'motion/react';
import { C, IMG, ScreenName } from '../shared/data';
import { PrimaryButton, TopAppBar } from '../shared/UIComponents';
import { Plus, X, RotateCcw, Zap } from 'lucide-react';

const SAMPLE_PHOTOS = [
  { id: '1', src: IMG.ingredients, label: 'Fridge contents' },
  { id: '2', src: IMG.cuttingBoard, label: 'Cutting board' },
];

export function ImagePreviewScreen({ navigate, goBack }: { navigate: (s: ScreenName) => void; goBack: () => void }) {
  const [photos, setPhotos] = useState(SAMPLE_PHOTOS);
  const [selected, setSelected] = useState('1');

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar title="Review Photos" onBack={goBack} />

      {/* Main preview */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{
          borderRadius: 24,
          overflow: 'hidden',
          height: 300,
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}>
          {photos.find(p => p.id === selected) && (
            <img
              src={photos.find(p => p.id === selected)!.src}
              alt="Selected"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          {/* Overlay info */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px 16px 16px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                {photos.findIndex(p => p.id === selected) + 1} of {photos.length}
              </div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 15, fontWeight: 700, color: '#fff' }}>
                {photos.find(p => p.id === selected)?.label}
              </div>
            </div>
            <button
              onClick={() => setPhotos(ps => ps.filter(p => p.id !== selected))}
              style={{
                background: 'rgba(239,68,68,0.85)',
                border: 'none',
                borderRadius: 10,
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} color="#fff" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {photos.map(p => (
            <motion.div
              key={p.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(p.id)}
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                overflow: 'hidden',
                border: `3px solid ${selected === p.id ? C.primary : 'transparent'}`,
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: selected === p.id ? `0 0 0 3px ${C.primary}30` : 'none',
              }}
            >
              <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          ))}

          {/* Add more */}
          <button
            onClick={() => goBack()}
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              border: `2px dashed ${C.primary}60`,
              background: `${C.primary}10`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Plus size={20} color={C.primary} />
            <span style={{ fontFamily: 'Nunito Sans', fontSize: 10, fontWeight: 700, color: C.primary }}>Add</span>
          </button>
        </div>
      </div>

      {/* Info card */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{
          background: `${C.secondary}15`,
          border: `1px solid ${C.secondary}40`,
          borderRadius: 16,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, fontWeight: 700, color: C.text }}>
              AI is ready to analyze
            </div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 12, color: C.textSec }}>
              {photos.length} photo{photos.length !== 1 ? 's' : ''} selected • Estimated 15+ ingredients
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '0 20px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 36 }}>
        <PrimaryButton
          label="Scan with AI"
          onClick={() => navigate('aiScanning')}
          icon={<Zap size={18} fill="#fff" />}
        />
        <button
          onClick={goBack}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: C.textSec,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'Nunito Sans',
            cursor: 'pointer',
            padding: '12px',
          }}
        >
          <RotateCcw size={16} />
          Retake photos
        </button>
      </div>
    </div>
  );
}
