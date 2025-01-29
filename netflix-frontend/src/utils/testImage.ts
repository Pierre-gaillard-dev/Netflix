/**
 * Tests if an image exists
 */
const testImage = (image: string): Promise<boolean> => {
	return new Promise((resolve) => {
		const imageObject = new Image()
		imageObject.src = image

		imageObject.onload = () => resolve(true)
		imageObject.onerror = () => resolve(false)
	})
}

export default testImage
