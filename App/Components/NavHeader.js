import React, {Component} from 'react';
import {View, Text, StatusBar, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {BorderlessButton, TouchableOpacity} from 'react-native-gesture-handler';
import styles from './Styles/NavHeaderStyles';
import {Colors} from '../Themes';

export default class HomeScreen extends Component {
  render() {
    const {title, iconName, onIconPress} = this.props;
    const Touchable =
      Platform.OS === 'android' ? BorderlessButton : TouchableOpacity;

    return (
      <>
        <StatusBar backgroundColor={Colors.baseColor} />
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {iconName && (
            <Touchable onPress={onIconPress}>
              <Icon color="white" size={25} name={iconName} />
            </Touchable>
          )}
        </View>
      </>
    );
  }
}
