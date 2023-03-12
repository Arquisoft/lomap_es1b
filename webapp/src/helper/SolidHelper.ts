import { saveFileInContainer,getFile,overwriteFile } from "@inrupt/solid-client";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { IPoint } from '../types/IPoint';

async function getProfileInfo(){
  return [FOAF.name.iri.value, VCARD.organization_name.iri.value, VCARD.role.iri.value, VCARD.hasPhoto.iri.value];
}


// async function readData(url,session) {
//   try {
//     let file = await getFile(
//       url,
//       { fetch: session.fetch }
//     );

//     printContents(file);
//   } catch (error) {
//     console.log(error);
//   }
// }


// export async function printContents(file) {
//     var reader = new FileReader();
//     reader.onload = function(event) {
//       console.log(event.target.result);
//     }
//     reader.readAsText(file);
//   }



// async function existFile(webId,session){

//   let url = webId.replace("profile/card#me","");
//   url = url+"private/puntosMapa.js"; 

//   let exist = false;
//   try {
//     let file = await getFile(
//       url,
//       { fetch: session.fetch }
//     );
      
//     exist = true;

//     return exist;
    
//   } catch (error) {
//     return exist;
//   }
// }
  
  
// export async function createPoints(name,x,z,comment) {

//     var dates =[{latitud:x,longitud:z,comment:comment}];

//     var point :Point[]

//     for(var i in dates) {    
//         var item = dates[i];   
//         var v1 = item.latitud;
//         var v2 = item.longitud;
//         var v3 = item.comment;
//         point.p
//     }
  
//       const blob = new Blob([JSON.stringify(r, null, 2)], {
//         type: "application/json",
//       });
  
//       var file = new File([blob], name, { type: blob.type });
//       return file;
  
//   }

export async function saveMarkerToPod(name:string, lat:number, lng:number, descrp: string, webId?: string) {
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
  
// export async function createData(url, file, session) {
//     try {
//       let savedFile = await saveFileInContainer(
//         url,
//         file,
//         { slug: file.name, contentType: file.type, fetch: session.fetch }
//       );
  
//       printContents(savedFile);
//     } catch (error) {
//       console.log(error);
//     }
//   }


// export async function updatePoints(x,y,z,comment,session,webId){

//   let url = webId.replace("profile/card#me","");
//   let urlContainer = url+"private/";
//   url = url+"private/puntosMapa.json"; 

//   try {
//     let file = await getFile(
//       url,
//       { fetch: session.fetch }
//     );

//     var dates =[{latitud:x,altitud:y,longitud:z,comment:comment}];

//     let oldPoints = await file.text();

//     var dataset = JSON.parse(oldPoints);

//     for(var i in dates) {    
//       var item = dates[i];   
//       var v1 = item.latitud;
//       var v2 = item.altitud;
//       var v3 = item.longitud;
//       var v4 = item.comment;
//       dataset.points.push({ 
//           "x" : v1,
//           "y"  : v2,
//           "z" : v3,
//           "comment" : v4
//       });
//     }

//     const blob = new Blob([JSON.stringify(dataset, null, 2)], {
//       type: "application/json",
//     });

//     var fichero = new File([blob], "puntosMapa.json", { type: blob.type });

//     return fichero;
  
//   } catch (error) {

//     await createPointsFile().then(file => createData(urlContainer, file, session));
//     await updatePoints(x,y,z,comment,session,webId);

//     //const result = createPointsFile().then(file => createData(urlContainer, file, session));

//   }

// }

// function firstFunction(_callback){
//   _callback();
// }

// export async function createPointsFile() {

//   var r = {
//   points: []
//   };

//     const blob = new Blob([JSON.stringify(r, null, 2)], {
//       type: "application/json",
//     });

//     var file = new File([blob], "puntosMapa.json", { type: blob.type });
//     return file;

// }


// export async function updateData(file,webId,session) {

//   let url = webId.replace("profile/card#me","");
//   url = url+"private/puntosMapa.json"; 

//    try {
//     var savedFile = await overwriteFile(
//       url,
//       file,
//       { contentType: file.type, fetch: session.fetch }
//     );

//     printContents(savedFile);
//   } catch (error) {
//     console.log(error);
//   } 
// }

  
// async function stringJson(x,y){
  
//      return {latitud:x,altitud:y};
//   }


