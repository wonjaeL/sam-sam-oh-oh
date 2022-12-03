import React from 'react';
import {
  TouchableOpacity,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from 'react-native';
const Login = ({navigation}) => {
  const [id, onChangeId] = React.useState();
  const [password, onChangePassword] = React.useState();
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
    const body = JSON.stringify({
      id: id,
      password: password,
    });

    console.log(body);

    var request = new XMLHttpRequest();
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', request.responseText);
      } else {
        console.warn('error');
      }
    };

    request.open('POST', 'http://d98a-211-38-155-122.ngrok.io/login/');
    request.send();

    fetch('http://d98a-211-38-155-122.ngrok.io/login/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: body,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (!response.ok) {
          loginErrorMessage(responseJson.message);
          return;
        }
        navigation.navigate('Main');
      })
      .catch(error => {
        console.error(error);
      });
  };
  const onPressSinup = () => {
    fetch('http://d98a-211-38-155-122.ngrok.io/api/posts/', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.changeText(responseJson[0].title);
      })
      .catch(error => {
        // 실패 틀릴때 / 통신오류
        this.loginErrorMessange();
        console.error(error);
      });
  };
  return (
    <SafeAreaView>
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
    </SafeAreaView>
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
    //fontFamily: 'Montserrat',
  },
  // container: {
  //   flex: 3,
  // },
  // header: {
  //   flex: 1,
  // },
  // textInputlayout: {
  //   flex: 1,
  //   alignContent: 'center',
  // },
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
