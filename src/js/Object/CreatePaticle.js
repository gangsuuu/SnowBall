import * as THREE from 'three';

export default class CreatePaticels {

    constructor(mesh) {
        this.mesh = mesh.clone()
        this.y = (Math.random() * - 15) + 7
        this.x = (Math.random() * 38) - 19
        this.z = (Math.random() * 40) - 20
        this.dy = (Math.random() * 0.07) - 0.0004
        this.dx = (Math.random() * 0.00004) - 0.00004
        this.dx = (Math.random() * 0.00004) - 0.00004
        this.mdy
        this.mesh.scale.x = (Math.random() * 1.1) + 0.9
        this.mesh.scale.y = (Math.random() * 1.1) + 0.9
        this.mesh.scale.z = (Math.random() * 1.1) + 0.9
        this.createMesh()
    }
    
    /**
     * CREATE Particle
     */
    createMesh(){
        // this.clone = this.mesh.clone()
        this.mesh.position.set(this.x, this.y, this.z)
        return this.mesh
    }

    /**
     * UPDATE PARTICLES INFO
     *
     */
    update(click){
        this.dx += ((Math.random() * 0.00001) - 0.00001)
        this.dz += ((Math.random() * 0.00001) - 0.00001)
        this.mesh.position.x -= this.dx
        // this.mesh.position.z -= this.dz
        if(click == 0){
            this.dy += 0.00003
            this.mesh.position.y -= this.dy
        }else{
            this.mesh.position.y -=  this.dy / 10
        }

        if(this.mesh.position.y < -10){
            // this.mesh.position.y =(Math.random() * (- 11 + 13)) + 14
            // this.mesh.position.x =(Math.random() * 80) - 40
            this.mesh.position.y =(Math.random() * (15 - 7)) + 7
            this.mesh.position.x =(Math.random() * 38) - 19
            this.dy = (Math.random() * 0.07) - 0.003
            this.dx = 0
        }
    }

}