class Sprite extends Objeto {
    constructor() {
        super();
        var spriteMap = new THREE.TextureLoader().load("../textures/paused.jpg");
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        this.sprite = new THREE.Sprite( spriteMaterial );
        return this;
    }
}