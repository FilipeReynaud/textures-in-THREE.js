class Table extends Objeto{

    constructor(){
        super();
        // Create Texture and properties
        this.texture = new THREE.TextureLoader().load( "../textures/chess.png");

        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); //fixes blury effect
        this.texture.repeat.set(4,4);

        //Create material and assing texture
        this.material = new THREE.MeshStandardMaterial({shininess: 0,color: 0x696969, map: this.texture, roughness: 0.7, bumpMap: this.texture, bumpScale: 0.20, wireframe: false});
        this.material2 = new THREE.MeshBasicMaterial({color: 0x696969, map: this.texture, wireframe: false});

        //Create object
        this.geometry = new THREE.BoxGeometry(10, 0.1, 10, 10, 10, 10);
        this.addElement(0, 0, 0, this.geometry, this.material);

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
