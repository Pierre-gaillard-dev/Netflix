import React, { ReactNode } from "react"

interface Device {
	window: {
		width: number
		height: number
	}
	isMobile?: boolean
}

const DeviceContext = React.createContext<Device>({
	window: {
		width: window.innerWidth,
		height: window.innerHeight,
	},
	isMobile: false,
})

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [windowSize, setWindowSize] = React.useState({
		width: window.innerWidth,
		height: window.innerHeight,
	})

	React.useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<DeviceContext.Provider
			value={{ window: windowSize, isMobile: windowSize.width < 700 }}
		>
			{children}
		</DeviceContext.Provider>
	)
}

export const useDevice = () => React.useContext(DeviceContext)
