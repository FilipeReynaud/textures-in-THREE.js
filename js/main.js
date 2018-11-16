var camera, orthographicCamera, scene, pauseScene, directionalLight, pointLight;
var width = window.innerWidth;
var height = window.innerHeight;
var clock = new THREE.Clock();
var reset = false;
var paused = false;
var acceleration = 0;
var unpause = false;
var lighting = true;
var translate = false;

var sprite;

function animate(){
    render();
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder
}

function createScenes(){
    scene = new THREE.Scene();

    scene.add(new THREE.AxesHelper( -10 ));

    pauseScene = new THREE.Scene();
    pauseScene.add(new THREE.AxesHelper(-1));

    game = new Game();
}

function createCameras(){
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);

    orthographicCamera = new THREE.OrthographicCamera(-25,25,-25,25,-30,30);
    orthographicCamera.position.set(10,10,10);
    orthographicCamera.lookAt(scene.position);
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
        
    else if (paused)
        clock.getDelta();

    if (unpause) {
        game.unpause();
        unpause = false;
    }

    if(!paused && game.moveBall(clock.getDelta(), acceleration))
        acceleration = 0;

    if(!paused && lighting)
        game.turnOnLighting();

    else if(!paused)
        game.turnOffLighting();

    if(!paused) 
        game.rotateBall();

    if(!directionalLight.visible)
      pointLight.intensity = 4;

    else
      pointLight.intensity = 2;

    if(paused)
        renderer.render(pauseScene, orthographicCamera);
    
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
    pointLight = new THREE.PointLight( 0xFFFFFF, 2 );
    var pointLightHelper = new THREE.PointLightHelper( pointLight, 1);
    pointLight.position.set(-4, 8, -4);
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
        case 68: //d
            directionalLight.visible = !directionalLight.visible;
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
        case 80: //p
            pointLight.visible = !pointLight.visible;
            break;
        case 87: //Tecla 'w' -> alternar entre wireframe e solid color
            scene.traverse(function (node){
                if(node instanceof THREE.Mesh){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        default: break;
    }
}

function init(){
   
    renderer = new THREE.WebGLRenderer();
    renderer.autoClear = false;

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScenes();
    createCameras();
    createLight();
    render();

    //Event listeners
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);

    controls = new THREE.OrbitControls(camera, renderer.domELement);
    controls.enableKeys = false;
}
