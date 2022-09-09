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

renderer.render(scene, camera);

//add object to black screen
//geometry from three.js lib

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
//changed to mesh standard material
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } );
//geometry + material = mesh
const torus = new THREE.Mesh( geometry, material );

//add object to screen
scene.add(torus)

//create a point light for the scene
const pointLight = new THREE.PointLight(0xffffff)
//moves light from center to position
pointLight.position.set(5, 5, 5) //higher values = light up larger area (light is far away)

//another type of light - floodlight
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//light helper
const lightHelper = new THREE.PointLightHelper(pointLight)
//grid helper
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

//add orbit controls - allows us to move around the scene using our mouse
//first import orbit controls class (above)
//instantiate orbit controls class and pass the camera and renderer.domElement as arguments
const controls = new OrbitControls(camera, renderer.domElement);

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
//Runs animations
//recursive function of infinite loop to call the render method automatically
function animate() {
  requestAnimationFrame( animate );

  //can move the shape and manipulate in 3D
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.003;
  torus.rotation.z += 0.01;

  controls.update(); //make sure changes are reflected in UI for orbit control

  renderer.render( scene, camera );
}
animate()
//===============================================================================================//
