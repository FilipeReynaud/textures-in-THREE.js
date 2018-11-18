class RubikCube extends Objeto{
    constructor(){
        super();

        //Array wiht Phong Materials
        this.materials = [];
        //Array wiht Basic Materials
        this.materials2 = [];
        //Array with the name of the color of each face of the cube
        this.names = [
          "../textures/Red.png", "../textures/Green.png",
          "../textures/Blue.png", "../textures/Orange.png",
          "../textures/White.png", "../textures/Yellow.png"
        ];

        for(var i = 0; i < 6; i++){
          // Create Texture and properties
          var texture = new THREE.TextureLoader().load( this.names[i] );
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();  //fixes blury effect
          texture.repeat.set( 3, 3 );

          //Create material and assing texture
          this.materials.push(new THREE.MeshPhongMaterial( { color: 0xf5f5f5, map: texture, shininess: 10, bumpMap: texture, bumpScale: 0.01, wireframe: false}));
          this.materials2.push(new THREE.MeshBasicMaterial( { color: 0xf5f5f5, map: texture, wireframe: false}));
        }

        //Create object
        this.addElement(0, 0.80, 0, new THREE.CubeGeometry(1.5, 1.5, 1.5, 5, 5, 5), this.materials);

        return this;
    }

    updateMaterialNoLight(){
      for(var i = 0; i < 6; i++)
        this.materials2[i].wireframe = wire;
      this.children[0].material = this.materials2;

    }

    updateMaterialLight(){
      for(var i = 0; i < 6; i++)
        this.materials[i].wireframe = wire;
      this.children[0].material = this.materials;
    }

}