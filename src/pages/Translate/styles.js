import {Dimensions} from 'react-native';
export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  secondContainer: {
    width: '90%',
  },
  thirdContainer: {
    flexDirection: 'row',
  },

  lengtOfInputText: {
    fontWeight: '200',
    textAlign: 'right',
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  textInputBottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chooseLangButton: {
    fontSize: 30,
    color: 'blue',
    fontWeight: '600',
    marginLeft: Dimensions.get('window').width / 5,
  },
};
