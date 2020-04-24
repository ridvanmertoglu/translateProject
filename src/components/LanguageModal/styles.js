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
