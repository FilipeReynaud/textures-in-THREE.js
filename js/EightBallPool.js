class EightBallPool extends Objeto{

    constructor(){
        super();

        this.texture = new THREE.TextureLoader().load("textures/8Ball.png");
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(2,1);

        this.material = new THREE.MeshPhongMaterial({map: this.texture});
        this.material2 = new THREE.MeshBasicMaterial({map: this.texture});
        this.geometry = new THREE.SphereGeometry(1, 32, 32);

        this.mesh = this.createMesh(this.geometry, this.material, 0, 1, 0);
        this.addElement(0, 1, 0, this.geometry, this.material);

        return this;

    }

    updateMaterialNoLight(){
      this.children[0].material = this.material2;
    }

    updateMaterialLight(){
      this.children[0].material = this.material;
    }

}
