import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'expo';

import SortableGrid from 'react-native-sortable-grid';

import { MonoText } from '../components/StyledText';
import Key from '../components/Key';
import Section from '../components/Section';

const newButton = {
	label: 'new',
	value: 'new',
	colour: 'pink'
};

export default class KeyboardScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			buttonsPerRow: 6,
			text: '',
			letters: [
				'a',
				'b',
				'c',
				'd',
				'e',
				'f',
				'g',
				'h',
				'i',
				'j',
				'k',
				'l',
				'm',
				'n',
				'o',
				'p',
				'q',
				'r',
				's',
				't',
				'u',
				'v',
				'w',
				'x',
				'y',
				'z'
			],
			words: [ 'Yes', 'No', 'Pain' ],
			numbers: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ]
		};
	}

	render() {
		console.log(this.state.buttonsPerRow);
		return (
			<View style={styles.container}>
				<View style={styles.textWrapper}>
					<View style={styles.columnsWrapper}>
						<Text style={styles.text}>{this.state.text}</Text>
						<View style={styles.clearWrapper}>
							<Icon.Ionicons
								name="ios-arrow-dropleft"
								size={72}
								onPress={this.handleBack}
								style={{ marginRight: 10 }}
							/>
							<Icon.Ionicons name="ios-close-circle-outline" size={72} onPress={this.handleClear} />
						</View>
					</View>
				</View>
				{this.renderEditMode()}
				<ScrollView scrollEnabled={!this.state.editMode} contentContainerStyle={styles.contentContainer}>
					{this.renderButtons()}
				</ScrollView>
				<View style={styles.newButton}>
					{/* <Icon.Ionicons
						name="ios-add-circle-outline"
						size={72}
						onPress={() => this.handleButtonsPerRow(1)}
						style={{ marginRight: 10 }}
					/>
					<Icon.Ionicons
						name="ios-remove-circle-outline"
						size={72}
						onPress={() => this.handleButtonsPerRow(-1)}
					/> */}
				</View>
			</View>
		);
	}

	renderButtons() {
		const letters = this.state.letters.map((letter, index) => {
			return this.renderButton(letter, index);
		});

		const numbers = this.state.numbers.map((number, index) => {
			return this.renderButton(number, index, 'grey');
		});

		const words = this.state.words.map((word, index) => {
			return this.renderButton(word, index, 'black');
		});

		return (
			<View>
				<SortableGrid
					blockTransitionDuration={400}
					activeBlockCenteringDuration={200}
					itemsPerRow={5}
					dragActivationTreshold={0}
					onDragRelease={this.handleDragRelease}
					onDragStart={this.handleDragStart}
					onPress={this.handleKeyPress}
				>
					{words}
				</SortableGrid>
				<SortableGrid
					blockTransitionDuration={400}
					activeBlockCenteringDuration={200}
					itemsPerRow={7}
					dragActivationTreshold={0}
					onDragRelease={this.handleDragRelease}
					onDragStart={this.handleDragStart}
					onPress={this.handleKeyPress}
				>
					{letters}
				</SortableGrid>
				<SortableGrid
					blockTransitionDuration={400}
					activeBlockCenteringDuration={200}
					itemsPerRow={10}
					dragActivationTreshold={0}
					onDragRelease={this.handleDragRelease}
					onDragStart={this.handleDragStart}
					onPress={this.handleKeyPress}
				>
					{numbers}
				</SortableGrid>
			</View>
		);
	}

	handleDragStart = (itemOrder) => {
		console.log('Some block is being dragged now!');
		this.setState({ editMode: true });
	};

	handleDragRelease = (itemOrder) => {
		console.log('Drag was released, the blocks are in the following order: ', itemOrder);
	};

	renderEditMode = () => {
		const button = this.state.editMode ? (
			<Icon.Ionicons color="green" name="ios-checkmark-circle" size={128} onPress={this.handleDisableEditMode} />
		) : (
			<Icon.Ionicons name="ios-cog" size={72} onPress={this.handleEnableEditMode} />
		);

		return <View style={styles.editModeStyle}>{button}</View>;
	};

	handleKeyPress = (text) => {
		return this.setState({ text: this.state.text + ' ' + text });
	};

	handleButtonsPerRow = (amount) => {
		return this.setState((prevState) => ({
			buttonsPerRow: prevState.buttonsPerRow + amount
		}));
	};

	handleDisableEditMode = () => {
		return this.setState((prevState) => ({
			editMode: false
		}));
	};

	handleEnableEditMode = () => {
		return this.setState((prevState) => ({
			editMode: true
		}));
	};

	handleBack = () => {
		const theString = this.state.text;
		const newText = theString.slice(0, -1);
		return this.setState((prevState) => ({ text: newText }));
	};

	handleClear = () => {
		return this.setState((prevState) => ({ text: '' }));
	};

	renderButton(button, index, colour = 'blue') {
		return (
			<Key
				key={index}
				label={button}
				disabled={this.state.editMode}
				handleKeyPress={() => this.handleKeyPress(button)}
				colour={colour}
			/>
		);
	}

	handleAddButton = (button) => {
		const sectionToUpdate = this.state.sections.find((section) => section.id === sectionId);
		const sections = { ...this.state.sections };
		sectionToUpdate.buttons.push(button);
	};
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		backgroundColor: '#fff',
		flex: 1
	},
	textWrapper: {
		backgroundColor: '#EFEFEF',
		justifyContent: 'center',
		padding: 20,
		minHeight: 100
	},
	columnsWrapper: {
		flexDirection: 'row'
	},
	clearWrapper: {
		alignSelf: 'flex-end',
		flexDirection: 'row'
	},
	text: {
		fontSize: 36,
		flex: 1
	},
	contentContainer: {
		padding: 10
	},
	newButton: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		flexDirection: 'row'
	},
	editModeStyle: {
		position: 'absolute',
		left: 20,
		bottom: 20,
		zIndex: 1
	}
});
