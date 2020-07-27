require('source-map-support').install();
import express from "express";
import fetch from "node-fetch";
import "reflect-metadata";
import { CacheDAL } from "./cacheDAL";
import { GraphqlServiceClient } from "./graphqlServiceClient";
import { getIocC, TYPES } from "./inversify.config";
import { Cfg } from "./models/cfg";
import { getContinents, getCountriesByContinentCode } from "./routesHandlers";

(async () => {
    (<any>globalThis).fetch = fetch
    const iocC = getIocC()
    runServer(
        iocC.get<GraphqlServiceClient>(TYPES.GraphqlServiceClient),
        iocC.get<Cfg>(TYPES.Cfg),
        iocC.get<CacheDAL>(TYPES.CacheDAL)
    )
})()

export function runServer(
    graphqlServiceClient: GraphqlServiceClient,
    cfg: Cfg,
    cacheDAL: CacheDAL
) {
    const router = express.Router({ caseSensitive: true, strict: true })
    router.get('/continents', getContinents(graphqlServiceClient, cacheDAL))
    router.get('/continents/:continentCode', getCountriesByContinentCode(graphqlServiceClient, cacheDAL))
    const app = express()
    app.use('/api', router)
    app.listen(cfg.port, () => console.log(`listening to port ${cfg.port}`))
}