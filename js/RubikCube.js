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
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          texture.repeat.set( 3, 3 );
          materials.push(new THREE.MeshPhongMaterial( { color: 0xf5f5f5, map: texture, shininess: 10, bumpMap: texture, bumpScale: 0.01, wireframe: false}));
        }

        this.addElement(0, 0.80, 0, new THREE.CubeGeometry(1.5, 1.5, 1.5, 5, 5, 5), materials);

        // Ciclo para pode ser possivel alternar entre wireframe e cor solida
        // TODO: Arranjar outra alternativa
        for(var i = 0; i < 6; i++)
          this.addElement(100, 100, 100, new THREE.PlaneGeometry(0.1, 0.1), materials[i]);


        return this;

    }

}
