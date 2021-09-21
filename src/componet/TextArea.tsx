import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import React, {useState} from 'react';

import {saveTextFileHandler} from "../redux/projectReducer/projectReducer";
import {tText} from "../project-golbal-type";
import {RootState} from "../redux/store";

type tProps = {
    id: string | number
}
const TextArea = ({id}: tProps) => {
    const [value, setValue] = useState("")

    const history = useHistory()

    const texts = useSelector((state: RootState) => {
        return state.counter.files.filter((item) => id ? item.id === +id : "")
    })

    const dispatch = useDispatch()

    const saveTextFile: tText = (value: string): void => {
        dispatch(saveTextFileHandler({value, id}))
        history.goBack()

    }

    return (
        <div>
            {texts.map((item, index) => {
                return (
                    <div key={index} className='container-textarea'>
                        <textarea
                            defaultValue={item.valueTextArea}
                            onChange={(e) => setValue(e.target.value)}
                            className="textarea"
                            required={true}
                        />
                        <Button
                            onClick={() => saveTextFile(value)}
                            variant="outlined"
                            color="primary"
                        >
                            Save
                        </Button>
                    </div>
                )
            })}
        </div>

    );
};

export default TextArea