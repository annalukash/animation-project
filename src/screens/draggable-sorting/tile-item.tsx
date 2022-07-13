import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MARGIN, SIZE } from './utils';

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
});

interface TileProps {
  id: string;
  color: string;
  onLongPress: () => void;
}

const TileItem = ({ color }: TileProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={{ flex: 1, margin: MARGIN * 2, borderRadius: MARGIN, backgroundColor: color }} />
    </View>
  );
};

export default TileItem;
