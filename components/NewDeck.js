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
import { NavigationActions } from 'react-navigation'

import { addDeck } from '../actions/decks.js'

function SubmitBtn ({ onPress }) {
  return (
    <Button
      color= 'green'
      title='Submit'
      onPress={() => onPress()}
      >
      SUBMIT
    </Button>
  )
}
class NewDeck extends Component {
  state={
    input : '',
    opacity: new Animated.Value(1)
  }

 newDeck = (input) => {
  const { opacity } = this.state
  this.props.newDeck(input)
  this.setState({
      input : '',
    })
  Animated.timing(opacity, {toValue: 0, duration: 4000})
  .start()

  this.goHome(input)
  Animated.timing(opacity, {toValue: 1, duration: 100})
  .start()
 }
 goHome = (input) =>{
  this.props.navigation.navigate('Deck',{
    deck:{
      title:input,
    questions: []
  }
  })
 }
  render() {
    const { opacity } = this.state
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.item, {opacity}]}>
          <Text style={styles.title}>Title your Deck</Text>
          <TextInput style={styles.input} onChangeText={(inputVal) => this.setState({input: inputVal})}
                 value={this.state.input}></TextInput>
          <SubmitBtn onPress={() => this.newDeck(this.state.input)}/>
        </Animated.View>
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
        fontSize: 24
    },
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