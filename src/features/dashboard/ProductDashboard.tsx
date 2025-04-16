import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import withCart from '@features/cart/WithCart';
import withLiveStatus from '@features/map/WithLiveStatus';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import { useAuthStore } from '@state/authStore';
import { Fonts } from '@utils/Constants';
import { NoticeHeight, screenHeight } from '@utils/Scaling';
import React, { useEffect, useRef } from 'react';
import {
  Platform,
  Animated as RNAnimated,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedHeader from './AnimatedHeader';
import NoticeAnimation from './NoticeAnimation';
import StickySearchBar from './StickySearchBar';
import Visuals from './Visuals';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const {user, setUser} = useAuthStore();
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
  const insets = useSafeAreaInsets();

  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180;
    
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});
    previousScroll.current = scrollY.value;
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  // useEffect(() => {
  //   const updateUser = () => {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         const {latitude, longitude} = position.coords;
  //         reverseGeocode(latitude, longitude, setUser);
  //       },
  //       err => console.log(err),
  //       {
  //         enableHighAccuracy: false,
  //         timeout: 15000,
  //       },
  //     );
  //   };

  //   slideDown();
  //   updateUser();
  // }, []);

  useEffect(() => {
    slideDown()
    const timeoutId = setTimeout(() => {
      slideUp()
    }, 3500)
    return () => clearTimeout(timeoutId);

  },[])

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        {/* <SafeAreaView /> */}

        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Ionicons
              name="arrow-up-circle-outline"
              color="white"
              size={RFValue(12)}
            />
            <CustomText
              variant="h9"
              style={{color: 'white'}}
              fontFamily={Fonts.SemiBold}>
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer
          style={[styles.panelContainer, {marginTop: insets?.top || 20}]}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />

            <View style={{backgroundColor: '#f8f8f8', padding: 20}}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                Grocery App 🛒
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{marginTop: 10, paddingBottom: 100, opacity: 0.2}}>
                Developed By ❤️ MustaQ
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default withLiveStatus(withCart(withCollapsibleContext(ProductDashboard)));
