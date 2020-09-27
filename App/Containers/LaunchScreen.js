import React, {Component} from 'react';
import {Text, Image, View} from 'react-native';
import {Images} from '../Themes';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.appLogo}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.title}>To-Do List</Text>
      </View>
    );
  }
}
