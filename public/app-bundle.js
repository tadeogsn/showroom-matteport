"use strict";
const sdkKey = "qu70fqq6f5pmm8spzq0nafwhd"
const modelSid = "grAFdMfsVv9";
const params = `m=${modelSid}&hr=0&play=1&qs=1`;
var iframe = document.getElementById('showcase');

//let iframe;
//let tag;

document.addEventListener("DOMContentLoaded", () => {
    //iframe = document.querySelector('.showcase');
    iframe.setAttribute('src', `/bundle/showcase.html?${params}`);
    iframe.addEventListener('load', () => showcaseLoader(iframe));
});

 function showcaseLoader(iframe){
    try{
         iframe.contentWindow.MP_SDK.connect(iframe, sdkKey, '3.10')
            .then(loadedShowcaseHandler)
            .catch(console.error);
    } catch(e){
        console.error(e);
    }
}

async function loadedShowcaseHandler(mpSdk){
    // ...
         console.log("ESTAMOS AQUI!!!");
        // ////////termina mouse over
        ///agragar luces a la scena, de lo contrario, los modelos se muestran en negro
        
        const lights = await mpSdk.Scene.createNode();
        lights.addComponent('mp.lights');
        lights.start();//para que el componenete comience a funcionar


        //los modelos se agregan a la secena como los componentes de iluminacion
        const modelNode = await mpSdk.Scene.createNode();
        // const fbxComponent = modelNode.addComponent(mpSdk.Scene.Component.FBX_LOADER, {
        //     url: 'https://gitcdn.link/repo/mrdoob/three.js/dev/examples/models/fbx/stanford-bunny.fbx',
        //   });
        const glbComponent = modelNode.addComponent(mpSdk.Scene.Component.GLTF_LOADER, {
            url: 'https://cdn.glitch.me/0bddb590-61dc-4dd8-9f56-70ac16cf676e%2Fmaquina.glb?v=1634137705470',
          });
        //agregar la scala del modelo
        glbComponent.inputs.localScale = {
            x: 0.3,
            y: 0.3,
            z: 0.3
        };

        //agregar la pocision del modelo
        modelNode.obj3D.position.set(3,-.5,0);

         //Rotación
        //Nuestro modelo de soldado de asalto se aleja de la cámara cuando el ángulo a lo largo del eje y es 0, y hacia la cámara cuando el ángulo es 𝜋:
        modelNode.obj3D.rotation.y = Math.PI

        //ACTIVAR MODELO
        //al igual que el componente de luz, necesitamos activar el modelo
        modelNode.start();

        const tick = function() {
            requestAnimationFrame(tick);
            //ROTACION DINAMICA
            //modelNode.obj3D.rotation.y += 0.01;

            //ESTATICO
            modelNode.obj3D.rotation.y = 9.5;
          }
          tick();


    //       //////MATTERTAGS
    //       var myMattertag = {
    //         label: 'A Tool',
    //         description: 'A cute little vacuum cleaner!',
    //         media: {
    //             type: mpSdk.Mattertag.MediaType.PHOTO,
    //             src: 'https://media.4rgos.it/i/Argos/8086071_R_Z001A',
    //         },
    //         anchorPosition: { x: 1, y: 0, z: -1},
    //         stemVector: { x: 1, y: 1, z:.4 }
    //     };
    //     mpSdk.Mattertag.add(myMattertag)
    // .then(function(mattertagId) {
    //     console.log(mattertagId);
    //     // ...
    // })
    // .catch(function(error) {
    //     console.error(error);
    //     // ...
    // });
     
}

function successCallback(message) { console.log(message); }

function errorCallback(error) { console.error(error); }