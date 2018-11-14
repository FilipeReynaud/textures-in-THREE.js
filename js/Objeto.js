var mesh;

class Objeto extends THREE.Object3D {

    constructor() {
        super();
    }

    createMesh(geometry, material, x, y, z) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);

        return mesh;
    }

    addElement(x, y, z, geometry, material) {
		    this.add(this.createMesh(geometry, material, x, y, z));
        //scene.add(mesh);
    }

}
