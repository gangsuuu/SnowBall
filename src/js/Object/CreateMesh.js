import * as THREE from 'three';

export default class CreateMesh {
    constructor() {
        this.geometry1
        this.geometry2
        this.material1
        this.material2
        this.mesh1
    }
    
    /**
     * mesh 1 제작
     */
    mesh1(){
        this.geometry1 = new THREE.PlaneGeometry(5,5,5,5)
        this.material1 = new THREE.MeshBasicMaterial({
            color:'red'
        })
        this.mesh1 = new THREE.Mesh(this.geometry1,this.material1)
        
        return this.mesh1
    }
    
    /**
     * mesh 2 제작
     */
    mesh2(){
        this.geometry2 = new THREE.IcosahedronGeometry(1,0);
        this.material2 = new THREE.MeshNormalMaterial()
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