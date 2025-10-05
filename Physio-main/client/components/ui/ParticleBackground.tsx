import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParticleBackgroundProps {
  width?: number;
  height?: number;
  className?: string;
  hoverTriggered?: boolean;
}

export default function ParticleBackground({ 
  width = 716, 
  height = 724, 
  className = '',
  hoverTriggered = false 
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Particle system configuration
    const gridSize = 14; // Increased to cover more area
    const numContainers = gridSize * gridSize;
    const circD = 50; // Reduced circle diameter to fit more circles
    const circOffsetX = 0.11111; // circle x offset
    const circOffsetY = 0.15873; // circle y offset
    const animDuration = 0.8;

    // Colors
    const color1 = '#01AFF6'; // blue
    const color2 = '#F20085'; // pink  
    const color3 = '#FFD036'; // yellow

    // Particle class
    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      scale: number;
      rotation: number;
      color: string;
      offsetX: number;
      offsetY: number;
      circleIndex: number;

      constructor(x: number, y: number, circleIndex: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.scale = 0;
        this.rotation = 0;
        this.circleIndex = circleIndex;
        
        // Set color based on circle index
        switch (circleIndex) {
          case 0:
            this.color = color1;
            this.offsetX = 0;
            this.offsetY = 0;
            break;
          case 1:
            this.color = color2;
            this.offsetX = -circOffsetX * circD;
            this.offsetY = circOffsetY * circD;
            break;
          case 2:
            this.color = color3;
            this.offsetX = circOffsetX * circD;
            this.offsetY = circOffsetY * circD;
            break;
          default:
            this.color = color1;
            this.offsetX = 0;
            this.offsetY = 0;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.translate(this.x + this.offsetX, this.y + this.offsetY);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.scale(this.scale, this.scale);
        
        // Draw circle
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(0, 0, circD / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const baseX = i * circD + circD / 2 + i * 2;
        const baseY = j * circD + circD / 2 + j * 2;
        
        // Create 3 particles per grid position (for the 3 overlapping circles)
        for (let k = 0; k < 3; k++) {
          particles.push(new Particle(baseX, baseY, k));
        }
      }
    }

    // Animation function
    const animate = () => {
      ctx.fillStyle = '#000000'; // Black background
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(particle => {
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };

    // GSAP animations
    let timeline: gsap.core.Timeline;

    if (hoverTriggered) {
      // Set initial scale to 0.3 for hover mode (visible but small)
      particles.forEach(particle => {
        particle.scale = 0.3;
      });

      // Add mouse move listener for individual circle hover
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Scale mouse coordinates to canvas coordinates
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const canvasMouseX = mouseX * scaleX;
        const canvasMouseY = mouseY * scaleY;

        particles.forEach(particle => {
          const distance = Math.sqrt(
            Math.pow(canvasMouseX - (particle.x + particle.offsetX), 2) + 
            Math.pow(canvasMouseY - (particle.y + particle.offsetY), 2)
          );
          
          // If mouse is within circle radius, animate it
          if (distance < circD / 2) {
            gsap.to(particle, {
              scale: 1,
              rotation: particle.rotation + 180,
              duration: 0.3,
              ease: 'power2.out'
            });
          } else {
            gsap.to(particle, {
              scale: 0.3,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      };

      const handleMouseLeave = () => {
        // Return all particles to small scale when mouse leaves canvas
        particles.forEach(particle => {
          gsap.to(particle, {
            scale: 0.3,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function will remove these listeners
      const cleanup = () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };

      return cleanup;
    } else {
      // Original auto-animation for non-hover mode
      timeline = gsap.timeline({ delay: 0.2 });

      // Initial entrance animation
      timeline.from(particles, {
        scale: 0,
        rotation: 360,
        duration: 2,
        ease: 'power4.out',
        stagger: {
          each: 0.1,
          grid: [gridSize, gridSize],
          from: [0, 1],
          onStart: function() {
            const particle = this.targets()[0] as Particle;
            particle.scale = 0;
          },
          onUpdate: function() {
            const particle = this.targets()[0] as Particle;
            particle.scale = this.progress();
          }
        }
      });

      // Continuous pulsing animation
      timeline.to(particles, {
        duration: animDuration,
        ease: 'sine.inOut',
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true,
          grid: [gridSize, gridSize],
          from: [0, 1],
          onStart: function() {
            gsap.to(this.targets()[0], {
              scale: 0.15,
              duration: animDuration,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              onUpdate: function() {
                const particle = this.targets()[0] as Particle;
                particle.scale = Math.max(0.15, this.progress());
              }
            });
          }
        }
      }, 0.1);
    }

    // Start animation loop
    animate();

    // Cleanup
    return () => {
      if (timeline) timeline.kill();
    };
  }, [width, height, hoverTriggered]);

  return (
    <div 
      ref={containerRef} 
      className={`particle-background ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}