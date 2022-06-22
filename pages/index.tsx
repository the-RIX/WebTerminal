import React, {useState} from "react"
import type { NextPage } from "next"
import Display from "../components/terminal/Display"
import Input from "../components/terminal/Input"
import {test, Directory} from "../components/terminal/FileEngine";
import ContentContext from "../contexts/ContentContext";
import WorkingDirectoryContext from "../contexts/WorkingDirectoryContext";

const Terminal: NextPage = () => {

    const [content, setContent]: [string[], Function] = useState(["Hello \n world. :)"])
    const [workingDirectory, setWorkingDirectory]: [Directory[], Function] = useState([test])

    return (
        <div>
            <WorkingDirectoryContext.Provider value={{workingDirectory, setWorkingDirectory}}>
                <ContentContext.Provider value={{content, setContent}}>
                    <Display/>
                    <Input/>
                </ContentContext.Provider>
            </WorkingDirectoryContext.Provider>
        </div>
    )
}

export default Terminal
