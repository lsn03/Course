import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';

let camera,scene,renderer;

function init(){

    scene = new THREE.Scene();

    let fov = 60; // поле зрения/угол обзора
    let aspectWindow = window.innerWidth/window.innerHeight;
    let near = 0.1; // дистанция 
    let far = 15000;

    camera = new THREE.PerspectiveCamera(fov,aspectWindow,near,far);
    
    camera.position.set(1200,-90,-690);
   
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.append(renderer.domElement);

    camera.position.z = 0;
    let control = new OrbitControls( camera, renderer.domElement );

    
    control.addEventListener('change',renderer)

    control.minDistance = 500;
    control.maxDistance = 1500;


    let materialArray = [];

    let skybox_back = new THREE.TextureLoader().load("img/skybox_back.png");
    let skybox_down = new THREE.TextureLoader().load("img/skybox_down.png");
    let skybox_front = new THREE.TextureLoader().load("img/skybox_front.png");
    let skybox_left = new THREE.TextureLoader().load("img/skybox_left.png");
    let skybox_right = new THREE.TextureLoader().load("img/skybox_right.png");
    let skybox_up = new THREE.TextureLoader().load("img/skybox_up.png");


    materialArray.push(new THREE.MeshBasicMaterial({map: skybox_right}));
    materialArray.push(new THREE.MeshBasicMaterial({map: skybox_left}));
    materialArray.push(new THREE.MeshBasicMaterial({map: skybox_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map: skybox_down}));
    materialArray.push(new THREE.MeshBasicMaterial({map: skybox_front}));
    materialArray.push(new THREE.MeshBasicMaterial({map: skybox_back}));

    for (let i = 0 ;i < 6; i++){
        materialArray[i].side = THREE.BackSide;
    }

    let skyBoxGeo = new THREE.BoxGeometry(10000,10000,10000);
    let skyBox = new THREE.Mesh(skyBoxGeo,materialArray);

    scene.add(skyBox);
    
    
    skyBox.rotateZ(Math.PI);
    skyBox.rotateX(Math.PI*2);
    
    skyBox.position.z = -5;
    animate();

}
var  animate = function (){

    renderer.render(scene,camera);

    requestAnimationFrame(animate);
};


init();