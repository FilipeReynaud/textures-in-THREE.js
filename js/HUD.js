class HUD extends Objeto {
    constructor() {
        super();
        var texture = new THREE.TextureLoader().load('../textures/paused.jpg');
        var HUD_material = new THREE.MeshBasicMaterial( {color: 0xffff00, map: texture, wireframe: false, side: THREE.DoubleSide});
        this.addElement(0,0,0, new THREE.PlaneGeometry( 20, 20, 32 ),  HUD_material);
        //this.add(new THREE.AxesHelper(10));
        this.rotation.y = 5 * Math.PI / 4;
        this.rotation.z = Math.PI;
        
        return this;
    }
}
