class RubikCube extends Objeto{

    constructor(){
        super();

        var materials = [];
        //Vector with the name of the color of each face of the cube
        var names = [
          "../textures/Red.png", "../textures/Green.png",
          "../textures/Blue.png", "../textures/Orange.png",
          "../textures/White.png", "../textures/Yellow.png"
        ];

        for(var i = 0; i < 6; i++){
          var texture = new THREE.TextureLoader().load( names[i] );
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = renderer.getMaxAnisotropy();
          texture.repeat.set( 3, 3 );
          materials.push(new THREE.MeshPhongMaterial( { map: texture, shininess: 15, bumpMap: texture, bumpScale: 0.01}));
        }

        var material = new THREE.MeshFaceMaterial( materials );

        this.addElement(0, 0.55, 0, new THREE.BoxGeometry(1, 1, 1, 5, 5, 5), material);

        return this;
    }

}
