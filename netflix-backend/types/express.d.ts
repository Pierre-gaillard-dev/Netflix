import * as express from "express"

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: number
				username: string
			}
		}
	}
}

export interface UserAttributes {
	id: number
	name: string
	email: string
	password: string
	birthDate: Date
	role_id: number
	createdAt?: Date
	updatedAt?: Date
}

export interface EpisodeAttributes {
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

export interface ActorAttributes {
	id: number
	name: string
	image: string
	description: string
	createdAt?: Date
	updatedAt?: Date
}

export interface FilmAttributes {
	id: number
	name: string
	image: string
	duration: number
	description: string
	releaseDate: Date
	createdAt?: Date
	updatedAt?: Date
}

export interface GenreAttributes {
	id: number
	name: string
	image: string
	description: string
	createdAt?: Date
	updatedAt?: Date
}

export interface Rating_EpisodesAttributes {
	id: number
	user_id: number
	episode_id: number
	rating: number
	createdAt?: Date
	updatedAt?: Date
}

export interface Rating_FilmsAttributes {
	id: number
	user_id: number
	film_id: number
	rating: number
	createdAt?: Date
	updatedAt?: Date
}

export interface Rel_ActorFilmAttributes {
	id: number
	actor_id: number
	film_id: number
	createdAt?: Date
	updatedAt?: Date
}

export interface Rel_ActorSeriesAttributes {
	id: number
	actor_id: number
	serie_id: number
	createdAt?: Date
	updatedAt?: Date
}

export interface Rel_FilmGenreAttributes {
	id: number
	genre_id: number
	film_id: number
	createdAt?: Date
	updatedAt?: Date
}

export interface Rel_SerieGenreAttributes {
	id: number
	genre_id: number
	serie_id: number
	createdAt?: Date
	updatedAt?: Date
}

export interface RoleAttributes {
	id: number
	name: string
	createdAt?: Date
	updatedAt?: Date
}

export interface SeasonAttributes {
	id: number
	name: string
	image: string
	seasonNumber: number
	description: string
	releaseDate: Date
	serie_id: number
	createdAt?: Date
	updatedAt?: Date
}

export interface SeriesAttributes {
	id: number
	name: string
	image: string
	description: string
	releaseDate: Date
	createdAt?: Date
	updatedAt?: Date
}
