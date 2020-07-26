import { GraphQLClient } from "graphql-request";
import { Container } from "inversify";
import { GraphqlServiceClient } from "./graphqlServiceClient";
import { Cfg } from "./models/cfg";

function getIocC(): Container {
    const iocC = new Container({ defaultScope: "Singleton" })
    iocC.bind<Cfg>(TYPES.Cfg).toConstantValue(getCfg())
    iocC.bind<GraphQLClient>(TYPES.GraphQLClient).toConstantValue(new GraphQLClient(iocC.get<Cfg>(TYPES.Cfg).graphqlServiceUrl))
    iocC.bind<GraphqlServiceClient>(TYPES.GraphqlServiceClient).toConstantValue(new GraphqlServiceClient(iocC.get<GraphQLClient>(TYPES.GraphQLClient)))
    return iocC
}

const TYPES = {
    Cfg: Symbol.for('Cfg'),
    GraphQLClient: Symbol.for('GraphQLClient'),
    GraphqlServiceClient: Symbol.for('GraphqlServiceClient')
}

function getCfg(): Cfg {
    const cfgPath = <string>process.env.CfgPath
    return require(cfgPath)
}

export {
    TYPES,
    getIocC
};
