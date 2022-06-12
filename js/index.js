import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';

let camera,scene,renderer;

const canvas = document.querySelector('.webgl');
let earthMesh,cloudMesh;
function init(){
    SetupCameraAndScene();
   
    SetupOrbitControl();

    AddEarthAndCloud();

    animate();

}

function SetupOrbitControl(){
    let control = new OrbitControls( camera, renderer.domElement );
    
    control.addEventListener('change',renderer)

    control.minDistance = 2;
    control.maxDistance = 5;
}

function SetupCameraAndScene(){
    scene = new THREE.Scene();

    let fov = 60; // поле зрения/угол обзора
    let aspectWindow = window.innerWidth/window.innerHeight;
    let near = 0.1; // дистанция 
    let far = 15000;

    camera = new THREE.PerspectiveCamera(fov,aspectWindow,near,far);
    
    camera.position.set(-0.5,1.23,1.77);
    
    
    scene.add(camera); 
    
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas:canvas
    });
    

    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.autoClear = false; // отвечает за черный/белый фон
    

    document.body.append(renderer.domElement);

} 

function AddEarthAndCloud(){
    const earthGeometry = new THREE.SphereGeometry(1,32,32);
    const earthMaterial = new THREE.MeshPhongMaterial(
        {
            roughness:1,
            metalness:0,
            map: new THREE.TextureLoader().load("./texture/8k_earth_nightmap.jpg")
        }
    );

    earthMesh = new THREE.Mesh(earthGeometry,earthMaterial);
    scene.add(earthMesh);
    
    const ambientLight = new THREE.AmbientLight(0xffffff,1.5);
    scene.add(ambientLight);  


    const cloudGeom = new THREE.SphereGeometry(1.05,32,32);
    const cloudMat = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load("./texture/8k_earth_clouds.jpg"),
        //map: THREE.ImageUtils.loadTexture("texture/8k_earth_clouds.jpg"),
        opacity:0.1, // прозрачнось облаков
        transparent:true
    });
     cloudMesh = new THREE.Mesh(cloudGeom,cloudMat);
    scene.add(cloudMesh);
    
    
    earthMesh.rotateY(Math.PI);
}
var  animate = function (){

    renderer.render(scene,camera);
    earthMesh.rotation.y-=0.0005;
    cloudMesh.rotation.y+=0.001;
    console.log(camera.position.x+"\t"+camera.position.y+"\t"+camera.position.z);
    requestAnimationFrame(animate);
};


init();