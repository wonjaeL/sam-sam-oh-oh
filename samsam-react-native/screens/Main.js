import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';

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
          <Text style={styles.button_text}>Menu1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onPressMenu}
          underlayColor="#fff">
          <Text style={styles.button_text}>Menu2</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.block2}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onPressMenu}
          underlayColor="#fff">
          <Text style={styles.button_text}>Menu3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onPressMenu}
          underlayColor="#fff">
          <Text style={styles.button_text}>Menu4</Text>
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
    borderWidth: 1,
    resizeMode: 'contain',
    backgroundColor: '#5F5AF7',
  },
  image_view: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  block: {
    flex: 1,
    backgroundColor: '#DFDEFE',
  },
  block2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#DFDEFE',
  },
  button: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,

    justifyContent: 'center',
  },
  button_text: {
    textAlign: 'center',
    color: '#000000',
  },
  id_text: {
    marginTop: 10,
    textAlign: 'center',
    color: '#000000',
  },
});

export default Main;
