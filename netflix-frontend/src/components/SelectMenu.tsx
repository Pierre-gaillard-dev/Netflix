// React
import { useState } from "react"
//components
import { ArrowDown } from "./Icons"
// CSS
import "./css/SelectMenu.css"
import { useDevice } from "../context/deviceContext"

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
	const device = useDevice()
	return (
		<div
			className={
				"selectMenu" +
				(isOpen ? " open" : "") +
				(device.isMobile ? " mobile" : "")
			}
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
							gridColumns
								? Math.min(
										gridColumns,
										Math.floor(device.window.width / 120)
								  )
								: 1
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
