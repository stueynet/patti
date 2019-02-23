import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Key from '../components/Key';

export default class KeyboardScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { text: "What is up" };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.text}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Key text="Clear" handleKeyPress={this.handleClear} buttonColour="red" />
            <Key text="Back" handleKeyPress={this.handleBack}  buttonColour="yellow" />
            {this.renderKeys()}
        </ScrollView>
      </View>
    );
  }

  renderKeys() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    return letters.map(letter => {
      return <Key key={letter} text={letter} handleKeyPress={() => this.handleKeyPress(letter)} />
    });
  }

  handleKeyPress = (text) => {
    return this.setState({text: this.state.text + " " + text});
  }

  handleBack = () => {
    const theString = this.state.text;
    const newText = theString.slice(0, -1);
    return this.setState({text: newText});
  }

  handleClear = () => {
    return this.setState({text: ""});
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  textWrapper: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    padding: 20,
    minHeight: 100,
  },
  text: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});
