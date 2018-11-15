const MAX_VELOCITY = 15; 

class Game{

    constructor(){
        this.table = new Table();
        this.translactionAngle = 0; 
        this.translactionVelocity = 0;
        this.eightBallPool = new EightBallPool();
        scene.add(this.table);
        scene.add(this.eightBallPool);

    }

    moveBall(time, accelaration) {
        if(this.translactionVelocity >= MAX_VELOCITY)
            this.translactionVelocity = MAX_VELOCITY;
        else if (-this.translactionVelocity >= MAX_VELOCITY)
            this.translactionVelocity = -MAX_VELOCITY;
        else
            this.translactionVelocity += time * accelaration;

            this.translactionAngle += this.translactionVelocity * time;
        this.prevX = this.eightBallPool.position.x;
        this.prevZ = this.eightBallPool.position.z;
        this.eightBallPool.position.z = 3 * Math.cos(this.translactionAngle);
        this.eightBallPool.position.x = 3 * Math.sin(this.translactionAngle);
    }

    rotateBall(time, accelaration){
    	var quaternion = new THREE.Quaternion();
    	var angle = this.translactionVelocity;

    	console.log(time);
    	console.log(angle);

    	quaternion.setFromAxisAngle(new THREE.Vector3(this.eightBallPool.position.z - this.prevZ, 0, -(this.eightBallPool.position.x - this.prevX)).normalize(), angle/10);
    	this.eightBallPool.children[0].applyQuaternion(quaternion);
   	}


}
