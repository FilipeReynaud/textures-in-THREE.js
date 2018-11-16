var material;
var objeto_texto;

class Text extends Objeto {
    constructor(game) {
        super();
        objeto_texto = this;
        material = new THREE.MeshLambertMaterial({color: 0x696969});
        var loader = new THREE.FontLoader();

        loader.load( '../fonts/Helvetica_Regular.json', function (font) {
            objeto_texto.addElement(0, 0, 0, new THREE.TextGeometry( 'PAUSED!', {
                font: font,
                size: 1,
                height: 1,
                curveSegments: 10,
                bevelEnabled: false,
                bevelThickness: 0.01,
                bevelSize: 0.1,
                bevelSegments: 1
            }, material));
        } );

        return this;
    }
}