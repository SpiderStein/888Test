import { Request, Response } from "express";
import { GraphqlServiceClient } from "./graphqlServiceClient";

// In a production code, I'll add a behavior that relates to the headers and status codes that should be in the responses to the clients.

function getContinents(graphqlServiceClient: GraphqlServiceClient) {
    return async (_req: Request, res: Response) => {

        try {
            const continents = await graphqlServiceClient.getContinents()
            res.json(continents)
        } catch (err) {
            console.error(err)
            res.json(888)
        }
    }
}

function getCountriesByContinentCode(graphqlServiceClient: GraphqlServiceClient) {
    return async (req: Request, res: Response) => {

        try {
            const countries = await graphqlServiceClient.getCountries(req.params['continentCode'])
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
