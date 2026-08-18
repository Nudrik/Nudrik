import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, 
  Activity, 
  Cpu, 
  Sparkles,
  Play,
  Pause,
  Zap,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';

interface StageDetail {
  stage: number;
  title: string;
  name: string;
  shape: string;
  color: string;
  tag: string;
  description: string;
  metrics: string;
  params: string;
  features: string[];
}

const STAGES: StageDetail[] = [
  {
    stage: 1,
    title: 'Stage 1: Input Tensor Matrix',
    name: 'Input Tensor',
    shape: '[B, 3, 224, 224]',
    color: '#58a6ff',
    tag: 'Input Flow',
    description: 'Ingests multidimensional commit telemetry, developer code events, and structured repository data streams into normalized 3D tensor planes with sliding receptive fields.',
    metrics: 'RGB 3-Channel Normalized Matrix • Dynamic Batch Size',
    params: 'Input Dim: 224x224x3',
    features: ['Code Commits', 'PR Velocity', 'AST Trees', 'Repo Telemetry'],
  },
  {
    stage: 2,
    title: 'Stage 2: Conv2D & Residual Blocks',
    name: 'Conv2D & ResNet',
    shape: '64 -> 128 -> 256 Channels',
    color: '#3fb950',
    tag: 'Feature Extraction',
    description: 'Hierarchical convolutional feature mapping with ResNet skip connections (F(x) + x) to prevent vanishing gradients while capturing fine-grained structural code patterns.',
    metrics: 'Kernel Size 3x3 • BatchNorm2d • GeLU Activation',
    params: 'ResNet-50 Backbone • 23.5M Params',
    features: ['Edge Detectors', 'Syntax Filters', 'Pattern Extractors', 'Skip Residuals'],
  },
  {
    stage: 3,
    title: 'Stage 3: Multi-Head Self Attention',
    name: 'Self-Attention',
    shape: '8 Attention Heads (512d)',
    color: '#d2a8ff',
    tag: 'Transformer Core',
    description: 'Computes Query, Key, and Value dot-product projections to establish contextual relationships across distributed codebase abstractions and neural weights.',
    metrics: 'Softmax(QKᵀ / √dₖ) V • Multi-Head Scaled Attention',
    params: '8 Heads x 64 Dim = 512d Hidden',
    features: ['Q Projection', 'K Projection', 'V Projection', 'Context Matrix'],
  },
  {
    stage: 4,
    title: 'Stage 4: Latent MLP Dense Synapses',
    name: 'Dense Synapses',
    shape: '512-Dimensional Manifold',
    color: '#f0883e',
    tag: 'Latent Embedding',
    description: 'Fully connected high-energy synapse interconnects mapping learned vector representations into decision manifolds with non-linear feedforward routing.',
    metrics: 'Dense W·X+b Matrix • Dropout 0.1 • 1.2M Params',
    params: 'FC-512 -> FC-256 -> FC-128',
    features: ['Latent Space', 'Non-linear ReLU', 'Dropout 0.1', 'Synaptic Weights'],
  },
  {
    stage: 5,
    title: 'Stage 5: Softmax Logits & Deployments',
    name: 'Output Heads',
    shape: 'Confidence: 99.4%',
    color: '#7ee787',
    tag: 'Output Head',
    description: 'Generates final output capability classifications and deployment verifications: Full-Stack Web Apps (99.4%), AI/ML Pipelines (98.8%), LLM Agents (97.9%), and Algorithmic DSA (99.1%).',
    metrics: 'Softmax Probability Distribution • CrossEntropy Loss: 0.012',
    params: '4 Target Classification Classes',
    features: ['Full Stack (99.4%)', 'AI/ML (98.8%)', 'LLM Agents (97.9%)', 'DSA (99.1%)'],
  },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  currentStage: number;
  progress: number;
  color: string;
  speed: number;
}

