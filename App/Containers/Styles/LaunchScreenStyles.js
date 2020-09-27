import {StyleSheet} from 'react-native';
import {Metrics} from '../../Themes/';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
  }
});
