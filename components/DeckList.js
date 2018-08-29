import React, { Component } from 'react'
import { View, 
         Text, 
         FlatList, 
         StyleSheet, 
         TouchableOpacity,
         Animated } from 'react-native'
import { connect } from 'react-redux'


class DeckList extends Component {
  state={
    opacity: new Animated.Value(1)
  }

  goToDeck(item){
    const { opacity } = this.state
    Animated.timing(opacity, {toValue: 0, duration: 3000})
      .start()
    this.props.navigation.navigate(
      'Deck',
      {deck: item}
    )
    Animated.timing(opacity, {toValue: 1, duration: 6000})
      .start()
  }
  render() {
    const { stacks } = this.props
    const { opacity } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => item.title} 
          data={stacks}
          renderItem={({item}) => (
            <Animated.View style={[styles.item, {opacity}]}>
              <TouchableOpacity onPress={() => this.goToDeck(item)}>
                <View key={item.title}>
                  <Text style={styles.fonts}>{item.title}</Text>
                  <Text style={styles.text}>{item.questions.length} cards</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
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
    padding: 20,
    marginTop: 17,
    borderRadius: 2,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  fonts: {
    fontSize: 34,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

function mapStateToProps({decks}){
  let stacks = Object.keys(decks).map((deck) => decks[deck])

 return {
   stacks
 } 
}


export default connect(mapStateToProps)(DeckList)