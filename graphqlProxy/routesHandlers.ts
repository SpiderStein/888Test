import { Request, Response } from "express";
import { CacheDAL } from "./cacheDAL";
import { GraphqlServiceClient } from "./graphqlServiceClient";
import { Continent } from "./models/continent";
import { Country } from "./models/country";

// In a production code, I'll add a behavior that relates to the headers and status codes that should be in the responses to the clients.

function getContinents(graphqlServiceClient: GraphqlServiceClient, cacheDAL: CacheDAL) {
    return async (_req: Request, res: Response) => {
        try {
            let continents = await cacheDAL.getContinents()
            if (continents !== null) {
                res.json(continents)
                return
            }
            continents = await graphqlServiceClient.getContinents()
            setImmediate(async () => {
                try {
                    await cacheDAL.setContinents(continents as Continent[])
                } catch (err) {
                    console.error(err)
                }
            })
            res.json(continents)
        } catch (err) {
            console.error(err)
            res.json(888)
        }
    }
}

function getCountriesByContinentCode(graphqlServiceClient: GraphqlServiceClient, cacheDAL: CacheDAL) {
    return async (req: Request, res: Response) => {
        try {
            const continentCode = req.params['continentCode']
            let countries = await cacheDAL.getCountriesByContinentCode(continentCode)
            if (countries !== null) {
                res.json(countries)
                return
            }
            countries = await graphqlServiceClient.getCountries(continentCode)
            setImmediate(async () => {
                try {
                    await cacheDAL.setCountriesOfContinentCode(continentCode, countries as Country[])
                } catch (err) {
                    console.error(err)
                }
            })
            res.json(countries)
        } catch (err) {
            console.error(err)
            res.json(888)
        }
    }
}

export {
    getContinents,
    getCountriesByContinentCode
};
