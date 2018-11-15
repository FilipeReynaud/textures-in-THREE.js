const MAX_VELOCITY = 15;

class Game{

    constructor(){

        this.table = new Table();

        this.cube = new RubikCube();
        scene.add(this.table);
        scene.add(this.cube);
        this.translactionAngle = 0;
        this.translactionVelocity = 0;
        this.eightBallPool = new EightBallPool();
        scene.add(this.table);
        scene.add(this.eightBallPool);

    }

    moveBall(time, accelaration) {
        if (this.translactionVelocity < 0) {
            this.translactionVelocity = 0;
            return true;
        }
        else if(this.translactionVelocity >= MAX_VELOCITY)
            this.translactionVelocity = MAX_VELOCITY;
        else
            this.translactionVelocity += time * accelaration;
        this.translactionAngle += this.translactionVelocity * time;
        this.eightBallPool.position.z = 3 * Math.cos(this.translactionAngle);
        this.eightBallPool.position.x = 3 * Math.sin(this.translactionAngle);
        return false;
    }

    rotateBall(){
    	var quaternion = new THREE.Quaternion();
    	var angle = this.translactionVelocity;

    	quaternion.setFromAxisAngle(new THREE.Vector3(this.translactionVelocity, 0, this.translactionVelocity).normalize(), angle/10);
    	this.eightBallPool.children[0].applyQuaternion(quaternion);
   	}


}
