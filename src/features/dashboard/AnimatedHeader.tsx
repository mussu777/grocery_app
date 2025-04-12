import React, {FC} from 'react';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import Header from '@components/dashboard/Header';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';



const AnimatedHeader: FC<{showNotice:() => void}> = ({showNotice}) => {
  const {scrollY} = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]); 
    return {opacity};
  });

  return (
    <Animated.View style={headerAnimatedStyle}>
      <Header showNotice ={showNotice} />
    </Animated.View>
  );
};

export default AnimatedHeader;
