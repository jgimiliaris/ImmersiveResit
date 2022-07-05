import '@ar-js-org/ar.js';
import 'aframe-look-at-component';
import 'aframe';

import { GoogleProjection } from 'jsfreemaplib';


alert('jsrunning2221ab222111aaaaasssww2345678wdfuver111');



AFRAME.registerComponent('peakf', {

    init: function () {



        // Handle a GPS update ...
        window.addEventListener('gps-camera-update-position', async (e) => {




            var text2 = document.createElement('div');
            text2.style.position = 'absolute';
            //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
            text2.style.width = 100;
            text2.style.height = 100;
            text2.style.backgroundColor = "blue";
            text2.innerHTML = "hi there!";
            text2.style.top = 200 + 'px';
            text2.style.left = 200 + 'px';
            document.body.appendChild(text2);




            const resp = await fetch(`https://hikar.org/webapp/map?bbox=${e.detail.position.longitude - 0.05},${e.detail.position.latitude - 0.05},${e.detail.position.longitude + 0.05},${e.detail.position.latitude + 0.05}&layers=poi&outProj=4326 `);

            const points = await resp.json();


            points.features.forEach(point => {

                const planeEntity = document.createElement('a-plane');

                planeEntity.setAttribute('gps-projected-entity-place', {
                    latitude: point.geometry.coordinates[1],
                    longitude: point.geometry.coordinates[0]
                });

                planeEntity.setAttribute('width', 4);
                planeEntity.setAttribute('height', 1)

                planeEntity.setAttribute('material', {
                    color: 'green'
                });


                planeEntity.setAttribute('look-at', '[gps-projected-camera]');

                planeEntity.setAttribute('text', {
                    value: point.properties.name || 'no name'
                });


                const textEntity = document.createElement('a-text');



                // set the lat and lon of the entity by setting
                // its gps-projected-entity place component
                textEntity.setAttribute('gps-projected-entity-place', {
                    latitude: point.geometry.coordinates[1],
                    longitude: point.geometry.coordinates[0]
                });

                // Set the scale of the text
                textEntity.setAttribute('scale', {
                    x: 1000,
                    y: 1000,
                    z: 1000
                });

                // Make the text look-at the camera
                textEntity.setAttribute('look-at', '[gps-projected-camera]');


                // Horizontally centre-align the text so the centre of the
                // text is placed at the parent entity's world position
                textEntity.setAttribute('align', 'center');
                textEntity.setAttribute('value', point.properties.name || 'No name');

                // Add the text entity to the scene


                this.el.sceneEl.appendChild(textEntity);
                this.el.sceneEl.appendChild(planeEntity);








            });





        });
    }
});