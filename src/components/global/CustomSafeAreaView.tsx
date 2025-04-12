import {FC, ReactNode} from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';


interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}
const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children, style}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.container, style]}>
        <View style={[styles.container, style]}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CustomSafeAreaView;
