import { saveFileInContainer,getFile,overwriteFile } from "@inrupt/solid-client";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { IPoint } from '../types/IPoint'

async function getProfileInfo(){
  return [FOAF.name.iri.value, VCARD.organization_name.iri.value, VCARD.role.iri.value, VCARD.hasPhoto.iri.value];
}

export async function saveMarkerInToPod(name:string, lat:number, lng:number, descrp: string, webId?: string) {
    console.log(webId);
    var newMarker: IPoint = {name:name, latitude:lat, longitude: lng, comment:descrp}
    var markers: IPoint[] = []; 
    markers.push(newMarker);
    if (markers.length > 0) {
        let profileDocumentURI = webId?.split("profile")[0];
        let targetFileURL = profileDocumentURI + 'private/Markers.json';
        let str = JSON.stringify(markers);
        const bytes = new TextEncoder().encode(str);
        const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8"
        });
        try {
            const savedFile = await overwriteFile(
                targetFileURL,                              // URL for the file.
                blob,                                       // File
                { contentType: blob.type, fetch: fetch }    // mimetype if known, fetch from the authenticated session
            );
        } catch (error) {
            console.error(error);
        }
    }
};
  


