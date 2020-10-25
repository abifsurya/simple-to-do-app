import React, {Component} from 'react';

import {View, ActivityIndicator, Text} from 'react-native';
import RNModal from 'react-native-modal';

import styles from '../Styles/LoadingViewStyles';

export default class LoginScreen extends Component {
  render() {
    return (
      <RNModal
        useNativeDriver={true}
        isVisible={this.props.loading}
        onBackButtonPress={this.props.onBackButtonPress}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={styles.container}>
          <View style={styles.box}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.text}>Loading ...</Text>
          </View>
        </View>
      </RNModal>
    );
  }
}
