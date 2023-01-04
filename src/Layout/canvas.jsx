import gsap from "gsap";
import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import SwatchWrapper from "./swatchWrapper";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMesh: {},
      currentScene: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeData, rotateClick } = this.props;
    if (prevProps.activeData !== activeData) {
      this.applyMaterial(activeData);
    }
    if (prevProps.rotateClick !== rotateClick) {
      this.swtchControls(rotateClick);
    }
  }

  componentDidMount() {
    this.InitialSetup();
  }
  InitialSetup = () => {
    const { handleLoading, rotateClick } = this.props;

    this.container = document.getElementById("container");
    const item = document.getElementById("container").getBoundingClientRect();

    this.sizes = {
      width: item.width,
      height: item.height,
    };

    this.canvas = document.querySelector("canvas.webgl");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      10,
      5000
    );
    this.camera.position.set(150, 20, 100);
    this.scene.add(this.camera);

    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const ProgressVal = (itemsLoaded / itemsTotal) * 100;
      if (ProgressVal === 100) {
        handleLoading();
      }
    };

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    // this.controls.addEventListener('change', () => {});
    // this.controls.maxDistance = 150;
    // this.controls.minDistance = 100;
    this.controls.enableDamping = true;
    this.controls.autoRotate = rotateClick;
    this.controls.autoRotateSpeed = 3;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.minPolarAngle = -Math.PI / 2;
    //this.controls.maxPolarAngle = Math.PI / 1.9;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;

    this.loadHDR();
    this.addModel();
    window.addEventListener("resize", this.resize);

    const render = () => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(render);
    };
    render();
  };
  resize = () => {
    this.sizes.width = this.container.offsetWidth;
    this.sizes.height = this.container.offsetHeight;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  };

  loadHDR = () => {
    new RGBELoader(this.manager)
      .setDataType(THREE.HalfFloatType)
      .load("default.hdr", (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.needsUpdate = true;
        // this.scene.background = texture;
        this.scene.environment = texture;
        texture.dispose();
      });
  };

  addModel = () => {
    const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`;
    const DRACO_LOADER = new DRACOLoader(this.manager).setDecoderPath(
      `${THREE_PATH}/examples/js/libs/draco/gltf/`
    );

    const chair = "advance.glb";
    const GLtfLoader = new GLTFLoader(this.manager).setDRACOLoader(
      DRACO_LOADER
    );
    GLtfLoader.load(chair, (gltf) => {
      gltf.scene.position.set(0, -30, 0);
      gltf.scene.rotation.set(0, -1, 0);
      gltf.scene.scale.set(25, 25, 25);
      gltf.scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.needsUpdate = true;
        }
      });
      this.scene.add(gltf.scene);
    });
  };

  swtchControls = (params) => {
    this.controls.autoRotate = params;
  };

  applyMaterial = (data) => {
    this.scene.traverse((element) => {
      if (element.isMesh) {
        Object.entries(data.itemList).forEach((mesh) => {
          if (mesh[0] === element.name) {
            var value = new THREE.Color(mesh[1].color).convertSRGBToLinear();
            gsap.to(element.material.color, {
              r: value.r,
              g: value.g,
              b: value.b,
              ease: "power3.inOut",
              duration: 0.8,
            });
            element.material.needsUpdate = true;
          }
        });
      }
    });

    gsap.to(".canvas-bg", {
      backgroundColor: data.buttonColor.background,
      ease: "power3.inOut",
      duration: 0.8,
    });
  };

  render() {
    const { activeData, watchData, handlesWatchClick, handleRotateClick } =
      this.props;

    console.log(activeData);
    return (
      <div className="canvas-container" id="container">
        <canvas className="canvas webgl"></canvas>
        <SwatchWrapper
          activeData={activeData}
          watchData={watchData}
          handlesWatchClick={handlesWatchClick}
        ></SwatchWrapper>
        <div className="canvas-btn center">
          <button className="rotate-btn center" onClick={handleRotateClick}>
            <span>rotate</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
              <path d="m17.45 38.5-1.65-1.65 4.25-4.3q-6.4-.75-10.725-3.05Q5 27.2 5 23.8q0-3.55 5.55-6.1T24 15.15q7.95 0 13.475 2.55Q43 20.25 43 23.8q0 2.5-2.95 4.55t-7.85 3.2v-2.4q4-1 6.275-2.575Q40.75 25 40.75 23.8q0-1.7-4.225-4.05Q32.3 17.4 24 17.4t-12.525 2.35Q7.25 22.1 7.25 23.8q0 2.05 3.175 3.75 3.175 1.7 9.825 2.85L15.8 26l1.65-1.65 7.05 7.05Z" />
            </svg>
          </button>
        </div>
        <div className="canvas-bg"></div>
      </div>
    );
  }
}

export default Canvas;
