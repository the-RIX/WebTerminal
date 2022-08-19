import React, {FC, useContext, useRef, useState} from "react"
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
    const labelRef = useRef<HTMLLabelElement>(null)
    const [command, setCommand]: [string, Function] = useState("")

    const onChange = (inputLine: HTMLTextAreaElement | null ) => {
        if (inputLine) {
            let inputLineText : string = inputLine.value
            //inputLineText = inputLineText.substring(workingDirectoryStr.length + 2)
            setCommand(inputLineText)
            inputLine.style.height = inputLine.style.lineHeight
            inputLine.style.height = inputLine.scrollHeight + "px"
        }
    }
    // @ts-ignore
    const setFocus = (inputLine) => {
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
            <form>
                <label
                    ref={labelRef}
                    style={{position: "absolute", marginTop: 3}}
                >
                    {workingDirectoryStr + ": "}
                </label>
                <textarea
                    onKeyDown={(key) => {
                        if (key.key == "Enter") {
                            handleSubmit(key)
                        }
                    }}
                    className={styles.input_field}
                    value={command}
                    //todo: fix that labelRef is not instant available when page is loaded and a interims size is used
                    style={{textIndent: labelRef.current ? labelRef.current.offsetWidth : workingDirectoryStr.length * 12}}
                    spellCheck={false}
                    onChange={event => onChange(event.target)}
                    ref={(inputLine : HTMLTextAreaElement | null) => {setFocus(inputLine)}}
                    onBlur={(inputLine) => {
                       setTimeout(() => setFocus(inputLine.target), 1)
                    }}
                />
            </form>
        </div>
    )
}

export default Input