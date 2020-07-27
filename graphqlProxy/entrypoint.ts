require('source-map-support').install();
import express from "express";
import fetch from "node-fetch";
import "reflect-metadata";
import { GraphqlServiceClient } from "./graphqlServiceClient";
import { getIocC, TYPES } from "./inversify.config";
import { Cfg } from "./models/cfg";
import { getContinents, getCountriesByContinentCode } from "./routesHandlers";

// A function will be exported, and it will associate all the abstractions with implementations.

(async () => {
    (<any>globalThis).fetch = fetch
    const iocC = getIocC()
    runServer(
        iocC.get<GraphqlServiceClient>(TYPES.GraphqlServiceClient),
        iocC.get<Cfg>(TYPES.Cfg)
    )
})()

export function runServer(
    graphqlServiceClient: GraphqlServiceClient,
    cfg: Cfg
) {
    const router = express.Router({ caseSensitive: true, strict: true })
    router.get('/continents', getContinents(graphqlServiceClient))
    router.get('/continents/:continentCode', getCountriesByContinentCode(graphqlServiceClient))
    const app = express()
    app.use('/api', router)
    app.listen(cfg.port, () => console.log(`listening to port ${cfg.port}`))
}