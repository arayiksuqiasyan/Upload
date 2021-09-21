import {ChangeEvent} from "react";

export type tFile = {
    id: number
    title: string
    completed: boolean
    parentId: boolean | number | string
    valueTextArea: string
    deleted: boolean
}
export type tTextFiles = {
    id: number,
    title: string
}
export type tmenuTitle = {
    title: string
    id: number
}
export type tInputValue = {
    (e: ChangeEvent<HTMLInputElement>): void
}
export type tNewFile = {
    (data: boolean): void
}
export type tText = {
    (value: string): void
}
export type tObj = {
    title: string
    id: number | boolean | string
}
export type tEdit = {
    (item: tFile): void
}


export interface tState {
    files: tFile[]
    value: string
    menuTitle: tmenuTitle[]
    isOpen: boolean
}