import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'


// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth / 2,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth / 2
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

let utime = 0
function updateUniforms() {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh
            && child.material.type === 'ShaderMaterial') {
            child.material.uniforms.time.value = utime;
            child.material.needsUpdate = true;
        }
    });
}
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    utime += 0.01
    // Update Orbital Controls
    // controls.update()
    updateUniforms()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



// Objects
const geometry = new THREE.SphereBufferGeometry( 1.5, 32 ,32 );
// const sphere = new THREE.SphereBufferGeometry( 0.4, 32 ,32 );

// Materials

const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: utime }
    },
    vertexShader:   document.getElementById('vertex').textContent,
    fragmentShader: document.getElementById('fragment').textContent,
    side: THREE.DoubleSide,
});

// const sphereMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//         time: { value: utime },
//         tCube: {value: 0},
//     },
//     vertexShader:   document.getElementById('sphere-vertex').textContent,
//     fragmentShader: document.getElementById('sphere-fragment').textContent,
//     side: THREE.DoubleSide,
// });

// Mesh
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

// const sphereMesh = new THREE.Mesh(sphere,sphereMaterial)
// scene.add(sphereMesh)