import { StyleSheet, Text, View } from 'react-native';

import type { ChatMessage } from '../../types/cooking';
import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type AIChatBubbleProps = {
  message: ChatMessage;
};

export function AIChatBubble({ message }: AIChatBubbleProps) {
  const assistant = message.sender === 'assistant';

  return (
    <View style={[styles.row, assistant ? styles.left : styles.right]}>
      <View style={[styles.bubble, assistant ? styles.assistant : styles.user]}>
        <Text style={[styles.text, !assistant && styles.userText]}>{message.message}</Text>
        <Text style={[styles.timestamp, !assistant && styles.userTimestamp]}>{message.timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '86%',
    borderRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: 6,
  },
  assistant: {
    backgroundColor: colors.surface,
  },
  user: {
    backgroundColor: colors.primary,
  },
  text: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  userText: {
    color: colors.white,
  },
  timestamp: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.72)',
  },
});
