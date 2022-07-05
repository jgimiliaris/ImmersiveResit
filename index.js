import '@ar-js-org/ar.js';
import 'aframe-look-at-component';
import 'aframe';

import { GoogleProjection } from 'jsfreemaplib';

//my form to check if the browser updates the version!
alert('jsrunning2221ab222111aaaaasssww2345678wdfuver111ver1.2.21');



AFRAME.registerComponent('peakf', {

    init: function () {
        window.addEventListener('gps-camera-update-position', async (e) => {


            //welcome notice

            var text2 = document.createElement('div');
            text2.style.position = 'absolute';
            text2.style.width = 200;
            text2.style.height = 100;
            text2.style.backgroundColor = "white";
            text2.innerHTML = "Welcome to the app. Feel free to click any of the points for a surprise!";
            text2.style.top = 1 + 'px';
            text2.style.left = 1 + 'px';
            document.body.appendChild(text2);




            const resp = await fetch(`https://hikar.org/webapp/map?bbox=${e.detail.position.longitude - 0.05},${e.detail.position.latitude - 0.05},${e.detail.position.longitude + 0.05},${e.detail.position.latitude + 0.05}&layers=poi&outProj=4326 `);


            //coordinates box
            var coordinates = document.createElement('div');
            coordinates.style.position = 'absolute';

            coordinates.style.width = 200;
            coordinates.style.height = 100;
            coordinates.style.backgroundColor = "white";
            coordinates.innerHTML = `Your Current Latitude is: ${e.detail.position.latitude} and your current Longitude is: ${e.detail.position.longitude}`;
            coordinates.style.top = 20 + 'px';
            coordinates.style.left = 1 + 'px';
            document.body.appendChild(coordinates);

            const points = await resp.json();


            points.features.forEach(point => {


                // plane noticeboard ISSUE ISSUE NOT SHOWING UP IN THE END RESULT

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



                //SIMPLE TEXT


                const textEntity = document.createElement('a-text');

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
                textEntity.setAttribute('look-at', '[gps-projected-camera]');
                textEntity.setAttribute('align', 'center');
                textEntity.setAttribute('value', point.properties.name || 'No name');

                // Add the  ENTITIES to the scene


                this.el.sceneEl.appendChild(textEntity);
                this.el.sceneEl.appendChild(planeEntity);

            });

        });
    }
});