
import {
    useCommandQueues,
    useCommandDefinitions,
    useCreateCommandMutation,
    useTransmitCommandMutation,
    useInterval,
} from "../hooks/hooks";
export default function BasicTable() {
    const { mutateAsync: createCommandMutation } = useCreateCommandMutation();
    const { mutateAsync: transmitCommandMutation, isLoading: isTransmitting } = useTransmitCommandMutation();

    function bob() {
        console.log("I am here");
    };

    // useInterval(bob(), 600);
    // you will need to supply these values
    const coordinates = '{"lat":-75.5267,"lon":-128.1957}'; //fdfd
    const mode = "1"; //dfdf
    const satelliteId = "a5af8484-51d8-4e16-9140-826cd0d1cdf2"; //dfdf
    const groundStationId = "7df44a68-f0fd-4ddf-8e77-2dc5f14bbda6"; //dfdd 
    const { data: commandQueue } = useCommandQueues({ assetIds: satelliteId });
    const commandQueueId = commandQueue?.content[0]?.id;
    const { data: commandDefinitions } = useCommandDefinitions({
        nodeIds: satelliteId,
        withArgumentsAndMetadata: "true",
    });
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
        executionTime: "2022-11-13T19:13:20.231Z",
        commandArguments: [
            {
                appliedArgumentId: coordinateId,
                type: "TEXT",
                value: coordinates,
            },
            {
                appliedArgumentId: modeId,
                type: "TEXT",
                value: mode,
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
        groundStationId: groundStationId,
    };
    return (
        <>
            <button
                onClick={async () => {
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
                }}
            >
                {isTransmitting ? "Transmitting..." : "Transmit a command"}
            </button>
        </>
    );
}