import { Continent } from "./models/continent";
import { Country } from "./models/country";

export interface CacheDAL {
    getContinents(): Promise<Continent[] | null>
    setContinents(continents: Continent[]): Promise<void>
    getCountriesByContinentCode(continentCode: string): Promise<Country[] | null>
    setCountriesOfContinentCode(continentCode: string, countries: Country[]): Promise<void>
}