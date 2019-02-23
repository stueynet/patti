import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class Key extends React.Component {
  render() {
    return (
    <TouchableOpacity style={[styles.container, {backgroundColor: this.props.colour}]} onPress={this.props.handleKeyPress}>
         <Text style={[styles.default, styles[this.props.type]]}>{this.props.text}</Text>
    </TouchableOpacity>
    );
  }
}
Key.defaultProps = {
  text: "???",
  colour: "blue",
  type: "default",
};

const styles = StyleSheet.create({
  container: {
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        width: 128,
        height: 120,
        margin: 10,
    },
    textBase: {
        color: 'white',
    },
    default: {
        color: 'white',
        fontSize: 60,
    },
    word: {
        fontSize: 30,
    },
    letter: {
        fontSize: 60,
    }
});
