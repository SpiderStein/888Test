import { Request, Response } from "express";
import { GraphqlServiceClient } from "./graphqlServiceClient";

// In a production code, I'll add a behavior that relates to the headers and status codes that should be in the responses to the clients.

function apiContinents(graphqlServiceClient: GraphqlServiceClient) {
    return async (_req: Request, res: Response) => {

        try {
            const continents = await graphqlServiceClient.getContinents()
            res.json(continents)
        } catch (err) {
            console.error(err)
        }
    }
}

export {
    apiContinents
};
