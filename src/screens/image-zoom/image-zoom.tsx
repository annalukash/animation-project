import React, { useRef, useState, createRef } from 'react';
import { View, Animated } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

const ImageZoom = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const panRef = createRef();
  const pinchRef = createRef();
  const [panEnabled, setPanEnabled] = useState(false);

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY,
    },
  }], { useNativeDriver: true });

  const handlePinchStateChange = ({  nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    const nScale: number = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };

  return (
    <View style={{ overflow: 'hidden' }}>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchGestureEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.Image
              source={require('./images/women.webp')}
              style={{
                width: '100%',
                height: '100%',
                transform: [{ scale }, { translateX: translateX }, { translateY: translateY }],
              }}
              resizeMode={'contain'}
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ImageZoom;
