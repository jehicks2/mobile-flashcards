import React, { Component } from 'react'
import { View, 
         Text, 
         FlatList, 
         StyleSheet, 
         TouchableOpacity,
         TextInput,
         Button,
         Animated } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { addQuiz } from '../actions/decks.js'

function AddQuizBtn ({ onPress }) {
  return (
    <Button
      color= 'green'
      title='Submit New Quiz'
      onPress={() => onPress()}>
        Submit New Quiz
    </Button>
  )
}

class NewQuiz extends Component {
  state={
    questionInput : '',
    answerInput : '',
  }
  newQuiz = (title, card) => {
  this.props.newQuiz(title, card)
  this.setState({
      questionInput : '',
      answerInput : ''
    })
  this.goHome(title, card)
 }
 goHome = (title, card) =>{
  console.log("PROPS: ", this.props.decks[title].questions)
  this.props.navigation.navigate('Deck',{
    deck:{
      title:title,
    questions: this.props.decks[title].questions.concat(card)
  }
  })
 }
    render() {
      const { title } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
              <View style={styles.item}>
                <Text style={styles.title}>Create a New Question</Text>
                <Text style={styles.inputText}>Question:</Text>
                <TextInput style={styles.input} onChangeText={(inputVal) => this.setState({questionInput: inputVal})}
                  value={this.state.questionInput}></TextInput>
                <Text style={styles.inputText}>Answer:</Text>
                <TextInput style={styles.input} onChangeText={(inputVal) => this.setState({answerInput: inputVal})}
                  value={this.state.answerInput}></TextInput>
                <AddQuizBtn onPress={() => this.newQuiz(title, {question:this.state.questionInput, answer: this.state.answerInput})}/>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    margin: 50
  },
  title: {
    fontSize: 24,
    marginBottom: 30
  },
  inputText:{
    fontSize: 20
  }
})

function mapStateToProps(data){
  return{
    decks : data.decks
  }
}
function mapDispatchToProps (dispatch, {navigation}) {
  return {
    newQuiz: (title, card) => dispatch(addQuiz(title, card))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewQuiz);
