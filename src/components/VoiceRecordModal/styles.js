import {Dimensions} from 'react-native';

export const styles = {
  modalContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  modalSecondContainer: {
    backgroundColor: '#ffffff',
    marginTop: Dimensions.get('window').height / 1.6,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  voiceRecordingImage: {
    height: 150,
    width: 150,
  },
  recordingText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 20,
  },
  stopRecordContainer: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopRecordText: {
    fontWeight: 'bold',
    color: 'white',
  },
};
