import React, {useState} from "react"
import type { NextPage } from 'next'
import History from "../components/terminal/History"
import Input from "../components/terminal/Input"
import CommandHandler from "../components/terminal/CommandHandler"

const Terminal: NextPage = () => {
    const [history, setHistory]: [string[], Function] = useState(["hello", "world"])

    //TODO: this should probably be done with useEffect and command state
    const handleCommand: Function = (command: string) => {
        const commandArray: string[]= command.split(" ")
        let result: string
        switch (commandArray[0]) {
            case "":
                result = ""
                break;
            case "clear":
                setHistory([])
                return
            case "help":
                result = CommandHandler.handleHelp(commandArray.slice(1))
                break;
            default:
                result = "unknown command: \'" + command + "\', use help for help"
        }


        const newHistory: string[] = [...history]
        newHistory.push(result)
        setHistory(newHistory)
    }

    return (
        <div>
            <History history={history}/>
            <Input func={handleCommand}/>
        </div>
    )
}

export default Terminal
