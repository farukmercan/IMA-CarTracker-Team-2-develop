//Hauptersteller: Adrian Skeja

<template>
<div>
    <canvas class = "canvas" id="bg"></canvas>
    <div class = "text"><FourZeroFour /></div>
</div>

</template>

<script>
import FourZeroFour from '../components/FourZeroFour.vue'; // Passe den Pfad entsprechend an

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default {
    components: {
    FourZeroFour,
  },
  mounted() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.querySelector('#bg');

    if (!canvas) {
      console.error('Canvas-Element mit der ID "bg" nicht gefunden.');
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshStandardMaterial({ color: 0x9832B4 });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);


    const pointLight = new THREE.PointLight(0xffffff,1)
    pointLight.position.set(5, 5, 5)

    const ambientLight = new THREE.AmbientLight(0xffffff,2);
    scene.add(pointLight, ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    //const gridHelper = new THREE.GridHelper(200,50);
    scene.add(lightHelper);

    const controls = new OrbitControls(camera, renderer.domElement);


 function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);

    const material = new THREE. MeshStandardMaterial( { color: 0xffffff})
    const star = new THREE.Mesh(geometry, material );

    const [x,y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star)
 }

 Array(200).fill().forEach(addStar)






 const earthTexture = new THREE.TextureLoader().load('earth.jpg');
 const bumpTexture = new THREE.TextureLoader().load('specularmap.jpg')

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        bumpMap: bumpTexture
    })
);

scene.add(earth); // Füge die earth-Mesh zur Szene hinzu



    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

controls.update();

      renderer.render(scene, camera);
    }

    animate();
  }
}
</script>



<style scoped>
.canvas {
position: fixed;
top: 0;
left: 0;
cursor: pointer;
}
.text{
    position: absolute;
    top: 30%;
    left: 40%;
    cursor: pointer;
    user-select: none;
}




</style>