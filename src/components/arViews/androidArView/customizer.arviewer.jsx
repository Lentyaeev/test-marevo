import * as THREE from "three"
import { ARButton } from "../../../helpers/WebXR/ARButton"

export class ARViewer {
  constructor() {
    this.init()
    this.animate()
  }

  init = () => {
    document.getElementById("WebXR")?.remove()
    this.container = document.createElement("div")
    this.container.id = "WebXR"
    this.container.style.position = "fixed"
    this.container.style.top = "0"
    this.container.style.left = "0"
    this.container.style.zIndex = "-1"
    document.body.appendChild(this.container)
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    )
    this.camera.updateProjectionMatrix()

    this.initLight()

    //

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.renderer.xr.enabled = true

    this.container.appendChild(this.renderer.domElement)

    document.getElementById("ARbutton")?.remove()
    this.button = ARButton.createButton(this.renderer)
    // document.body.append(this.button)

    //

    this.controller = this.renderer.xr.getController(0)
    this.controller.addEventListener("select", this.onSelect)
    this.controller.addEventListener("selectstart", this.onSelectStart)
    this.controller.addEventListener("selectend", this.onSelectEnd)
    this.scene.add(this.controller)

    //

    window.addEventListener("resize", this.onWindowResize)
    this.hideCanvas()
  }

  onSelectStart = () => {
    const animateRotation = () => {
      this.animation = setInterval(() => {
        if (
          this.scene.children.some(child => child.uuid === this.object.uuid)
        ) {
          this.object.rotateY(0.05)
        }
      }, 20)
    }
    this.timeout = setTimeout(() => {
      animateRotation()
    }, 300)
  }

  onSelectEnd = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    if (this.animation) {
      clearInterval(this.animation)
    }
  }

  initLight = () => {
    this.fl_light = new THREE.DirectionalLight(0xbfbfbf, 0.6)
    this.fr_light = new THREE.DirectionalLight(0xbfbfbf, 0.6)
    this.bl_light = new THREE.DirectionalLight(0xbfbfbf, 0.6)
    this.br_light = new THREE.DirectionalLight(0xbfbfbf, 0.6)
    this.fl_light.position.set(-7.5, 10, 7.5)
    this.fr_light.position.set(7.5, 10, 7.5)
    this.bl_light.position.set(-7.5, 10, -7.5)
    this.br_light.position.set(7.5, 10, -7.5)
    this.ambient = new THREE.AmbientLight(0xffffff, 0.1)

    this.scene.add(this.fl_light)
    this.scene.add(this.fr_light)
    this.scene.add(this.bl_light)
    this.scene.add(this.br_light)
    this.scene.add(this.ambient)
  }

  clickButton = () => {
    if (this.button) {
      this.button.click()
    }
  }

  hideCanvas = () => {
    const container = document.getElementById("WebXR")
    if (container) {
      container.style.display = "none"
    }
  }

  showCanvas = () => {
    const container = document.getElementById("WebXR")
    if (container) {
      container.style.display = ""
    }
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  onSelect = () => {
    this.object.position
      .set(0, 0, -0.3)
      .applyMatrix4(this.controller.matrixWorld)
    if (this.scene.children.some(child => child.uuid !== this.object.uuid)) {
      this.scene.add(this.object)
    }
  }

  setModel = mesh => {
    this.scene.remove(this.object)
    this.object = mesh.clone()
    this.object.scale.set(1, 1, 1)
    // this.object.translateY(-20000);
    // this.object.rotation.set(0, 0, 0);
    this.object.updateMatrix()
    this.object.updateMatrixWorld()
    this.object.castShadow = true
  }

  render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  animate = () => {
    this.renderer.setAnimationLoop(this.render)
  }
}
