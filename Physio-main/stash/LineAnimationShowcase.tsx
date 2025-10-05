import React from 'react';
import LusionStyleLines from './LusionStyleLines';
import AnimatedLineDrawing from './AnimatedLineDrawing';

const LineAnimationShowcase: React.FC = () => {
  return (
    <div className="w-full py-16 space-y-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Line Animation Showcase</h2>
        <p className="text-white/70 text-lg">Lusion-inspired line animations with various styles</p>
      </div>

      {/* Geometric Style */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90 text-center">Geometric Lines</h3>
        <LusionStyleLines 
          variant="geometric" 
          color="#4A90E2" 
          strokeWidth={2}
          trigger="scroll"
          className="bg-black/20 rounded-lg p-6 backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Organic Style */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90 text-center">Organic Curves</h3>
        <LusionStyleLines 
          variant="organic" 
          color="#E74C3C" 
          strokeWidth={3}
          trigger="scroll"
          className="bg-black/20 rounded-lg p-6 backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Connection Style */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90 text-center">Connection Network</h3>
        <LusionStyleLines 
          variant="connection" 
          color="#27AE60" 
          strokeWidth={2}
          trigger="scroll"
          className="bg-black/20 rounded-lg p-6 backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Minimal Style */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90 text-center">Minimal Design</h3>
        <LusionStyleLines 
          variant="minimal" 
          color="#F39C12" 
          strokeWidth={1}
          trigger="scroll"
          className="bg-black/20 rounded-lg p-6 backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Custom Advanced Animation */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90 text-center">Advanced Custom Paths</h3>
        <AnimatedLineDrawing 
          paths={[
            "M50,150 Q200,50 350,150 Q500,250 650,150 Q800,50 950,150",
            "M100,100 C200,200 300,50 400,150 C500,250 600,50 700,150",
            "M25,200 L125,100 L225,200 L325,100 L425,200 L525,100 L625,200"
          ]}
          strokeColor="#9B59B6"
          strokeWidth={2.5}
          duration={3}
          trigger="scroll"
          className="bg-black/20 rounded-lg p-6 backdrop-blur-sm border border-white/10"
          width={1000}
          height={300}
          viewBox="0 0 1000 300"
        />
      </div>

      {/* Hover Interactive */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90 text-center">Hover to Animate</h3>
        <p className="text-white/60 text-center text-sm">Hover over the area below to trigger animation</p>
        <LusionStyleLines 
          variant="geometric" 
          color="#1ABC9C" 
          strokeWidth={3}
          trigger="hover"
          className="bg-black/20 rounded-lg p-6 backdrop-blur-sm border border-white/10 cursor-pointer hover:border-white/30 transition-all duration-300"
        />
      </div>

      {/* Auto-playing continuous animation */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90 text-center">Continuous Animation</h3>
        <LusionStyleLines 
          variant="organic" 
          color="#E67E22" 
          strokeWidth={2}
          trigger="immediate"
          autoPlay={true}
          className="bg-black/20 rounded-lg p-6 backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Usage Instructions */}
      <div className="bg-black/30 rounded-lg p-8 border border-white/20 backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-white mb-4">How to Use</h3>
        <div className="space-y-3 text-white/80 text-sm">
          <p><strong>LusionStyleLines:</strong> Four variants (geometric, organic, connection, minimal)</p>
          <p><strong>Triggers:</strong> 'scroll' (default), 'hover', 'immediate'</p>
          <p><strong>Customization:</strong> color, strokeWidth, autoPlay, className</p>
          <p><strong>AnimatedLineDrawing:</strong> Custom SVG paths with advanced controls</p>
        </div>
        <div className="mt-6 p-4 bg-black/40 rounded border border-white/10">
          <p className="text-xs text-white/60 font-mono">
            {'<LusionStyleLines variant="geometric" color="#4A90E2" trigger="scroll" />'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LineAnimationShowcase;