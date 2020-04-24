import React, {Component} from 'react';
import {View, Button, Picker} from 'react-native';
import {styles} from './styles';

export default class LanguageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalSecondContainer}>
          <View style={styles.modalThirdContainer}>
            <Button
              title="Done"
              onPress={this.props.onLanguageSelecterDonePress}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.props.selectedFromLanguage}
              onValueChange={this.props.onSelectFromLanguage}>
              {Object.keys(this.props.languageList).map((item, index) => (
                <Picker.Item
                  key={index}
                  label={this.props.languageList[item]}
                  value={item}></Picker.Item>
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={this.props.selectedToLanguage}
              onValueChange={this.props.onSelectToLanguage}>
              {Object.keys(this.props.languageList).map((item, index) => (
                <Picker.Item
                  key={index}
                  label={this.props.languageList[item]}
                  value={item}></Picker.Item>
              ))}
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}
