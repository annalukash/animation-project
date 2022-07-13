import React, { ReactElement } from 'react';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import { COL, Positions, SIZE } from './utils';
import Item from './item';

interface IProps {
  children: ReactElement<{id: string}>[];
}

const SortableList = ({ children }: IProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const positions = useSharedValue<Positions>(Object.assign(
    {},
    ...children.map((child, index) => ({[child.props.id]: index}))
  ));

  const onScroll = useAnimatedScrollHandler({
    onScroll: (({ contentOffset: { y }}) => scrollY.value = y),
  });
  return (
    <Animated.ScrollView
      ref={scrollRef}
      contentContainerStyle={{
        height: Math.ceil((children.length / COL) * SIZE),
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {children.map((child) => (
        <Item scrollView={scrollRef} scrollY={scrollY} key={child.props.id} id={child.props.id} positions={positions}>
          {child}
        </Item>
      ))}
    </Animated.ScrollView>
  );
};

export default SortableList;
