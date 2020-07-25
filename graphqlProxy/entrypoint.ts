import "reflect-metadata";
import { GetIocC, TYPES } from "./inversify.config";
import { Cfg } from "./models/cfg";

// A function will be exported, and it will associate all the abstractions with implementations.

(async () => {
    const iocC = GetIocC()
    const cfg = iocC.get<Cfg>(TYPES.Cfg)
    console.log(cfg)
    runServer()
})()

export function runServer() {

}