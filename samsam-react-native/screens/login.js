import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {loginWithKakaoAccount} from '@react-native-seoul/kakao-login';

import axios from 'axios';
import {useMutation} from 'react-query';
import Toast from 'react-native-toast-message';

const kakaoLogin = async ({accessToken}) => {
  const response = await axios.post('http://127.0.0.1:8000/kakaologin/', {
    code: accessToken,
  });
  return response.data;
};

const login_fnc = async ({id, password}) => {
  const body = JSON.stringify({
    id: id,
    password: password,
  });
  const response = await axios.post('http://127.0.0.1:8000/login/', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

const Login = ({navigation}) => {
  const [id, onChangeId] = React.useState();
  const [password, onChangePassword] = React.useState();
  const signInWithKakaoMutation = useMutation(kakaoLogin, {
    onSuccess: data => {
      // 로그인 성공
      succesToast({id});
      console.log(data);
      navigation.navigate('Main', {id: id});
    },
    onError: error => {
      // 에러 발생
      errorToast(error.response.data.message);
      // loginErrorMessage(error.response.data.message);
    },
  });
  const loginMutationResult = useMutation(login_fnc, {
    onSuccess: data => {
      // 로그인 성공
      succesToast({id});
      navigation.navigate('Main', {id: id});
    },
    onError: error => {
      // 에러 발생
      errorToast(error.response.data.message);
      // loginErrorMessage(error.response.data.message);
    },
  });
  const handleSignInWithKakao = async () => {
    const result = await loginWithKakaoAccount();
    try {
      await signInWithKakaoMutation.mutate({accessToken: result.accessToken});
      // 로그인 성공 시 화면 전환
    } catch (error) {
      console.error(error);
      // 로그인 실패 시 에러 처리
    }
  };
  const handleLogin = async () => {
    try {
      await loginMutationResult.mutate({id, password});
      // 로그인 성공
    } catch (error) {
      // 로그인 실패
      // console.error(error);
    }
  };
  const succesToast = ({id}) => {
    Toast.show({
      type: 'success',
      text1: '로그인 성공',
      text2: '반갑습니다. ' + id + '님.',
      position: 'top',
    });
  };
  const errorToast = error => {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: '로그인 실패',
      text2: '' + error,
      position: 'top',
    });
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
        onPress={handleLogin}
        underlayColor="#fff">
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.kakaoButton, styles.button]}
        onPress={handleSignInWithKakao}
        underlayColor="#fff">
        <Text style={styles.kakaoText}>Login with Kakao</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.facebookButton, styles.button]}
        onPress={handleLogin}
        underlayColor="#fff">
        <Text style={styles.loginText}>Login with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.facebookButton, styles.button]}
        onPress={handleLogin}
        underlayColor="#fff">
        <Text style={styles.loginText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogin}
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
    marginTop: 171,
    marginBottom: 91,
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
