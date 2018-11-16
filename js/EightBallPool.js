class EightBallPool extends Objeto{

    constructor(){
        super();

        this.texture = new THREE.TextureLoader().load("textures/8Ball.png");
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(2,1);

        this.material = new THREE.MeshPhongMaterial({map: this.texture});
        this.geometry = new THREE.SphereGeometry(1, 32, 32);

        this.addElement(0, 1, 0, this.geometry, this.material);

        return this;

    }

    updateMaterialNoLight(){
      this.material = new THREE.MeshBasicMaterial({color: 0x696969, map: this.texture});
    }

    updateMaterialLight(){
      this.material = new THREE.MeshPhongMaterial({color: 0x696969, map: this.texture});
    }

}
