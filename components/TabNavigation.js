import { createMaterialTopTabNavigator } from 'react-navigation'
import DeckList from './DeckList'
import NewDeck from './NewDeck'

const Tabs = createMaterialTopTabNavigator({
  DeckList:{
    screen: DeckList,
    navigationOptions:{
      tabBarLabel: 'Home'
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel: 'New Deck'
    }
  }
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: '#000000',
    style: {
      height: 56,
      backgroundColor: '#fff',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    labelStyle: {
      color: '#000000',
    },
    indicatorStyle: {
      backgroundColor: 'green',
    },
  }
})

export default Tabs