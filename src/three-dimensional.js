import {
  AmbientLight,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new Scene();
scene.background = new Color(0xdddddd);

const camera = new PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.rotation.y = (45 / 180) * Math.PI;
camera.position.x = 900;
camera.position.y = 200;
camera.position.z = 1000;

const ambientLight = new AmbientLight(0x404040, 100);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight1 = new PointLight(0xc4c4c4, 10);
pointLight1.position.set(0, 300, 500);
scene.add(pointLight1);

const pointLight2 = new PointLight(0xc4c4c4, 10);
pointLight2.position.set(500, 1000, 0);
scene.add(pointLight2);

const pointLight3 = new PointLight(0xc4c4c4, 10);
pointLight3.position.set(0, 100, -500);
scene.add(pointLight3);

const pointLight4 = new PointLight(0xc4c4c4, 10);
pointLight4.position.set(-500, 300, 0);
scene.add(pointLight4);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000, 1);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", renderer);

const gltfLoader = new GLTFLoader();

gltfLoader.load("assets/forest_house/scene.gltf", (gltf) => {
  const bike = gltf.scene.children[0];
  bike.scale.set(0.5, 0.5, 0.5);

  console.log("loaded");
  scene.add(gltf.scene);
  //   renderer.render(scene, camera);

  animate();
});

const animate = () => {
  //   controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
