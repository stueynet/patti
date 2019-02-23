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
import { Icon } from 'expo';

import { MonoText } from '../components/StyledText';
import Key from '../components/Key';

export default class KeyboardScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { text: "" };
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
                style={{marginRight: 10}}
              />
              <Icon.Ionicons
                name="ios-close-circle-outline"
                size={72}
                onPress={this.handleClear}
              />             
            </View>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.section}>
            {this.renderKeys()}
          </View>
          <View style={styles.section}>
            <Key text="the" handleKeyPress={() => this.handleKeyPress('the')}colour="grey" type="word" />
            <Key text="pain" handleKeyPress={() => this.handleKeyPress('pain')}  colour="red" type="word" />
          </View>
          <View style={styles.section}>
            <Key text="Max" handleKeyPress={() => this.handleKeyPress('Max')} type="word" />
            <Key text="Zoe" handleKeyPress={() => this.handleKeyPress('Zoe')} type="word"/>
            <Key text="Koby" handleKeyPress={() => this.handleKeyPress('Koby')} type="word"/>
            <Key text="Rachel" handleKeyPress={() => this.handleKeyPress('Rachel')} type="word"/>
            <Key text="Jakob" handleKeyPress={() => this.handleKeyPress('Jakob')} type="word"/>
          </View>
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
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    padding: 20,
    minHeight: 100,
  },
  section: {
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  columnsWrapper: {
    flexDirection: 'row',
  },
  clearWrapper: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    flex: 1,
  },
  contentContainer: {
    padding: 10,
  },
});
