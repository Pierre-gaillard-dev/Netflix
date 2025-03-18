import React from "react"
// css
import "./css/BetterImg.css"

const BetterImg: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => {
	const [isLoaded, setIsLoaded] = React.useState(false)
	const [isValid, setIsValid] = React.useState(true)

	return (
		<div className="better-img">
			<img
				src={src}
				alt={alt}
				onLoad={() => setIsLoaded(true)}
				onError={() => setIsValid(false)}
				style={{ display: isLoaded && isValid ? "block" : "none" }}
			/>
			{!isLoaded && isValid && <p>Image is loading...</p>}
			{!isValid && <p>Image failed to load</p>}
		</div>
	)
}

export default BetterImg
