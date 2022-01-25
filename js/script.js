import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GUI } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/libs/lil-gui.module.min.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.enableZoom = false;

var geometry = new THREE.CylinderGeometry(0, 1, 1, 320, 1, true);
var geometry2 = new THREE.CylinderGeometry(1, 0, 1, 320, 1, true);
var material = new THREE.MeshPhongMaterial({
  color: 0x2596be,
  side: THREE.DoubleSide,
  opacity: 0.5,
  transparent: true,
});
var cone = new THREE.Mesh(geometry, material);
var cone2 = new THREE.Mesh(geometry2, material);
scene.add(cone);
scene.add(cone2);
cone.position.y = -1/2;
cone2.position.y = 1/2;

var geom = new THREE.PlaneGeometry(7, 7, 7, 7);
var mat = new THREE.MeshBasicMaterial({
  color: 0xe28743,
  opacity: 0.5,
  transparent: false,
});
mat.side = THREE.DoubleSide;
var plane = new THREE.Mesh(geom, mat);

scene.add(plane);

const gui = new GUI();

const info = gui.addFolder("Info");
const p = document.createElement("p");
const tnode = document.createTextNode("Double click to pause animation");
p.style.padding = "5px";
p.appendChild(tnode);
const infoHTML = document.getElementsByClassName("children")[1];
infoHTML.appendChild(p);

const planeFolder = gui.addFolder("Plane");
const planeData = {
  rotateX: 0.5,
  rotateY: 0.5,
  rotateZ: 0.5,
  extend: 1,
  transparent: false,
};
planeFolder.add(planeData, "rotateX", 0, 2 * 3.1415).onChange(generatePlane);
planeFolder.add(planeData, "rotateY", 0, 2 * 3.1415).onChange(generatePlane);
// planeFolder.add(planeData, "rotateZ", 0, 2 * 3.1415).onChange(generatePlane);
planeFolder.add(planeData, "extend", 0, 2 * 3.1415).onChange(generatePlane);
planeFolder.add(planeData, "transparent").onChange(generatePlane);

function generatePlane() {
  plane.rotation.x = planeData.rotateX;
  plane.rotation.y = planeData.rotateY;
  plane.rotation.z = planeData.rotateZ;
  plane.scale.x = planeData.extend;
  plane.scale.y = planeData.extend;
  plane.material.transparent = planeData.transparent;
}

const coneFolder = gui.addFolder("Cone");
const coneData = {
  height: 1,
  radius: 1,
}
coneFolder.add(coneData, "height", 1, 5).onChange(generateCone);
coneFolder.add(coneData, "radius", 1, 5).onChange(generateCone);

function generateCone() {
  cone.scale.y = coneData.height;
  cone2.scale.y = coneData.height;
  cone.position.y = -coneData.height/2;
  cone2.position.y = coneData.height/2;
  cone.scale.x = coneData.radius;
  cone2.scale.x = coneData.radius;
  cone.scale.z = coneData.radius;
  cone2.scale.z = coneData.radius;
}

let isMouseDown = true;
window.addEventListener("dblclick", onMouseDown);
function onMouseDown() {
  console.log("MD");
  isMouseDown = !isMouseDown;
}

cone.rotation.x += 0.01;

const lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

camera.position.z = 5;
plane.translateX(0.3);
var render = function () {
  requestAnimationFrame(render);
  plane.rotation.y += isMouseDown ? 0.01 : 0.0;
  plane.rotation.x += isMouseDown ? 0.01 : 0.0;
  plane.rotation.z += isMouseDown ? 0.01 : 0.0;
  renderer.render(scene, camera);
};
render();
