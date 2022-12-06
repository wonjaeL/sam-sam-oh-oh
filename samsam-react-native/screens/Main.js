import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
//notification
const Main = ({navigation, route}) => {
  const onPressMenu = () => {};
  return (
    <View style={styles.block}>
      <View style={[styles.block, styles.image_view]}>
        <Image
          style={[styles.image]}
          source={require('./../src/image/icon.png')}
        />
        <Text style={[styles.id_text]}>{route.params.id}</Text>
      </View>

      <View style={styles.block2}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onPressMenu}
          underlayColor="#fff">
          <Icon
            style={[styles.icon_view]}
            name="calendar"
            size={50}
            color="#900"
          />
          <Text style={styles.button_text}>스케쥴 정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onPressMenu}
          underlayColor="#fff">
          <Icon style={[styles.icon_view]} name="team" size={50} color="#900" />
          <Text style={styles.button_text}>회원 정보</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.block2}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onPressMenu}
          underlayColor="#fff">
          <Icon
            style={[styles.icon_view]}
            name="notification"
            size={50}
            color="#900"
          />
          <Text style={styles.button_text}>공지사항</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onPressMenu}
          underlayColor="#fff">
          <Icon
            style={[styles.icon_view]}
            name="barschart"
            size={50}
            color="#900"
          />
          <Text style={styles.button_text}>통계</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.block]} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    //borderWidth: 1,
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  image_view: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon_view: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#5F5AF7',
  },
  block: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  block2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    //borderWidth: 1,

    justifyContent: 'center',
  },
  button_text: {
    marginTop: 10,
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
  },
  id_text: {
    marginTop: 10,
    textAlign: 'center',
    color: '#000000',
  },
});

export default Main;
