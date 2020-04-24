import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {styles} from './styles';
import {images} from '../../utils/images';
import {languagesCode} from '../../utils/languages';
import Voice from '@react-native-community/voice';
import VoiceRecordModal from '../../components/VoiceRecordModal';
import LanguageModal from '../../components/LanguageModal';
import SpecificButton from '../../components/SpecificButton';
import TranslateHelper from '../../api/translate';
import SpecificTextInput from '../../components/SpecificTextInput';

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
    Voice.onSpeechResults = this._onSpeechResults;
  }
  componentDidMount() {
    this._getLanguages();
  }

  _fetchMeaning = (givenText) => {
    const {selectedLangPair} = this.state;
    this.setState({
      lengthOfInput: givenText.length,
    });
    TranslateHelper.fetch(givenText, selectedLangPair)
      .then((response) => {
        const {data} = response;
        const {lang, text} = data;
        this.setState({
          translatedContent: text[0],
          selectedLangPair: lang,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _getLanguages = () => {
    TranslateHelper.getLanguages()
      .then((response) => {
        const {data} = response;
        const {langs, dirs} = data;
        this.setState({
          languages: langs,
          langPairList: dirs,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _onSpeechResults = (e) => {
    e.value.map((text, index) => {
      this.setState({voiceResult: text});
    });
  };

  isRecorderSupport() {
    const {selectedFromLanguageCode} = this.state;
    languagesCode.map((text) => {
      if (text.substring(0, 2) === selectedFromLanguageCode) {
        this.setState({voiceCode: text});
      }
    });
  }

  _onRecordStop = () => {
    const {voiceResult} = this.state;
    this.setState({
      showVoiceModal: false,
    });

    Voice.stop();
    this._fetchMeaning(voiceResult);
  };

  _onLanguageSelecterDonePress = () => {
    const {langPairList, selectedLangPair} = this.state;
    this.isRecorderSupport();
    if (langPairList.includes(selectedLangPair)) {
      this.setState({showModal: false});
    } else {
      Alert.alert(
        'This translation is not supported. Please choose a different translation.',
      );
    }
  };

  _selectFromLanguage = (value) => {
    const {selectedToLanguageCode, languages} = this.state;
    this.setState({
      selectedFromLanguage: languages[value],
      selectedFromLanguageCode: value,
      selectedLangPair: `${value}-${selectedToLanguageCode}`,
    });
  };

  _selectToLanguage = (value) => {
    const {selectedFromLanguageCode, languages} = this.state;
    this.setState({
      selectedToLanguage: languages[value],
      selectedToLanguageCode: value,
      selectedLangPair: `${selectedFromLanguageCode}-${value}`,
    });
  };

  _startVoiceRecord = () => {
    const {voiceCode} = this.state;
    this.setState({
      showVoiceModal: true,
      clickVoice: true,
    });
    Voice.start(voiceCode);
  };

  render() {
    const {
      selectedFromLanguage,
      selectedFromLanguageCode,
      selectedToLanguage,
      selectedToLanguageCode,
      showModal,
      languages,
      voiceResult,
      lengthOfInput,
      showVoiceModal,
      translatedContent,
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={styles.keyboardAvoidingView}>
          <View style={styles.container}>
            <View style={styles.secondContainer}>
              <View style={styles.thirdContainer}>
                <SpecificButton
                  onPress={() => {
                    this.setState({
                      showModal: true,
                    });
                  }}
                  buttonTitle={`${selectedFromLanguage}-${selectedToLanguage}`}
                />

                <Modal transparent visible={showModal}>
                  <LanguageModal
                    onSelectToLanguage={this._selectToLanguage}
                    selectedToLanguage={
                      (this.state && selectedToLanguageCode) || 'en'
                    }
                    languageList={languages}
                    onSelectFromLanguage={this._selectFromLanguage}
                    selectedFromLanguage={
                      (this.state && selectedFromLanguageCode) || 'tr'
                    }
                    onLanguageSelecterDonePress={
                      this._onLanguageSelecterDonePress
                    }
                  />
                </Modal>
              </View>
              <SpecificTextInput
                placeholder={'Translate'}
                value={voiceResult}
                onChangeText={(text) => {
                  this.setState({voiceResult: text});
                  this._fetchMeaning(text);
                }}
                isMultiline
                maxLength={500}
              />
              <View style={styles.textInputBottomContainer}>
                <SpecificButton
                  onPress={this._startVoiceRecord}
                  voiceRecordSource={images.voiceRecordIcon}
                />
                <Text style={styles.lengtOfInputText}>{lengthOfInput}/500</Text>
              </View>
              <Modal transparent visible={showVoiceModal}>
                <VoiceRecordModal onRecordStop={this._onRecordStop} />
              </Modal>

              <SpecificTextInput
                isMultiline
                value={lengthOfInput === 0 ? '' : translatedContent}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
