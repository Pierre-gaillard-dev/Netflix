// react
import React, { useState } from "react"
// css
import "./css/BetterInput.css"

const BetterInput: React.FC<{
	type: string
	height: number
	inputId: string
	value: string
	onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
	label: string
	labelSize: number
}> = (props) => {
	const [selected, setSelected] = useState<boolean>(false)
	return (
		<div className="BetterInput">
			<style>
				{`
                    .inputContainer {
                        height: ${props.height}px;
                    }

                    input {
                        padding-top: ${props.labelSize}px;
                    }

                    .label {
                        font-size: ${props.labelSize * 1.5}px;
                    }

                    .label.selected {
                        font-size: ${props.labelSize}px;
                    }
                `}
			</style>
			<label
				htmlFor={props.inputId}
				className={
					"label" + (selected || props.value ? " selected" : "")
				}
			>
				{props.label}
			</label>
			<div className="inputContainer">
				<input
					id={props.inputId}
					type={props.type}
					value={props.value}
					onChange={props.onchange}
					onFocus={() => setSelected(true)}
					onBlur={() => setSelected(false)}
				/>
			</div>
		</div>
	)
}

export default BetterInput
