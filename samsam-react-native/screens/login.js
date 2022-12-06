import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
const Login = ({navigation}) => {
  const [id, onChangeId] = React.useState();
  const [password, onChangePassword] = React.useState();
  const succesToast = ({id}) => {
    Toast.show({
      type: 'success',
      text1: '로그인 성공',
      text2: '반갑습니다. ' + id + '님.',
      position: 'bottom',
    });
  };
  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: '로그인 실패',
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
    //navigation.navigate('Main', {id: '방기승'});
    const body = JSON.stringify({
      id: id,
      password: password,
    });
    // navigation.navigate('Main', {id: id});

    fetch(
      'http://ec2-13-124-162-219.ap-northeast-2.compute.amazonaws.com:10000/login/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'test',
          password: 'test',
        }),
      },
    )
      // .then(response => {
      //   console.log(response);
      //   //console.log(response.body);
      //   //console.log(response.text());
      //   //console.log(response.json());
      //   // if (!response.ok) {
      //   //   loginErrorMessage(response.json().massage);
      //   // }
      //   //return response.json();
      //   return response.text();
      // })
      .then(response => response.text())
      .then(responseJson => {
        console.log(responseJson);
        navigation.navigate('Main', {id: '방기승'});
        succesToast({id});
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
    <View style={styles.main_view}>
      <View style={styles.title_view}>
        <Text style={styles.title}>삼 삼 오 오</Text>
      </View>
      <View style={styles.text_input_view}>
        <Text style={styles.label}>아이디</Text>
        <TextInput style={styles.input} onChangeText={onChangeId} value={id} />
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          secureTextEntry={true}
          value={password}
        />
      </View>
      <View style={styles.button_view}>
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
