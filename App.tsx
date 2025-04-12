import {View, Text} from 'react-native';
import React from 'react';
import Navigation from '@navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
   return (
     <GestureHandlerRootView style={{flex: 1}}>
       <Navigation />
     </GestureHandlerRootView>
   );
};

export default App;
