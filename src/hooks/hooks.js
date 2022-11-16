import { useLeanspaceAPI } from "@leanspace/js-client/dist/react";
import { useMutation, useQuery } from "react-query";

import { useEffect, useRef } from 'react';
//nodes
export const useNodes = (...params) => {
    const { nodes } = useLeanspaceAPI();
    return useQuery(["nodes", { ...params }], () => nodes.getAll(...params), {
        keepPreviousData: true,
    });
};
export const useNode = (...params) => {
    const { nodes } = useLeanspaceAPI();
    return useQuery(["nodes", { ...params }], () => nodes.get(...params), {
        keepPreviousData: true,
    });
};
//properties
export const useTLE = () => {
    const { properties } = useLeanspaceAPI();
    return useQuery("properties", () =>
        properties.get("?query=TLE&page=0&size=100")
    );
};
//command-queues
export const useCommandQueues = (...params) => {
    const { commandQueues } = useLeanspaceAPI();
    return useQuery("command-queues", () => commandQueues.getAll(...params));
};
//command-definitions
export const useCommandDefinitions = (...params) => {
    const { commandDefinitions } = useLeanspaceAPI();
    return useQuery(
        "command-definitions",
        () => commandDefinitions.getAll(...params),
        {
            keepPreviousData: true,
        }
    );
};
//commands
export const useCommands = () => {
    const { commands } = useLeanspaceAPI();
    return useQuery("commands", () => commands.getAll());
};
export const useCreateCommandMutation = () => {
    const { commands } = useLeanspaceAPI();
    return useMutation(commands.create.bind(commands));
};
//transmissions
export const useTransmitCommandMutation = () => {
    const { commandTransmissions } = useLeanspaceAPI();
    return useMutation(commandTransmissions.transmit.bind(commandTransmissions));
};

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
//export default useInterval;
