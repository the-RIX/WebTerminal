import React from "react"

type ContentProps = {
    content: string[]
    setContent: Function
}

//TODO: typing
const ContentContext = React.createContext({})

export default ContentContext;
