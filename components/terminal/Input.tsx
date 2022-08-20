import React, {FC, useContext, useRef, useState} from "react"
import styles from "../../styles/Terminal.module.css"
import CommandHandler from "./CommandHandler";
import FileEngine, {Directory} from "./FileEngine";
import contentContext from "../../contexts/ContentContext";
import WorkingDirectoryContext from "../../contexts/WorkingDirectoryContext";
import HistoryContext from "../../contexts/HistoryContext"

type ContentProps = {
    content: string[]
    setContent: Function
}

type WorkingDirectoryProps = {
    workingDirectory: Directory[]
    setWorkingDirectory: Function
}

type HistoryProps = {
    history: string[]
    setHistory: Function
}

const Input: FC = () => {
    const labelRef = useRef<HTMLLabelElement>(null)
    const [command, setCommand]: [string, Function] = useState("")
    const [historyIndex, setHistoryIndex]: [number, Function] = useState(0)

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
    //@ts-ignore
    const historyProps: HistoryProps = useContext(HistoryContext)

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (command != "" && (historyProps.history.length == 0 || command != historyProps.history[historyProps.history.length - 1])) {
            let newHistory = historyProps.history
            newHistory.push(command)
            historyProps.setHistory(newHistory)
        }
        setHistoryIndex(0)
        CommandHandler.handleCommand(command, contentProps, workingDirectoryProps)
        setCommand("")
    }

    const handleAutoComplete = () => {
        let currentCommandArray: string[] = command.split(' ')
        let ask = currentCommandArray[currentCommandArray.length - 1]
        let currentWorkingDirectory: Directory = workingDirectoryProps.workingDirectory[workingDirectoryProps.workingDirectory.length - 1]
        let similar: string|null = null
        for (let option of currentWorkingDirectory.children){
            if (option.name.startsWith(ask)) {
                if (!similar) {
                    similar = option.name
                }
                else {
                    similar = null
                    break
                }
            }
        }
        if (similar) {
            currentCommandArray[currentCommandArray.length - 1] = similar
            setCommand(currentCommandArray.join(' '))
        }
    }

    const handleHistoryCall = (key: any) => {
        let history: string[] = historyProps.history
        let newHistoryIndex: number = historyIndex
        if (key.key == "ArrowUp") {
            newHistoryIndex = historyIndex < history.length ? historyIndex + 1 : 0
        } else if (key.key == "ArrowDown") {
            newHistoryIndex = historyIndex > 0 ? historyIndex - 1 : 0
        }
        setHistoryIndex(newHistoryIndex)
        setCommand(newHistoryIndex != 0 ? history[history.length - newHistoryIndex] : "")
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
                        console.log(key.key)
                        if (key.key == "Enter") {
                            handleSubmit(key)
                        } else if (key.key == "Tab") {
                            key.preventDefault()
                            handleAutoComplete()
                        }
                        else if (key.key == "ArrowUp" || key.key == "ArrowDown") {
                            key.preventDefault()
                            handleHistoryCall(key)
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