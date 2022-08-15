// In App.js in a new project

import * as React from 'react';
import { View, Text, StatusBar, Image, ActivityIndicator, SafeAreaView, BackHandler, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebView from 'react-native-webview';

function SplashScreen({ navigation }) {


  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home')
    }, 1200)
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
      <Image source={require('./logo.png')} style={{
        width: 200,
        height: 200
      }} />
      <Text style={{
        fontSize: 50,
        color: 'black',
        fontWeight: '600'
      }}>SI BESTIE</Text>
      <Text style={{
        fontSize: 20,
        color: 'black',
        fontWeight: '200',
        marginBottom: 20,
      }}>
        Aplikasi Bebas TB
      </Text>
      <ActivityIndicator size="large" color="#1E74FD" />
    </View>
  );
}


function HomeScreen({ navigation }) {

  React.useEffect(() => {
    const backAction = () => {
      webViewRef.current.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const webViewRef = React.useRef(null);


  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <WebView
        ref={webViewRef}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        source={{
          uri: 'http://8.215.34.14/ta_skrining'
        }}
      />
    </SafeAreaView>
  );

}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#1E74FD" />
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;