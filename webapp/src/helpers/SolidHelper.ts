import { FOAF } from "@inrupt/vocab-common-rdf";
import { IPMarker } from "../shared/SharedTypes";
import { fetch } from "@inrupt/solid-client-authn-browser"
import { setThing, buildThing, getFile, overwriteFile, saveSolidDatasetAt } from "@inrupt/solid-client";
import { getSolidDataset, getThing, saveFileInContainer, Thing } from "@inrupt/solid-client";

export async function readMarkers(webId: string) {
    let markers: IPMarker[] = []
    let fileURL = `${parseURL(webId)}private/Markers.json`;
    try {
        await getFile(fileURL, { fetch: fetch })
            .then(async (file) => { markers = JSON.parse(await file.text()); })
            .catch(async () => {
                let fileType = "application/json;charset=utf-8";
                await saveFileInContainer(fileURL,
                    new Blob(undefined, { type: fileType }),
                    {
                        slug: "Markers.json",
                        contentType: fileType,
                        fetch: fetch
                    }
                );
            });

    } catch (error) {
        console.error(error);
    }

    return markers;
};

export async function saveMarkers(markers: IPMarker[], webId: string) {
    if (markers.length > 0) {
        let fileURL = `${parseURL(webId)}private/Markers.json`;
        const blob = new Blob([(new TextEncoder()).encode(JSON.stringify(markers))], {
            type: "application/json;charset=utf-8"
        });
        try {
            await overwriteFile(fileURL, blob,
                {
                    contentType: blob.type,
                    fetch: fetch
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
};

function parseURL(webId: string) {
    return webId.split("profile")[0];
}

export async function addFriendByWebId(webId: string, friendWebId: string) {
    let solidDataset = await getSolidDataset(webId);
    let friends = getThing(solidDataset, webId) as Thing;

    friends = buildThing(friends).addUrl(FOAF.knows, friendWebId).build();
    solidDataset = setThing(solidDataset, friends);
    saveSolidDatasetAt(webId, solidDataset, { fetch: fetch })
}

export async function deleteFriendByWebId(webId: string, friendWebId: string) {
    let solidDataset = await getSolidDataset(webId);
    let friends = getThing(solidDataset, webId) as Thing;

    friends = buildThing(friends).removeUrl(FOAF.knows, friendWebId).build();
    solidDataset = setThing(solidDataset, friends);
    saveSolidDatasetAt(webId, solidDataset, { fetch: fetch })
}