import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {saveTextFileHandler} from "../redux/projectReducer/projectReducer";
import {Button} from "@material-ui/core";

type tText = (value: string) => void
type tProps = {
    id: string | number
}
const TextArea = ({id}: tProps) => {
    const [value, setValue] = useState("")

    const texts = useSelector((state: RootState) => state.counter.files.filter((item) => id ? item.id === +id : ""))

    const dispatch = useDispatch()

    const saveTextFile: tText = (value: string): void => {
        dispatch(saveTextFileHandler({value, id}))
    }

    return (
        <div>

            {texts.map((item, index) => {
                return (
                    <div key={index} className='container-textarea'>
                        <textarea defaultValue={item.valueTextArea} onChange={(e) => setValue(e.target.value)} className="textarea"  required={true}/>
                        <Button variant="outlined" color="primary" onClick={() => saveTextFile(value)}>Save</Button>
                    </div>
                )
            })}
        </div>

    );
};

export default TextArea