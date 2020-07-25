import { NextFunction, Request, Response } from "express";
import { GraphqlClient } from "./types/graphqlClient";


function graphqlClient(gqlClient: GraphqlClient) {
    return (req: Request, res: Response, next: NextFunction) => {
        (<any>req).ext.graphqlClient = gqlClient;
        next()
    }
}

export = {
    graphqlClient
}