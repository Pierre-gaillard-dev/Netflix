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

export type Serie_type = {
	id: number
	name: string
	image: string
	description: string
	releaseDate: Date
	createdAt?: Date
	updatedAt?: Date
	seasons?: SeasonList_type
}

export type SerieList_type = Series_type[]

export type Season_type = {
	id: number
	name: string
	image: string
	seasonNumber: number
	description: string
	releaseDate: Date
	serie_id: number
	createdAt?: Date
	updatedAt?: Date
	episodes?: EpisodeList_type
}

export type SeasonList_type = Season_type[]

export type Episode_type = {
	id: number
	name: string
	image: string
	duration: number
	episodeNumber: number
	description: string
	releaseDate: Date
	season_id: number
	createdAt?: Date
	updatedAt?: Date
}

export type EpisodeList_type = Episode_type[]

export type Genre_type = {
	id: number
	name: string
	image: string
	description: string
	contentType: "film" | "series" | "both"
	createdAt?: Date
	updatedAt?: Date
}

export type GenreList_type = Genre_type[]
