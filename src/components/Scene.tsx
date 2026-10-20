import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows, ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { FolderModel, LinkCard } from './Models';
import { FeaturesSection } from './FeaturesSection';
import { LINKS_DATA } from '../constants';
import * as THREE from 'three';

const SceneContent = () => {
  const scroll = useScroll();
  const folderRef = useRef<THREE.Group>(null);
  const linksRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((state) => {
    const offset = scroll.offset;
    
    if (folderRef.current) {
      folderRef.current.position.y = THREE.MathUtils.lerp(-10, -1, THREE.MathUtils.smoothstep(offset, 0.3, 0.6));
      folderRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.1, THREE.MathUtils.smoothstep(offset, 0.6, 1));
    }

    if (linksRef.current) {
      linksRef.current.children.forEach((child, i) => {
        const startOffset = 0.4 + i * 0.05;
        const progress = THREE.MathUtils.smoothstep(offset, startOffset, startOffset + 0.3);
        
        const angle = (i / LINKS_DATA.length) * Math.PI * 2;
        const radius = 4;
        const startX = Math.cos(angle) * radius;
        const startY = Math.sin(angle) * radius + 5;
        const startZ = -5;

        const targetX = (i % 3 - 1) * 0.5;
        const targetY = -1 + Math.floor(i / 3) * 0.2;
        const targetZ = 0;

        child.position.x = THREE.MathUtils.lerp(startX, targetX, progress);
        child.position.y = THREE.MathUtils.lerp(startY, targetY, progress);
        child.position.z = THREE.MathUtils.lerp(startZ, targetZ, progress);
        
        child.rotation.x = progress * Math.PI * 2;
        child.rotation.z = progress * Math.PI;
        child.scale.setScalar(THREE.MathUtils.lerp(0, 1, THREE.MathUtils.smoothstep(offset, startOffset - 0.1, startOffset)));
      });
    }

    camera.position.z = THREE.MathUtils.lerp(10, 8, offset);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <group ref={folderRef} position={[0, -1, 0]}>
        <FolderModel />
      </group>

      <group ref={linksRef}>
        {LINKS_DATA.map((link, i) => (
          <LinkCard key={link.id} color={link.color} title={link.title} position={[0, 10, 0]} />
        ))}
      </group>

      <Environment preset="city" />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
    </>
  );
};

const ScrollUI = () => {
  const scroll = useScroll();
  const progressRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (progressRef.current) {
      progressRef.current.style.height = `${scroll.offset * 100}%`;
    }
  });

  return (
    <Scroll html>
      <div className="w-screen relative">
        {/* Progress Bar */}
        <div className="fixed bottom-8 left-8 z-50 pointer-events-none">
          <div className="flex flex-col gap-2">
            <div className="w-1 h-24 bg-white/10 rounded-full overflow-hidden">
              <div ref={progressRef} className="w-full bg-blue-500" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 rotate-90 origin-left translate-x-3 translate-y-4">Progress</span>
          </div>
        </div>

        <section className="h-screen flex flex-col items-center justify-center p-10">
          <div className="max-w-5xl text-center space-y-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 opacity-80">EST. 2024 — DIGITAL ARCHIVE</span>
              <h1 className="text-[18vw] md:text-[15vw] font-premium leading-[0.8] tracking-[-0.04em] uppercase text-white">
                LINK<span className="text-blue-500">VAULT</span>
              </h1>
            </div>
            
            <div className="flex flex-col items-center space-y-8 mt-8">
              <p className="text-xl md:text-3xl text-white/80 font-serif italic max-w-2xl mx-auto leading-relaxed">
                The ultra-premium way to organize your digital universe. 
                One click, <span className="text-white font-bold not-italic">infinite order.</span>
              </p>
              
              <div className="flex items-center gap-12 pt-8 border-t border-white/10 w-full max-w-lg justify-center">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Security</span>
                  <span className="text-sm font-medium text-white">256-BIT</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Speed</span>
                  <span className="text-sm font-medium text-white">INSTANT</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Access</span>
                  <span className="text-sm font-medium text-white">GLOBAL</span>
                </div>
              </div>
            </div>

            <div className="pt-16">
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer group">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Begin Exploration</span>
                <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />

        <section className="h-screen flex items-center justify-start px-20">
          <div className="max-w-xl space-y-4">
            <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">01. Seamless Integration</span>
            <h2 className="text-5xl font-display font-bold text-white">The Extension.</h2>
            <p className="text-lg text-white/50">
              Our browser extension sits quietly in your toolbar, ready to capture 
              inspiration at a moment's notice. Minimal design, maximum utility.
            </p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-end px-20">
          <div className="max-w-xl space-y-4 text-right">
            <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">02. Intelligent Sorting</span>
            <h2 className="text-5xl font-display font-bold text-white">The Drop.</h2>
            <p className="text-lg text-white/50">
              Watch as your links are intelligently categorized and safely 
              stored in your custom vaults. Physics-based precision for a tactile feel.
            </p>
          </div>
        </section>

        <section className="h-screen flex flex-col items-center justify-center p-10">
          <div className="max-w-3xl text-center space-y-8">
            <h2 className="text-6xl font-display font-bold text-white">Ready to elevate your workflow?</h2>
            <p className="text-xl text-white/60">
              Join 50,000+ creators who have mastered their digital clutter.
            </p>
            <button className="px-12 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform cursor-pointer pointer-events-auto">
              Get Started Now
            </button>
            <div className="grid grid-cols-3 gap-8 pt-20 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-white/40 uppercase tracking-widest">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">256-bit</div>
                <div className="text-sm text-white/40 uppercase tracking-widest">Encryption</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">Instant</div>
                <div className="text-sm text-white/40 uppercase tracking-widest">Sync</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Scroll>
  );
};

export const Scene = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ScrollControls pages={5} damping={0.2}>
          <SceneContent />
          <ScrollUI />
        </ScrollControls>
      </Canvas>
    </div>
  );
};
