class Table extends Objeto{

    constructor(){
        super();
        this.texture = new THREE.TextureLoader().load( "../textures/chess.png");

        this.material = new THREE.MeshPhongMaterial({color: 0x696969, shininess: 5, bumpMap: this.texture, bumpScale: 0.20});

        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(4,4);
        this.material.map = this.texture;

        this.geometry = new THREE.BoxGeometry(10, 0.1, 10, 10, 10, 10);
        this.addElement(0, 0, 0, this.geometry, this.material);

        return this;
    }

    updateMaterialNoLight(){
    	this.material = new THREE.MeshBasicMaterial({color: 0x696969, map: this.texture});
    }

    updateMaterialLight(){
    	 this.material = new THREE.MeshPhongMaterial({color: 0x696969, shininess: 5, bumpMap: this.texture, bumpScale: 0.20});
    }

}
