import { LOGIN_ROUTE, REGISTRATION_ROUTE, LEARN_WORDS, SETTINGS } from "./utils/consts"
import Auth from "./pages/Auth"
import LearnWords from "./pages/LearnWords"
import Settings from "./pages/Settings"




export const authRouters = [
    {
        path: LEARN_WORDS,
        Element: LearnWords
    },
    {
        path: SETTINGS,
        Element: Settings
    }

]

export const pablicRouters = [
    {
        path: LOGIN_ROUTE,
        Element: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Auth
    }
]








