// This is the start of your own application!
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar.jsx";
import "./Main.scss";
// import PrintGroundstations from "./stationsTab";

import { fetchData, handleData } from './getRequest.js';
import { useLuluby, useGetGorundStation } from '../hooks/nodes';
import {
    useCommandQueues,
    useCommandDefinitions,
    useCreateCommandMutation,
    useTransmitCommandMutation,
} from "../hooks/hooks";

import * as React from 'react';
import image from './index.png';

const Groundstations = () => {
    const { data: properties } = useGetGorundStation();

    const grandStationManualBackupData = {
        0: {id: "37375d45-5d92-4c5f-9bbd-ee507b1765ca" ,lat: -46.52 ,lon: 168.38 } ,1: {id: "5b1c1cb5-65f6-4f80-93c6-cf2452d7acff" ,lat: 37.82 ,lon: 22.66 } ,2: {id: "b1790b35-d377-49a5-89b7-78bbb9edead5" ,lat: 1.35 ,lon: 103.82 } ,3: {id: "2321910e-f151-44fb-8a3d-f3d90683b0d5" ,lat: 64.8 ,lon: -147.7 } ,4: {id: "52fb9361-fb66-4c40-adde-f837f4466362" ,lat: -20.24 ,lon: 57.49 } ,5: {id: "122eaa40-260e-4dbd-bcd1-6c8957d06981" ,lat: -25.89 ,lon: 27.68 } ,6: {id: "6241628c-4d22-4bfe-ace1-61beb361e6f4" ,lat: 19.82 ,lon: -155.47 } ,7: {id: "2f2be33a-e695-418f-a596-2768732a8ade" ,lat: null ,lon: null } ,8: {id: "771f62dc-fadf-4769-a765-6796f60e54c9" ,lat: 36.97 ,lon: -25.1 } ,9: {id: "db46dc3a-8ac9-4ce6-a1b5-996fe26f3e0b" ,lat: 60 ,lon: 90 } ,10: {id: "0ee5995a-bdfc-4290-975f-9d3f475a00c2" ,lat: 35.69 ,lon: 139.69 } ,11: {id: "8856d4f4-6570-4ca1-8144-3f5bdbab2235" ,lat: -31.52 ,lon: -64.47 } ,12: {id: "92fae299-dceb-4aad-a79f-ab229cf73afa" ,lat: 34.05 ,lon: -118.24 } ,13: {id: "405aa541-7530-4b25-9cca-3aedd14ca74f" ,lat: 13.03 ,lon: 77.53 } ,14: {id: "c3e7e47f-24c8-4302-88c4-bf1d1f16838b" ,lat: 8.97 ,lon: -79.53 } ,15: {id: "6dd8c4c6-5658-46c4-9c64-63700b67ca6a" ,lat: 64.18 ,lon: -51.73 }
      };

    const { mutateAsync: createCommandMutation } = useCreateCommandMutation();
    const { mutateAsync: transmitCommandMutation, isLoading: isTransmitting } = useTransmitCommandMutation();

    const coordinates = '{"lat":-75.5267,"lon":-128.1957}';
    const mode = "1";
    const satelliteId = "ba7342e9-95c8-4873-b4e8-0fbe70c45a71";
    const groundStationId = "7df44a68-f0fd-4ddf-8e77-2dc5f14bbda6";
    const executionTime = "2022-11-13T19:13:20.231Z";

    const { data: commandQueue } = useCommandQueues({ assetIds: satelliteId });
    const commandQueueId = commandQueue?.content[0]?.id;
    const { data: commandDefinitions } = useCommandDefinitions({
        nodeIds: satelliteId,
        withArgumentsAndMetadata: "true",
    });

    const sendCommandAndTransmit = (c, m, sId, gId, eT) => {
        // Get the capture image command
        const filteredCommandDefinition = commandDefinitions?.content.find(
            (commandDef) => commandDef.name.includes("Capture")
        );
        // Capture the argument ids for coordinates and mode
        const coordinateId = filteredCommandDefinition?.arguments.find(
            (argument) => argument.name === "Coordinates"
        ).id;
        // Capture the argument ids for  mode
        const modeId = filteredCommandDefinition?.arguments.find(
            (argument) => argument.name === "Mode"
        ).id;
        // Capture the argument ids for  captureImage
        const nameId = filteredCommandDefinition?.arguments.find(
            (argument) => argument.name === "name"
        ).id;
        const commandPayload = {
            commandQueueId: commandQueueId,
            commandDefinitionId: filteredCommandDefinition?.id,
            executionTime: eT,
            commandArguments: [
                {
                    appliedArgumentId: coordinateId,
                    type: "TEXT",
                    value: c,
                },
                {
                    appliedArgumentId: modeId,
                    type: "TEXT",
                    value: m,
                },
                {
                    appliedArgumentId: nameId,
                    type: "TEXT",
                    value: "capture_image",
                },
            ],
        };
        const commandTransmissionPayload = {
            commandQueueId: commandQueueId,
            groundStationId: gId,
        };
        createCommandMutation(commandPayload);
        const commandId = transmitCommandMutation(commandTransmissionPayload)
            .then((res) => res)
            .then((res) =>
                console.log(
                    JSON.parse(res.protocolTransformerStateData)
                        .packetSequenceNumber - 1
                )
            );
        console.log(commandId);
    }

    return (
        <>
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {properties?.content?.map((property) => (
                            <div style={{ width: "25%", padding: "2em" }} className="card" key={property.id}>
                                <div style={{ display: "flex", height: "40px" }}>
                                    <img src={image} alt="satellite" style={{ width: "auto", height: "100%", marginRight: "3%" }} />
                                    <h4 style={{ width: "77%" }}>{property.name}</h4>
                                </div>
                                <p>{property.id}</p>
                                <button onClick={() =>
                                    sendCommandAndTransmit(coordinates, mode, satelliteId, property.id, executionTime)
                                }>{isTransmitting ? "Transmitting..." : "Initiate Transmission"}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
//{"code":"InvalidCredentials","message":"Invalid access token"}

export default Groundstations;
