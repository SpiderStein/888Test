import { RedisClient } from "redis";
import { CacheDAL } from "./cacheDAL";
import { Continent } from "./models/continent";
import { Country } from "./models/country";

export class RedisDAL implements CacheDAL {
    constructor(
        public client: RedisClient
    ) {
        client.on('error', err => {
            console.error(err)
        })
    }
    setContinents(continents: Continent[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.select(0)
            this.client.setex('continents', 10, JSON.stringify(continents), (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve()
                }
            })
        })
    }
    setCountriesOfContinentCode(continentCode: string, countries: Country[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.select(1)
            this.client.setex(continentCode, 10, JSON.stringify(countries), (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve()
                }
            })
        })
    }

    getContinents(): Promise<Continent[] | null> {
        return new Promise((resolve, reject) => {
            this.client.select(0)
            this.client.get('continents', (err, continents) => {
                if (err) {
                    reject(err)
                }
                if (continents === null) {
                    resolve(continents)
                }
                else {
                    resolve(JSON.parse(continents))
                }
            })
        })
    }
    getCountriesByContinentCode(continentCode: string): Promise<Country[] | null> {
        return new Promise((resolve, reject) => {
            this.client.select(1)
            this.client.get(continentCode, (err, countries) => {
                if (err) {
                    reject(err)
                }
                if (countries === null) {
                    resolve(countries)
                }
                else {
                    resolve(JSON.parse(countries))
                }
            })
        })
    }
}