import { useNodes, useLuluby, useGetGorundStation, useCreateCommandMutation } from '../hooks/nodes';

export function fetchData() {
    return fetch('https://mfrg6mwe4zd3pjcginp45iqs6m.appsync-api.eu-central-1.amazonaws.com/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': 'da2-ckfnur3aknb4zhrpkesejjmq24'
        },
        body: JSON.stringify({
            'query': 'query MyQuery {\n  searchRequests(sort: {direction: desc, field: createdAt},filter: {assignedToTeam: {eq: "TheHitchikers"}, status: {eq: "STANDBY"}}, limit: 20) {\n    items {\n      assignedToTeam\n      createdBy\n      id\n      name\n      priority\n      status\n      type\n    }\n  }\n}\n',
            'variables': null,
            'operationName': 'MyQuery'
        })
    })
        .then(response => { return response.json() })
        .catch(err => {
            return err;
        });

};

//basic structuring.
export function handleData(requestsData, satelitesData, groundStations) {
    console.log("req:", requestsData);
    console.log("sat:", satelitesData);
    console.log("grand:", groundStations);


};
