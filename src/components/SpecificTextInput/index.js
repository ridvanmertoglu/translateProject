import React, {Component} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './styles';

export default class SpecificTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          multiline={this.props.isMultiline}
          maxLength={this.props.maxLength}
        />
      </View>
    );
  }
}
