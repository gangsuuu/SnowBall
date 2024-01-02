import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { gsap } from 'gsap';
import CreateMesh from './Object/CreateMesh';


export default function () {
  /**
   *  랜더 및 카메라 등록
   */
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.setClearColor(0x0a5545, 1);

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
  const createMesh = new CreateMesh()
  const gui = new GUI();

  /** Camera */
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set(0, 5,10);


  /** Controls */
  const orbitControls = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    return controls;
  }
  

  /** 
   * 오브젝트 생성
   *
   * 
   */
  const create = () => {
    createMesh.mesh1()
    createMesh.mesh2()
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
  };
  

 /**
  * 화면에 그려지는 애니메이션
  * @param orbitControl 오르비트컨트롤러
  */
  const draw = ( orbitControl) => {
    orbitControl.update();
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