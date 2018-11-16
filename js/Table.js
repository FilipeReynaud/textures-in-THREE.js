class Table extends Objeto{

    constructor(){
        super();
        var texture = new THREE.TextureLoader().load( "../textures/chess.png");

        var material = new THREE.MeshPhongMaterial({color: 0x696969, shininess: 5, bumpMap: texture, bumpScale: 0.20});

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        material.map = texture;

        this.addElement(0, 0, 0, new THREE.BoxGeometry(10, 0.1, 10, 10, 10, 10), material);

        return this;
    }

}
