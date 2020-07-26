import express from "express";
import { GraphQLClient } from "graphql-request";
import fetch from "node-fetch";
import "reflect-metadata";
import { GetIocC, TYPES } from "./inversify.config";
import { Cfg } from "./models/cfg";
import { getContinents } from "./routesHandlers";

// A function will be exported, and it will associate all the abstractions with implementations.

(async () => {
    (<any>globalThis).fetch = fetch
    const iocC = GetIocC()
    runServer(
        iocC.get<GraphQLClient>(TYPES.GraphQLClient),
        iocC.get<Cfg>(TYPES.Cfg)
    )
})()

export function runServer(
    graphqlClient: GraphQLClient,
    cfg: Cfg
) {
    const router = express.Router({ caseSensitive: true, strict: true })
    router.get('/continents', getContinents(graphqlClient))
    const app = express()
    app.use('/api', router)
    app.listen(cfg.port, () => console.log(`listening to port ${cfg.port}`))
}