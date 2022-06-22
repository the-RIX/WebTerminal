import FileEngine, {Directory} from "./FileEngine";

type ContentProps = {
    content: string[]
    setContent: Function
}

type WorkingDirectoryProps = {
    workingDirectory: Directory[]
    setWorkingDirectory: Function
}


class CommandHandler {
    handleCommand(command: string, contentProps: ContentProps, workingDirectoryProps: WorkingDirectoryProps){
        const content: string[] = contentProps.content
        const setContent: Function = contentProps.setContent
        const workingDirectory: Directory[] = workingDirectoryProps.workingDirectory
        // TODO: cut of leading spaces
        const commandArray: string[]= command.split(" ")
        let newContent = [...content]
        newContent.push(FileEngine.pwd(workingDirectoryProps.workingDirectory) + "> " + command)
        setContent(newContent)

        switch (commandArray[0]) {
            case "":
                return
            case "cat":
                this.handleCat(commandArray.slice(1), contentProps, workingDirectoryProps)
                return
            case "clear":
                setContent([])
                return
            case "help":
                this.handleHelp(commandArray.slice(1), contentProps)
                return
            case "cd":
                this.handleCd(commandArray.slice(1), contentProps, workingDirectoryProps)
                return
            case "ls":
                newContent.push(FileEngine.ls(workingDirectory))
                setContent(newContent)
                return
            case "pwd":
                newContent.push(FileEngine.pwd(workingDirectory))
                setContent(newContent)
                return
            default:
                newContent.push("unknown command: \'" + command + "\', use help for help")
                setContent(newContent)
        }
    }

    handleCat(args: string[], contentProps: ContentProps, workingDirectoryProps: WorkingDirectoryProps) {
        const content: string[] = contentProps.content
        const setContent: Function = contentProps.setContent
        const workingDirectory: Directory[] = workingDirectoryProps.workingDirectory

        let newContent = [...content]

        try {
            newContent.push(FileEngine.cat(workingDirectory, args[0]))
            setContent(newContent)
        }
        catch (e: any) {
            newContent.push(e as string)
            setContent(newContent)
        }
    }

    handleCd(args: string[], contentProps: ContentProps, workingDirectoryProps: WorkingDirectoryProps) {
        const content: string[] = contentProps.content
        const setContent: Function = contentProps.setContent
        const workingDirectory: Directory[] = workingDirectoryProps.workingDirectory
        const setWorkingDirectory: Function = workingDirectoryProps.setWorkingDirectory
        try {
            const newWorkingDirectory = FileEngine.cd(workingDirectory, args[0])
            setWorkingDirectory(newWorkingDirectory)
        }
        catch (e: any) {
            let newContent = [...content]
            newContent.push(e as string)
            setContent(newContent)
        }
    }

    handleHelp(args: string[], contentProps: ContentProps) {
        const content: string[] = contentProps.content
        const setContent: Function = contentProps.setContent

        let newContent = [...content]

        if (args.length == 0) {
            newContent.push("help [command]: presents you with some help [about the given command]")
            setContent(newContent)
            return
        }
        else if (args.length > 1) {
            newContent.push("not valid: help uses the following syntax: help [command]")
            setContent(newContent)
            return
        }

        switch (args[0]) {
            case "cd":
                newContent.push("cd: will be implemented in the future")
                setContent(newContent)
                return
            case "help":
                newContent.push("help [command]: presents you with some help [about the given command]")
                setContent(newContent)
                return
            case "ls":
                newContent.push("ls: will be implemented in the future")
                setContent(newContent)
                return
            case "cat":
                newContent.push("cat can read shit")
                setContent(newContent)
                return
            default:
                newContent.push("unknown command: \'" + args[0] + "\' use help for help")
                setContent(newContent)
                return
        }
    }
}

//TODO: probably not the right way to prototype here
export default CommandHandler.prototype