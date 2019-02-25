import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class Key extends React.Component {

	shouldComponentUpdate (nextProps, nextState) {
		return nextProps.disabled !== this.props.disabled;
	}

	render() {
		const fontSize = this.getFontSize();
		const opacity = this.props.disabled ? 0.5 : 1;
		return (
			<TouchableOpacity
                disabled={this.props.disabled}
				style={[ styles.container, { backgroundColor: this.props.colour, opacity } ]}
				onPress={this.props.handleKeyPress}
			>
                <Text style={[ styles.default, { fontSize } ]}>{this.props.label}</Text>
			</TouchableOpacity>
		);
	}

	getFontSize() {
		const length = this.props.label.length;
		let adjust = 1;

		if (length > 1) {
			adjust = 1.5;
		} 

		// if (length <= 3) {
		// 	adjust = 1.7;
		// }

		size = 30 * adjust;
		return size > 64 ? 64 : size;
	}
}
Key.defaultProps = {
	text: '???',
	colour: 'blue',
	type: 'default',
    disabled: false,
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