export const NeuralNetworkVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(2);
  const [pulseSpeed, setPulseSpeed] = useState<'normal' | 'fast' | 'boost'>('normal');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'interactive' | 'blueprint'>('interactive');
  const [inferenceCount, setInferenceCount] = useState<number>(1420);
  const [activeSignal, setActiveSignal] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const speedMultipliers = {
    normal: 1.0,
    fast: 1.8,
    boost: 2.8,
  };

  // Trigger manual forward pass impulse
  const triggerForwardPass = () => {
    setActiveSignal(true);
    setInferenceCount((prev) => prev + 1);

    // Spawn burst of particles
    if (canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      for (let i = 0; i < 15; i++) {
        const startY = (height / 6) + (Math.random() * (height * 0.66));
        particlesRef.current.push({
          id: Math.random(),
          x: 40,
          y: startY,
          targetX: width - 40,
          targetY: (height / 5) + (Math.random() * (height * 0.6)),
          currentStage: 1,
          progress: Math.random() * 0.2,
          color: ['#58a6ff', '#3fb950', '#d2a8ff', '#f0883e', '#7ee787'][Math.floor(Math.random() * 5)],
          speed: (0.008 + Math.random() * 0.008) * speedMultipliers[pulseSpeed],
        });
      }
    }

    setTimeout(() => setActiveSignal(false), 1200);
  };

  // Real-time Canvas Animation Loop
  useEffect(() => {
    if (viewMode !== 'interactive') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle responsive sizing
    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = 320 * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize layer node coordinates
    const layerDefs = [
      { name: 'Input', nodes: 5, color: '#58a6ff' },
      { name: 'Conv2D Block', nodes: 7, color: '#3fb950' },
      { name: 'Self-Attention', nodes: 6, color: '#d2a8ff' },
      { name: 'Dense MLP', nodes: 5, color: '#f0883e' },
      { name: 'Softmax Output', nodes: 4, color: '#7ee787' },
    ];

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = 320;

      ctx.clearRect(0, 0, w, h);

      // Background subtle grid
      ctx.strokeStyle = '#161b22';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Compute layer node positions
      const layerPositions: { x: number; y: number; color: string; layerIndex: number }[][] = [];
      const numLayers = layerDefs.length;
      const layerSpacing = (w - 120) / (numLayers - 1);

      layerDefs.forEach((layer, lIdx) => {
        const x = 60 + lIdx * layerSpacing;
        const nodesInLayer = layer.nodes;
        const nodeSpacing = (h - 100) / (nodesInLayer - 1);
        const currentLayerNodes: { x: number; y: number; color: string; layerIndex: number }[] = [];

        for (let nIdx = 0; nIdx < nodesInLayer; nIdx++) {
          const y = 50 + nIdx * nodeSpacing;
          currentLayerNodes.push({ x, y, color: layer.color, layerIndex: lIdx });
        }
        layerPositions.push(currentLayerNodes);
      });

      // Draw Synaptic Connection Lines
      for (let lIdx = 0; lIdx < layerPositions.length - 1; lIdx++) {
        const currentNodes = layerPositions[lIdx];
        const nextNodes = layerPositions[lIdx + 1];
        const isHighlight = activeStage === lIdx + 1 || activeStage === lIdx + 2;

        currentNodes.forEach((fromNode) => {
          nextNodes.forEach((toNode) => {
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            
            // Draw smooth bezier curves between neural layers
            const cx1 = fromNode.x + (toNode.x - fromNode.x) * 0.5;
            const cy1 = fromNode.y;
            const cx2 = fromNode.x + (toNode.x - fromNode.x) * 0.5;
            const cy2 = toNode.y;
            ctx.bezierCurveTo(cx1, cy1, cx2, cy2, toNode.x, toNode.y);

            if (isHighlight) {
              ctx.strokeStyle = `${fromNode.color}55`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = '#21262d';
              ctx.lineWidth = 0.6;
            }
            ctx.stroke();
          });
        });
      }

      // Draw ResNet Skip Connections (Curve from Layer 1 to Layer 3)
      if (layerPositions[1] && layerPositions[3]) {
        ctx.beginPath();
        const start = layerPositions[1][0];
        const end = layerPositions[3][0];
        ctx.moveTo(start.x, start.y);
        ctx.bezierCurveTo(start.x + 40, 15, end.x - 40, 15, end.x, end.y);
        ctx.strokeStyle = '#3fb95088';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Spawn periodic streaming particles
      if (isRunning && Math.random() < 0.15 * speedMultipliers[pulseSpeed]) {
        const startY = 50 + Math.random() * (h - 100);
        particlesRef.current.push({
          id: Math.random(),
          x: 60,
          y: startY,
          targetX: w - 60,
          targetY: 50 + Math.random() * (h - 100),
          currentStage: 1,
          progress: 0,
          color: layerDefs[Math.floor(Math.random() * layerDefs.length)].color,
          speed: (0.004 + Math.random() * 0.005) * speedMultipliers[pulseSpeed],
        });
      }

      // Update & Draw Flowing Synaptic Particles
      if (isRunning) {
        particlesRef.current.forEach((p) => {
          p.progress += p.speed;
          const currentLayerIdx = Math.floor(p.progress * (numLayers - 1));
          const nextLayerIdx = Math.min(currentLayerIdx + 1, numLayers - 1);
          const t = (p.progress * (numLayers - 1)) - currentLayerIdx;

          const fromX = 60 + currentLayerIdx * layerSpacing;
          const toX = 60 + nextLayerIdx * layerSpacing;
          p.x = fromX + (toX - fromX) * t;

          // Wave motion
          p.y += Math.sin(time * 0.005 + p.id * 10) * 0.3;

          // Draw Glowing Particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, activeSignal ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = activeSignal ? 10 : 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Filter out completed particles
        particlesRef.current = particlesRef.current.filter((p) => p.progress < 1.0);
      }

      // Draw Neural Layer Nodes & Labels
      layerPositions.forEach((layerNodes, lIdx) => {
        const isStageActive = activeStage === lIdx + 1;
        const layerInfo = layerDefs[lIdx];

        // Layer Name Top Label
        ctx.fillStyle = isStageActive ? '#e6edf3' : '#8b949e';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(layerInfo.name, 60 + lIdx * layerSpacing, 28);

        layerNodes.forEach((node, nIdx) => {
          // Node Glow effect
          ctx.beginPath();
          ctx.arc(node.x, node.y, isStageActive ? 8 : 6, 0, Math.PI * 2);
          ctx.fillStyle = '#0d1117';
          ctx.fill();

          ctx.lineWidth = isStageActive ? 2.5 : 1.5;
          ctx.strokeStyle = isStageActive ? node.color : '#30363d';
          ctx.stroke();

          // Node core indicator
          ctx.beginPath();
          ctx.arc(node.x, node.y, isStageActive ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isStageActive ? node.color : `${node.color}99`;
          ctx.fill();

          // Pulse animation on node
          if (isRunning) {
            const pulse = (Math.sin(time * 0.004 * speedMultipliers[pulseSpeed] + nIdx + lIdx) + 1) * 0.5;
            if (pulse > 0.8) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, 11 * pulse, 0, Math.PI * 2);
              ctx.strokeStyle = `${node.color}${Math.floor((1 - pulse) * 255).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [viewMode, activeStage, pulseSpeed, isRunning, activeSignal]);

  return (
    <section id="neural" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7ee787]/10 border border-[#7ee787]/30 flex items-center justify-center text-[#7ee787]">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#e6edf3] font-mono tracking-tight flex items-center gap-2">
                <span>Deep CNN & Vision Transformer Visualizer</span>
                <span className="px-2 py-0.5 rounded bg-[#238636]/20 border border-[#238636]/40 text-[#3fb950] text-xs font-normal">
                  Live Engine
                </span>
              </h2>
              <p className="text-sm text-[#8b949e]">
                Interactive multi-stage neural architecture computing real-time forward activations, residual skip connections, and attention matrices
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-mono text-[#3fb950]">
              <Activity className="w-3.5 h-3.5 animate-pulse text-[#3fb950]" />
              <span>FP16 TensorCore Active</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#58a6ff]/10 border border-[#58a6ff]/30 text-xs font-mono text-[#58a6ff]">
              <span>Inferences: {inferenceCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Visualizer Canvas & Controls Container */}
        <div className="p-6 rounded-2xl bg-[#0d1117] border border-[#30363d] shadow-2xl space-y-6">
          {/* Top toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#21262d] text-xs font-mono">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-[#161b22] border border-[#30363d] rounded-xl">
              <button
                id="view-interactive-btn"
                onClick={() => setViewMode('interactive')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'interactive'
                    ? 'bg-[#21262d] text-[#58a6ff] font-bold shadow-sm'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>Interactive Neural Canvas</span>
              </button>
              <button
                id="view-blueprint-btn"
                onClick={() => setViewMode('blueprint')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'bg-[#21262d] text-[#3fb950] font-bold shadow-sm'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#3fb950]" />
                <span>Vector Blueprint SVG</span>
              </button>
            </div>

            {/* Simulation Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="trigger-pass-btn"
                onClick={triggerForwardPass}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-[#ffffff] font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Trigger Forward Pass</span>
              </button>

              <button
                id="toggle-running-btn"
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#e6edf3] border border-[#30363d] cursor-pointer"
                title={isRunning ? 'Pause Simulation' : 'Play Simulation'}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#3fb950]" />}
              </button>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 p-0.5 bg-[#161b22] border border-[#30363d] rounded-lg">
                <button
                  id="speed-normal-btn"
                  onClick={() => setPulseSpeed('normal')}
                  className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                    pulseSpeed === 'normal'
                      ? 'bg-[#58a6ff] text-[#0d1117] font-bold'
                      : 'text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  1.0x
                </button>
                <button
                  id="speed-fast-btn"
                  onClick={() => setPulseSpeed('fast')}
                  className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                    pulseSpeed === 'fast'
                      ? 'bg-[#3fb950] text-[#0d1117] font-bold'
                      : 'text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  1.8x
                </button>
                <button
                  id="speed-boost-btn"
                  onClick={() => setPulseSpeed('boost')}
                  className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                    pulseSpeed === 'boost'
                      ? 'bg-[#d2a8ff] text-[#0d1117] font-bold'
                      : 'text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  Turbo
                </button>
              </div>
            </div>
          </div>

          {/* Main Visualizer Stage */}
          {viewMode === 'interactive' ? (
            <div className="relative rounded-xl overflow-hidden bg-[#080c14] border border-[#21262d] shadow-inner">
              <canvas
                ref={canvasRef}
                className="w-full h-[320px] block cursor-crosshair"
                onClick={triggerForwardPass}
              />

              {/* Real-time Telemetry HUD Overlays */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0d1117]/80 backdrop-blur border border-[#30363d] text-[10.5px] font-mono text-[#8b949e] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#58a6ff] animate-ping"></span>
                <span>Active Layer: <strong className="text-[#e6edf3]">Stage {activeStage} ({STAGES[activeStage - 1].name})</strong></span>
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#0d1117]/80 backdrop-blur border border-[#30363d] text-[10.5px] font-mono text-[#3fb950] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#3fb950]" />
                <span>ResNet-50 + ViT-B/16</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0d1117]/90 backdrop-blur border border-[#21262d] text-[11px] font-mono text-[#8b949e]">
                <span>Click anywhere on canvas or press <strong>"Trigger Forward Pass"</strong> to propagate tensor activations.</span>
                <span className="text-[#7ee787]">Latency: 1.4ms (CUDA TensorRT)</span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden bg-[#090d13] border border-[#21262d] p-3 flex justify-center items-center shadow-inner group">
              <img
                src="/github-contribution-neural-network.svg"
                alt="Deep CNN & Transformer Neural Network Architecture"
                className={`w-full max-w-5xl h-auto block select-none transition-all duration-300 ${
                  pulseSpeed === 'fast' ? 'brightness-110' : pulseSpeed === 'boost' ? 'brightness-125 contrast-110' : ''
                }`}
              />
            </div>
          )}

          {/* Real-time Output Inference Logits Bar */}
          <div className="p-4 rounded-xl bg-[#161b22]/80 border border-[#21262d]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#e6edf3] font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#7ee787]" />
                Classification Logits & Output Verification
              </span>
              <span className="text-[11px] font-mono text-[#3fb950]">Loss: 0.012 (Converged)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Full-Stack Web Systems', prob: 99.4, color: '#58a6ff' },
                { label: 'AI/ML & Deep Learning', prob: 98.8, color: '#3fb950' },
                { label: 'LLM Agents & GenAI', prob: 97.9, color: '#d2a8ff' },
                { label: 'Algorithmic DSA & Core', prob: 99.1, color: '#f0883e' },
              ].map((item) => (
                <div key={item.label} className="p-2.5 rounded-lg bg-[#0d1117] border border-[#21262d]">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#8b949e]">{item.label}</span>
                    <span className="font-bold text-[#e6edf3]">{item.prob}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#21262d] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.prob}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Stage Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {STAGES.map((s) => {
              const isSelected = activeStage === s.stage;
              return (
                <button
                  key={s.stage}
                  id={`stage-card-${s.stage}`}
                  onClick={() => {
                    setActiveStage(s.stage);
                    triggerForwardPass();
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#161b22] border-[#58a6ff] ring-1 ring-[#58a6ff]/40 shadow-md scale-[1.02]'
                      : 'bg-[#161b22]/50 hover:bg-[#161b22] border-[#21262d] hover:border-[#30363d]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      ></span>
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#21262d]">
                        {s.tag}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#e6edf3] font-mono mb-1 leading-tight">
                      {s.title}
                    </h4>
                    <div className="text-[10.5px] font-mono text-[#58a6ff] mb-2">
                      {s.shape}
                    </div>
                    <p className="text-[11px] text-[#8b949e] leading-relaxed line-clamp-2">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#21262d] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#58a6ff]">{s.params}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-[#58a6ff]' : 'text-[#8b949e]'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep Inspection Panel for Selected Stage */}
          <div className="p-4 rounded-xl bg-[#161b22] border border-[#58a6ff]/40 shadow-lg animate-fade-in">
            {(() => {
              const current = STAGES.find(s => s.stage === activeStage) || STAGES[0];
              return (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#21262d]">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#58a6ff]" />
                      <span className="text-xs font-bold font-mono text-[#e6edf3] uppercase">
                        {current.title} — Deep Tensor Inspector
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#3fb950] bg-[#238636]/10 px-2 py-0.5 rounded border border-[#238636]/30">
                      {current.metrics}
                    </span>
                  </div>

                  <p className="text-xs text-[#c9d1d9] leading-relaxed">
                    {current.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-[#8b949e] font-mono">Active Kernels / Channels:</span>
                    {current.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#58a6ff]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Section Divider SVG */}
        <div className="w-full my-8 flex justify-center">
          <img src="/assets/section-divider.svg" alt="Divider" className="w-full max-w-3xl opacity-80" />
        </div>
      </div>
    </section>
  );
};
