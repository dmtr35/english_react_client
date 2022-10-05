import { createStore, combineReducers } from 'redux'
import { isAuthReducer } from './userReducer'
import { collectionsReducer } from './collectionsReducer'









const rootReducer = combineReducers({
    isAuthReducer,
    collectionsReducer
})








export const store = createStore(rootReducer)











