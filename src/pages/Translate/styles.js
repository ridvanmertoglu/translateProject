import {StyleSheet, Dimensions} from 'react-native';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  secondContainer: {
    width: '90%',
  },
  thirdContainer: {
    flexDirection: 'row',
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
  modalContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  modalSecondContainer: {
    backgroundColor: '#ffffff',
    marginTop: Dimensions.get('window').height / 1.6,
    borderRadius: 5,
    flex: 1,
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
};
