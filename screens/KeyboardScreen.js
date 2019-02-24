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
import Section from '../components/Section';

const newButton = {
  label: "new",
  value: "new",
  colour: 'pink',
}

export default class KeyboardScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { 
      editMode: false,
      text: "",
      buttons: [
        {
          id: 1,
          label: "a",
          value: "a",
        },
        {
          id: 2,
          label: "More stuff",
          value: "b",
          spacer: true,
        },
        {
          id: 3,
          label: "Koby",
          value: "Koby",
        },
        {
          id: 4,
          label: "Max",
          value: "Max",
        }
      ],
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
    const buttons = this.state.buttons.map(button => {
       return this.renderButton(button);
    });
    return (
      <Section>
      {buttons}
      </Section>
    )
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

  renderButton = (button) => {
    if(button.spacer) {
      return <Text key={button.id}>{button.label}</Text>
    }

    return <Key key={button.value} label={button.label} handleKeyPress={() => this.handleKeyPress(button.value)} colour={button.colour} />;
  } 

  handleAddButton = (button) => {
    const sectionToUpdate = this.state.sections.find(section => section.id === sectionId);
    const sections = {...this.state.sections};
    sectionToUpdate.buttons.push(button);
    this.setState({});
    console.log(sectionToUpdate.buttons);
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
  newButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  }
});
