import * as THREE from 'three';

/**
 * Procedural canvas textures for Three.js wedding scene.
 * 100% self-contained, zero external network requests, zero 404s.
 */

// Procedural Royal Marble
export function createMarbleTexture(baseColor = '#fcfaf6', veinColor = '#e3d5be'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Base fill
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  // Subtle marble noise veins
  ctx.strokeStyle = veinColor;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.35;

  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    let x = (i * 37) % 512;
    let y = 0;
    ctx.moveTo(x, y);

    while (y < 512) {
      const stepY = 20 + Math.random() * 30;
      const stepX = (Math.random() - 0.48) * 35;
      x = Math.max(0, Math.min(512, x + stepX));
      y += stepY;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Soft clouds
  for (let c = 0; c < 25; c++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    const rad = 40 + Math.random() * 80;
    const grad = ctx.createRadialGradient(rx, ry, 5, rx, ry, rad);
    grad.addColorStop(0, veinColor);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.12;
    ctx.beginPath();
    ctx.arc(rx, ry, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Procedural Royal Carpet with Ornamental Border
export function createCarpetTexture(carpetColorHex = '#800020', goldColorHex = '#d4af37'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Velvet field
  ctx.fillStyle = carpetColorHex;
  ctx.fillRect(0, 0, 512, 512);

  // Micro-weave texture
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  for (let y = 0; y < 512; y += 4) {
    ctx.fillRect(0, y, 512, 1);
  }

  // Outer gold borders
  ctx.strokeStyle = goldColorHex;
  ctx.lineWidth = 14;
  ctx.strokeRect(12, 12, 488, 488);

  ctx.lineWidth = 3;
  ctx.strokeRect(32, 32, 448, 448);
  ctx.strokeRect(40, 40, 432, 432);

  // Paisley / Lotus corner motifs
  const corners = [[50, 50], [462, 50], [50, 462], [462, 462]];
  ctx.fillStyle = goldColorHex;
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();
  });

  // Central medallion
  ctx.beginPath();
  ctx.arc(256, 256, 68, 0, Math.PI * 2);
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(256, 256, 42, 0, Math.PI * 2);
  ctx.fillStyle = goldColorHex;
  ctx.globalAlpha = 0.25;
  ctx.fill();
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Flower Petal Alpha Map
export function createPetalTexture(isRose = true): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 64, 64);
  const grad = ctx.createRadialGradient(32, 28, 4, 32, 32, 28);

  if (isRose) {
    grad.addColorStop(0, '#ff1744');
    grad.addColorStop(0.65, '#d50000');
    grad.addColorStop(0.95, '#880e4f');
    grad.addColorStop(1, 'transparent');
  } else {
    // Marigold
    grad.addColorStop(0, '#ffea00');
    grad.addColorStop(0.6, '#ff9100');
    grad.addColorStop(0.95, '#ff6d00');
    grad.addColorStop(1, 'transparent');
  }

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(32, 32, 24, 16, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Diya Flame Glow
export function createFlameGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
  grad.addColorStop(0, 'rgba(255, 240, 180, 1.0)');
  grad.addColorStop(0.3, 'rgba(255, 140, 0, 0.7)');
  grad.addColorStop(0.7, 'rgba(225, 29, 72, 0.2)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Radial Contact Shadow Texture
export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  grad.addColorStop(0, 'rgba(18, 12, 10, 0.65)');
  grad.addColorStop(0.5, 'rgba(18, 12, 10, 0.35)');
  grad.addColorStop(0.85, 'rgba(18, 12, 10, 0.08)');
  grad.addColorStop(1, 'rgba(18, 12, 10, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
