class Table extends Objeto{

    constructor(){
        super();

        this.addElement(0, 0, 0, new THREE.BoxGeometry(10, 0.1, 5, 10, 10, 10), new THREE.MeshLambertMaterial({color: 0x696969}));

        return this;
    }

}
