import React, {FC} from "react"
import styles from "../../styles/Terminal.module.css"

type ComponentProps = {
    history: string[]
}

const History: FC<ComponentProps> = (props: ComponentProps) => {
    return (
        <div className={styles.history}>
            {props.history.map(
                (line: string, index: number) => (
                    <p key={index} className={styles.history_line}>
                        {line}
                    </p>
                )
            )}
        </div>
    )
}

export default History