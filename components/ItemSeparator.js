import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';

export default class ItemSeparator extends PureComponent {
  render() {
    return <View style={{height: 0.5, backgroundColor: '#333'}}></View>;
  }
}
