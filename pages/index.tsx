import React, {useState} from "react"
import type { NextPage } from 'next'
import History from "../components/terminal/History"
import Input from "../components/terminal/Input"
import CommandHandler from "../components/terminal/CommandHandler"
import FileEngine, {test, Directory} from "../components/terminal/FileEngine";

const Terminal: NextPage = () => {
    const [history, setHistory]: [string[], Function] = useState(["hello", "world"])
    const [workingDirectory, setWorkingDirectory]: [Directory[], Function] = useState([test])

    //TODO: this should probably be done with useEffect and a command state
    const handleCommand: Function = (command: string) => {
        const newHistory: string[] = [...history]
        newHistory.push(FileEngine.pwd(workingDirectory) + "> " + command)
        setHistory(newHistory)

        const commandArray: string[]= command.split(" ")
        let result: string
        switch (commandArray[0]) {
            case "":
                result = ""
                break
            case "clear":
                setHistory([])
                return
            case "help":
                result = CommandHandler.handleHelp(commandArray.slice(1))
                break
            //TODO: Directory names with spaces
            case "cat":
                try {
                    result = FileEngine.cat(workingDirectory, commandArray[1])
                }
                catch (e: any) {
                    result = e as string
                }
                break
            case "cd":
                try {
                    const newWorkingDirectory = FileEngine.cd(workingDirectory, commandArray[1])
                    setWorkingDirectory(newWorkingDirectory)
                }
                catch (e: any) {
                    newHistory.push(e as string)
                }
                return
            case "ls":
                result = FileEngine.ls(workingDirectory)
                break
            case "pwd":
                result = FileEngine.pwd(workingDirectory)
                break
            default:
                result = "unknown command: \'" + command + "\', use help for help"
        }


        newHistory.push(result)
        setHistory(newHistory)
    }

    return (
        <div>
            <History history={history}/>
            <Input workingDirectoryStr={FileEngine.pwd(workingDirectory)} func={handleCommand}/>
        </div>
    )
}

export default Terminal
