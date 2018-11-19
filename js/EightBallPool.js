class EightBallPool extends Objeto{

    constructor(){
        super();

        // Create Texture and properties
        this.texture = new THREE.TextureLoader().load("textures/8Ball.png");
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); //fixes blury effect
        this.texture.repeat.set(2, 1);

        //Create material and assing texture
        this.material = new THREE.MeshPhongMaterial({shininess: 40, map: this.texture, wireframe: false });
        this.material2 = new THREE.MeshBasicMaterial({shininess: 40, map: this.texture, wireframe: false });

        //Create object
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.mesh = this.createMesh(this.geometry, this.material, 0, 1, 0);
        this.addElement(0, 1, 0, this.geometry, this.material);

        return this;

    }

    updateMaterialNoLight(){
      this.material2.wireframe = wire;
      this.children[0].material = this.material2;
    }

    updateMaterialLight(){
      this.material.wireframe = wire;
      this.children[0].material = this.material;
    }

}
