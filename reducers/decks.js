import { RECEIVE_DECKS, SAVE_TITLE, ADD_CARD_TO_DECK } from '../actions/decks.js'
import { initialData } from '../utils/_DATA.js'

function decks(state = initialData, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case SAVE_TITLE:
            return {
                ...state,
                [action.title] : {
                    title: action.title,
                    questions: []
                }
            }
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.title] : {
                    ...state[action.title],
                    questions: state[action.title].questions.concat(action.card)
                }
            }
        default:
            return state
    }
}

export default decks