import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { C, RECIPES, ScreenName } from '../shared/data';
import { AIChatBubble, CookingStepCard, TimerCard } from '../shared/UIComponents';
import { ChevronLeft, ChevronRight, Mic, Send, Zap } from 'lucide-react';

const recipe = RECIPES[0];

const QUICK_QUESTIONS = [
  'How long should I boil the pasta?',
  'Can I substitute olive oil?',
  'How do I know it\'s done?',
  'What if I don\'t have basil?',
];

const AI_RESPONSES: Record<string, string> = {
  'How long should I boil the pasta?': 'For al dente pasta, cook it 1-2 minutes less than the package instructions say. Typically 8-10 minutes for spaghetti. Taste test as you go! 🍝',
  'Can I substitute olive oil?': 'Yes! You can use butter, avocado oil, or sunflower oil as substitutes. Olive oil adds a Mediterranean flavor, but these alternatives work great too! 🫒',
  'How do I know it\'s done?': 'For perfectly cooked pasta, do the "wall test" — throw a strand at the wall. If it sticks, it\'s done! Or simply taste it — it should be tender but still have a slight bite. ✅',
  'What if I don\'t have basil?': 'Great substitutes for basil include fresh parsley, spinach, or dried Italian herbs. You can also skip it — the dish will still be delicious! 🌿',
};

interface Message {
  id: string;
  text: string;
  isAI: boolean;
}

export function CookingAssistantScreen({ navigate, goBack }: { navigate: (s: ScreenName) => void; goBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timerSecs, setTimerSecs] = useState(600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', text: `I'm your AI cooking assistant! I'll help you make "${recipe.name}" perfectly. Let's start with Step 1! 👨‍🍳`, isAI: true },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timerRunning) return;
    if (timerSecs <= 0) { setTimerRunning(false); return; }
    const t = setInterval(() => setTimerSecs(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timerRunning, timerSecs]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: msg, isAI: false };
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: AI_RESPONSES[msg] || `Great question! For "${msg}" — generally, trust your senses: smell, look, and taste as you go. You're doing amazing! 🌟`,
      isAI: true,
    };
    setMessages(prev => [...prev, userMsg]);
    setTimeout(() => setMessages(prev => [...prev, aiMsg]), 800);
    setInput('');
  };

  const step = recipe.steps[currentStep];
  const isLast = currentStep === recipe.steps.length - 1;

  const advanceStep = () => {
    if (isLast) {
      navigate('cookingCompleted');
      return;
    }
    setCurrentStep(s => s + 1);
    if (step.time) setTimerSecs(step.time * 60);
    const msg: Message = {
      id: Date.now().toString(),
      text: `Great! Moving to Step ${currentStep + 2}: ${recipe.steps[currentStep + 1].instruction.substring(0, 60)}...`,
      isAI: true,
    };
    setMessages(prev => [...prev, msg]);
  };

  return (
    <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        background: C.surface,
        padding: '52px 20px 16px',
        borderBottom: `1px solid ${C.divider}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button
            onClick={goBack}
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
            <ChevronLeft size={22} color={C.text} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, color: C.textSec, textTransform: 'uppercase', letterSpacing: 1 }}>
              Now Cooking
            </div>
            <div style={{ fontFamily: 'Nunito Sans', fontSize: 16, fontWeight: 800, color: C.text }}>
              {recipe.name}
            </div>
          </div>
          <div style={{
            background: `${C.primary}15`,
            borderRadius: 12,
            padding: '6px 12px',
          }}>
            <span style={{ fontFamily: 'Nunito Sans', fontSize: 13, fontWeight: 700, color: C.primary }}>
              {currentStep + 1}/{recipe.steps.length}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: C.bg, borderRadius: 3, overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${((currentStep + 1) / recipe.steps.length) * 100}%` }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${C.primary}, ${C.primaryDark})`, borderRadius: 3 }}
          />
        </div>
      </div>

      {/* Scrollable main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Current step card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            <CookingStepCard
              step={step.step}
              instruction={step.instruction}
              tip={step.tip}
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>

        {/* Timer */}
        <TimerCard
          seconds={timerSecs}
          isRunning={timerRunning}
          onToggle={() => {
            if (!timerRunning && timerSecs === 600 && step.time) setTimerSecs(step.time * 60);
            setTimerRunning(!timerRunning);
          }}
        />

        {/* Step navigation */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            style={{
              flex: 1,
              background: currentStep === 0 ? '#F3F4F6' : C.surface,
              border: `1.5px solid ${C.border}`,
              borderRadius: 14,
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 0 ? 0.5 : 1,
              fontFamily: 'Nunito Sans',
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
            }}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <button
            onClick={advanceStep}
            style={{
              flex: 1,
              background: isLast ? C.secondary : C.primary,
              border: 'none',
              borderRadius: 14,
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer',
              fontFamily: 'Nunito Sans',
              fontSize: 14,
              fontWeight: 700,
              color: '#fff',
              boxShadow: `0 4px 16px ${isLast ? C.secondary : C.primary}40`,
            }}
          >
            {isLast ? 'Finish! 🎉' : 'Next Step'}
            {!isLast && <ChevronRight size={18} />}
          </button>
        </div>

        {/* Next step preview */}
        {!isLast && (
          <div style={{
            background: C.surface,
            border: `1.5px solid ${C.border}`,
            borderRadius: 16,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              background: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: C.textSec, fontFamily: 'Nunito Sans' }}>
                {currentStep + 2}
              </span>
            </div>
            <div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 11, color: C.textSec, marginBottom: 2 }}>Up next</div>
              <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, color: C.text, lineHeight: 1.4 }}>
                {recipe.steps[currentStep + 1]?.instruction.substring(0, 70)}...
              </div>
            </div>
          </div>
        )}

        {/* Quick questions */}
        <div>
          <div style={{ fontFamily: 'Nunito Sans', fontSize: 13, fontWeight: 700, color: C.textSec, marginBottom: 10 }}>
            Ask the AI assistant:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  background: C.surface,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 20,
                  padding: '8px 14px',
                  fontFamily: 'Nunito Sans',
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.text,
                  cursor: 'pointer',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat messages */}
        <div
          ref={scrollRef}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {messages.map(msg => (
            <AIChatBubble key={msg.id} message={msg.text} isAI={msg.isAI} />
          ))}
        </div>

        <div style={{ height: 8 }} />
      </div>

      {/* Chat input */}
      <div style={{
        padding: '12px 20px 36px',
        background: C.surface,
        borderTop: `1px solid ${C.divider}`,
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: C.bg,
          border: `1.5px solid ${C.border}`,
          borderRadius: 20,
          padding: '10px 16px',
        }}>
          <Zap size={16} color={C.primary} />
          <input
            placeholder="Ask the AI anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Nunito Sans',
              fontSize: 14,
              color: C.text,
            }}
          />
        </div>
        <button
          onClick={() => {}}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: '#F3F4F6',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Mic size={18} color={C.textSec} />
        </button>
        <button
          onClick={() => sendMessage()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: C.primary,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 4px 12px ${C.primary}50`,
          }}
        >
          <Send size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
}
