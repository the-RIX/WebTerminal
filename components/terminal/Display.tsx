import React, {FC, useContext} from "react"
import styles from "../../styles/Terminal.module.css"
import ContentContext from "../../contexts/ContentContext";


type ContentProps = {
    content: string[]
    setContent: Function
}

const Display: FC = () => {
    // TODO: typing
    // @ts-ignore
    const contentProps: ContentProps = useContext(ContentContext)
    const content: string[] = contentProps.content

    return (
        <div className={styles.display}>
            {content.map(
                (line: string, index: number) => (
                    <p key={index} className={styles.display_line}>
                        {line}
                    </p>
                )
            )}
        </div>
    )
}

export default Display