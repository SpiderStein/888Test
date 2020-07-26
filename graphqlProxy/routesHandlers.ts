import { Request, Response } from "express";
import { GraphQLClient } from "graphql-request";

function getContinents(graphqlClient: GraphQLClient) {
    return async (_req: Request, res: Response) => {
        const q = `{
                continents{
                  code
                  name
                }
            }
        `
        try {
            const data = await graphqlClient.request(q)
            res.json(data.continents)
        } catch (error) {
            console.error(error)
        }
    }
}

export {
    getContinents
};
