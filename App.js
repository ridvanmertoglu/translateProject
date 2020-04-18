import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthOfInput: 0,
      translatedContent: '',
      lang: '',
    };
  }
  fetchMeaning = (text) => {
    this.setState({
      lengthOfInput: text.length,
    });
    axios
      .get(
        `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${'trnsl.1.1.20200417T174955Z.50e272e7c0b49e72.f029d53c0eb096c164e64deb10a176a4933203f3'}&text=${text}&lang=${'tr'}`,
      )
      .then((response) => {
        console.log('getting data from axios', response.data);
        this.setState({
          translatedContent: response.data.text[0],
          lang: response.data.lang,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.fetchMeaning}
            value={this.value}
            multiline={true}
            maxLength={1000}
          />
          <Text style={styles.lengtOfInputText}>
            {this.state.lengthOfInput}/1000
          </Text>
          <Text>
            {this.state.lengthOfInput === 0 ? '' : this.state.translatedContent}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  subContainer: {
    width: '90%',
  },
  textInput: {
    height: '40%',
    borderColor: '#e8e4c9',
    borderWidth: 1,
  },
  lengtOfInputText: {
    fontWeight: '200',
    textAlign: 'right',
    marginBottom: 40,
  },
});
