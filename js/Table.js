class Table extends Objeto{

    constructor(){
        super();
        var material = new THREE.MeshLambertMaterial({color: 0x696969});
        var texture = new THREE.TextureLoader().load( "../textures/white_and_black.jpg");
        
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        material.map = texture;

        this.addElement(0, 0, 0, new THREE.BoxGeometry(10, 0.1, 10, 10, 10, 10), material);

        return this;
    }

}
