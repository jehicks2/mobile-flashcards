import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import reducer from './reducers'
import middleware from './middleware'

import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import MainNavigation from './components/MainNavigation'

const store = createStore(reducer, middleware)

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
    )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={"green"} 
                          barStyle="light-content" />
          <MainNavigation />
        </View>
      </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
