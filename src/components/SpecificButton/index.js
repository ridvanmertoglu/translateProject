import React, {Component} from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import {styles} from './styles';

export default class SpecificButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          style={styles.voiceRecordIcon}
          source={this.props.voiceRecordSource}
        />

        <Text style={{fontSize: 20, color: 'blue'}}>
          {this.props.buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  }
}
