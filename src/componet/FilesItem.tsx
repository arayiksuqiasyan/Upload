import TextFieldsIcon from '@material-ui/icons/TextFields';
import {BrowserRouter, useHistory} from "react-router-dom"
import FolderIcon from '@material-ui/icons/Folder';
import {useDispatch} from "react-redux";
import React, {useState} from 'react';

import {tFile,tEdit} from "../project-golbal-type";
import {tObj} from "../project-golbal-type";
import {
    backToBasketHandler, changeInputValue,
    deleteAlert, deleteFromBasket,
    deleteFromHome,folderIconHandler,
} from "../redux/projectReducer/projectReducer";

interface tProps {
    item: tFile
    editTitle: tEdit,
}

function FilesItem({item, editTitle}: tProps) {
    const [value, setValue] = useState(item.title || '')
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = () => {
        if (isEdit) {
            editTitle({
                ...item,
                title: value
            });
            setIsEdit(false);
        } else {
            setIsEdit(true)
        }
    }

    const handleDelete = () => {
        if (item.deleted) {
            dispatch(deleteFromBasket(item.id))
        } else {
            dispatch(deleteFromHome(item.id))

        }
    }

    const breadCramps: (type: string, obj: tObj) => void = (type, obj) => {
        if (type === 'file') {
            history.push(`/file/${item.id}`)

        } else if (type === 'text') {
            history.push(`/text/${item.id}`)
        }
        dispatch(folderIconHandler(obj))
        dispatch(changeInputValue(''))
        dispatch(deleteAlert(false))

    }

    const backToBasket: (id: number) => void = (id) => {
        dispatch(backToBasketHandler(item.id))

    }

    return (
        <BrowserRouter>
            <div className="filesItem">
                {item.completed ?
                    <FolderIcon
                        onDoubleClick={() => breadCramps('file', {title: item.title, id: item.parentId})}
                    />
                    :
                    <TextFieldsIcon
                        onDoubleClick={() => breadCramps('text', {title: item.title, id: item.parentId})}
                    />
                }
                <div>
                        <span
                            onClick={handleDelete}
                            style={{color: "#d40000"}}
                            className={`editItem-button`}
                        >
                        <i className="far fa-trash-alt"/>
                        </span>
                    {item.deleted ?
                        <span
                            onClick={() => backToBasket(item.id)}
                            className={`editItem-button`}
                        >
                             <i className="fas fa-arrow-left"/>
                         </span> :
                        <span
                            onClick={handleClick}
                            style={{color: isEdit ? "green" : "black"}}
                            className={`editItem-button`}
                        >
                             <i className="fas fa-edit"/>
                        </span>}
                    <input value={value}
                           readOnly={!isEdit}
                           style={{color: isEdit ? "white" : "black"}}
                           title={value}
                           className={`editItem-input`}
                           onChange={(e) => {
                               setValue((e.target.value))
                           }}

                    />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default FilesItem;
