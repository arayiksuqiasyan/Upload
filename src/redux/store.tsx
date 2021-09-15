import { configureStore } from '@reduxjs/toolkit'
import counter from './projectReducer/projectReducer'
import  type {tState} from "../project-golbal-type";

export default configureStore({
    reducer: {
        counter,
    },
})

export type RootState = {
    counter:tState
}