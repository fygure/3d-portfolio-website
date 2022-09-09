import './style.css'

import * as THREE from 'three';
//1. Scene
//2. Camera
//3. Renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//add object to black screen
//geometry from three.js lib

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
//changed to mesh standard material
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347, wireframe: true } );
//geometry + material = mesh
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

//recursive function of infinite loop to call the render method automatically
function animate() {
  requestAnimationFrame( animate );

  //can move the shape and manipulate in 3D
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.002;
  torus.rotation.z += 0.01;


  renderer.render( scene, camera );
}

animate()