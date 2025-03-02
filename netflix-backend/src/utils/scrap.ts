import dotenv from "dotenv"
import scrapGenres from "./scrapping/genres.scrap"
import scrapFilms from "./scrapping/films.scrap"

dotenv.config()

scrapGenres()
scrapFilms(1, 2)
