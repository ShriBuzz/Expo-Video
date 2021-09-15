import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/home';
import CameraScreen from './src/camera';
import VideoPreview from './src/videoPreview';
import VideoList from './src/videoListing';
import AudioRecord from './src/audioRecord';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Camera' component={CameraScreen} />
        <Stack.Screen name='Video' component={VideoPreview} />
        <Stack.Screen name='VideoList' component={VideoList} />
        <Stack.Screen name='Audio' component={AudioRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
