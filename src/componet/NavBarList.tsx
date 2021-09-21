import React, {ChangeEvent, useEffect, useState} from "react";
import {Input, Icon, Button} from '@material-ui/core';
import {useSelector, useDispatch} from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';

import {tInputValue,tNewFile} from "../project-golbal-type";
import {tFile} from "../project-golbal-type";
import {RootState} from "../redux/store";
import BreadCramps from "./BreadCramps";
import {
    changeInputValue,
    addFiles,
    deleteIconsHandler,
    changeHistoryText,
    deleteAlert,
} from "../redux/projectReducer/projectReducer";

function NavBarList() {
    const [inputValue, setInputValue] = useState("")

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = history.listen(location => {
            if (history.action === 'POP') {
                dispatch(deleteIconsHandler(false))
            }
        })

        return () => {
            unsubscribe()
        }

    }, [])

    const {files, value, isOpen} = useSelector((state: RootState) => state.counter)

    const addNewFile: tNewFile = (completed) => {
        if (value !== "") {
            const fined = files.find((item) => item.title === inputValue)
            if (fined && history.location.pathname.slice(6) === fined.parentId) {
                dispatch(deleteAlert(true))

            } else {
                const newObj: tFile = {
                    id: Date.now(),
                    title: value,
                    completed: completed,
                    parentId: history.location.pathname.slice(6),
                    valueTextArea: "",
                    deleted: false,

                }
                dispatch((addFiles(newObj)))
                dispatch((changeInputValue("")))
                dispatch(deleteAlert(false))

            }
        }
    }

    const changeValue: tInputValue = (e) => {
        dispatch(changeInputValue(e.target.value))
    }


    const goBackHandler: (isAll?: boolean) => void = (isAll) => {
        if (isAll) {
            history.push("/")
            dispatch(deleteIconsHandler(true))
        } else {
            history.goBack()
        }
    }

    const changeHistoryTextHandler: (index: number) => void = (index) => {
        dispatch(changeHistoryText(index))
    }

    return (
        <div>
            <div className="NavBarList">
                <span
                    onClick={() => goBackHandler()}
                >
                    <i className="fas fa-angle-left"/>
                </span>
                <span
                    onClick={() => goBackHandler(true)}
                >
                    <i className="fas fa-angle-double-left"/>
                </span>
                <Input
                    value={value}
                    color={"primary"}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setInputValue(e.target.value)
                        changeValue(e)
                    }}/>
                <Button
                    color="primary"
                    onClick={() => addNewFile(true)}
                    variant="contained"
                    endIcon={<Icon>send</Icon>}
                >
                    ADD NEW FOLDER
                </Button>
                <Button variant="outlined" color="default"
                        onClick={() => addNewFile(false)}>
                    ADD NEW FILE
                </Button>
                <Button
                    onClick={() => history.push("/basket")}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                >
                    BASKET
                </Button>
            </div>
            <div className="menu-title">
                <h1 className="titleMenuForPages">Files/</h1>
                <BreadCramps
                    changeHistoryTextHandler={changeHistoryTextHandler}
                />
            </div>
            {isOpen && <Alert severity="error">одинаковые имя</Alert>}
        </div>
    );
}

export default NavBarList
