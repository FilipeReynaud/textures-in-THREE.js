var camera, scene, airplane, directionalLight;
var width = window.innerWidth;
var height = window.innerHeight;

function animate(){
    render();
    requestAnimationFrame(animate); //Pede ao browser para correr esta funcao assim que puder
}

function createScene(){
    scene = new THREE.Scene();
    game = new Game();

    scene.add(new THREE.AxesHelper( 1 ));
}

function createCamera(){
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);}

function render(){
    renderer.render(scene, camera);
}

function createLight(){
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    var helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
    directionalLight.position.set(3, 4, 2);
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
      default: break;
    }
}

function onKeyUp(event) {

    switch(event.keyCode){
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
