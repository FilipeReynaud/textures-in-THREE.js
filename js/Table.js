class Table extends Objeto{

    constructor(){
        super();
        this.texture = new THREE.TextureLoader().load( "../textures/chess.png");

        this.material = new THREE.MeshStandardMaterial({color: 0x696969, roughness: 0.7, bumpMap: this.texture, bumpScale: 0.20});
        this.material2 = new THREE.MeshBasicMaterial({color: 0x696969, map: this.texture})

        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.texture.repeat.set(4,4);
        this.material.map = this.texture;

        this.geometry = new THREE.BoxGeometry(10, 0.1, 10, 10, 10, 10);
        this.addElement(0, 0, 0, this.geometry, this.material);

        return this;
    }

    updateMaterialNoLight(){
    	this.children[0].material = this.material2;
    }

    updateMaterialLight(){
    	 this.children[0].material = this.material;
    }

}
