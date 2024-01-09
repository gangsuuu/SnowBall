import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { gsap } from 'gsap';
import CreateMeshs from './Object/CreateMeshs';
import CreateLights from './Object/CreateLights';
/**
 *  전역변수
*/

let backgroundPlane, mesh1, Light1, bgTexture

export default function () {
  /**
   *  변수
  */
 const buttons = document.querySelectorAll('button');
 
 const textureLoader = new THREE.TextureLoader()

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
  const createMeshs = new CreateMeshs()
  const createLights = new CreateLights()
  const gui = new GUI();

  /** Camera */
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set( 0, 0, 6);

  /** Controls */
  const orbitControls = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    return controls;
  }
  
  /**
  * textureload
  */
  bgTexture = textureLoader.load('public/assets/images/image001.jpg')


  /** 
   * 오브젝트 생성
   *
   * 
   */
  const create = () => {
    backgroundPlane = createMeshs.backgroundPlane()
    mesh1 = createMeshs.createMesh1()
    Light1 = createLights.createLight1()

    backgroundPlane.material.map = bgTexture;

    scene.add(backgroundPlane,mesh1,Light1)
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

    /**
     * button click animation to change camera position
     */
    buttons.forEach((button,index) => {
      button.addEventListener('click', (e) => {
        switch (index) {
          case 0:
            camera.position.set( 4,0,6)
            break;
          case 1:
            camera.position.set(0,5,6)
            break;
          case 2:
            camera.position.set(0,0,8)
          break;
        }
      })
    })
  };
  

 /**
  * 화면에 그려지는 애니메이션
  * @param orbitControl 오르비트컨트롤러
  */
  const draw = ( orbitControl) => {
    orbitControl.update();
    renderer.render(scene, camera);
    mesh1.rotation.y += 0.001
    mesh1.rotation.z += 0.001
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