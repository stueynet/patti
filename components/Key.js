import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class Key extends React.Component {
	render() {
		const fontSize = this.getFontSize();

		return (
			<TouchableOpacity
                disabled={! this.props.disabled}
				style={[ styles.container, { backgroundColor: this.props.colour } ]}
				onPress={this.props.handleKeyPress}
				onLongPress={this.props.handleLongPress}
			>
                <Text style={[ styles.default, { fontSize } ]}>{this.props.label}</Text>
			</TouchableOpacity>
		);
	}

	getFontSize() {
		size = 30 * (1 / (this.props.label.length / 5));
		return size > 64 ? 64 : size;
	}
}
Key.defaultProps = {
	text: '???',
	colour: 'blue',
	type: 'default'
};

const styles = StyleSheet.create({
	container: {
         flex: 1,
            margin: 8,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
		// alignItems: 'center',
		// justifyContent: 'center',
		// aspectRatio: 1,
		// width: 128,
		// height: 120,
		// margin: 10
	},
	textBase: {
		color: 'white'
	},
	default: {
		color: 'white',
		fontSize: 60
	},
	word: {
		fontSize: 30
	},
	letter: {
		fontSize: 60
	}
});
