import { useLeanspaceAPI } from '@leanspace/js-client/dist/react';
import { useQuery, useMutation } from "react-query";


// This hook is powered by useQuery
// useQuery is a great alternative for managing state
// here we are making a simple call for all the nodes in the library



export const useNodes = (...params) => {
    const { nodes } = useLeanspaceAPI();
    return useQuery(['nodes', { ...params }], () => nodes.getAll(...params), {
        keepPreviousData: true,
    });
}
export const useLuluby = (...params) => {
    const { properties } = useLeanspaceAPI();
    // return useQuery(['properties', { ...params }], () => properties.getAll(...params), {
    return useQuery(['properties', { ...params }], () => properties.get("?query=TLE&page=0&size=100"), {
        keepPreviousData: true,
    });
}

export const useGetGorundStation = (...params) => {
    const { nodes } = useLeanspaceAPI();
    return useQuery(['GROUND_STATION', { ...params }], () => nodes.get("?kinds=GROUND_STATION&page=0&size=30"), {
        keepPreviousData: true,
    });
}

export const useCreateCommandMutation = () => {
    const { commands } = useLeanspaceAPI();
    return useMutation(commands.create.bind(commands));
};