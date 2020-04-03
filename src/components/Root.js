import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './screens/LoginForm';
import MainFrameLocal from './screens/MainFrameLocal';
import MainFrameOnline from './screens/MainFrameOnline';
import StatsPage from './screens/StatsPage';
import Guide from './screens/Guide';
import Friends from './screens/Friends';
import HomePage from './screens/HomePage';

const Stack = createStackNavigator();

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="login" component={LoginForm} />
        <Stack.Screen name="homePage" component={HomePage} />
        <Stack.Screen name="guide" component={Guide} />
        <Stack.Screen name="friends" component={Friends} />
        <Stack.Screen name="mainFrameLocal" component={MainFrameLocal} />
        <Stack.Screen name="mainFrameOnline" component={MainFrameOnline} />
        <Stack.Screen name="statsPage" component={StatsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root
