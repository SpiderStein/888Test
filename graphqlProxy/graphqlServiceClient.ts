// CERTAIN graphql service client = has its unique API.

import { GraphQLClient } from "graphql-request";
import { injectable } from "inversify";
import { Continent } from "./models/continent";
import { Country } from "./models/country";

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

  public async getCountries(continentCode: string): Promise<Country[]> {
    const q = `query {
            continent(code: "${continentCode}"){
              countries{
                code
                name
                phone
                capital
                currency
                languages{
                  name
                }
              }
            }
        }
          `

    const data = await this.graphQLClient.request(q)
    return data.continent
  }
}