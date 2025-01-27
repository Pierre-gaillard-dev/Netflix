export type Film_type = {
	id: number
	name: string
	image: string
	duration: number
	description: string
	releaseDate: Date
	updatedAt?: Date
	createdAt?: Date
}

export type FilmList_type = Film_type[]
