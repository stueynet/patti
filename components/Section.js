import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class Section extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  }
});
