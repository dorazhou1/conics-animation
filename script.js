

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CylinderGeometry(0,1,1,320,1, true);
var geometry2 = new THREE.CylinderGeometry(1,0,1,320,1, true);
var material = new THREE.MeshPhongMaterial({color: 0x2596be, side:THREE.DoubleSide, opacity: 0.5, transparent: true});
var cone = new THREE.Mesh(geometry, material);
var cone2 = new THREE.Mesh(geometry2, material);
scene.add(cone);
scene.add(cone2);
cone.translateY(-.5);
cone2.translateY(.5);

var geom = new THREE.PlaneGeometry(5,5,5,5);
var mat = new THREE.MeshBasicMaterial({color: 0xe28743, opacity: 0.5, transparent: false});
var plane = new THREE.Mesh(geom, mat);
scene.add(plane);
cone.rotation.x +=.01;

// create a point light
var pointLight = new THREE.PointLight( 0xffffff );

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);
    

camera.position.z = 5;
plane.translateX(.3)
var render = function () {
  requestAnimationFrame(render);
  plane.rotation.y +=0.005;
  plane.rotation.x +=0.01;
  plane.rotation.y +=.01;
  renderer.render(scene, camera);
};

render();
var objects = [cone, cone2];
const controls = new DragControls( objects, camera, renderer.domElement );

// add event listener to highlight dragged objects

controls.addEventListener( 'dragstart', function ( event ) {

	event.object.material.emissive.set( 0xaaaaaa );

} );

controls.addEventListener( 'dragend', function ( event ) {

	event.object.material.emissive.set( 0x000000 );

} );
