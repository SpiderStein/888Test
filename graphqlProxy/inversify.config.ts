import { GraphQLClient } from "graphql-request";
import { Container } from "inversify";
import { Cfg } from "./models/cfg";

function GetIocC(): Container {
    const iocC = new Container({ defaultScope: "Singleton" })
    iocC.bind<Cfg>(TYPES.Cfg).toConstantValue(getCfg())
    iocC.bind<GraphQLClient>(TYPES.GraphQLClient).toConstantValue(new GraphQLClient(iocC.get<Cfg>(TYPES.Cfg).graphqlServiceUrl))
    return iocC
}

const TYPES = {
    Cfg: Symbol.for('Cfg'),
    GraphQLClient: Symbol.for('GraphQLClient')
}

function getCfg(): Cfg {
    const cfgPath = <string>process.env.CfgPath
    return require(cfgPath)
}

export {
    TYPES,
    GetIocC
};
