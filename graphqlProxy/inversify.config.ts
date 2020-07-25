import { request } from "graphql-request";
import { Container } from "inversify";
import { Cfg } from "./models/cfg";
import { GraphqlClient } from "./types/graphqlClient";

function GetIocC(): Container {
    const iocC = new Container({ defaultScope: "Singleton" })
    iocC.bind<Cfg>(TYPES.Cfg).toConstantValue(getCfg())
    iocC.bind<GraphqlClient>(TYPES.GraphqlClient).toConstantValue(request)
    return iocC
}

const TYPES = {
    Cfg: Symbol.for('Cfg'),
    GraphqlClient: Symbol.for('GraphqlClient')
}

function getCfg(): Cfg {
    const cfgPath = <string>process.env.CfgPath
    return require(cfgPath)
}

export {
    TYPES,
    GetIocC
};
