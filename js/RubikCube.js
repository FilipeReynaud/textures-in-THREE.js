class RubikCube extends Objeto{

    constructor(){
        super();

        var materials = [];
        var names = [
          "../textures/Red.png", "../textures/Green.png",
          "../textures/Blue.png", "../textures/Orange.png",
          "../textures/White.png", "../textures/Yellow.png"
        ];

        for(var i = 0; i < 6; i++){
          var texture = new THREE.TextureLoader().load( names[i] );
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set( 3, 3 );
          materials.push(new THREE.MeshBasicMaterial( { map: texture}));
        }

        var material = new THREE.MeshFaceMaterial( materials );

        // var texture = new THREE.TextureLoader().load( "../textures/Green.png" );
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set( 3, 3 );
        // material.map = texture;

        this.addElement(0, 0.55, 0, new THREE.BoxGeometry(1, 1, 1, 5, 5, 5), material);

        return this;
    }

}
