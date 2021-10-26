"use strict";

const sdkKey = "qu70fqq6f5pmm8spzq0nafwhd"
const modelSid = "grAFdMfsVv9";
const params = `m=${modelSid}&hr=0&play=1&qs=1`;

var iframe = document.getElementById('showcase');

//let iframe;
let tag;

document.addEventListener("DOMContentLoaded", () => {
    //iframe = document.querySelector('.showcase');
    iframe.setAttribute('src', `https://my.matterport.com/show/?${params}`);
    iframe.addEventListener('load', () => showcaseLoader(iframe));
});

function showcaseLoader(iframe){
    try{
        window.MP_SDK.connect(iframe, sdkKey, '3.10')
            .then(loadedShowcaseHandler)
            .catch(console.error);
    } catch(e){c
        console.error(e);
    }
}

///////////////////POCISIONAR TAG(EXPRIMENTAL)
// function loadedShowcaseHandler(mpSdk){
//     addTag()

//     function placeTag(){
//         if(tag) mpSdk.Mattertag.navigateToTag(tag, mpSdk.Mattertag.Transition.INSTANT);
//         tag = null;
//     }

//     window.addEventListener('blur',function(){  
//         window.setTimeout(function () { 
//             if (document.activeElement === iframe) {
//                 placeTag(); //function you want to call on click
//                 window.focus()
//                 addTag();
//             }
//         }, 0);
//     });
//     function updateTagPos(newPos, newNorm=undefined, scale=undefined){
//         if(!newPos) return;
//         if(!scale) scale = .33;
//         if(!newNorm) newNorm = {x: 0, y: 1, z: 0};

//         mpSdk.Mattertag.editPosition(tag, {
//             anchorPosition: newPos,
//             stemVector: {
//                 x: scale * newNorm.x,
//                 y: scale * newNorm.y,
//                 z: scale * newNorm.z,
//             }
//         })
//         .catch(e =>{
//             console.error(e);
//             tag = null;
//         });
//     }

//     mpSdk.Pointer.intersection.subscribe(intersectionData => {
//         if(tag){
//             if(intersectionData.object === 'intersectedobject.model' || intersectionData.object === 'intersectedobject.sweep'){
//                 updateTagPos(intersectionData.position, intersectionData.normal);
//             }
//         }
//     });

//     function addTag() {
//         if(!tag){
//             mpSdk.Mattertag.add([{
//                 label: "Matterport Tag",
//                 description: "",
//                 anchorPosition: {x: 0, y: 0, z: 0},
//                 stemVector: {x:0, y: 0, z: 0},
//                 color: {r: 1, g: 0, b: 0},
//             }])
//             .then((sid) => {
//                 tag = sid[0];
//             })
//             .catch( (e) => {
//                 console.error(e);
//             })
//         }
//     }
// } // loadedShowcaseHandler ///////////////////FIN DE POCISIONAR TAG(EXPRIMENTAL)

function loadedShowcaseHandler(mpSdk){
    // ...
    var mattertagDesc = {
        label: 'A Tool',
        description: 'A cute little vacuum cleaner!',
        media: {
            type: mpSdk.Mattertag.MediaType.PHOTO,
            src: 'https://media.4rgos.it/i/Argos/8086071_R_Z001A',
        },
        anchorPosition: { x: 1.39, y: 2.00, z: -0.122 },
        stemVector: { x: 0, y: 0, z: 0 }
      };
        mpSdk.Mattertag.add(mattertagDesc).then(function(mattertagId) {
        console.log(mattertagId);
        });
      //eventos de click->
    

        mpSdk.on(mpSdk.Mattertag.Event.CLICK,
            function (tagSid) {
                console.log('Mattertag ' + tagSid + ' was selected');
            }
        );
    
        //termina los eventos de click

        
        // output: TODO

        // ///mouse over

        var stateObject = {
            isMouseOverIframe : false
        }
        window.addEventListener('blur',function(){
            if(stateObject.isMouseOverIframe){
                console.log('Yes! The click happened inside the iframe!');
                window.focus()
            }
        });
        document.getElementById('container').addEventListener('mouseover',function(){
            stateObject.isMouseOverIframe = true;
        });
        document.getElementById('container').addEventListener('mouseout',function(){
            stateObject.isMouseOverIframe = false;
        });

        // ////////termina mouse over
     
}

function successCallback(message) { console.log(message); }

function errorCallback(error) { console.error(error); }

