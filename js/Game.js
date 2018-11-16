const MAX_VELOCITY = 15;
var object;
class Game{

    constructor(){
        this.table = new Table();
        this.cube = new RubikCube();
        this.message = new Text();
        this.eightBallPool = new EightBallPool();

        scene.add(this.table);
        scene.add(this.cube);
        scene.add(this.table);
        scene.add(this.eightBallPool);

        this.translactionAngle = 0;
        this.translactionVelocity = 0;
        object = this;
    }

    moveBall(time, acceleration) {
        if (this.translactionVelocity < 0) {
            this.translactionVelocity = 0;
            return true;
        }
        else if(this.translactionVelocity >= MAX_VELOCITY && acceleration != -1)
            this.translactionVelocity = MAX_VELOCITY;
        else
            this.translactionVelocity += time * acceleration;

        this.translactionAngle += this.translactionVelocity * time;
        this.prevX = this.eightBallPool.position.x;
        this.prevZ = this.eightBallPool.position.z;
        this.eightBallPool.position.z = 3 * Math.cos(this.translactionAngle);
        this.eightBallPool.position.x = 3 * Math.sin(this.translactionAngle);
        return false;
    }

    rotateBall(){
        var quaternion = new THREE.Quaternion();
        var angle = this.translactionVelocity;


        quaternion.setFromAxisAngle(new THREE.Vector3(this.eightBallPool.position.z - this.prevZ, 0, -(this.eightBallPool.position.x - this.prevX)).normalize(), angle/10);
        this.eightBallPool.children[0].applyQuaternion(quaternion);
    }

    refreshTextPosition() {
        this.message.position.copy( camera.position );
        this.message.rotation.copy( camera.rotation );
        this.message.updateMatrix();
        this.message.translateZ( - 10 );
        this.message.translateX( - 3 );
    }

    pause() {
        scene.add(this.message);
        this.refreshTextPosition();
        this.message.add(new THREE.AxesHelper(30));
        this.paused = true;
    }

    turnOffLighting(){
    	this.table.updateMaterialNoLight();
    	console.log(this.table);
    	this.eightBallPool.updateMaterialNoLight();
    	this.cube.updateMaterialNoLight();
    }

    turnOnLighting(){
    	this.table.updateMaterialLight();
    	this.eightBallPool.updateMaterialLight();
    	this.cube.updateMaterialLight();
    }

    unpause() {
        this.paused = false;
        scene.children.splice(scene.children.indexOf(this.message), 1);
    }
}
