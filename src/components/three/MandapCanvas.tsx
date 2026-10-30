import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MANDAP_THEMES } from '../../data/weddingData';
import { MandapThemeConfig, Language } from '../../types/wedding';
import { buildMandapScene, MandapHierarchy } from './createMandapModel';
import { createPetalSystem, PetalSystem } from './createPetalSystem';
import {
  Sparkles,
  Layers,
  Sun,
  Sunset,
  Moon,
  Flame,
  Camera,
  RotateCcw,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Eye,
  Info,
} from 'lucide-react';

interface MandapCanvasProps {
  language: Language;
  onOpenConsultation?: () => void;
  isFullScreenMode?: boolean;
  onToggleFullScreen?: () => void;
}

export type TimeOfDay = 'day' | 'sunset' | 'night';

export type CameraPreset = 'front' | 'closeup' | 'thrones' | 'birdsEye';

export const MandapCanvas: React.FC<MandapCanvasProps> = ({
  language,
  onOpenConsultation,
  isFullScreenMode = false,
  onToggleFullScreen,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // UI state
  const [activeThemeKey, setActiveThemeKey] = useState<string>('royal');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [explodeFactor, setExplodeFactor] = useState<number>(0);
  const [petalShowerActive, setPetalShowerActive] = useState<boolean>(true);
  const [fireActive, setFireActive] = useState<boolean>(true);
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(true);
  const [activeCameraPreset, setActiveCameraPreset] = useState<CameraPreset>('front');
  const [activeTab, setActiveTab] = useState<'theme' | 'lighting' | 'inspect' | 'camera'>('theme');

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const mandapRef = useRef<MandapHierarchy | null>(null);
  const petalsRef = useRef<PetalSystem | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);

  // Smooth camera animation target
  const cameraTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 3.2, 9.5));
  const cameraTargetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.8, 0));
  const isTransitioningCamera = useRef<boolean>(false);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL from GPU renderer string
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Scene & Renderer setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const currentTheme = MANDAP_THEMES[activeThemeKey] || MANDAP_THEMES.royal;
    scene.background = new THREE.Color(currentTheme.skyColor);
    scene.fog = new THREE.FogExp2(currentTheme.fogColor, 0.022);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.set(0, 3.2, 9.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Studio PBR Environment Map
    try {
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
    } catch {
      // Fallback ambient
    }

    // 4. Lighting Rig (Warm key light, Cool hemisphere fill)
    const hemiLight = new THREE.HemisphereLight(0xfff5ea, 0x334455, 0.7);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const keyLight = new THREE.DirectionalLight(0xfff0dd, 2.2);
    keyLight.position.set(8, 14, 10);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 30;
      keyLight.shadow.camera.left = -6;
      keyLight.shadow.camera.right = 6;
      keyLight.shadow.camera.top = 6;
      keyLight.shadow.camera.bottom = -6;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Fill soft rim light
    const rimLight = new THREE.DirectionalLight(0xffeedd, 0.8);
    rimLight.position.set(-8, 6, -8);
    scene.add(rimLight);

    // 5. Build Procedural Mandap Hierarchy
    const mandap = buildMandapScene(currentTheme, isSoftwareGl);
    scene.add(mandap.rootGroup);
    mandapRef.current = mandap;

    // 6. Flower Petals Shower System
    const petals = createPetalSystem(160, isSoftwareGl);
    scene.add(petals.mesh);
    petalsRef.current = petals;

    // 7. Ground lawn extension with subtle border
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f291c, // Lush royal lawn
      roughness: 0.95,
      metalness: 0.0,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.01;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // 8. OrbitControls with Damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.03; // Don't go below ground
    controls.minDistance = 3.5;
    controls.maxDistance = 16.0;
    controls.target.set(0, 1.8, 0);
    controlsRef.current = controls;

    // Cancel camera preset scripting on manual drag
    controls.addEventListener('start', () => {
      isTransitioningCamera.current = false;
    });

    // 9. Resize observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update models & petals
      mandap.updateAnimation(elapsedTime);
      petals.update(delta);

      // Smooth camera transition if active
      if (isTransitioningCamera.current) {
        camera.position.lerp(cameraTargetPos.current, 0.04);
        controls.target.lerp(cameraTargetLookAt.current, 0.04);

        if (camera.position.distanceTo(cameraTargetPos.current) < 0.05) {
          isTransitioningCamera.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      mandap.dispose();
      petals.dispose();
      renderer.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Theme in real-time
  useEffect(() => {
    const theme = MANDAP_THEMES[activeThemeKey];
    if (!theme || !mandapRef.current || !sceneRef.current) return;

    mandapRef.current.updateTheme(theme);
    sceneRef.current.background = new THREE.Color(
      timeOfDay === 'night' ? 0x090d16 : timeOfDay === 'sunset' ? 0xfddec0 : theme.skyColor
    );
    if (sceneRef.current.fog) {
      sceneRef.current.fog.color = new THREE.Color(
        timeOfDay === 'night' ? 0x0b1120 : timeOfDay === 'sunset' ? 0xf7c4a5 : theme.fogColor
      );
    }
  }, [activeThemeKey, timeOfDay]);

  // Update Explode factor in real-time
  useEffect(() => {
    if (mandapRef.current) {
      mandapRef.current.updateExplode(explodeFactor);
    }
  }, [explodeFactor]);

  // Update Petal Shower toggle
  useEffect(() => {
    if (petalsRef.current) {
      petalsRef.current.setVisible(petalShowerActive);
    }
  }, [petalShowerActive]);

  // Update Sacred Fire toggle
  useEffect(() => {
    if (mandapRef.current) {
      mandapRef.current.flameMesh.visible = fireActive;
      mandapRef.current.flameLight.visible = fireActive;
    }
  }, [fireActive]);

  // Update Time of Day Lighting
  useEffect(() => {
    if (!keyLightRef.current || !hemiLightRef.current || !sceneRef.current) return;
    const currentTheme = MANDAP_THEMES[activeThemeKey] || MANDAP_THEMES.royal;

    if (timeOfDay === 'day') {
      keyLightRef.current.color.setHex(0xfff0dd);
      keyLightRef.current.intensity = 2.2;
      keyLightRef.current.position.set(8, 14, 10);
      hemiLightRef.current.color.setHex(0xfff5ea);
      hemiLightRef.current.groundColor.setHex(0x334455);
      hemiLightRef.current.intensity = 0.7;
      sceneRef.current.background = new THREE.Color(currentTheme.skyColor);
      if (sceneRef.current.fog) sceneRef.current.fog.color = new THREE.Color(currentTheme.fogColor);
      mandapRef.current?.diyaLights.forEach((dl) => (dl.intensity = 0.5));
    } else if (timeOfDay === 'sunset') {
      keyLightRef.current.color.setHex(0xff8c42);
      keyLightRef.current.intensity = 2.8;
      keyLightRef.current.position.set(12, 6, 8);
      hemiLightRef.current.color.setHex(0xffaa77);
      hemiLightRef.current.groundColor.setHex(0x442233);
      hemiLightRef.current.intensity = 0.55;
      sceneRef.current.background = new THREE.Color(0xfddec0);
      if (sceneRef.current.fog) sceneRef.current.fog.color = new THREE.Color(0xf7c4a5);
      mandapRef.current?.diyaLights.forEach((dl) => (dl.intensity = 1.0));
    } else {
      // Night
      keyLightRef.current.color.setHex(0x7799cc);
      keyLightRef.current.intensity = 0.5;
      keyLightRef.current.position.set(4, 10, 6);
      hemiLightRef.current.color.setHex(0x1a2536);
      hemiLightRef.current.groundColor.setHex(0x05070a);
      hemiLightRef.current.intensity = 0.3;
      sceneRef.current.background = new THREE.Color(0x070b14);
      if (sceneRef.current.fog) sceneRef.current.fog.color = new THREE.Color(0x090f1d);
      mandapRef.current?.diyaLights.forEach((dl) => (dl.intensity = 1.8));
    }
  }, [timeOfDay, activeThemeKey]);

  // Set Camera Preset
  const applyCameraPreset = useCallback((preset: CameraPreset) => {
    setActiveCameraPreset(preset);
    isTransitioningCamera.current = true;

    if (preset === 'front') {
      cameraTargetPos.current.set(0, 3.2, 9.5);
      cameraTargetLookAt.current.set(0, 1.8, 0);
    } else if (preset === 'closeup') {
      cameraTargetPos.current.set(0, 2.0, 5.0);
      cameraTargetLookAt.current.set(0, 1.4, 0);
    } else if (preset === 'thrones') {
      cameraTargetPos.current.set(0, 1.6, 2.8);
      cameraTargetLookAt.current.set(0, 1.3, -1.5);
    } else if (preset === 'birdsEye') {
      cameraTargetPos.current.set(5.5, 9.5, 8.5);
      cameraTargetLookAt.current.set(0, 1.5, 0);
    }
  }, []);

  return (
    <div className={`relative w-full overflow-hidden select-none bg-stone-950 ${isFullScreenMode ? 'fixed inset-0 z-50 h-screen' : 'h-[620px] md:h-[720px] rounded-2xl shadow-2xl border border-stone-800'}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 size-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Overlay Bar (Spec Badge & Fullscreen) */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-700/80 text-stone-200 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium shadow-lg pointer-events-auto">
          <span className="size-2 rounded-full bg-rose-500" />
          <span className="font-semibold text-rose-300">
            {language === 'hi' ? '3D मंडप डिज़ाइनर' : '3D Mandap Studio'}
          </span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-400">
            {language === 'hi' ? MANDAP_THEMES[activeThemeKey].nameHi.split('(')[0] : MANDAP_THEMES[activeThemeKey].nameEn}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {onToggleFullScreen && (
            <button
              onClick={onToggleFullScreen}
              className="grid size-9 place-items-center rounded-full bg-stone-900/90 border border-stone-700/80 text-stone-300 hover:text-white hover:bg-stone-800 transition"
              title={isFullScreenMode ? (language === 'hi' ? 'सामान्य स्क्रीन' : 'Exit Fullscreen') : (language === 'hi' ? 'फुलस्क्रीन' : 'Fullscreen')}
            >
              <Maximize2 className="size-4" />
            </button>
          )}

          <button
            onClick={() => applyCameraPreset('front')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/80 text-xs text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <RotateCcw className="size-3.5" />
            <span>{language === 'hi' ? 'रीसेट कैमरा' : 'Reset View'}</span>
          </button>
        </div>
      </div>

      {/* Helpful hint for first interaction */}
      <div className="absolute top-16 left-4 hidden md:flex items-center gap-2 text-stone-400 text-xs bg-stone-900/80 px-3 py-1 rounded-md border border-stone-800 pointer-events-none">
        <Info className="size-3.5 text-amber-400" />
        <span>{language === 'hi' ? '360° घुमाने के लिए ड्रैग करें • ज़ूम के लिए स्क्रॉल करें' : 'Drag to rotate 360° • Scroll to zoom'}</span>
      </div>

      {/* Viewport-First Collapsible Bottom Control Dock (<= 15% footprint) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl z-20 pointer-events-auto">
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsControlsOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-4 py-1 text-xs font-semibold rounded-full bg-stone-900/95 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 shadow-md transition"
          >
            {isControlsOpen ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
            <span>{isControlsOpen ? (language === 'hi' ? 'कंट्रोल छुपाएं' : 'Hide Controls') : (language === 'hi' ? 'मंडप कस्टमाइज़ करें' : 'Customize Mandap')}</span>
          </button>
        </div>

        {/* Collapsible Panel */}
        {isControlsOpen && (
          <div className="bg-stone-900/95 border border-stone-700/90 rounded-2xl p-3 md:p-4 text-stone-100 shadow-2xl">
            {/* Top Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3 gap-2 overflow-x-auto">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setActiveTab('theme')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${activeTab === 'theme' ? 'bg-rose-600 text-white shadow-sm' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
                >
                  <Sparkles className="size-3.5" />
                  <span>{language === 'hi' ? 'शाही थीम' : 'Royal Themes'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('lighting')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${activeTab === 'lighting' ? 'bg-rose-600 text-white shadow-sm' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
                >
                  <Sun className="size-3.5" />
                  <span>{language === 'hi' ? 'समय व रोशनी' : 'Time & Light'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('inspect')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${activeTab === 'inspect' ? 'bg-rose-600 text-white shadow-sm' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
                >
                  <Layers className="size-3.5" />
                  <span>{language === 'hi' ? 'लेयर्स एक्सप्लोड' : 'Layer View'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('camera')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${activeTab === 'camera' ? 'bg-rose-600 text-white shadow-sm' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
                >
                  <Camera className="size-3.5" />
                  <span>{language === 'hi' ? 'कैमरा एंगल' : 'Camera Angles'}</span>
                </button>
              </div>

              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="hidden md:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg transition"
                >
                  <span>{language === 'hi' ? 'यह थीम बुक करें' : 'Book This Theme'}</span>
                </button>
              )}
            </div>

            {/* Tab 1: Themes */}
            {activeTab === 'theme' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(MANDAP_THEMES).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => setActiveThemeKey(key)}
                    className={`text-left p-2.5 rounded-xl border transition flex flex-col gap-1 ${activeThemeKey === key ? 'bg-stone-800 border-rose-500 ring-1 ring-rose-500 text-white' : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold leading-tight truncate">
                        {language === 'hi' ? t.nameHi.split('(')[0] : t.nameEn}
                      </span>
                      <span
                        className="size-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: `#${t.primaryColor.toString(16).padStart(6, '0')}` }}
                      />
                    </div>
                    <span className="text-[11px] text-stone-400 line-clamp-1">
                      {language === 'hi' ? t.subtitleHi : t.subtitleEn}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Tab 2: Lighting & Special Effects */}
            {activeTab === 'lighting' && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-stone-400 mr-1">
                    {language === 'hi' ? 'वेला:' : 'Time:'}
                  </span>
                  <button
                    onClick={() => setTimeOfDay('day')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition ${timeOfDay === 'day' ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold' : 'bg-stone-950/60 border-stone-800 text-stone-300'}`}
                  >
                    <Sun className="size-3.5" />
                    <span>{language === 'hi' ? 'दोपहर' : 'Day'}</span>
                  </button>
                  <button
                    onClick={() => setTimeOfDay('sunset')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition ${timeOfDay === 'sunset' ? 'bg-orange-500 text-white border-orange-400 font-bold' : 'bg-stone-950/60 border-stone-800 text-stone-300'}`}
                  >
                    <Sunset className="size-3.5" />
                    <span>{language === 'hi' ? 'गोधूलि' : 'Sunset'}</span>
                  </button>
                  <button
                    onClick={() => setTimeOfDay('night')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition ${timeOfDay === 'night' ? 'bg-indigo-600 text-white border-indigo-400 font-bold' : 'bg-stone-950/60 border-stone-800 text-stone-300'}`}
                  >
                    <Moon className="size-3.5" />
                    <span>{language === 'hi' ? 'रात्रि' : 'Night'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPetalShowerActive((prev) => !prev)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition ${petalShowerActive ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-stone-950/60 border-stone-800 text-stone-400'}`}
                  >
                    <Sparkles className="size-3.5" />
                    <span>{language === 'hi' ? 'फूलों की बारिश' : 'Petal Shower'}</span>
                  </button>
                  <button
                    onClick={() => setFireActive((prev) => !prev)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition ${fireActive ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-stone-950/60 border-stone-800 text-stone-400'}`}
                  >
                    <Flame className="size-3.5" />
                    <span>{language === 'hi' ? 'हवन अग्नि' : 'Sacred Fire'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Exploded Layer View */}
            {activeTab === 'inspect' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex-1 w-full flex items-center gap-3">
                  <span className="text-xs text-stone-400 whitespace-nowrap">
                    {language === 'hi' ? 'स्ट्रक्चर एक्सप्लोड:' : 'Explode Structure:'}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={explodeFactor}
                    onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                  />
                  <span className="text-xs font-mono text-amber-400 w-12 text-right">
                    {Math.round(explodeFactor * 100)}%
                  </span>
                </div>
                <button
                  onClick={() => setExplodeFactor(explodeFactor > 0 ? 0 : 0.8)}
                  className="px-3 py-1 rounded-md bg-stone-800 text-xs text-stone-300 hover:text-white border border-stone-700 whitespace-nowrap"
                >
                  {explodeFactor > 0 ? (language === 'hi' ? 'वापस जोड़ें' : 'Assemble') : (language === 'hi' ? 'लेयर्स अलग करें' : 'Explode All')}
                </button>
              </div>
            )}

            {/* Tab 4: Camera Presets */}
            {activeTab === 'camera' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'front', labelHi: 'मुख्य दृश्य (Front View)', labelEn: 'Front Entrance' },
                  { id: 'closeup', labelHi: 'मंडप क्लोज़अप (Stage)', labelEn: 'Mandap Stage' },
                  { id: 'thrones', labelHi: 'वर-वधू मंच (Thrones)', labelEn: 'Royal Thrones' },
                  { id: 'birdsEye', labelHi: 'वेन्यू परिदृश्य (Bird View)', labelEn: "Bird's Eye" },
                ].map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => applyCameraPreset(cam.id as CameraPreset)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition ${activeCameraPreset === cam.id ? 'bg-rose-600 text-white border-rose-500 font-bold' : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'}`}
                  >
                    {language === 'hi' ? cam.labelHi : cam.labelEn}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
