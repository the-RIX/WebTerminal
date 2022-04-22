import React, {FC, useState} from "react"
import styles from "../../styles/Terminal.module.css"

type ComponentProps = {
    workingDirectoryStr: string
    func: Function
}

const Input: FC<ComponentProps> = (props: ComponentProps) => {
    const [command, setCommand]: [string, Function] = useState("")

    const handleSubmit = (event: any) => {
        event.preventDefault()
        props.func(command)
        setCommand("")
    }

    return (
        <div className={styles.input}>
            <form onSubmit={handleSubmit}>
                {props.workingDirectoryStr + ">"} <input className={styles.input_field} type="text" value={command} onChange={event => setCommand(event.target.value)}/>
            </form>
        </div>
    )
}

export default Input