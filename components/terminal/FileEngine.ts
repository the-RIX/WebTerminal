class File {
    name: string
    constructor(name: string) {
        this.name = name
    }
}

class Directory extends File {
    children: File[]
    constructor(name: string, children: File[]) {
        super(name)
        this.children = children
    }
}

class Project extends File {
    description: string
    constructor(name: string, description: string) {
        super(name)
        this.description = description
    }
}

class FileEngine {
    cat(workingDirectory: Directory[], target: string) {
        const currentDirectory: Directory = workingDirectory[workingDirectory.length - 1]
        for (const file of currentDirectory.children) {
            if (file.name == target) {
                if (file instanceof Directory) {
                    throw "\'" + target + "\' is a Directory and can't be read"
                }
                if (file instanceof Project) {
                    let project: Project = file as Project
                    return target + ": " + project.description
                }
            }
        }
        return "\'" + target + "\' not found"
    }

    cd(workingDirectory: Directory[], target: string) {
        //TODO: longer paths: "a/b"
        let result: Directory[] = [...workingDirectory]
        console.log("also here: " + result)
        if (target == ".") {
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


const testProjectOne = new Project("p1", "this is test project no. 1")
const testProjectTwo = new Project("p2", "this is test project no. 2")
const testDirectoryDeep = new Directory("d1", [testProjectOne, testProjectTwo])
const testDirectoryRoot = new Directory("root", [testDirectoryDeep, testProjectOne])
const testRoot = testDirectoryRoot


export default FileEngine.prototype
export {File, Directory}
export {testRoot as test}