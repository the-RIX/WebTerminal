import React, {useState} from "react"
import type { NextPage } from 'next'
import History from "../components/terminal/History"
import Input from "../components/terminal/Input"

const Terminal: NextPage = () => {
    const [history, setHistory]: [string[], Function] = useState(["hello", "world"])

    //TODO: this should probably be done with useEffect and command state
    const handleCommand: Function = (command: string) => {
        const newHistory: string[] = [...history]
        let result: string
        switch (command) {
            case "":
                result = ""
                break;
            case "help":
                result = "help gives you help, nothing else works yet"
                break;
            default:
                result = "unknown command: " + command + ", use help for help"
        }

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
