import {
  Clock,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";

let clock;
let portalParticles = [];

const scene = new Scene();

console.log({ portalParticles });

const renderer = new WebGLRenderer();
renderer.setClearColor(0x000000, 1);
renderer.setSize(window.innerWidth, window.innerHeight);

const sceneLight = new DirectionalLight(0xffffff, 0.5);
sceneLight.position.set(0, 0, 1);
scene.add(sceneLight);

const pointLight = new PointLight(0x062d89, 30, 350, 2);
pointLight.position.set(0, 0, 250);
scene.add(pointLight);

const camera = new PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight
);
camera.position.z = 1000;
scene.add(camera);

document.body.appendChild(renderer.domElement);

const loader = new TextureLoader();

loader.load("smoke1.png", (texture) => {
  const portalGeometry = new PlaneGeometry(350, 350);
  const portalMaterial = new MeshStandardMaterial({
    map: texture,
    transparent: true,
  });

  for (let p = 850; p > 250; p--) {
    const particle = new Mesh(portalGeometry, portalMaterial);
    particle.position.set(
      0.5 * p * Math.cos((4 * p * Math.PI) / 180),
      0.5 * p * Math.sin((4 * p * Math.PI) / 180),
      0.1 * p
    );
    particle.rotation.z = Math.random() * 360;
    portalParticles.push(particle);
    scene.add(particle);
  }

  renderer.render(scene, camera);
  clock = new Clock();

  animate();
});

const animate = () => {
  const delta = clock.getDelta();

  portalParticles.forEach((p) => {
    console.log({ p });
    p.rotation.z -= delta * 1.5;
  });

  if (Math.random() > 0.9) {
    pointLight.power = 350 + Math.random() * 100;
  }

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};
