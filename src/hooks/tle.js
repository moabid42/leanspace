
import { useLeanspaceAPI } from "@leanspace/js-client/dist/react";
import { useQuery } from "react-query";

export const useTLE = (...params) => {
    const { properties } = useLeanspaceAPI();
    return useQuery(['properties', { ...params }], () => properties.get("?query=TLE&page=0&size=100"), {
        keepPreviousData: true,
    });
}
