class Table extends Objeto{

    constructor(){
        super();

        var texture = new THREE.TextureLoader().load( "../textures/chess.png");

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        var material = new THREE.MeshStandardMaterial({ map: texture, roughness: 1, color: 0x696969, shininess: 500, bumpMap: texture, bumpScale: 0.20});

        this.addElement(0, 0, 0, new THREE.BoxGeometry(10, 0.1, 10, 10, 10, 10), material);

        return this;
    }

}
