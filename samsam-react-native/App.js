import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login.js';
import Main from './screens/Main.js';
import Toast from 'react-native-toast-message';
// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const Stack = createStackNavigator();
const App = () => {
  return (
    //네비게이션의 트리를 관리해주는 컴포넌트
    <>
      <NavigationContainer>
        {/* 네비게이션 기본틀의 스택을 생성 */}
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} /> */}
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              title: '로그인',
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: '트레이너 메뉴',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
