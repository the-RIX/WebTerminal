import React, {FC, useContext, useState} from "react"
import styles from "../../styles/Terminal.module.css"
import CommandHandler from "./CommandHandler";
import FileEngine, {Directory} from "./FileEngine";
import contentContext from "../../contexts/ContentContext";
import WorkingDirectoryContext from "../../contexts/WorkingDirectoryContext";

type ContentProps = {
    content: string[]
    setContent: Function
}

type WorkingDirectoryProps = {
    workingDirectory: Directory[]
    setWorkingDirectory: Function
}


const Input: FC = () => {
    const [command, setCommand]: [string, Function] = useState("")

    const setFocus = (inputLine: HTMLInputElement | null) => {
        if (inputLine != null) {
            inputLine.focus()
        }
    }

    //TODO: typing
    // @ts-ignore
    const contentProps: ContentProps = useContext(contentContext)
    //TODO: typing
    // @ts-ignore
    const workingDirectoryProps: WorkingDirectoryProps = useContext(WorkingDirectoryContext)
    const handleSubmit = (event: any) => {
        event.preventDefault()
        CommandHandler.handleCommand(command, contentProps, workingDirectoryProps)
        setCommand("")
    }

    const workingDirectoryStr: string = FileEngine.pwd(workingDirectoryProps.workingDirectory)
    return (
        <div className={styles.input}>
            <form onSubmit={handleSubmit}>
                {workingDirectoryStr + ">"}
                <input className={styles.input_field}
                       type="text"
                       value={command}
                       onChange={event => setCommand(event.target.value)}
                       ref={(x: HTMLInputElement | null) => {setFocus(x)}}
                       onBlur={(x) => {
                           setFocus(x.target)
                       }}
                       />
            </form>
        </div>
    )
}

export default Input