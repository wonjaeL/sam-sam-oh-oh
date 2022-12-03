import React, {Component} from 'react';
import {Text, Button, View} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      textValue: 'Temporary text',
    };
    this.onPressButton = this.onPressButton.bind(this);
  }

  changeText(text) {
    this.setState({
      textValue: text,
    });
  }

  onPressButton() {
    fetch('http://d98a-211-38-155-122.ngrok.io/api/posts/', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.changeText(responseJson[0].title);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View
        style={{paddingTop: 20, alignContent: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'red', fontSize: 20}}>
          {' '}
          {this.state.textValue}{' '}
        </Text>
        <Button title="Change Text" onPress={this.onPressButton} />
      </View>
    );
  }
}
