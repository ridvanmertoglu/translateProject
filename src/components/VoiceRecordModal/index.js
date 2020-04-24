import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {images} from '../../utils/images';

export default class VoiceRecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalSecondContainer}>
          <Image
            style={styles.voiceRecordingImage}
            source={images.voiceRecordingIcon}
          />
          <Text style={styles.recordingText}>Recording..</Text>

          <TouchableOpacity
            style={styles.stopRecordContainer}
            onPress={this.props.onRecordStop}>
            <Text style={styles.stopRecordText}>Stop Record</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
