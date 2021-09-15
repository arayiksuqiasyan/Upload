import React, {ChangeEvent, useEffect, useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import {Input, Icon, Button} from '@material-ui/core';
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../redux/store";
import Alert from '@material-ui/lab/Alert';

import {
    changeInputValue,
    addFiles,
    deleteIconsHandler,
    changeHistoryText,
    deleteAlert,
} from "../redux/projectReducer/projectReducer";
import {tFile} from "../project-golbal-type";
import {useHistory} from "react-router-dom";

type tInputValue = (e: ChangeEvent<HTMLInputElement>) => void
type tNewFile = (data: boolean) => void

function NavBarList() {
    const [inputValue, setInputValue] = useState("")

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = history.listen(location => {
            if (history.action === 'POP') {
                dispatch(deleteIconsHandler(false))
                console.log(history)

            }
        })

        return () => {
            unsubscribe()
        }

    }, [])

    const {files, value, menuTitle, isOpen} = useSelector((state: RootState) => state.counter)

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
            // Lriv het tanel
            history.push("/")
            dispatch(deleteIconsHandler(true))
        } else {
            // 1 hat het tanel
            history.goBack()
        }

    }

    const changeHistoryTextHandler: (index: number) => void = (index) => {
        dispatch(changeHistoryText(index))
    }

    return (
        <div>
            <div className="NavBarList">
                <span onClick={() => goBackHandler()}><i className="fas fa-angle-left"/></span>
                <span onClick={() => goBackHandler(true)}><i className="fas fa-angle-double-left"/></span>
                <Input color={"primary"} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInputValue(e.target.value)
                    changeValue(e)
                }}/>
                <Button
                    onClick={(e) => addNewFile(true)}
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                >
                    ADD NEW FOLDER
                </Button>
                <Button variant="outlined" color="default"
                        onClick={(e) => addNewFile(false)}>
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
            <div style={{display: "flex", justifyContent: "center"}}>
                <h1 className="titleMenuForPages">Files/</h1>
                <div>
                    {menuTitle.map((item, index) => {
                        if (!item.id) {
                            return <Link key={index} to={"/"} onClick={() => changeHistoryTextHandler(index)}
                                         className="link-h1">{item.title}/</Link>
                        } else {
                            return <Link key={index} to={`/file/${item.id}`} onClick={() => {
                                changeHistoryTextHandler(index)
                            }} className="link-h1">{item.title}/</Link>
                        }
                    })}
                </div>
            </div>
            {isOpen && <Alert severity="error">одинаквие имя</Alert>}
        </div>
    );
}

export default NavBarList
