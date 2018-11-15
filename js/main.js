var camera, scene, airplane, directionalLight;
var width = window.innerWidth;
var height = window.innerHeight;
var clock = new THREE.Clock();
var reset = false;
var paused = false;
var accelaration = 0;
var unpause = false;

function animate(){
    render();
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder
}

function createScene(){
    scene = new THREE.Scene();
    game = new Game();

    scene.add(new THREE.AxesHelper( 10 ));
}

function createCamera(){
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);
}

function render(){
    if (reset) {
        scene.children.splice(scene.children.indexOf(game.eightBallPool), 1);
        game = new Game();
        reset = false;
        paused = false;
    }

    if (paused && !game.paused)
        game.pause();

    if (unpause) {
        game.unpause();
        unpause = false;
    }

    if(game.moveBall(clock.getDelta(), accelaration))
        accelaration = 0;

    game.rotateBall();
    renderer.render(scene, camera);
}

function createLight(){
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 400);
    var helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
    directionalLight.position.set(3, 8, 2);
    directionalLight.rotateY(- Math.PI / 6);
    directionalLight.rotateZ(- Math.PI / 4);
    scene.add(directionalLight);
    scene.add(helper);
}

function onResize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onKeyDown(event) {

    switch(event.keyCode){
        case 65: //Tecla 'a' -> alternar entre wireframe e solid color
            scene.traverse(function (node){
                if(node instanceof THREE.Mesh){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 66: //b
            accelaration = 1;
            break;
        case 82: //r
            if (paused)
                reset = true;
            break;
        case 83: //s
            if (paused)
                unpause = true;
            paused = !paused;
        default: break;
    }
}

function onKeyUp(event) {

    switch(event.keyCode){
        case 66:
            accelaration = -1;
            break;
        default: break;
    }
}

function init(){
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    createLight();
    render();

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keypress', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    controls = new THREE.OrbitControls(camera, renderer.domELement);
    controls.enableKeys = false;
}
