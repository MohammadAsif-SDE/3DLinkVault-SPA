import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const FolderModel = ({ position = [0, 0, 0] as [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Back Plate */}
      <RoundedBox args={[4, 3, 0.1]} radius={0.1} position={[0, 0, -0.5]}>
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
      </RoundedBox>
      
      {/* Front Plate (Angled) */}
      <RoundedBox 
        args={[4, 2.8, 0.1]} 
        radius={0.1} 
        position={[0, -0.1, 0.5]} 
        rotation={[-0.2, 0, 0]}
      >
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} transparent opacity={0.8} />
      </RoundedBox>
      
      {/* Bottom Plate */}
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
};

export const LinkCard = ({ color, title, position }: { color: string, title: string, position: [number, number, number] }) => {
  return (
    <group position={position}>
      <RoundedBox args={[1.5, 0.8, 0.05]} radius={0.05}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} transparent opacity={0.9} />
      </RoundedBox>
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.1}
        color="white"
        maxWidth={1.2}
        textAlign="center"
      >
        {title}
      </Text>
    </group>
  );
};
