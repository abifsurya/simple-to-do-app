import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../Themes/';

export default StyleSheet.create({
  container: {
    height: Metrics.navBarHeight,
    backgroundColor: Colors.baseColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  icon: {
    color: 'white',
    height: 60,
    width: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});
