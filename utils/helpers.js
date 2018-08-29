import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY ="mobile-flashcards:decks" 

export function getDecks(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function getDeck(key){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results => {
            return JSON.parse(results)[key]
        })
}

export function saveDeckTitle(title){
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title, 
            questions: []
        }
    }))
}

export function addCardToDeck({title, card}){
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [card.questions]: card
    }))
}