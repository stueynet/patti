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
			text: '',
			buttons: [
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
			]
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.textWrapper}>
					<View style={styles.columnsWrapper}>
						<Text style={styles.text}>{this.state.text}</Text>
						<View style={styles.clearWrapper}>
							<Icon.Ionicons
								name="ios-remove-circle-outline"
								size={72}
								onPress={this.handleBack}
								style={{ marginRight: 10 }}
							/>
							<Icon.Ionicons name="ios-close-circle-outline" size={72} onPress={this.handleClear} />
						</View>
					</View>
				</View>
        {this.renderEditMode()}
				<ScrollView scrollEnabled={! this.state.editMode} contentContainerStyle={styles.contentContainer}>
					{this.renderButtons()}
				</ScrollView>
				<View style={styles.newButton}>
					<Icon.Ionicons
						name="ios-add-circle-outline"
						size={72}
						onPress={() => this.handleAddButton(newButton)}
					/>
				</View>
			</View>
		);
	}

	renderButtons() {
		const buttons = this.state.buttons.map((button, index) => {
			return this.renderButton(button, index);
		});
		return (
			<SortableGrid
				blockTransitionDuration={400}
				activeBlockCenteringDuration={200}
				itemsPerRow={4}
				dragActivationTreshold={200}
				onDragRelease={this.handleDragRelease}
				onDragStart={this.handleDragStart}
        onPress={this.handleKeyPress}
			>
				{buttons}
			</SortableGrid>
		);
	}

  handleDragStart = (itemOrder) => {
		console.log('Some block is being dragged now!');
    this.setState({editMode: true});
  }

  handleDragRelease = (itemOrder) => {
    this.setState({editMode: false});
		console.log('Drag was released, the blocks are in the following order: ', itemOrder);
  }

	renderEditMode = () => {
		if (!this.state.editMode) {
			return null;
		}

		return (
			<View style={styles.editMode}>
				<Text>You are currently editing the button layout</Text>
				<Icon.Ionicons name="ios-close-circle-outline" size={32} onPress={this.handleDisableEditMode} />
			</View>
		);
	};

	handleKeyPress = (text) => {
		return this.setState({ text: this.state.text + ' ' + text });
	};

	handleLongPress = () => {
		return this.setState((prevState) => ({
			editMode: !prevState.editMode
		}));
	};

	handleDisableEditMode = () => {
		return this.setState((prevState) => ({
			editMode: false
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

	renderButton = (button, index) => {
    console.log(this.state.editMode);
		return (
			<Key
				key={index}
				label={button}
        disabled={this.state.editMode}
				handleKeyPress={() => this.handleKeyPress(button)}
				handleLongPress={this.handleLongPress}
			/>
		);
	};

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
		fontSize: 30,
		flex: 1
	},
	contentContainer: {
		padding: 10
	},
	newButton: {
		position: 'absolute',
		right: 10,
		bottom: 10
	},
	editMode: {
		padding: 20,
    backgroundColor: 'blue',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});
