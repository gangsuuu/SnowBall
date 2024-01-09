import * as THREE from 'three';

export default class CreateMeshs {
    constructor() {
        this.geometry1
        this.geometry2
        this.material1
        this.material2
        this.mesh1
    }
    
    /**
     * backgroundPlane 제작
     */
    backgroundPlane(){
        this.geometry1 = new THREE.PlaneGeometry(35,20,5,5)
        this.material1 = new THREE.MeshBasicMaterial({
        })
        this.mesh1 = new THREE.Mesh(this.geometry1,this.material1)
        this.mesh1.position.z = -5
        return this.mesh1
    }
    
    /**
     * mesh 2 제작
     */
    createMesh1(){
        this.geometry2 = new THREE.IcosahedronGeometry(1.5,0);
        this.material2 = new THREE.MeshPhysicalMaterial({
            roughness: 0.07,  
            transmission: 1,
            thickness : 1.5,
            envMapIntensity: 1.7
        })
        this.mesh2 = new THREE.Mesh(this.geometry2,this.material2)
        
        return this.mesh2
    }
    
    /**
     * mesh제거
     * @param { object } mesh - mesh to be removed
     */
    removeMesh(mesh){

    }

}