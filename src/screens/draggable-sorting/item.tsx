import React, { ReactNode, RefObject } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedGestureHandler, useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { animationConfig, getOrder, getPosition, Positions, SIZE, COL } from './utils';

interface IProps {
  id: string;
  positions: Animated.SharedValue<Positions>;
  children: ReactNode;
  scrollView: RefObject<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>;
}

const Item = ({ children, id, positions, scrollView, scrollY }: IProps) => {
  const inset = useSafeAreaInsets();
  const containerHeight =
    Dimensions.get('window').height - inset.top - inset.bottom;
  const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(() => positions.value[id], newOrder => {
    const newPositions = getPosition(newOrder);
    translateX.value = withTiming(newPositions.x, animationConfig);
    translateY.value = withTiming(newPositions.y, animationConfig);
  });

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number; y: number }>({
    onStart: (e, context) => {
      isGestureActive.value = true;
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, context) => {
      translateX.value = translationX + context.x;
      translateY.value = translationY + context.y;
      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(key => positions.value[key] === newOrder);
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
      const lowerBound = scrollY.value;
      const upperBound = lowerBound + containerHeight - SIZE;
      const maxScroll = contentHeight - containerHeight;
      const leftToScrollDown = maxScroll - scrollY.value;
      if (translateY.value < lowerBound) {
        const diff = Math.min(lowerBound - translateY.value, lowerBound);
        scrollY.value -= diff;
        scrollTo(scrollView, 0, scrollY.value, false);
        context.y -= diff;
        translateY.value = context.y + translationY;
      }
      if (translateY.value > upperBound) {
        const diff = Math.min(
          translateY.value - upperBound,
          leftToScrollDown
        );
        scrollY.value += diff;
        scrollTo(scrollView, 0, scrollY.value, false);
        context.y += diff;
        translateY.value = context.y + translationY;
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x, animationConfig, () => isGestureActive.value = false);
      translateY.value = withTiming(destination.y, animationConfig);
    },
  });

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      transform: [{ translateX: translateX.value}, { translateY: translateY.value }, { scale }],
      zIndex,
    };
  });
  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Item;
