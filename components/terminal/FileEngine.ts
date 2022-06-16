class File {
    // Class of File type.
    name: string
    constructor(name: string) {
        this.name = name
    }
}

class Directory extends File {
    // Directories are also of type File. 
    // Holds list of all children directories and other files
    children: File[]  // list of pointers to children
    constructor(name: string, children: File[]) {
        super(name)
        this.children = children
    }
}

class ProjectFile extends File {
    // Example text File which isn't a directory
    description: string
    links: string[]
    persons: PersonFile[]
    constructor(name: string, description: string, links: string[], persons: PersonFile[]) {
        super(name)
        this.description = description
        this.links = links
        this.persons = persons
    }
}

class PersonFile extends File {
    description: string
    constructor(name: string, description: string) {
        super(name)
        this.description = description
    }
}


class FileEngine {
    cat(workingDirectory: Directory[], target: string) {
        const currentDirectory: Directory = workingDirectory[workingDirectory.length - 1]
        if (target == undefined){
            throw "USAGE: cat [filename]"
        }
        for (const file of currentDirectory.children) {
            if (file.name == target) {
                if (file instanceof Directory) {
                    throw "\'" + target + "\' is a Directory and can't be read"
                }
                if (file instanceof ProjectFile || file instanceof PersonFile) {
                    return file.name + ": " + file.description
                }
            }
        }
        return "\'" + target + "\' not found"
    }

    cd(workingDirectory: Directory[], target: string) {
        console.log("in cd:" + target)
        //TODO: longer paths: "a/b" and "cd /"
        let result: Directory[] = [...workingDirectory]
        console.log("also here: " + result)
        if (target == "." ) { //|| target == workingDirectory
            return result
        }
        if (target == "..") {
            if (workingDirectory.length > 1) {
                result = result.slice(0, workingDirectory.length - 1)
            }
            return result
        }
        let currentDirectory: Directory = workingDirectory[0]
        for (const file of currentDirectory.children) {
            if (file.name == target) {
                if (file instanceof Directory) {
                    result.push(file)
                    return result
                } else {
                    throw "\'" + target + "\' is not a Directory"
                }
            }
        }
        throw "can\'t find: \'" + target + "\'"
    }

    ls(workingDirectory: Directory[]) {
        let result: string = ""
        let directory: Directory = workingDirectory[workingDirectory.length - 1] as Directory
        let children: File[] = directory.children
        children.forEach(
            (file: File) => {
                result += file.name + "\n"
            }
        )
        return result
    }

    pwd(workingDirectory: Directory[]) {
        let result: string = ""
        console.log(workingDirectory)
        workingDirectory.forEach(
            (file: Directory) => {
                result += file.name + "/"
            }
        )
        return result
    }
}

const msa: PersonFile = new PersonFile("MSA", "confused computer science student")
const rx: PersonFile = new PersonFile("RX", "i am confusion")

const rsHangManLinks: string[] = ["https://github.com/0MSA0/RSHangMan"]
const rsHangManFile: ProjectFile = new ProjectFile("RS_HangMan", "discord Hangman Bot (offline)", rsHangManLinks, [msa, rx])

const projectDirectory: Directory = new Directory("projects", [rsHangManFile])
const personDirectory: Directory = new Directory("persons", [msa, rx])

const rootDirectory: Directory = new Directory("root", [projectDirectory, personDirectory])


export default FileEngine.prototype
export {File, Directory}
export {rootDirectory as test}