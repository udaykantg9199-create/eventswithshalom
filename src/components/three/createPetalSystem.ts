import * as THREE from 'three';
import { createPetalTexture } from './proceduralTextures';

export interface PetalSystem {
  mesh: THREE.InstancedMesh;
  update: (delta: number) => void;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
}

export function createPetalSystem(count = 180, isSoftwareGl = false): PetalSystem {
  const actualCount = isSoftwareGl ? 60 : count;

  // Quad geometry for petal
  const petalGeo = new THREE.PlaneGeometry(0.12, 0.16);
  const petalTex = createPetalTexture(true);

  const petalMat = new THREE.MeshStandardMaterial({
    map: petalTex,
    transparent: true,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
    roughness: 0.8,
    metalness: 0.0,
    depthWrite: false,
  });

  const instancedMesh = new THREE.InstancedMesh(petalGeo, petalMat, actualCount);
  instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  instancedMesh.frustumCulled = false;

  const dummy = new THREE.Object3D();
  const matrix = new THREE.Matrix4();

  // Particle physics state
  const positions: Float32Array = new Float32Array(actualCount * 3);
  const velocities: Float32Array = new Float32Array(actualCount * 3);
  const rotations: Float32Array = new Float32Array(actualCount * 3);
  const rotSpeeds: Float32Array = new Float32Array(actualCount * 3);

  const colors = [
    new THREE.Color(0xe11d48), // Rose red
    new THREE.Color(0xf43f5e), // Rose pink
    new THREE.Color(0xf59e0b), // Marigold orange
    new THREE.Color(0xfbbf24), // Marigold gold
    new THREE.Color(0xffffff), // Jasmine white
  ];

  for (let i = 0; i < actualCount; i++) {
    // Initial random spawn above the mandap
    positions[i * 3 + 0] = (Math.random() - 0.5) * 8.0;
    positions[i * 3 + 1] = 0.5 + Math.random() * 6.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8.0;

    velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 1] = -0.4 - Math.random() * 0.5;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

    rotations[i * 3 + 0] = Math.random() * Math.PI * 2;
    rotations[i * 3 + 1] = Math.random() * Math.PI * 2;
    rotations[i * 3 + 2] = Math.random() * Math.PI * 2;

    rotSpeeds[i * 3 + 0] = (Math.random() - 0.5) * 1.5;
    rotSpeeds[i * 3 + 1] = (Math.random() - 0.5) * 2.0;
    rotSpeeds[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

    // Set instance color
    const c = colors[i % colors.length];
    instancedMesh.setColorAt(i, c);

    dummy.position.set(positions[i * 3 + 0], positions[i * 3 + 1], positions[i * 3 + 2]);
    dummy.rotation.set(rotations[i * 3 + 0], rotations[i * 3 + 1], rotations[i * 3 + 2]);
    dummy.updateMatrix();
    instancedMesh.setMatrixAt(i, dummy.matrix);
  }

  if (instancedMesh.instanceColor) {
    instancedMesh.instanceColor.needsUpdate = true;
  }
  instancedMesh.instanceMatrix.needsUpdate = true;

  const update = (delta: number) => {
    if (!instancedMesh.visible) return;
    const dt = Math.min(delta, 0.05);

    for (let i = 0; i < actualCount; i++) {
      const idx = i * 3;

      // Fluttering wind math
      positions[idx + 0] += (velocities[idx + 0] + Math.sin(positions[idx + 1] * 2 + i) * 0.15) * dt;
      positions[idx + 1] += velocities[idx + 1] * dt;
      positions[idx + 2] += (velocities[idx + 2] + Math.cos(positions[idx + 1] * 2 + i) * 0.15) * dt;

      rotations[idx + 0] += rotSpeeds[idx + 0] * dt;
      rotations[idx + 1] += rotSpeeds[idx + 1] * dt;
      rotations[idx + 2] += rotSpeeds[idx + 2] * dt;

      // Reset when touching floor
      if (positions[idx + 1] < 0.2) {
        positions[idx + 1] = 6.0 + Math.random() * 2.0;
        positions[idx + 0] = (Math.random() - 0.5) * 7.5;
        positions[idx + 2] = (Math.random() - 0.5) * 7.5;
      }

      dummy.position.set(positions[idx + 0], positions[idx + 1], positions[idx + 2]);
      dummy.rotation.set(rotations[idx + 0], rotations[idx + 1], rotations[idx + 2]);
      dummy.scale.setScalar(0.85 + 0.3 * Math.sin(i * 10));
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
  };

  const setVisible = (visible: boolean) => {
    instancedMesh.visible = visible;
  };

  const dispose = () => {
    petalGeo.dispose();
    petalMat.dispose();
    petalTex.dispose();
  };

  return {
    mesh: instancedMesh,
    update,
    setVisible,
    dispose,
  };
}
