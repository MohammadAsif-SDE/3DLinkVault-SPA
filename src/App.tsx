import { Scene } from './components/Scene';

export default function App() {
  return (
    <main className="w-full h-screen bg-[#050505] overflow-hidden">
      <nav className="fixed top-0 left-0 w-full p-10 z-50 flex justify-between items-center pointer-events-none">
        <div className="text-2xl font-premium tracking-widest pointer-events-auto cursor-pointer text-white">
          LINK<span className="text-blue-500">VAULT</span>
        </div>
        <div className="flex gap-12 pointer-events-auto">
          <a href="#" className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">Login</a>
        </div>
      </nav>
      
      <Scene />
    </main>
  );
}
