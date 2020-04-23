import {Dimensions} from 'react-native';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  secondContainer: {
    width: '90%',
  },
  thirdContainer: {
    flexDirection: 'row',
  },
  textInput: {
    height: '100%',
    borderColor: '#e8e4c9',
    borderWidth: 1,
  },
  lengtOfInputText: {
    fontWeight: '200',
    textAlign: 'right',
  },
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
  modalThirdContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  picker: {
    width: '50%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  voiceRecordIcon: {
    width: 40,
    height: 40,
  },
  textInputBottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputContainer: {
    height: '35%',
  },
  voiceRecordingImage: {
    height: 150,
    width: 150,
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
  recordingText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 20,
  },
};
