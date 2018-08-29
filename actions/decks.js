import { saveDeckTitle, addCardToDeck } from '../utils/helpers'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SAVE_TITLE = 'SAVE_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function receiveDecks (decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function saveTitle (title){
    return {
        type: SAVE_TITLE,
        title        
    }
}

export function addCard ({title,card}){
    return {
        type: ADD_CARD_TO_DECK,
        title,
        card
    }
}

export function addDeck(title){
    return (dispatch) => {
        return dispatch(saveTitle(title))
        // return saveDeckTitle(title)
    }
}

export function addQuiz(title, card){
    return (dispatch) => {
        return dispatch(addCard({title, card}))
        // return addCardToDeck({title, card})
    }
}