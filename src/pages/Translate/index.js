import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  Picker,
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {styles} from './styles';
import {images} from '../../utils/images';
import {languagesCode} from '../../utils/languages';
import Voice from '@react-native-community/voice';

export default class Translate extends Component {
  static navigationOptions = {
    title: 'Translate',
    headerLeft: null,
  };

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
      showVoiceModal: false,
      voiceResult: '',
      clickVoice: false,
      voiceCode: 'tr-TR',
    };
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
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
        console.log(response.data.text[0]);
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

  componentDidMount() {
    this.getLanguages();
  }

  onSpeechResults(e) {
    e.value.map((text, index) => {
      this.setState({voiceResult: text});
    });
    console.log(this.state.voiceResult);
    //this.setState({voiceResult: e.value});
  }
  isRecorderSupport() {
    languagesCode.map((text) => {
      if (text.substring(0, 2) === this.state.selectedFromLanguageCode) {
        this.setState({voiceCode: text});
      }
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={styles.keyboardAvoidingView}>
          <View style={styles.container}>
            <View style={styles.secondContainer}>
              <View style={styles.thirdContainer}>
                <Button
                  title={
                    this.state.selectedFromLanguage +
                    '-' +
                    this.state.selectedToLanguage
                  }
                  onPress={() => {
                    this.setState({
                      showModal: true,
                    });
                  }}
                />
                <Modal transparent={true} visible={this.state.showModal}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalSecondContainer}>
                      <View style={styles.modalThirdContainer}>
                        <Button
                          title="Done"
                          onPress={() => {
                            this.isRecorderSupport();
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
                      <View style={styles.pickerContainer}>
                        <Picker
                          style={styles.picker}
                          selectedValue={
                            (this.state &&
                              this.state.selectedFromLanguageCode) ||
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
                          {Object.keys(this.state.languages).map(
                            (item, index) => (
                              <Picker.Item
                                key={index}
                                label={this.state.languages[item]}
                                value={item}></Picker.Item>
                            ),
                          )}
                        </Picker>
                        <Picker
                          style={styles.picker}
                          selectedValue={
                            (this.state && this.state.selectedToLanguageCode) ||
                            'en'
                          }
                          onValueChange={(value) => {
                            this.setState({
                              selectedToLanguage: this.state.languages[value],
                              selectedToLanguageCode: value,
                              selectedLangPair:
                                this.state.selectedFromLanguageCode +
                                '-' +
                                value,
                            });
                          }}>
                          {Object.keys(this.state.languages).map(
                            (item, index) => (
                              <Picker.Item
                                key={index}
                                label={this.state.languages[item]}
                                value={item}></Picker.Item>
                            ),
                          )}
                        </Picker>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Translate'}
                  onChangeText={(text) => {
                    this.setState({voiceResult: text});
                    this.fetchMeaning(text);
                  }}
                  value={this.state.voiceResult}
                  multiline={true}
                  maxLength={500}
                />
              </View>

              <View style={styles.textInputBottomContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      showVoiceModal: true,
                      clickVoice: true,
                    });
                    console.warn(this.state.voiceCode);
                    Voice.start(this.state.voiceCode);
                  }}>
                  <Image
                    style={styles.voiceRecordIcon}
                    source={images.voiceRecordIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.lengtOfInputText}>
                  {this.state.lengthOfInput}/500
                </Text>
              </View>
              <Modal transparent={true} visible={this.state.showVoiceModal}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalSecondContainer}>
                    <Image
                      style={styles.voiceRecordingImage}
                      source={images.voiceRecordingIcon}
                    />
                    <Text style={styles.recordingText}>Recording..</Text>

                    <TouchableOpacity
                      style={styles.stopRecordContainer}
                      onPress={() => {
                        this.setState({
                          showVoiceModal: false,
                        });
                        Voice.stop();
                        this.fetchMeaning(this.state.voiceResult);
                      }}>
                      <Text style={styles.stopRecordText}>Stop Record</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  multiline={true}
                  value={
                    this.state.lengthOfInput === 0
                      ? ''
                      : this.state.translatedContent
                  }
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
