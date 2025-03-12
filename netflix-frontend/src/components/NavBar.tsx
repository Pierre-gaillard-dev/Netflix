import React from "react"
import { useDevice } from "../context/deviceContext"
import Header from "./Header"
import MobileNav from "./MobileNav"

const navBar: React.FC = () => {
	const device = useDevice()
	if (device.isMobile) {
		return <MobileNav />
	}
	return <Header />
}

export default navBar
