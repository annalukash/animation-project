import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  circle: {
    position: 'absolute',
    height: 80,
    aspectRatio: 1,
    backgroundColor: 'blue',
    borderRadius: 40,
    opacity: 0.8,
  },
});

const { width: screenWidth } = Dimensions.get('window');

interface AnimatedPosition {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

const useFollowAnimationPosition = ({x, y}: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: followX.value }, { translateY: followY.value }],
  }));

  return { followX, followY, rStyle };
};

const CircleSnake = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const context = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan().onStart(() => {
    context.value = { x: translateX.value, y: translateY.value };
  }).onUpdate((event) => {
    translateX.value = event.translationX + context.value.x;
    translateY.value = event.translationY + context.value.y;
  }).onEnd(() => {
    if (translateX.value > screenWidth / 2) {
      translateX.value = screenWidth - 80;
    } else {
      translateX.value = 0;
    }
  });

  const { followX: blueFollowX, followY: blueFollowY, rStyle: rBlueCircle } = useFollowAnimationPosition({ x: translateX, y: translateY });
  const { followX: redFollowX, followY: redFollowY, rStyle: rRedCircle } = useFollowAnimationPosition({ x: blueFollowX, y: blueFollowY });
  const { rStyle: rGreenCircle } = useFollowAnimationPosition({ x: redFollowX, y: redFollowY });

  return (
    <View style={Style.container}>
      <Animated.View style={[Style.circle, rRedCircle, { backgroundColor: 'red'}]} />
      <Animated.View style={[Style.circle, rGreenCircle, { backgroundColor: 'green'}]} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[Style.circle, rBlueCircle]} />
      </GestureDetector>
    </View>
  );
};

export default CircleSnake;
