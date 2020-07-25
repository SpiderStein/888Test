import "reflect-metadata"; // Must be the first import.
import { Cfg } from "./models/cfg";

function getCfg(): Cfg {
    const cfgPath = <string>process.env.CfgPath
    return require(cfgPath)
}

(async () => {
    // Here I should get the ioc container, instantiate expressjs, register middlewares and routes and run it on the chosen port.
})()