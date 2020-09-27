import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import NavHeader from '../Components/NavHeader';

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <NavHeader title="To-Do List" iconName="plus" />
        <Text>Tes 123</Text>
      </SafeAreaView>
    );
  }
}
