import express from "express";
import "reflect-metadata";
import { GetIocC, TYPES } from "./inversify.config";
import { graphqlClient as gqlClient } from "./middlewares";
import { Cfg } from "./models/cfg";
import { getContinents } from "./routes";
import { GraphqlClient } from "./types/graphqlClient";

// A function will be exported, and it will associate all the abstractions with implementations.

(async () => {
    const iocC = GetIocC()
    const cfg = iocC.get<Cfg>(TYPES.Cfg)
    console.log(cfg)
    runServer(
        iocC.get<GraphqlClient>(TYPES.GraphqlClient)
    )
})()

export function runServer(
    graphqlClient: GraphqlClient
) {
    const router = express.Router({ caseSensitive: true, strict: true })
    router.use('/continents', gqlClient(graphqlClient))
    router.get('/continents', getContinents)
    const app = express()
    app.use('/api', router)
}