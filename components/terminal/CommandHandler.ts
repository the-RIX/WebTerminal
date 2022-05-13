class CommandHandler {
    handleHelp(args: string[]) {
        if (args.length == 0) {
            return "help [command]: presents you with some help [about the given command]"
        }
        else if (args.length > 1) {
            return "not valid: help uses the following syntax: help [command]"
        }

        switch (args[0]) {
            case "cd":
                return "cd: will be implemented in the future"
            case "help":
                return "help [command]: presents you with some help [about the given command]"
            case "ls":
                return "ls: will be implemented in the future"
            case "cat":
                return "cat can read shit"
            default:
                return "unknown command: \'" + args[0] + "\' use help for help"
        }
    }
}

//TODO: probably not the right way to prototype here
export default CommandHandler.prototype