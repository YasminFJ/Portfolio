import * as THREE from "three";

/** Fresnel atmosphere that only glows on the sunlit side (Sun at the origin). */
export function createAtmosphereMaterial(color: string, intensity: number, power: number, side: THREE.Side) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
      uPower: { value: power },
      uInner: { value: side === THREE.FrontSide ? 1 : 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormalView;
      varying vec3 vPosView;
      varying vec3 vNormalWorld;
      varying vec3 vPosWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vPosWorld = world.xyz;
        vNormalWorld = normalize(mat3(modelMatrix) * normal);
        vec4 view = viewMatrix * world;
        vPosView = view.xyz;
        vNormalView = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * view;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uPower;
      uniform float uInner;
      varying vec3 vNormalView;
      varying vec3 vPosView;
      varying vec3 vNormalWorld;
      varying vec3 vPosWorld;
      void main() {
        vec3 viewDir = normalize(-vPosView);
        float facing = dot(normalize(vNormalView), viewDir);
        float rim = uInner > 0.5 ? pow(1.0 - clamp(facing, 0.0, 1.0), uPower) : pow(clamp(-facing, 0.0, 1.0), uPower);
        vec3 toSun = normalize(-vPosWorld);
        float lit = smoothstep(-0.35, 0.55, dot(normalize(vNormalWorld), toSun));
        float a = rim * lit * uIntensity;
        gl_FragColor = vec4(uColor * a, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side,
  });
}

/** Earth: daylight map, city lights on the night side and a soft terminator. */
export function createEarthMaterial(day: THREE.Texture, night: THREE.Texture) {
  return new THREE.ShaderMaterial({
    uniforms: { uDay: { value: day }, uNight: { value: night } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vNormalWorld;
      varying vec3 vPosWorld;
      void main() {
        vUv = uv;
        vec4 world = modelMatrix * vec4(position, 1.0);
        vPosWorld = world.xyz;
        vNormalWorld = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uDay;
      uniform sampler2D uNight;
      varying vec2 vUv;
      varying vec3 vNormalWorld;
      varying vec3 vPosWorld;
      void main() {
        vec3 toSun = normalize(-vPosWorld);
        float d = dot(normalize(vNormalWorld), toSun);
        vec3 day = texture2D(uDay, vUv).rgb * (max(d, 0.0) * 1.35 + 0.015);
        vec3 night = texture2D(uNight, vUv).rgb * vec3(1.0, 0.78, 0.5) * 0.9;
        float dayMix = smoothstep(-0.12, 0.22, d);
        gl_FragColor = vec4(mix(night, day, dayMix), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

/** Soft radial glow texture used for the Sun's corona sprites. */
export function createGlowTexture(inner: string, outer: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.18, inner);
  g.addColorStop(0.42, outer);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
