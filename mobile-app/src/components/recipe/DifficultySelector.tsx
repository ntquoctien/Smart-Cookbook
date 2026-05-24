import { StyleSheet, View } from 'react-native';

import type { Difficulty } from '../../types/recipe';
import { spacing } from '../../styles/spacing';
import { PreferenceChip } from './PreferenceChip';

type DifficultySelectorProps = {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
};

const levels: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export function DifficultySelector({
  value,
  onChange,
}: DifficultySelectorProps) {
  return (
    <View style={styles.row}>
      {levels.map((level) => (
        <PreferenceChip
          key={level}
          label={level}
          selected={value === level}
          onPress={() => onChange(level)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
