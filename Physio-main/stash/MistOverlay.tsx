"use client"

import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// GLSL Shader code based on the provided mist effect
const mistVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const mistFragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;
  
  // Simplex noise function
  vec3 permute(vec3 x) { 
    return mod(((x*34.0)+1.0)*x, 289.0); 
  }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  // HSV to RGB conversion
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  
  vec3 hsv2rgb(float h, float s, float v) {
    return hsv2rgb(vec3(h / 360.0, s / 100.0, v / 100.0));
  }
  
  float lerp(float a, float b, float w) {
    return a * (1.0 - w) + b * w;
  }
  
  float constrain(float v, float minValue, float maxValue) {
    return min(max(v, minValue), maxValue);
  }
  
  void main() {
    vec2 fragCoord = vUv * u_resolution;
    
    // Create layered distortions for organic movement
    vec2 distortion = vec2(
      snoise(fragCoord / 150.0 + vec2(u_time * 0.3, u_time * 0.4)), 
      snoise(fragCoord / 150.0 + vec2(3.0 + u_time * 0.4, 4.0 + u_time * 0.3))
    );
    vec2 distorted = fragCoord / 600.0 + distortion * 0.2;
    
    vec2 distortion_2 = vec2(
      snoise(distorted + vec2(u_time * -0.01, u_time * -0.02)), 
      snoise(distorted + vec2(3.0 + u_time * -0.02, 4.0 + u_time * -0.3))
    );
    vec2 distorted_2 = fragCoord / 600.0 + distortion_2 * 0.2;
    
    float noiseValue = (snoise(distorted_2 + vec2(u_time * -0.05, u_time * 0.05)) + 1.0) / 2.0;
    
    // Color parameters for green mist
    const float h0_min = 200.0;
    const float s0_min = 70.0;
    const float v0_min = 10.0;
    
    const float h0_max = 160.0;
    const float s0_max = 50.0;
    const float v0_max = 15.0;
    
    const float h1_min = 160.0;
    const float s1_min = 40.0;
    const float v1_min = 25.0;
    
    const float h1_max = 120.0;
    const float s1_max = 20.0;
    const float v1_max = 35.0;
    
    // Distance-based falloff from center
    float d = constrain(
      1.0 - distance(
        fragCoord + ((distorted - vec2(1.0, 1.0)) / 2.0) * 1000.0, 
        u_resolution / 2.0
      ) / sqrt(u_resolution.x * u_resolution.x * 0.5 + u_resolution.y * u_resolution.y * 0.5), 
      0.0, 1.0
    );
    
    d = pow(d, 1.2);
    
    // Interpolate color values based on distance and noise
    float h_min = lerp(h0_min, h1_min, d);
    float s_min = lerp(s0_min, s1_min, d);
    float v_min = lerp(v0_min, v1_min, d);
    
    float h_max = lerp(h0_max, h1_max, d);
    float s_max = lerp(s0_max, s1_max, d);
    float v_max = lerp(v0_max, v1_max, d);
    
    vec3 color = hsv2rgb(
      lerp(h_min, h_max, noiseValue), 
      lerp(s_min, s_max, noiseValue), 
      lerp(v_min, v_max, noiseValue)
    );
    
    // Apply 90% transparency (10% opacity)
    gl_FragColor = vec4(color.r, color.g, color.b, 0.1);
  }
`

function MistMaterial() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) }
    }),
    [size.width, size.height]
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime
    }
  })

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height)
    }
  }, [size.width, size.height])

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={mistVertexShader}
      fragmentShader={mistFragmentShader}
      transparent={true}
      blending={THREE.AdditiveBlending}
    />
  )
}

function MistPlane() {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <MistMaterial />
    </mesh>
  )
}

export default function MistOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        style={{ background: 'transparent' }}
      >
        <MistPlane />
      </Canvas>
    </div>
  )
}