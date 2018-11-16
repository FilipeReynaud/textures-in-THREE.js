var camera, scene, directionalLight, pointLight;
var width = window.innerWidth;
var height = window.innerHeight;
var clock = new THREE.Clock();
var reset = false;
var paused = false;
var acceleration = 0;
var unpause = false;
var lighting = true;
var translate = false;

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
    game.refreshTextPosition();
    if (reset) {
        scene.children.splice(scene.children.indexOf(game.eightBallPool), 1);
        game.unpause();
        game = new Game();
        reset = false;
        paused = false;
        translate = false;
        acceleration = 0;
    }

    if (paused && !game.paused)
        game.pause();
        
    else if (paused) {
        clock.getDelta();
        return;
    }

    if (unpause) {
        game.unpause();
        unpause = false;
    }

    if(game.moveBall(clock.getDelta(), acceleration))
        acceleration = 0;

    if(lighting)
        game.turnOnLighting();
    else
        game.turnOffLighting();
    game.rotateBall();
    renderer.render(scene, camera);
}

function createLight(){
    // DirectionalLight
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
    var helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
    directionalLight.position.set(3, 8, 2);
    directionalLight.rotateY(- Math.PI / 6);
    directionalLight.rotateZ(- Math.PI / 4);
    scene.add(directionalLight);
    scene.add(helper);

    // PointLight
    pointLight = new THREE.PointLight( 0xFFFFFF, 1, 10000 );
    var pointLightHelper = new THREE.PointLightHelper( pointLight, 1);
    pointLight.position.set(-6, 6, -6);
    scene.add( pointLight );
    scene.add( pointLightHelper );
}

function onResize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onKeyDown(event) {

    switch(event.keyCode) {
        case 66: //b
            if (!paused){
              acceleration = (translate) ? -1 : 1;
              translate = !translate;
            }
            break;
        case 82: //r
            if (paused)
                reset = true;
            break;
        case 83: //s
            if (paused)
                unpause = true;
            paused = !paused;
            break;
        case 76: //l
            lighting = !lighting;
            break;
        default: break;
        case 87: //Tecla 'w' -> alternar entre wireframe e solid color
            scene.traverse(function (node){
                if(node instanceof THREE.Mesh){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
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

    controls = new THREE.OrbitControls(camera, renderer.domELement);
    controls.enableKeys = false;
}
