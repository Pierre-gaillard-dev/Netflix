import dotenv from "dotenv"
import scrapGenres from "./scrapping/genres.scrap"
import scrapFilms from "./scrapping/films.scrap"
import scrapSeries from "./scrapping/series.scrap"

dotenv.config()

scrapGenres()
scrapFilms(1, 2)
scrapSeries(1, 2)
