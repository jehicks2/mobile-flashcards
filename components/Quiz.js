import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         Platform, 
         TouchableOpacity,
         TextInput,
         Button,
         Animated } from 'react-native'
import { connect } from 'react-redux'

import { addDeck } from '../actions/decks.js'

function ShowAnswerBtn ({ onPress }) {
  return (
    <Button
      color= 'green'
      title='Show Answer'
      disabled = {false}
      onPress={() => onPress()}>
        Show Answer
    </Button>
  )
}
function MarkCorrectBtn ({ onPress }) {
  return (
    <Button
      color= 'green'
      title='Correct'
      disabled = {false}
      onPress={() => onPress()}>
        Correct
    </Button>
  )
}
function MarkIncorrectBtn ({ onPress }) {
  return (
    <Button
      color= 'red'
      title='Incorrect'
      disabled = {false}
      onPress={() => onPress()}>
        Incorrect
    </Button>
  )
}
function RestartQuizBtn ({ onPress }) {
  return (
    <Button
      color= 'green'
      title='Restart Quiz'
      disabled = {false}
      onPress={() => onPress()}>
        Restart Quiz
    </Button>
  )
}
function BackToDeckBtn ({ onPress }) {
  return (
    <Button
      color= 'green'
      title='Back to Deck'
      disabled = {false}
      onPress={() => onPress()}>
        Back to Deck
    </Button>
  )
}
function shuffleArray(questions) {
  let i = questions.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
  return questions;
}
class NewDeck extends Component {
  state={
    question : 0,
    answered: 0,
    showAnswer: false,
    correct: 0,
    incorrect: 0,
    bounceValue: new Animated.Value(1),
    bounceValueScore : new Animated.Value(1)
  }
  showAnswer(){
    const {bounceValue} = this.state
    this.setState({
      showAnswer: true,
    })
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 300, toValue: 1.5}),
      Animated.spring(bounceValue, { toValue: 1, friction: 5})
    ]).start()
  }
  isDisabled(){
    if(this.state.showAnswer){
      return true
    }
    return false
  }
  markCorrect(){
    this.setState({
      correct: this.state.correct + 1,
      question: this.state.question + 1,
      answered: this.state.answered + 1,
      showAnswer: false,
    })
  }
  markIncorrect(){
    this.setState({
      incorrect: this.state.correct + 1,
      question: this.state.question + 1,
      answered: this.state.answered + 1,
      showAnswer: false,
    })
  }
  restartQuiz(){
    this.setState({
    question : 0,
    answered: 0,
    showAnswer: false,
    correct: 0,
    incorrect: 0,
    })
  }

  render() {
    const {questions, title} = this.props.navigation.state.params
    const {question, showAnswer, correct, incorrect, bounceValue, bounceValueScore} = this.state
    if(this.state.question === this.props.navigation.state.params.questions.length){
        Animated.sequence([
          Animated.timing(bounceValue, { duration: 200, toValue: 1.25}),
          Animated.spring(bounceValue, { toValue: 1, friction: 7})
        ]).start()
        Animated.sequence([
          Animated.timing(bounceValueScore, { duration: 200, toValue: 1.5}),
          Animated.spring(bounceValueScore, { toValue: 1, friction: 1})
        ]).start()

      return(
      <View style={styles.container}>
        <View style={styles.item}>
          <Animated.Text style={[styles.title, {transform: [{scale: bounceValue}]}]}>You have completed the {title} quiz!</Animated.Text>
          <Animated.Text style={[styles.subTitleTwo, {transform: [{scale: bounceValueScore}]}]}>You answered {correct} correct out of {questions.length}!</Animated.Text>
            <View style={styles.buttonContainer}>
              <RestartQuizBtn onPress={() => this.restartQuiz()}/>
              <BackToDeckBtn onPress={() => this.props.navigation.goBack()}/>
            </View>
        </View>
      </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.subTitleOne}>Question {this.state.answered + 1} of {questions.length}</Text>
          <Text style={styles.title}>{questions[question].question}</Text>
          {showAnswer ?
            <View> 
            <Animated.Text style={[styles.subTitleOne, {transform: [{scale: bounceValue}]}]}>{questions[question].answer}</Animated.Text>
              <View style={styles.buttonContainer}>
                <MarkCorrectBtn onPress={() => this.markCorrect()}/>
                <MarkIncorrectBtn onPress={() => this.markIncorrect()}/>
              </View>
            </View> 
        : <ShowAnswerBtn onPress={() => this.showAnswer()}/>}
        </View>
      </View>
    )
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
        marginLeft: 30,
        marginRight: 30,
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
        textAlign: 'center',
    },
    subTitleOne:{
      textAlign: 'center'
    },
    subTitleTwo:{
      fontSize: 20,
      textAlign: 'center',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20
    },
    button:{
        marginRight: 10,
        marginLeft: 10
    }
})

function mapStateToProps(data){

  return{
    decks : Object.keys(data)
  }
}
function mapDispatchToProps (dispatch, {navigation}) {
  return {
    newDeck: (input) => dispatch(addDeck(input))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewDeck)