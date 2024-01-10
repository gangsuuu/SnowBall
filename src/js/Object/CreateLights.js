import * as THREE from 'three';

export default class CreateLights {
    constructor() {
        this.light1
    }
    
    /**
     * createLigt Light1 생성
     */
    createLight1(){
        this.light1 = new THREE.DirectionalLight(0xffffff, 1);
        this.light1.position.set(0, 5, 10);
        return this.light1
    }
    
    /**
     * update 제작
     */
    update(){
    }
    
}