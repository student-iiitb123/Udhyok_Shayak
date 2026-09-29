'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  id: string;
  label: string;
  subtext: string;
  tooltip: string;
  position: [number, number, number];
  color: string;
}

const nodes: NodeData[] = [
  {
    id: 'approvals',
    label: 'APPROVALS',
    subtext: '40+ Dept NOCs',
    tooltip: 'Automated statutory clearance workflow mapping',
    position: [-2.0, 1.25, 0.2],
    color: '#F59E0B', // Saffron Gold
  },
  {
    id: 'licenses',
    label: 'LICENSES',
    subtext: 'Auto-Renewals',
    tooltip: 'Digital license lifecycle & statutory renewals',
    position: [2.0, 1.25, -0.2],
    color: '#10B981', // Emerald Green
  },
  {
    id: 'documents',
    label: 'DOCUMENTS',
    subtext: 'DigiLocker Vault',
    tooltip: 'Immutable government verified document vault',
    position: [-2.0, -1.15, 0.2],
    color: '#3B82F6', // Royal Blue
  },
  {
    id: 'inspections',
    label: 'INSPECTIONS',
    subtext: 'Joint Safety Audits',
    tooltip: 'Synchronized field safety & environmental inspections',
    position: [2.0, -1.15, 0.2],
    color: '#8B5CF6', // Electric Purple
  },
  {
    id: 'compliance',
    label: 'COMPLIANCE',
    subtext: 'SLA Guarantee',
    tooltip: 'Right to Services Act statutory SLA clock tracking',
    position: [0, 1.85, -0.3],
    color: '#06B6D4', // Cyber Cyan
  },
  {
    id: 'schemes',
    label: 'SCHEMES',
    subtext: 'Subsidies & PSI 2026',
    tooltip: 'PSI 2026 industrial incentives & state subsidies',
    position: [0, -1.85, 0.2],
    color: '#F97316', // Vibrant Orange
  },
  {
    id: 'departments',
    label: 'DEPARTMENTS',
    subtext: 'Single Gateway',
    tooltip: 'Inter-departmental single window integration',
    position: [2.45, 0.05, -0.4],
    color: '#6366F1', // Indigo
  },
];

function CentralBusinessNode() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const gridRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.15;
    }
    if (gridRef.current) {
      gridRef.current.rotation.y -= delta * 0.25;
      gridRef.current.rotation.x += delta * 0.1;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.25;
      ring2Ref.current.rotation.x += delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.2;
      ring3Ref.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Core Glowing Sphere (Larger Metallic Navy Glass) */}
        <mesh ref={coreRef} scale={1.05}>
          <sphereGeometry args={[0.92, 56, 56]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={0.7}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>

        {/* Holographic Saffron Wireframe Sphere */}
        <mesh ref={gridRef} scale={1.1}>
          <sphereGeometry args={[0.96, 28, 28]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={0.9}
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Ring 1: Saffron Torus */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.42, 0.026, 16, 100]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={1}
            roughness={0.1}
          />
        </mesh>

        {/* Ring 2: Emerald Green Torus */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[1.56, 0.018, 16, 100]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Ring 3: Sapphire Blue Torus */}
        <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
          <torusGeometry args={[1.70, 0.014, 16, 100]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.85}
            roughness={0.1}
          />
        </mesh>

        {/* Core Pulsing Glow Sphere */}
        <mesh scale={1.25}>
          <sphereGeometry args={[0.96, 32, 32]} />
          <meshBasicMaterial
            color="#F59E0B"
            transparent
            opacity={0.09}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Central Badge Label */}
        <Html position={[0, 0, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div className="select-none text-center bg-slate-950/90 text-white border border-amber-500/60 px-3.5 py-2 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none ring-1 ring-amber-500/30">
            <span className="text-[9px] font-black text-amber-400 tracking-widest uppercase block">MAHARASHTRA EODB</span>
            <span className="text-xs font-black tracking-wider text-white">DIGITAL CORE</span>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function OrbitingNode({ node, onHover }: { node: NodeData; onHover: (n: NodeData | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const cageRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (cageRef.current) {
      cageRef.current.rotation.x -= delta * 0.4;
      cageRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group position={node.position}>
        {/* Inner Solid Glowing Gemstone */}
        <mesh
          ref={meshRef}
          scale={hovered ? 1.35 : 1}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(node);
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
          }}
        >
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered ? 1.6 : 0.85}
            roughness={0.1}
            metalness={0.6}
          />
        </mesh>

        {/* Outer Revolving Wireframe Octahedron */}
        <mesh ref={cageRef} scale={hovered ? 1.4 : 1.1}>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color={node.color}
            wireframe
            transparent
            opacity={hovered ? 0.95 : 0.45}
          />
        </mesh>

        {/* HTML Badge Label */}
        <Html position={[0, 0.52, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div
            onMouseEnter={() => {
              setHovered(true);
              onHover(node);
            }}
            onMouseLeave={() => {
              setHovered(false);
              onHover(null);
            }}
            className={`select-none cursor-pointer px-3 py-1.5 rounded-lg border text-left transition-all duration-200 shadow-lg backdrop-blur-md whitespace-nowrap flex items-center gap-2 ${
              hovered
                ? 'bg-slate-900 text-white border-amber-400 scale-105 shadow-amber-500/20 shadow-xl ring-1 ring-amber-400/40'
                : 'bg-white/95 text-slate-800 border-slate-200 hover:border-amber-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: node.color }}></span>
            <div>
              <div className="text-[11px] font-extrabold tracking-tight leading-none">{node.label}</div>
              <div className="text-[9px] font-medium text-slate-500 leading-none mt-0.5">{node.subtext}</div>
            </div>
          </div>
        </Html>

        {/* Connecting Line to Business Center [0,0,0] */}
        <Line
          points={[[0, 0, 0], [-node.position[0], -node.position[1], -node.position[2]]]}
          color={hovered ? node.color : '#CBD5E1'}
          lineWidth={hovered ? 2.5 : 1.2}
          transparent
          opacity={hovered ? 0.95 : 0.4}
        />
      </group>
    </Float>
  );
}

function SceneBackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  const particleCount = 180;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#F59E0B'), // Saffron
      new THREE.Color('#10B981'), // Emerald
      new THREE.Color('#3B82F6'), // Blue
      new THREE.Color('#8B5CF6'), // Purple
      new THREE.Color('#CBD5E1'), // Soft silver
    ];

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function Rig() {
  useFrame((state) => {
    // Gentle Mouse Parallax
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.8, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.8, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function GovernmentEcosystem3D() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50/50 via-white to-amber-50/20">
      
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8.2], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[6, 6, 6]} intensity={2} color="#FFFFFF" />
        <directionalLight position={[-6, -6, -6]} intensity={1} color="#F59E0B" />
        <pointLight position={[0, 0, 4]} intensity={1.2} color="#10B981" />

        <CentralBusinessNode />

        {nodes.map((node) => (
          <OrbitingNode
            key={node.id}
            node={node}
            onHover={(n) => setActiveTooltip(n ? n.tooltip : null)}
          />
        ))}

        <SceneBackgroundParticles />
        <Rig />
      </Canvas>

      {/* Floating Tooltip Card */}
      {activeTooltip && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/95 text-white text-xs font-semibold px-4 py-2 rounded-full border border-amber-400/60 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 pointer-events-none flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{activeTooltip}</span>
        </div>
      )}

      {/* Bottom Subtle Gradient Overlay */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
}
