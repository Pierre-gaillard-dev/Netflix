// React
import { useState } from "react"
//components
import { ArrowDown } from "./Icons"
// CSS
import "./css/SelectMenu.css"

const SelectMenu: React.FC<{
	title: string
	options: { id: number; name: string; [key: string]: any }[]
	value: { id: number; name: string; [key: string]: any } | null
	setValue: React.Dispatch<
		React.SetStateAction<{
			id: number
			name: string
			[key: string]: any
		} | null>
	>
	gridColumns?: number
}> = ({ title, options, value, setValue, gridColumns }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div
			className={"selectMenu" + (isOpen ? " open" : "")}
			onClick={() => setIsOpen(!isOpen)}
		>
			<h3>
				{value ? value.name : title}{" "}
				<span>
					<ArrowDown />
				</span>
			</h3>
			<div>
				<div
					className="selectBox"
					style={{
						gridTemplateColumns: `repeat(${
							gridColumns ? gridColumns : 1
						}, 1fr)`,
					}}
				>
					{options.map((option) => (
						<div
							key={option.id}
							className={
								value === option ? "option selected" : "option"
							}
							onClick={
								option === value
									? () => setValue(null)
									: () => setValue(option)
							}
						>
							{option.name}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default SelectMenu
