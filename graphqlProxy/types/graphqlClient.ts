import { Variables } from "graphql-request/dist/src/types";

export type GraphqlClient = (url: string, query: string, variables?: Variables) => Promise<object>