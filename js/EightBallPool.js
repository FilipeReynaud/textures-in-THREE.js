class EightBallPool extends Objeto{

    constructor(){
        super();

        var texture = new THREE.TextureLoader().load("textures/8Ball.png");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2,1);


        this.mesh = this.createMesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({map: texture}), 0, 1, 0);
        this.addElement(0, 1, 0, new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({map: texture}));

        return this;

    }

}
