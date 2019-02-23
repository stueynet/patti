import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class Key extends React.Component {
  render() {
    return (
    <TouchableOpacity style={styles.container} onPress={this.props.handleKeyPress}>
         <Text style={styles.buttonText}>{this.props.text}</Text>
    </TouchableOpacity>
    );
  }
}
Key.defaultProps = {
  text: "???",
  buttonColour: "blue"
};

const styles = StyleSheet.create({
  container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        aspectRatio: 1,
        width: 128,
        height: 120,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
    }
});
