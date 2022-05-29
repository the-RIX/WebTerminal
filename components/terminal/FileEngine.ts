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

class TextFile extends File {
    // Example text File which isn't a directory
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
                if (file instanceof TextFile) {
                    let txt: TextFile = file as TextFile
                    return target + ": " + txt.description
                }
            }
        }
        return "\'" + target + "\' not found"
    }

    cd(workingDirectory: Directory[], target: string) {
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
                result += file.name + " __ \n"
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


const testProjectOne = new TextFile("p1", "this is test project no. 1")
const testProjectTwo = new TextFile("p2", "this is test project no. 2")

const testProjectThree = new TextFile("p3","Dummy Project File #3")
const testDirectoryDeeper = new Directory("d2", [testProjectThree])

const testDirectoryDeep = new Directory("d1", [testDirectoryDeeper,testProjectOne, testProjectTwo])
const testDirectoryRoot = new Directory("", [testDirectoryDeep, testProjectOne])
const testRoot = testDirectoryRoot


export default FileEngine.prototype
export {File, Directory}
export {testRoot as test}