import {StyleSheet} from 'react-native';
import {Colors} from '../../Themes';

export default StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalBody: {
    padding: 15,
  },
  applyButton: {
    backgroundColor: Colors.baseColor,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  applyTextButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
