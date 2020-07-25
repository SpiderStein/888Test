import { Container } from "inversify";
import { Cfg } from "./models/cfg";

function GetIocC(): Container {
    const iocC = new Container({ defaultScope: "Singleton" })
    iocC.bind<Cfg>(TYPES.Cfg).toConstantValue(getCfg())
    return iocC
}

const TYPES = {
    Cfg: Symbol.for('Cfg')
}

function getCfg(): Cfg {
    const cfgPath = <string>process.env.CfgPath
    return require(cfgPath)
}

export {
    TYPES,
    GetIocC
};
