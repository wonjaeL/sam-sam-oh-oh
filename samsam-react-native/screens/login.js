import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Switch,
} from 'react-native';
import Toast from 'react-native-toast-message';


import {
  KakaoOAuthToken,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';

const signInWithKakao = async () => {
  const result = await loginWithKakaoAccount();
  console.log(result);
};
// https://github.com/crossplatformkorea/react-native-kakao-login#readme 참고
import {fetchPost} from '../Server/login.js';
import {ReactQueryDevtools} from 'react-query/devtools';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
const queryClient = new QueryClient();

const Login = ({navigation}) => {
  const [id, onChangeId] = React.useState();
  const [password, onChangePassword] = React.useState();
  const [isEnabled, setIsEnabled] = React.useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const succesToast = ({id}) => {
    Toast.show({
      type: 'success',
      text1: '로그인 성공',
      text2: '반갑습니다. ' + id + '님.',
      position: 'bottom',
    });
  };
  const errorToast = error => {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: '로그인 실패',
      text2: '' + error,
      position: 'bottom',
      //text2: '반갑습니다. ' + id + '님.',
    });
  };
  //const [text, onChangeText] = React.useState();
  const loginErrorMessage = error => {
    Alert.alert('로그인 실패', error, [
      {
        text: '확인',
        style: 'cancel',
      },
    ]);
  };

  const onPressLogin = () => {
    // navigation.navigate('Main', {id: '방기승'});
    // const {isLoading, data, isRefetching} = useQuery(
    //   ['todos', 'goMountain'],
    //   fetchPost,
    // );
    const {isLoading, isError, error, data} = useQuery(
      'login',
      fetch('http://d98a-211-38-155-122.ngrok.io/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
      }).then(response => response.json()),
    );
    if (!data) {
      // 데이터가 없는 경우
    }
    if (isLoading) {
      // 로딩중인 경우
    }
    if (isError) {
      console.error(error);
      loginErrorMessage(error);
    }
    console.log(data);
    navigation.navigate('Main', {id: '방기승'});
    const body = JSON.stringify({
      id: id,
      password: password,
    });

    fetch('http://d98a-211-38-155-122.ngrok.io/login/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: body,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        navigation.navigate('Main', {id: '방기승'});
      })
      .catch(error => {
        console.error(error);
        loginErrorMessage('');
      });
  };
  const onPressSinup = () => {
    errorToast();
    // fetch('http://d98a-211-38-155-122.ngrok.io/api/posts/', {
    //   method: 'GET',
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //     this.changeText(responseJson[0].title);
    //   })
    //   .catch(error => {
    //     // 실패 틀릴때 / 통신오류
    //     this.loginErrorMessange();
    //     console.error(error);
    //   });
  };
  return (
    <View>
      <Text style={styles.title}>삼 삼 오 오</Text>
      <Text style={styles.label}>아이디</Text>
      <TextInput style={styles.input} onChangeText={onChangeId} value={id} />
      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        secureTextEntry={true}
        value={password}
      />

      <TouchableOpacity
        style={[styles.loginButton, styles.button]}
        onPress={onPressLogin}
        underlayColor="#fff">
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.kakaoButton, styles.button]}
        onPress={onPressLogin}
        underlayColor="#fff">
        <Text style={styles.kakaoText}>Login with Kakao</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.facebookButton, styles.button]}
        onPress={onPressLogin}
        underlayColor="#fff">
        <Text style={styles.loginText}>Login with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressSinup}
        underlayColor="#fff"
        style={styles.signup}>
        <Text>
          <Text style={styles.kakaoText}>계정이 없으신가요?</Text>
          <Text style={[styles.kakaoText, styles.signupText]} color="#5F5AF7">
            회원가입
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
  },
  title_view: {
    flex: 3,
    justifyContent: 'center',
  },
  text_input_view: {
    flex: 1,
    justifyContent: 'center',
  },
  button_view: {
    flex: 3,

    //justifyContent: 'center',
  },
  switch_view: {
    marginLeft: 40,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  switch_label: {
    fontSize: 10,
    //textAlign: 'auto',
  },
  input: {
    autoCapitalize: 'none',
    marginRight: 40,
    marginLeft: 40,
    borderWidth: 2,
    borderColor: '#EBEDEF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
    marginRight: 40,
    marginLeft: 40,
  },

  title: {
    color: '#5F5AF7',
    textAlign: 'center',
    fontSize: 24,
    //marginTop: 171,
    //marginBottom: 91,
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: '#5F5AF7',
    borderColor: '#5F5AF7',
  },
  kakaoButton: {
    backgroundColor: '#F7E600',
    borderColor: '#F7E600',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    borderColor: '#4267B2',
  },
  kakaoText: {
    color: 'black',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  loginText: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  signupText: {
    color: '#5F5AF7',
  },
  signup: {
    marginTop: 10,
  },
});

export default Login;
