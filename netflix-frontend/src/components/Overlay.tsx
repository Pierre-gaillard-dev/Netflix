import React from "react"
// Css
import "./css/Overlay.css"

const Overlay: React.FC<{ children: React.ReactNode; close: () => any }> = ({
	children,
	close,
}) => {
	return (
		<div className="overlay-background" onClick={close}>
			<div
				className="overlay-content"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}

export default Overlay
