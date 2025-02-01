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

export type Genre_type = {
	id: number
	name: string
	image: string
	description: string
	createdAt?: Date
	updatedAt?: Date
}

export type GenreList_type = Genre_type[]
