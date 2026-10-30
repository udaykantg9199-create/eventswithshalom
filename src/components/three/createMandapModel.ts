import * as THREE from 'three';
import { MandapThemeConfig } from '../../types/wedding';
import { createMarbleTexture, createCarpetTexture, createContactShadowTexture } from './proceduralTextures';

export interface MandapHierarchy {
  rootGroup: THREE.Group;
  stageGroup: THREE.Group;
  pillarsGroup: THREE.Group;
  archesGroup: THREE.Group;
  canopyGroup: THREE.Group;
  havanGroup: THREE.Group;
  chairsGroup: THREE.Group;
  flameMesh: THREE.Mesh;
  flameLight: THREE.PointLight;
  diyaLights: THREE.PointLight[];
  flowerMeshes: THREE.InstancedMesh[];
  materials: Record<string, THREE.Material>;
  updateTheme: (theme: MandapThemeConfig) => void;
  updateExplode: (factor: number) => void;
  updateAnimation: (time: number) => void;
  dispose: () => void;
}

export function buildMandapScene(theme: MandapThemeConfig, isSoftwareGl = false): MandapHierarchy {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'MandapRoot';

  const stageGroup = new THREE.Group();
  const pillarsGroup = new THREE.Group();
  const archesGroup = new THREE.Group();
  const canopyGroup = new THREE.Group();
  const havanGroup = new THREE.Group();
  const chairsGroup = new THREE.Group();

  rootGroup.add(stageGroup);
  rootGroup.add(pillarsGroup);
  rootGroup.add(archesGroup);
  rootGroup.add(canopyGroup);
  rootGroup.add(havanGroup);
  rootGroup.add(chairsGroup);

  const materials: Record<string, THREE.Material> = {};
  const geometriesToDispose: THREE.BufferGeometry[] = [];
  const texturesToDispose: THREE.Texture[] = [];

  // 1. Textures
  const marbleTex = createMarbleTexture('#fcfaf6', '#e0d4c0');
  const carpetTex = createCarpetTexture('#800020', '#d4af37');
  const shadowTex = createContactShadowTexture();
  texturesToDispose.push(marbleTex, carpetTex, shadowTex);

  // 2. Materials
  const goldMat = new THREE.MeshStandardMaterial({
    color: theme.goldColor,
    metalness: isSoftwareGl ? 0.6 : 0.88,
    roughness: isSoftwareGl ? 0.35 : 0.22,
    envMapIntensity: 1.2,
  });
  materials.gold = goldMat;

  const pillarMat = new THREE.MeshStandardMaterial({
    color: theme.pillarMaterial === 'marble' ? 0xffffff : theme.goldColor,
    map: theme.pillarMaterial === 'marble' ? marbleTex : null,
    metalness: theme.pillarMaterial === 'gold' ? 0.85 : 0.15,
    roughness: theme.pillarMaterial === 'marble' ? 0.25 : 0.32,
  });
  materials.pillar = pillarMat;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: theme.primaryColor,
    roughness: 0.85,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });
  materials.fabric = fabricMat;

  const fabricAccentMat = new THREE.MeshStandardMaterial({
    color: theme.secondaryColor,
    roughness: 0.75,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
  materials.fabricAccent = fabricAccentMat;

  const marbleMat = new THREE.MeshStandardMaterial({
    color: 0xfdfaf5,
    map: marbleTex,
    roughness: 0.3,
    metalness: 0.08,
  });
  materials.marble = marbleMat;

  const carpetMat = new THREE.MeshStandardMaterial({
    color: theme.carpetColor,
    map: carpetTex,
    roughness: 0.9,
    metalness: 0.02,
  });
  materials.carpet = carpetMat;

  const havanCopperMat = new THREE.MeshStandardMaterial({
    color: 0xcd7f32,
    metalness: 0.8,
    roughness: 0.28,
  });
  materials.copper = havanCopperMat;

  const woodLogMat = new THREE.MeshStandardMaterial({
    color: 0x3d2314,
    roughness: 0.9,
    metalness: 0.0,
  });
  materials.wood = woodLogMat;

  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.1,
    transmission: isSoftwareGl ? 0 : 0.9,
    transparent: true,
    opacity: isSoftwareGl ? 0.45 : 1.0,
    ior: 1.5,
  });
  materials.crystal = crystalMat;

  const marigoldOrangeMat = new THREE.MeshStandardMaterial({
    color: theme.flowerColor1,
    roughness: 0.7,
    metalness: 0.0,
  });
  materials.flower1 = marigoldOrangeMat;

  const marigoldYellowMat = new THREE.MeshStandardMaterial({
    color: theme.flowerColor2,
    roughness: 0.7,
    metalness: 0.0,
  });
  materials.flower2 = marigoldYellowMat;

  // Contact Shadow Plane (Grounding)
  const shadowGeo = new THREE.PlaneGeometry(16, 16);
  geometriesToDispose.push(shadowGeo);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
  });
  materials.shadow = shadowMat;
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.005;
  stageGroup.add(shadowMesh);

  // === 1. GRAND MANDAP PLATFORM ===
  // Lower Octagonal Plinth
  const plinthGeo = new THREE.CylinderGeometry(5.6, 5.8, 0.25, 8);
  geometriesToDispose.push(plinthGeo);
  const plinthMesh = new THREE.Mesh(plinthGeo, marbleMat);
  plinthMesh.position.y = 0.125;
  plinthMesh.receiveShadow = !isSoftwareGl;
  stageGroup.add(plinthMesh);

  // Upper Platform
  const upperPlatformGeo = new THREE.CylinderGeometry(5.0, 5.2, 0.2, 8);
  geometriesToDispose.push(upperPlatformGeo);
  const upperPlatform = new THREE.Mesh(upperPlatformGeo, marbleMat);
  upperPlatform.position.y = 0.35;
  upperPlatform.receiveShadow = !isSoftwareGl;
  stageGroup.add(upperPlatform);

  // Royal Velvet Carpet
  const carpetGeo = new THREE.CylinderGeometry(4.3, 4.3, 0.02, 32);
  geometriesToDispose.push(carpetGeo);
  const carpetMesh = new THREE.Mesh(carpetGeo, carpetMat);
  carpetMesh.position.y = 0.46;
  carpetMesh.receiveShadow = !isSoftwareGl;
  stageGroup.add(carpetMesh);

  // Decorative Brass Urli Vessels with Water & Petals at 4 corners
  const urliPositions: [number, number, number][] = [
    [3.4, 0.46, 3.4],
    [-3.4, 0.46, 3.4],
    [3.4, 0.46, -3.4],
    [-3.4, 0.46, -3.4],
  ];

  const diyaLights: THREE.PointLight[] = [];

  urliPositions.forEach((pos) => {
    const urliGroup = new THREE.Group();
    urliGroup.position.set(...pos);

    // Brass bowl
    const bowlGeo = new THREE.CylinderGeometry(0.38, 0.2, 0.2, 16);
    geometriesToDispose.push(bowlGeo);
    const bowlMesh = new THREE.Mesh(bowlGeo, goldMat);
    bowlMesh.position.y = 0.1;
    bowlMesh.castShadow = !isSoftwareGl;
    urliGroup.add(bowlMesh);

    // Rim
    const rimGeo = new THREE.TorusGeometry(0.38, 0.04, 8, 24);
    geometriesToDispose.push(rimGeo);
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.2;
    urliGroup.add(rimMesh);

    // Water surface
    const waterGeo = new THREE.CircleGeometry(0.36, 16);
    geometriesToDispose.push(waterGeo);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x224455, roughness: 0.1, metalness: 0.8 });
    materials.water = waterMat;
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = 0.18;
    urliGroup.add(waterMesh);

    // Floating marigolds in urli
    for (let f = 0; f < 5; f++) {
      const angle = (f / 5) * Math.PI * 2;
      const flowerGeo = new THREE.DodecahedronGeometry(0.06);
      geometriesToDispose.push(flowerGeo);
      const flowerMesh = new THREE.Mesh(flowerGeo, f % 2 === 0 ? marigoldOrangeMat : marigoldYellowMat);
      flowerMesh.position.set(Math.cos(angle) * 0.2, 0.21, Math.sin(angle) * 0.2);
      urliGroup.add(flowerMesh);
    }

    // Small Diya brass lamp
    const diyaGeo = new THREE.CylinderGeometry(0.08, 0.04, 0.05, 12);
    geometriesToDispose.push(diyaGeo);
    const diyaMesh = new THREE.Mesh(diyaGeo, goldMat);
    diyaMesh.position.set(0, 0.22, 0);
    urliGroup.add(diyaMesh);

    // Diya point light
    const diyaLight = new THREE.PointLight(0xffaa33, isSoftwareGl ? 0.4 : 0.8, 4);
    diyaLight.position.set(pos[0], pos[1] + 0.35, pos[2]);
    rootGroup.add(diyaLight);
    diyaLights.push(diyaLight);

    stageGroup.add(urliGroup);
  });

  // === 2. 4 ORNATE CARVED PILLARS (Composite 3–12 Part Procedural Models) ===
  const pillarDistance = 2.4;
  const pillarCoords: [number, number][] = [
    [-pillarDistance, -pillarDistance],
    [pillarDistance, -pillarDistance],
    [-pillarDistance, pillarDistance],
    [pillarDistance, pillarDistance],
  ];

  const pillarHeight = 3.6;

  pillarCoords.forEach(([px, pz]) => {
    const singlePillar = new THREE.Group();
    singlePillar.position.set(px, 0.46, pz);

    // 1. Plinth Base Step 1
    const base1Geo = new THREE.BoxGeometry(0.75, 0.15, 0.75);
    geometriesToDispose.push(base1Geo);
    const base1 = new THREE.Mesh(base1Geo, pillarMat);
    base1.position.y = 0.075;
    base1.castShadow = !isSoftwareGl;
    singlePillar.add(base1);

    // 2. Plinth Base Step 2 (beveled)
    const base2Geo = new THREE.BoxGeometry(0.62, 0.15, 0.62);
    geometriesToDispose.push(base2Geo);
    const base2 = new THREE.Mesh(base2Geo, goldMat);
    base2.position.y = 0.225;
    singlePillar.add(base2);

    // 3. Lower Column shaft (fluted)
    const shaft1Geo = new THREE.CylinderGeometry(0.24, 0.27, 1.3, 16);
    geometriesToDispose.push(shaft1Geo);
    const shaft1 = new THREE.Mesh(shaft1Geo, pillarMat);
    shaft1.position.y = 0.95;
    shaft1.castShadow = !isSoftwareGl;
    singlePillar.add(shaft1);

    // 4. Middle Ornamental Ring (gold brass with relief)
    const ringGeo = new THREE.TorusGeometry(0.28, 0.05, 8, 20);
    geometriesToDispose.push(ringGeo);
    const ringMesh = new THREE.Mesh(ringGeo, goldMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 1.65;
    singlePillar.add(ringMesh);

    // 5. Upper Column shaft
    const shaft2Geo = new THREE.CylinderGeometry(0.22, 0.24, 1.4, 16);
    geometriesToDispose.push(shaft2Geo);
    const shaft2 = new THREE.Mesh(shaft2Geo, pillarMat);
    shaft2.position.y = 2.4;
    shaft2.castShadow = !isSoftwareGl;
    singlePillar.add(shaft2);

    // 6. Lotus Capital Base
    const lotusGeo = new THREE.CylinderGeometry(0.48, 0.22, 0.28, 12);
    geometriesToDispose.push(lotusGeo);
    const lotusMesh = new THREE.Mesh(lotusGeo, goldMat);
    lotusMesh.position.y = 3.24;
    singlePillar.add(lotusMesh);

    // 7. Abacus header block
    const abacusGeo = new THREE.BoxGeometry(0.7, 0.14, 0.7);
    geometriesToDispose.push(abacusGeo);
    const abacus = new THREE.Mesh(abacusGeo, pillarMat);
    abacus.position.y = 3.45;
    singlePillar.add(abacus);

    // 8. Kalash / Sacred Finial on top
    const kalashPotGeo = new THREE.SphereGeometry(0.22, 12, 12);
    geometriesToDispose.push(kalashPotGeo);
    const kalashPot = new THREE.Mesh(kalashPotGeo, goldMat);
    kalashPot.position.y = 3.7;
    singlePillar.add(kalashPot);

    const coconutGeo = new THREE.ConeGeometry(0.14, 0.24, 8);
    geometriesToDispose.push(coconutGeo);
    const coconut = new THREE.Mesh(coconutGeo, woodLogMat);
    coconut.position.y = 3.96;
    singlePillar.add(coconut);

    // 9. Jasmine garland rings hugging column
    for (let g = 0; g < 4; g++) {
      const gY = 0.7 + g * 0.7;
      const garlandGeo = new THREE.TorusGeometry(0.27, 0.04, 6, 16);
      geometriesToDispose.push(garlandGeo);
      const garlandMesh = new THREE.Mesh(garlandGeo, g % 2 === 0 ? marigoldOrangeMat : marigoldYellowMat);
      garlandMesh.rotation.x = Math.PI / 2;
      garlandMesh.position.y = gY;
      singlePillar.add(garlandMesh);
    }

    pillarsGroup.add(singlePillar);
  });

  // === 3. ARCHITECTURAL ARCHES & LATTICE TRELLIS ===
  // Arches connecting adjacent pillars
  const archConfigs = [
    { start: [-pillarDistance, -pillarDistance], end: [pillarDistance, -pillarDistance], rotY: 0 },
    { start: [pillarDistance, -pillarDistance], end: [pillarDistance, pillarDistance], rotY: Math.PI / 2 },
    { start: [pillarDistance, pillarDistance], end: [-pillarDistance, pillarDistance], rotY: Math.PI },
    { start: [-pillarDistance, pillarDistance], end: [-pillarDistance, -pillarDistance], rotY: -Math.PI / 2 },
  ];

  archConfigs.forEach((cfg) => {
    const archBar = new THREE.Group();
    const mx = (cfg.start[0] + cfg.end[0]) / 2;
    const mz = (cfg.start[1] + cfg.end[1]) / 2;
    archBar.position.set(mx, 3.86, mz);
    archBar.rotation.y = cfg.rotY;

    // Curved Beam / Arch Spine
    const beamGeo = new THREE.BoxGeometry(pillarDistance * 2 - 0.2, 0.16, 0.24);
    geometriesToDispose.push(beamGeo);
    const beamMesh = new THREE.Mesh(beamGeo, goldMat);
    archBar.add(beamMesh);

    // Hanging Scallop Arch Curve (Tube)
    const curvePoints = [];
    const span = pillarDistance * 2 - 0.5;
    for (let t = 0; t <= 12; t++) {
      const ratio = t / 12;
      const x = -span / 2 + ratio * span;
      // parabolic scallop
      const y = -0.45 * Math.sin(ratio * Math.PI);
      curvePoints.push(new THREE.Vector3(x, y, 0));
    }
    const archCurve = new THREE.CatmullRomCurve3(curvePoints);
    const archTubeGeo = new THREE.TubeGeometry(archCurve, 20, 0.05, 8, false);
    geometriesToDispose.push(archTubeGeo);
    const archTubeMesh = new THREE.Mesh(archTubeGeo, goldMat);
    archBar.add(archTubeMesh);

    // Floral Garlands hanging from the arch
    for (let f = 0; f < 7; f++) {
      const fx = -span / 2 + 0.3 + (f / 6) * (span - 0.6);
      const hangLen = 0.3 + 0.2 * Math.sin((f / 6) * Math.PI);
      const dropGeo = new THREE.CylinderGeometry(0.04, 0.03, hangLen, 6);
      geometriesToDispose.push(dropGeo);
      const dropMesh = new THREE.Mesh(dropGeo, f % 2 === 0 ? marigoldOrangeMat : marigoldYellowMat);
      dropMesh.position.set(fx, -hangLen / 2 - 0.08, 0);
      archBar.add(dropMesh);
    }

    archesGroup.add(archBar);
  });

  // === 4. ROYAL CANOPY DOME & CHANDELIERS ===
  canopyGroup.position.set(0, 3.9, 0);

  // Layer 1: Scalloped Draping Fabric Ceiling
  const domeRadius = 3.6;
  const domeGeo = new THREE.CylinderGeometry(0.8, domeRadius, 1.1, 16, 1, true);
  geometriesToDispose.push(domeGeo);
  const domeMesh = new THREE.Mesh(domeGeo, fabricMat);
  domeMesh.position.y = 0.55;
  canopyGroup.add(domeMesh);

  // Inner Layer contrasting silk lining
  const innerDomeGeo = new THREE.CylinderGeometry(0.75, domeRadius - 0.15, 1.05, 16, 1, true);
  geometriesToDispose.push(innerDomeGeo);
  const innerDome = new THREE.Mesh(innerDomeGeo, fabricAccentMat);
  innerDome.position.y = 0.52;
  canopyGroup.add(innerDome);

  // Golden Crown Ring on top of dome
  const topCrownGeo = new THREE.CylinderGeometry(0.9, 0.78, 0.3, 16);
  geometriesToDispose.push(topCrownGeo);
  const topCrown = new THREE.Mesh(topCrownGeo, goldMat);
  topCrown.position.y = 1.25;
  canopyGroup.add(topCrown);

  // Central Golden Kalash & Tassel
  const crownSpireGeo = new THREE.ConeGeometry(0.2, 0.6, 12);
  geometriesToDispose.push(crownSpireGeo);
  const crownSpire = new THREE.Mesh(crownSpireGeo, goldMat);
  crownSpire.position.y = 1.7;
  canopyGroup.add(crownSpire);

  // Central Luxury Chandelier (Tiered crystal rings)
  const chandelierGroup = new THREE.Group();
  chandelierGroup.position.set(0, 0.3, 0);

  const ringTiers = [
    { radius: 0.8, y: -0.2, drops: 16 },
    { radius: 0.55, y: -0.5, drops: 12 },
    { radius: 0.3, y: -0.8, drops: 8 },
  ];

  ringTiers.forEach((tier) => {
    const ringTierGeo = new THREE.TorusGeometry(tier.radius, 0.03, 6, 24);
    geometriesToDispose.push(ringTierGeo);
    const ringMesh = new THREE.Mesh(ringTierGeo, goldMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = tier.y;
    chandelierGroup.add(ringMesh);

    // Crystal prism drops
    for (let d = 0; d < tier.drops; d++) {
      const angle = (d / tier.drops) * Math.PI * 2;
      const prismGeo = new THREE.ConeGeometry(0.035, 0.22, 5);
      geometriesToDispose.push(prismGeo);
      const prismMesh = new THREE.Mesh(prismGeo, crystalMat);
      prismMesh.position.set(Math.cos(angle) * tier.radius, tier.y - 0.12, Math.sin(angle) * tier.radius);
      prismMesh.rotation.x = Math.PI;
      chandelierGroup.add(prismMesh);
    }
  });

  // Chandelier warm glow light
  const chLight = new THREE.PointLight(0xffeedd, isSoftwareGl ? 0.6 : 1.2, 8);
  chLight.position.set(0, -0.4, 0);
  chandelierGroup.add(chLight);

  canopyGroup.add(chandelierGroup);

  // === 5. CENTRAL SACRED HAVAN KUND (SACRED FIRE PIT) ===
  havanGroup.position.set(0, 0.46, 0);

  // 3-tier copper steps
  const havanTiers = [
    { size: 1.35, height: 0.1 },
    { size: 1.15, height: 0.1 },
    { size: 0.95, height: 0.1 },
  ];
  let curHavanY = 0.05;
  havanTiers.forEach((ht) => {
    const tierGeo = new THREE.BoxGeometry(ht.size, ht.height, ht.size);
    geometriesToDispose.push(tierGeo);
    const tierMesh = new THREE.Mesh(tierGeo, havanCopperMat);
    tierMesh.position.y = curHavanY;
    tierMesh.castShadow = !isSoftwareGl;
    tierMesh.receiveShadow = !isSoftwareGl;
    havanGroup.add(tierMesh);
    curHavanY += ht.height;
  });

  // Wood Logs (Samidha) inside pit
  for (let l = 0; l < 4; l++) {
    const logGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
    geometriesToDispose.push(logGeo);
    const logMesh = new THREE.Mesh(logGeo, woodLogMat);
    const angle = (l / 4) * Math.PI;
    logMesh.rotation.z = Math.PI / 2;
    logMesh.rotation.y = angle;
    logMesh.position.set(0, curHavanY + 0.03, 0);
    havanGroup.add(logMesh);
  }

  // Glowing Ember Core
  const emberGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 12);
  geometriesToDispose.push(emberGeo);
  const emberMat = new THREE.MeshBasicMaterial({ color: 0xff3300 });
  materials.ember = emberMat;
  const emberMesh = new THREE.Mesh(emberGeo, emberMat);
  emberMesh.position.y = curHavanY + 0.04;
  havanGroup.add(emberMesh);

  // Sacred Fire Flame Procedural Quad
  const flameGeo = new THREE.ConeGeometry(0.24, 0.55, 6);
  geometriesToDispose.push(flameGeo);
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0xff9900,
    transparent: true,
    opacity: 0.88,
  });
  materials.flame = flameMat;
  const flameMesh = new THREE.Mesh(flameGeo, flameMat);
  flameMesh.position.y = curHavanY + 0.32;
  havanGroup.add(flameMesh);

  // Flame Point Light
  const flameLight = new THREE.PointLight(0xff7700, isSoftwareGl ? 0.8 : 1.6, 6);
  flameLight.position.set(0, curHavanY + 0.45, 0);
  havanGroup.add(flameLight);

  // === 6. ROYAL BRIDE & GROOM THRONES (ROYAL CHAIRS) ===
  // Positioned facing the mandap center/entrance
  const chairOffsetZ = -1.5;
  const brideX = -0.65;
  const groomX = 0.65;

  [brideX, groomX].forEach((cx, idx) => {
    const throne = new THREE.Group();
    throne.position.set(cx, 0.46, chairOffsetZ);

    // Seat Cushion (plush velvet)
    const seatGeo = new THREE.BoxGeometry(0.72, 0.16, 0.68);
    geometriesToDispose.push(seatGeo);
    const seatMesh = new THREE.Mesh(seatGeo, fabricMat);
    seatMesh.position.y = 0.36;
    seatMesh.castShadow = !isSoftwareGl;
    throne.add(seatMesh);

    // Golden Seat Rim Frame
    const seatFrameGeo = new THREE.BoxGeometry(0.76, 0.08, 0.72);
    geometriesToDispose.push(seatFrameGeo);
    const seatFrame = new THREE.Mesh(seatFrameGeo, goldMat);
    seatFrame.position.y = 0.28;
    throne.add(seatFrame);

    // 4 Gilded Legs
    const legPositions: [number, number][] = [
      [-0.32, -0.3],
      [0.32, -0.3],
      [-0.32, 0.3],
      [0.32, 0.3],
    ];
    legPositions.forEach(([lx, lz]) => {
      const legGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.28, 8);
      geometriesToDispose.push(legGeo);
      const leg = new THREE.Mesh(legGeo, goldMat);
      leg.position.set(lx, 0.14, lz);
      throne.add(leg);
    });

    // High Royal Backrest Frame (Gold carved arch)
    const backFrameGeo = new THREE.BoxGeometry(0.72, 1.1, 0.08);
    geometriesToDispose.push(backFrameGeo);
    const backFrame = new THREE.Mesh(backFrameGeo, goldMat);
    backFrame.position.set(0, 0.98, -0.32);
    backFrame.castShadow = !isSoftwareGl;
    throne.add(backFrame);

    // Velvet Back Cushion
    const backCushionGeo = new THREE.BoxGeometry(0.62, 0.94, 0.06);
    geometriesToDispose.push(backCushionGeo);
    const backCushion = new THREE.Mesh(backCushionGeo, fabricMat);
    backCushion.position.set(0, 0.98, -0.28);
    throne.add(backCushion);

    // Ornate Royal Crest Crown on top of chair
    const crestGeo = new THREE.ConeGeometry(0.2, 0.28, 6);
    geometriesToDispose.push(crestGeo);
    const crest = new THREE.Mesh(crestGeo, goldMat);
    crest.position.set(0, 1.62, -0.32);
    throne.add(crest);

    // Dual Carved Armrests
    [-0.38, 0.38].forEach((ax) => {
      const armGeo = new THREE.BoxGeometry(0.08, 0.06, 0.5);
      geometriesToDispose.push(armGeo);
      const arm = new THREE.Mesh(armGeo, goldMat);
      arm.position.set(ax, 0.58, -0.04);
      throne.add(arm);
    });

    chairsGroup.add(throne);
  });

  // Low decorative stools for Panditji / Puja items
  const pujaStoolGeo = new THREE.CylinderGeometry(0.32, 0.36, 0.15, 12);
  geometriesToDispose.push(pujaStoolGeo);
  const pujaStool = new THREE.Mesh(pujaStoolGeo, goldMat);
  pujaStool.position.set(1.6, 0.46, 0);
  chairsGroup.add(pujaStool);

  // === 7. THEME UPDATE HANDLER ===
  const updateTheme = (newTheme: MandapThemeConfig) => {
    (materials.gold as THREE.MeshStandardMaterial).color.setHex(newTheme.goldColor);
    (materials.fabric as THREE.MeshStandardMaterial).color.setHex(newTheme.primaryColor);
    (materials.fabricAccent as THREE.MeshStandardMaterial).color.setHex(newTheme.secondaryColor);
    (materials.carpet as THREE.MeshStandardMaterial).color.setHex(newTheme.carpetColor);
    (materials.flower1 as THREE.MeshStandardMaterial).color.setHex(newTheme.flowerColor1);
    (materials.flower2 as THREE.MeshStandardMaterial).color.setHex(newTheme.flowerColor2);

    const pMat = materials.pillar as THREE.MeshStandardMaterial;
    if (newTheme.pillarMaterial === 'marble') {
      pMat.color.setHex(0xffffff);
      pMat.map = marbleTex;
      pMat.metalness = 0.1;
      pMat.roughness = 0.25;
    } else if (newTheme.pillarMaterial === 'carvedWood') {
      pMat.color.setHex(0x5c3317);
      pMat.map = null;
      pMat.metalness = 0.05;
      pMat.roughness = 0.8;
    } else if (newTheme.pillarMaterial === 'crystal') {
      pMat.color.setHex(0xe0f2fe);
      pMat.map = null;
      pMat.metalness = 0.2;
      pMat.roughness = 0.1;
    } else {
      // gold
      pMat.color.setHex(newTheme.goldColor);
      pMat.map = null;
      pMat.metalness = 0.85;
      pMat.roughness = 0.28;
    }
    pMat.needsUpdate = true;
  };

  // === 8. EXPLODED-VIEW LAYER SEPARATION ===
  const updateExplode = (factor: number) => {
    // factor: 0.0 (assembled) to 1.0 (fully exploded)
    canopyGroup.position.y = 3.9 + factor * 2.8;
    archesGroup.position.y = factor * 1.5;
    pillarsGroup.position.y = factor * 0.7;
    chairsGroup.position.y = factor * 0.35;
    havanGroup.position.y = 0.46 + factor * 0.2;
  };

  // === 9. ANIMATION LOOP HELPER ===
  const updateAnimation = (time: number) => {
    // Animate holy havan fire flickering
    const flameScaleY = 0.9 + Math.sin(time * 12) * 0.18 + Math.cos(time * 22) * 0.08;
    const flameScaleXZ = 0.95 + Math.cos(time * 14) * 0.12;
    flameMesh.scale.set(flameScaleXZ, flameScaleY, flameScaleXZ);
    flameMesh.rotation.y = time * 2;
    flameLight.intensity = (isSoftwareGl ? 0.7 : 1.4) + Math.sin(time * 15) * 0.35;

    // Subtle breathing glow on chandelier crystals
    chandelierGroup.rotation.y = Math.sin(time * 0.4) * 0.03;
  };

  // === 10. DISPOSAL ===
  const dispose = () => {
    geometriesToDispose.forEach((g) => g.dispose());
    Object.values(materials).forEach((m) => m.dispose());
    texturesToDispose.forEach((t) => t.dispose());
  };

  return {
    rootGroup,
    stageGroup,
    pillarsGroup,
    archesGroup,
    canopyGroup,
    havanGroup,
    chairsGroup,
    flameMesh,
    flameLight,
    diyaLights,
    flowerMeshes: [],
    materials,
    updateTheme,
    updateExplode,
    updateAnimation,
    dispose,
  };
}
