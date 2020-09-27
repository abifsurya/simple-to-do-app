import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './Styles/NavHeaderStyles';
import {Colors} from '../Themes';

export default class HomeScreen extends Component {
  render() {
    const {title, iconName} = this.props;

    return (
      <View>
        <StatusBar backgroundColor={Colors.baseColor} />
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Icon color="white" size={30} name={iconName} />
        </View>
      </View>
    );
  }
}
