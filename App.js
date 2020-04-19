import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Modal,
  Picker,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      languages: [],
      selectedFromLanguage: 'Turkish',
      selectedFromLanguageCode: 'tr',
      selectedToLanguage: 'English',
      selectedToLanguageCode: 'en',
      lengthOfInput: 0,
      translatedContent: '',
      langPairList: [],
      selectedLangPair: 'tr-en',
    };
  }
  fetchMeaning = (text) => {
    this.setState({
      lengthOfInput: text.length,
    });
    axios
      .get(
        `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${'trnsl.1.1.20200417T174955Z.50e272e7c0b49e72.f029d53c0eb096c164e64deb10a176a4933203f3'}&text=${text}&lang=${
          this.state.selectedLangPair
        }`,
      )
      .then((response) => {
        console.log('getting data from axios', response.data);
        this.setState({
          translatedContent: response.data.text[0],
          selectedLangPair: response.data.lang,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getLanguages = () => {
    axios
      .get(
        `https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20200417T174955Z.50e272e7c0b49e72.f029d53c0eb096c164e64deb10a176a4933203f3
        `,
      )
      .then((response) => {
        this.setState({
          languages: response.data.langs,
          langPairList: response.data.dirs,
        });
        console.log('getting data from axios', response.data.dirs);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  indicateLanguages = () => {
    Alert.alert(
      'Mesaj Başlığı', //Virgül önemli
      'Mesaj İçeriği'[
        //Alertin butonu şöyle tanımlanır:
        {text: 'Button Text', onPress: () => null}
      ],
    );
  };
  componentDidMount() {
    this.getLanguages();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.pickerContainer}>
            <Button
              title={
                this.state.selectedFromLanguage +
                '-' +
                this.state.selectedToLanguage
              }
              onPress={() => {
                this.setState({showModal: true});
              }}
            />
            <Modal transparent={true} visible={this.state.showModal}>
              <View style={{backgroundColor: '#000000aa', flex: 1}}>
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    marginTop: Dimensions.get('window').height / 2,
                    borderRadius: 5,
                    flex: 1,
                  }}>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginTop: 10,
                    }}>
                    <Button
                      title="Done"
                      onPress={() => {
                        this.state.langPairList.includes(
                          this.state.selectedLangPair,
                        )
                          ? this.setState({showModal: false})
                          : Alert.alert(
                              'This translation is not supported. Please choose a different translation.',
                            );
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Picker
                      style={{width: '50%'}}
                      selectedValue={
                        (this.state && this.state.selectedFromLanguageCode) ||
                        'tr'
                      }
                      onValueChange={(value) => {
                        this.setState({
                          selectedFromLanguage: this.state.languages[value],
                          selectedFromLanguageCode: value,
                          selectedLangPair:
                            value + '-' + this.state.selectedToLanguageCode,
                        });
                      }}>
                      {Object.keys(this.state.languages).map((item) => (
                        <Picker.Item
                          label={this.state.languages[item]}
                          value={item}></Picker.Item>
                      ))}
                    </Picker>
                    <Picker
                      style={{width: '50%'}}
                      selectedValue={
                        (this.state && this.state.selectedToLanguageCode) ||
                        'en'
                      }
                      onValueChange={(value) => {
                        this.setState({
                          selectedToLanguage: this.state.languages[value],
                          selectedToLanguageCode: value,
                          selectedLangPair:
                            this.state.selectedFromLanguageCode + '-' + value,
                        });
                      }}>
                      {Object.keys(this.state.languages).map((item) => (
                        <Picker.Item
                          label={this.state.languages[item]}
                          value={item}></Picker.Item>
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

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
  pickerContainer: {
    flexDirection: 'row',
  },
});
