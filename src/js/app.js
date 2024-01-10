import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { gsap } from 'gsap';
import CreatePaticle from './Object/CreatePaticle';
import CreateLights from './Object/CreateLights';
/**
 *  전역변수
*/

let Light1, bgTexture, mirrorballMetalnessMap, mirrorballTexture, mirrorballRoughnessMap, mirrorballDISP, mirrorballNRM, mirrorballBUMP
let particles = []
let particlesCount = 4720;
let click = 0
export default function () {
 
  /**
   *  변수
  */
 const textureLoader = new THREE.TextureLoader()

 
  /**
   *  랜더 및 카메라 등록
   */
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setClearColor(0x061832, 1);

  const container = document.querySelector('#container');
  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const scene = new THREE.Scene();


  /**
   *  other folder files and libray import on here
   */
  // const createPaticle = new CreatePaticle()
  const createLights = new CreateLights()
  const gui = new GUI();
  let particleGroup = new THREE.Group()

  /** Camera */
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set( 0, 0, 70);

  /** Controls */
  const orbitControls = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    return controls;
  }
  
  /**
  * textureload
  */
  bgTexture = textureLoader.load()
  mirrorballTexture = textureLoader.load('public/assets/texture/MetalGoldPaint002/MetalGoldPaint002_COL_1K_METALNESS.png')
  mirrorballDISP = textureLoader.load('public/assets/texture/MetalGoldPaint002/MetalGoldPaint002_DISP16_1K_METALNESS.png')
  mirrorballNRM = textureLoader.load('public/assets/texture/MetalGoldPaint002/MetalGoldPaint002_DISP16_1K_METALNESS.png')
  mirrorballBUMP = textureLoader.load('public/assets/texture/MetalGoldPaint002/MetalGoldPaint002_BUMP_1K_METALNESS.png')
  mirrorballMetalnessMap = textureLoader.load('public/assets/texture/MetalGoldPaint002/MetalGoldPaint002_NRM_1K_METALNESS.png')
  mirrorballRoughnessMap = textureLoader.load('public/assets/texture/MetalGoldPaint002/MetalGoldPaint002_ROUGHNESS_1K_METALNESS.png')
  

  /** 
   * 오브젝트 생성
   *
   * 
   */
  const create = () => {
    //origin mesh
    let mesh  = new THREE.Mesh(
          new THREE.IcosahedronGeometry(.02, 24),
          new THREE.MeshPhysicalMaterial({
              roughness : 0,
              transmission : 0.1,
              thickness : 0.5,
              color : 'white'
          })
    )

    // //floor
    // const PlateMesh = new THREE.Mesh(
    //   new THREE.PlaneGeometry(30,30, 20,20),
    //   new THREE.MeshBasicMaterial({
    //     color : 'white',
    //   })
    // )
    // PlateMesh.rotation.x = -1
    // PlateMesh.rotateX(Math.PI/180 * -90)
    // PlateMesh.position.y = -11

    
    //mirrorball
    const mirrorball = new THREE.Mesh(
      new THREE.IcosahedronGeometry(30, 24),
      new THREE.MeshPhysicalMaterial({
          roughness : .3,
          transmission : 0.94,
          thickness : 0.3,
          // side :  THREE.DoubleSide,
      })
    )
    //mirrorballCase
    const mirrorballCase = new THREE.Mesh(
      new THREE.CylinderGeometry(28,29,20,64,4),
      new THREE.MeshPhysicalMaterial({
        // color : 'gold',
        map : mirrorballTexture,
        metalness: 0.01,
        // roughness: 0.2,
        metalnessMap: mirrorballMetalnessMap,
        roughnessMap : mirrorballRoughnessMap,
        // displacementMap : mirrorballDISP,
        normalMap : mirrorballMetalnessMap,
        bumpMap : mirrorballBUMP,
      })
      )
    mirrorballCase.material.needsUpdate = true
    mirrorballCase.position.y = -20.87




    for(let i = 0; i < particlesCount; i++){
      let particle = new CreatePaticle(mesh)
      particles.push(particle);
      particleGroup.add(particle.mesh);
    }
    Light1 = createLights.createLight1()
    
    scene.add(mirrorball , mirrorballCase, particleGroup, Light1)
  };


  /**
   * 리사이즈 됬을 때 실행될 애니메이션
   */
  const resize = () => {
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;

    camera.aspect = canvasSize.width / canvasSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };


  /**
   * 애니메이션 추가
   */
  const addEvent = () => {
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousedown', (e)=> {
      click = 1
      console.log(click)
    });
    window.addEventListener('mouseup', (e)=> {
      click = 0
      console.log(click)
    });

  };
  

 /**
  * 화면에 그려지는 애니메이션
  * @param orbitControl 오르비트컨트롤러
  */
  const draw = ( orbitControl) => {
    orbitControl.update();

    //particles update
    particles.forEach(particle =>{
      particle.update(click);
    })
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw(orbitControl);
    });
  };



  /**
   * create - 오브젝트 생성
   * orbitControls - 오르비트컨트롤러 생성
   * addEvent - 이벤트 등록
   * draw - 드로우시작
   */
  const initialize = () => {
    create();
    const orbitControl = orbitControls()
    addEvent();
    resize();
    draw(orbitControl);
  };

  initialize();
}