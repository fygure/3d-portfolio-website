import './style.css'

import * as THREE from 'three';
import { AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
camera.position.setX(-3);

renderer.render(scene, camera);
//===============================================================================================//
//add object to black screen
//geometry from three.js lib
const geometry = new THREE.TorusKnotGeometry( 5, -.6, 75, 15, -90, 20 );
const material = new THREE.MeshStandardMaterial( { color: 0xabcedf } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

torusKnot.position.set(20, 0, -40)
//add object to screen
scene.add(torusKnot)
//===============================================================================================//
//create a point light for the scene
const pointLight = new THREE.PointLight(0xffffff)
//moves light from center to position
pointLight.position.set(5, 5, 25) //higher values = light up larger area (light is far away)

//another type of light - floodlight
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//light helper

const lightHelper = new THREE.PointLightHelper(pointLight)
// //grid helper
// const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)
//===============================================================================================//
//add orbit controls - allows us to move around the scene using our mouse
//first import orbit controls class (above)
//instantiate orbit controls class and pass the camera and renderer.domElement as arguments
const controls = new OrbitControls(camera, renderer.domElement);
//===============================================================================================//
//populate the rest of the screen with random shapes
function addStar() {

  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);
 
  //randomly generates x y z with between -100 and +100 numbers
  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star)

}
//===============================================================================================//
//Creates array of 200 and fills with stars
Array(200).fill().forEach(addStar)
//===============================================================================================//
const spaceTexture = new THREE.TextureLoader().load('space5.jpeg')
scene.background = spaceTexture;
//===============================================================================================//
//adding another geometry
//UNCOMMENT TO TRY
const geometry2 = new THREE.OctahedronGeometry(2.1, 3)
const material2 = new THREE.MeshStandardMaterial( {color: 0xffffff})
const octahedron = new THREE.Mesh(geometry2, material2)
octahedron.position.set(-10, 0, -4)
scene.add(octahedron)
//===============================================================================================//
//Create moon

const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
//add normal texture to add depth
const normalTexture = new THREE.TextureLoader().load('normal.jpeg')

//mapping custom textures to the mesh
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon)
//===============================================================================================//
//Reposition moon

moon.position.z = 30;
moon.position.setX(-10);



//===============================================================================================//
//moves camera
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//Runs animations
//recursive function of infinite loop to call the render method automatically
function animate() {
  requestAnimationFrame( animate );

  //can move the shape and manipulate in 3D
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.003;
  torusKnot.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  //controls.update(); //make sure changes are reflected in UI for orbit control

  renderer.render( scene, camera );
}
animate();
//===============================================================================================//
