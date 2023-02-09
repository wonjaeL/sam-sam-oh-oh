import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login.js';
import Main from './screens/Main.js';
<<<<<<< HEAD
import Toast from 'react-native-toast-message';
=======
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
const queryClient = new QueryClient();

>>>>>>> master
// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const Stack = createStackNavigator();
const App = () => {
  return (
    //네비게이션의 트리를 관리해주는 컴포넌트
<<<<<<< HEAD
    <>
=======
    <QueryClientProvider client={queryClient}>
>>>>>>> master
      <NavigationContainer>
        {/* 네비게이션 기본틀의 스택을 생성 */}
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} /> */}
<<<<<<< HEAD
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
=======
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
>>>>>>> master
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
