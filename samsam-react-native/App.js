import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login.js';
import Main from './screens/Main.js';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
GoogleSignin.configure();

const queryClient = new QueryClient();

// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const Stack = createStackNavigator();
const App = () => {
  // googleSigninConfigure();
  return (
    //네비게이션의 트리를 관리해주는 컴포넌트
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* 네비게이션 기본틀의 스택을 생성 */}
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} /> */}
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
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
