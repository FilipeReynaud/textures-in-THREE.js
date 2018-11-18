var camera, orthographicCamera, scene, pauseScene, directionalLight, pointLight;
var width = window.innerWidth;
var height = window.innerHeight;
var clock = new THREE.Clock();
var reset = false;
var paused = false;
var acceleration = 0;
var lighting = true;
var translate = false;
var wire = false;

function animate(){
    render();
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder
}

function createScenes(){
    //Main scene
    scene = new THREE.Scene();

    scene.add(new THREE.AxesHelper( -10 ));
    
    //Pause scene
    pauseScene = new THREE.Scene();
    pauseScene.add(new THREE.AxesHelper(100));

    game = new Game();
}

function createCameras(){
    //Main scene camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);

    //Pause scene camera
    orthographicCamera = new THREE.OrthographicCamera(-25,25,-25,25,-30,30);
    orthographicCamera.position.set(10,10,10);
    orthographicCamera.lookAt(scene.position);
}

function render(){

    //Reset
    if ( reset ) {
        scene.children.splice(scene.children.indexOf(game.eightBallPool), 1);
        game = new Game();
        reset = false;
        paused = false;
        translate = false;
        acceleration = 0;
    }

    //Ball movement
    if( !paused && game.moveBall(clock.getDelta(), acceleration) )
        acceleration = 0;

    if( !paused )
        game.rotateBall();

    //Point light
    if( lighting && !paused )
        game.turnOnLighting();

    else if ( !lighting && !paused )
        game.turnOffLighting();

    //Directional light
    if( directionalLight.visible && !paused )
        pointLight.intensity = 2;

    else if ( !directionalLight.visible && !paused )
        pointLight.intensity = 4;

    //Render
    if ( paused ) {
        clock.getDelta();
        renderer.render(pauseScene, orthographicCamera);
    }

    renderer.render(scene, camera);
}

function createLight(){
    // DirectionalLight
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
    directionalLight.position.set(3, 8, 2);
    directionalLight.rotateY(- Math.PI / 6);
    directionalLight.rotateZ(- Math.PI / 4);
    scene.add(directionalLight);

    scene.add(new THREE.DirectionalLightHelper( directionalLight, 1 ));

    // PointLight
    pointLight = new THREE.PointLight( 0xFFFFFF, 2 );
    pointLight.position.set(-4, 8, -4);
    scene.add( pointLight );

    scene.add( new THREE.PointLightHelper( pointLight, 1) );
}

function onResize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onKeyDown(event) {

    switch(event.keyCode) {
        case 66: //Tecla 'b' -> alterar o estado de movimento da bola
            if (!paused){
              acceleration = (translate) ? -1 : 1;
              translate = !translate;
            }
            break;

        case 68: //Tecla 'd' -> liga/desliga luz direcional
            if ( lighting && !paused )
                directionalLight.visible = !directionalLight.visible;
            break;

        case 76: //Tecla 'l' -> liga/desliga calculo de iluminacao
            if (!paused)
              lighting = !lighting;
            break;

        case 80: //Tecla 'p' -> liga/desliga luz pontual
            if ( lighting && !paused )
                pointLight.visible = !pointLight.visible;
            break;

        case 82: //Tecla 'r' -> refresh do jogo
            if (paused)
                reset = true;
            break;
            
        case 83: //Tecla 's' -> coloca jogo em pausa
            paused = !paused;
            break;

        case 87: //Tecla 'w' -> alternar entre wireframe e solid color
            if (!paused){
              scene.traverse(function (node){
                  if(node instanceof THREE.Mesh){
                      node.material.wireframe = !node.material.wireframe;
                  }
              });
              wire = !wire;
            }
            break;

        default: break;
    }
}

function init(){

    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScenes();
    createCameras();
    createLight();
    render();

    //Event listeners
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);

    //Prevents renderer from deleting pause scene when pause mode is on 
    renderer.autoClear = false; 

    controls = new THREE.OrbitControls(camera, renderer.domELement);
    controls.enableKeys = false;

}
