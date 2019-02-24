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

export default class KeyboardScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { 
      letters:["a", "b", "c", "d", "e", "f", "g", "h", "i"],
      editMode: false,
      text: "",
      sections: [
        {
          id: 1,
          order: 1,
          buttons:[{
            label: "a",
            value: "a",
          },
          {
            label: "b",
            value: "b",
          }],
        },
        {
          id: 2,
          order: 2,
          buttons: [{
            label: "yes",
            value: "yes",
            colour: 'black',
          },{
            label: "no",
            value: "no",
            colour: 'black',
          }],
        }
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
          {this.renderSections()}
        </ScrollView>
      </View>
    );
  }

  renderSections() {
     return this.state.sections.map(section => {
            return <Section key={section.id}>
              {this.renderButtons(section.buttons)}
               <Icon.Ionicons
                name="ios-add-circle-outline"
                size={72}
                onPress={() => this.handleAddButtonToSection(section.id, {
            label: "new",
            value: "new",
            colour: 'pink',
          })}
              />         
            </Section>
          });
  }

  renderButtons(buttons) {
    return buttons.map(button => {
      return <Key key={button.value} text={button.label} handleKeyPress={() => this.handleKeyPress(button.value)} colour={button.colour} />
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

  handleAddButtonToSection = (sectionId, button) => {
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
});
