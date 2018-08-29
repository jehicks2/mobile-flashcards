import { createStackNavigator } from 'react-navigation'
import DeckList from './DeckList.js'
import NewDeck from './NewDeck.js'
import Tabs from './TabNavigation'
import Quiz from './Quiz'
import Deck from './Deck.js'
import NewQuiz from './NewQuiz.js'

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  DeckList: {
    screen: DeckList,
  },
  Deck: {
    screen: Deck
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck'
    }
  },
  NewQuiz:{
    screen: NewQuiz,
    navigationOptions: {
      title: "New Quiz"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz"
    }
  }},{
    navigationOptions: {
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: 'white',
      }
    }
  })

export default MainNavigator