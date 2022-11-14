
import { useLeanspaceAPI } from "@leanspace/js-client/dist/react";
import { useQuery } from "react-query";

export const useWidgets = (...params) => {
    const { widgets } = useLeanspaceAPI();
    return useQuery(['widgets', { ...params }], () => widgets.get("?tags=satellite%3AD5&page=0&size=100"), {
        keepPreviousData: true,
    });
}
