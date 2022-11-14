import { useLeanspaceAPI } from '@leanspace/js-client/dist/react';
import { useQuery } from "react-query";


// This hook is powered by useQuery
// useQuery is a great alternative for managing state
// here we are making a simple call for all the nodes in the library

export const useMetrics = (...params) => {
    // useLeanspaceAPI is another hook from the JS libary
    // if you ever need to check which variable name to use, such as 'nodes'
    // check the docs - specifically the API references within the JS client docs

    // also note the use of nodes.getAll instead of nodes.get
    // nodes.get is more for finding one item, for example a satellite with certain parameters
    const { metrics }  = useLeanspaceAPI();
    return useQuery(['metrics', { ...params }], () => metrics.getAll(...params), {
        keepPreviousData: true,
    });
}