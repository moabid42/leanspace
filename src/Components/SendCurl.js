
import fetch from 'node-fetch';
import './buttom.css';

export default function SendCurl(props) {

    const reqId = props.requestId;
    const imaId = props.imageId;
    var isSent = true;
    // const reqId = "e39ee04f-5c8e-4553-95fb-2ec7dfb3eb4d";
    // const imaId = "e983d6c5-f2cd-4a61-80b1-20b28c9c5773";
    const allQuerrtString = 'mutation MyMutation {\n  fulfillRequest(input: {requestId:"' + reqId + '", imageId:"' + imaId + '"}) \n}\n';
    return (
        <>
            <button className="rightButton"
                onClick={async () => {

                    fetch('https://mfrg6mwe4zd3pjcginp45iqs6m.appsync-api.eu-central-1.amazonaws.com/graphql', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'x-api-key': 'da2-ckfnur3aknb4zhrpkesejjmq24'
                        },
                        body: JSON.stringify({
                            'query': allQuerrtString,
                            'variables': null,
                            'operationName': 'MyMutation'
                        })
                    })
                        .then(resp => resp.json()).then(body => console.log(body))
                        ;
                        isSent = false;
                }}
            >
                {isSent ? "Sending image ID" : "Sent!"}
            </button>
        </>
    );
}