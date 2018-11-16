class RubikCube extends Objeto{
    constructor(){
        super();

        this.materials = [];
        this.materials2 = [];
        //Vector with the name of the color of each face of the cube
        this.names = [
          "../textures/Red.png", "../textures/Green.png",
          "../textures/Blue.png", "../textures/Orange.png",
          "../textures/White.png", "../textures/Yellow.png"
        ];

        this.textures = [];

        for(var i = 0; i < 6; i++){
          var texture = new THREE.TextureLoader().load( this.names[i] );
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          texture.repeat.set( 3, 3 );
          this.textures.push(texture);
          this.materials.push(new THREE.MeshPhongMaterial( { color: 0xf5f5f5, map: texture, shininess: 10, bumpMap: texture, bumpScale: 0.01, wireframe: false}));
          this.materials2.push(new THREE.MeshBasicMaterial( { color: 0xf5f5f5, map: texture, wireframe: false}));
        }

        this.addElement(0, 0.80, 0, new THREE.CubeGeometry(1.5, 1.5, 1.5, 5, 5, 5), this.materials);
        mesh.material = this.materials2;


        // Ciclo para pode ser possivel alternar entre wireframe e cor solida
        // TODO: Arranjar outra alternativa
        // for(var i = 0; i < 6; i++)
        //   this.addElement(100, 100, 100, new THREE.PlaneGeometry(0.1, 0.1), this.materials[i]);


        return this;

    }

    updateMaterialNoLight(){
      for(var i = 0; i < 6; i++){
        this.materials[i] = new THREE.MeshBasicMaterial({color: 0x696969, map: this.textures[i], wireframe: false});
      }
    }

    updateMaterialLight(){
      for(var i = 0; i < 6; i++){
       this.materials[i] = new THREE.MeshPhongMaterial({color: 0xf5f5f5, map: this.textures[i], shininess: 10, bumpMap: this.textures[i], bumpScale: 0.01, wireframe: false});
      }
    }

}
