import {tState} from "../../project-golbal-type";
import {createSlice} from '@reduxjs/toolkit'

const initialState: tState = {
    files: [],
    value: "",
    menuTitle: [],
    isOpen: false,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

        addFiles(state, action) {
            state.files = [...state.files, action.payload]
        },

        changeInputValue(state, action) {
            state.value = action.payload
        },

        editTodoTitle(state, action) {
            const newFiles = state.files.map((file) => {
                if (action.payload.id === file.id) {
                    return action.payload
                }
                return file
            })
            state.files = [...newFiles]
        },

        saveTextFileHandler(state, action: { payload: { id: string | number, value: string } }) {
            const newFile = state.files.find((file) => file.id === +action.payload.id)
            if (newFile) {
                newFile.valueTextArea = action.payload.value
            } else {
                return state
            }
        },

        deleteFromBasket(state, action) {
            state.files = state.files.filter((item) => item.id !== action.payload)
        },

        deleteFromHome(state, action) {
            state.files = state.files.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        deleted: true
                    }
                }
                return item
            })

        },

        folderIconHandler(state, action) {
            state.menuTitle = [...state.menuTitle, action.payload]
        },

        deleteIconsHandler(state, action) {
            if (action.payload) {
                state.menuTitle = []
            } else {
                state.menuTitle = state.menuTitle.slice(0, -1)
            }
        },

        backToBasketHandler(state, action) {
            state.files = state.files.map((file) => {
                if (file.id === action.payload) {
                    return {
                        ...file,
                        deleted: false
                    }
                }
                return file
            })

        },

        changeHistoryText(state, action) {
            const files = state.menuTitle.filter((item: any, idx: any) => {
                return idx < action.payload
            })
            state.menuTitle = [...files]
        },

        deleteAlert(state, action) {
            state.isOpen = action.payload
        }


    },
})
export const {
    addFiles, changeInputValue, editTodoTitle,
    saveTextFileHandler, deleteFromHome, deleteFromBasket,
    deleteIconsHandler, folderIconHandler, backToBasketHandler,
    changeHistoryText, deleteAlert
} = counterSlice.actions

export default counterSlice.reducer