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

export interface tState {
    files: tFile[]
    value: string
    menuTitle: tmenuTitle[]
    isOpen: boolean
}