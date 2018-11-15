class Game{

    constructor(){

        this.table = new Table();
        this.translactionAngle = 0; 
        this.eightBallPool = new EightBallPool();
        scene.add(this.table);
        scene.add(this.eightBallPool);

    }

    moveBall(time) {
        this.translactionAngle += time * Math.PI; 
        this.eightBallPool.position.z = 3 * Math.cos(this.translactionAngle);
        this.eightBallPool.position.x = 3 * Math.sin(this.translactionAngle);
    }

}
