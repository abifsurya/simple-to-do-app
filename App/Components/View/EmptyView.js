import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class EmptyView extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon size={120} color="lightgray" name="trash" />
        <Text style={{fontSize: 35, color: 'lightgray', marginTop: 15}}>Empty List</Text>
      </View>
    );
  }
}

export default EmptyView;
