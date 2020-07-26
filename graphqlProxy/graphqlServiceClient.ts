// CERTAIN graphql service client = has its unique API.

import { GraphQLClient } from "graphql-request";
import { injectable } from "inversify";
import { Continent } from "./models/continent";

@injectable()
export class GraphqlServiceClient {
    constructor(
        public graphQLClient: GraphQLClient
    ) { }

    public async getContinents(): Promise<Continent[]> {
        const q = `query {
                continents{
                    code
                    name
                }
            }`

        const data = await this.graphQLClient.request(q)
        return data.continents
    }
}