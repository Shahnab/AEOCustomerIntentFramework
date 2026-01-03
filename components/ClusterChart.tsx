import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Topic } from '../types';

interface ClusterChartProps {
  data: Topic[];
}

// Extended node interface for D3 Force
interface SimulationNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'topic' | 'keyword';
  group: string;
  r: number;
  value?: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: string | SimulationNode;
  target: string | SimulationNode;
}

const ClusterChart: React.FC<ClusterChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  
  // UNIFORM ORANGE COLOR for all topics
  const MAIN_COLOR = '#ff7a00';

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    // Helper to get dimensions
    const getDimensions = () => {
        if (!containerRef.current) return { width: 800, height: 600 };
        return {
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight
        };
    };

    let { width, height } = getDimensions();
    const isMobile = width < 768;
    
    // Clear previous
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("viewBox", [0, 0, width, height])
       .attr("width", "100%")
       .attr("height", "100%")
       .style("cursor", "grab");

    // 2. Create Zoom Container (everything moves inside this)
    const container = svg.append("g").attr("class", "zoom-container");

    // 3. Setup Zoom Behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
            container.attr("transform", event.transform);
        });
    
    svg.call(zoom).on("dblclick.zoom", null);
    zoomRef.current = zoom;

    // Apply initial zoom out to see all clusters
    const initialScale = isMobile ? 0.35 : 0.55;
    const initialTx = (width - width * initialScale) / 2;
    const initialTy = (height - height * initialScale) / 2;
    svg.call(zoom.transform, d3.zoomIdentity.translate(initialTx, initialTy).scale(initialScale));

    // 4. Prepare Data (Flatten Hierarchy for Force Sim)
    const nodes: SimulationNode[] = [];
    const links: SimulationLink[] = [];

    data.forEach((topic) => {
      // Add Topic Node (The Planet)
      const topicId = `topic-${topic.topic}`;
      nodes.push({
        id: topicId,
        name: topic.topic,
        type: 'topic',
        group: topic.topic,
        r: isMobile ? 45 : 65, // Responsive radius
        x: width / 2 + (Math.random() - 0.5) * 50,
        y: height / 2 + (Math.random() - 0.5) * 50,
      });

      // Add Keyword Nodes (The Moons)
      topic.entries.filter(e => e.keyword).forEach((entry, i) => {
        const keywordId = `kw-${topic.topic}-${i}`;
        nodes.push({
          id: keywordId,
          name: entry.keyword!,
          type: 'keyword',
          group: topic.topic,
          r: 6 + Math.random() * 6, // Variable size
          x: width / 2 + (Math.random() - 0.5) * 200,
          y: height / 2 + (Math.random() - 0.5) * 200,
        });

        // Link Keyword to Topic
        links.push({
          source: topicId,
          target: keywordId
        });
      });
    });

    // 5. Define Gradients & Filters
    const defs = svg.append("defs");

    // Soft Glow - Warm
    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "2.5").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Glass Orb Gradients - Unified Orange
    const cleanId = MAIN_COLOR.replace('#', '');
    const grad = defs.append("radialGradient")
        .attr("id", `grad-${cleanId}`)
        .attr("cx", "50%").attr("cy", "50%").attr("r", "50%")
        .attr("fx", "30%").attr("fy", "30%");
    
    // Adjust opacity for glass effect but keep color vibrancy
    grad.append("stop").attr("offset", "0%").attr("stop-color", MAIN_COLOR).attr("stop-opacity", 0.6);
    grad.append("stop").attr("offset", "100%").attr("stop-color", MAIN_COLOR).attr("stop-opacity", 0.2);

    // 6. Create Sub-Groups inside Zoom Container (Order matters for z-index)
    const linkGroup = container.append("g").attr("class", "links");
    const nodeGroup = container.append("g").attr("class", "nodes");
    const labelGroup = container.append("g").attr("class", "labels");

    // 7. Initialize Simulation with PROFESSIONAL PHYSICS
    const simulation = d3.forceSimulation<SimulationNode>(nodes)
      .force("link", d3.forceLink<SimulationNode, SimulationLink>(links)
          .id(d => d.id)
          .distance(d => d.type === 'topic' ? 0 : 70) 
          .strength(0.15))
      .force("charge", d3.forceManyBody()
          .strength(d => (d as SimulationNode).type === 'topic' ? -350 : -20))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.8)) 
      .force("x", d3.forceX(width / 2).strength(0.025)) 
      .force("y", d3.forceY(height / 2).strength(0.025)) 
      .force("collide", d3.forceCollide()
          .radius(d => (d as SimulationNode).r * 1.1 + 5)
          .strength(0.5));

    // 8. Draw Links (The Network Lines)
    linkGroup.selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", MAIN_COLOR) // Orange links
      .attr("stroke-opacity", 0.2)
      .attr("stroke-width", 1);

    // 9. Draw Nodes (The Orbs)
    const node = nodeGroup.selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "node-group") 
      .attr("data-group", d => d.group) 
      .call(d3.drag<SVGGElement, SimulationNode>() // Interactive Dragging
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Interactive Hover Effects
    node.on("mouseenter", function(event, d) {
        if (d.type === 'topic') {
            // 1. Highlight Topic
            const currentGroup = d3.select(this);
            currentGroup.raise(); // Bring to front
            
            currentGroup.select("circle")
              .transition().duration(400).ease(d3.easeBackOut)
              .attr("r", d.r * 1.2)
              .attr("stroke-width", 2)
              .attr("stroke", MAIN_COLOR) // Orange stroke on hover
              .attr("stroke-opacity", 1);
            
            // Highlight text background
            currentGroup.select("foreignObject div span")
               .style("background", "rgba(255, 122, 0, 0.2)")
               .style("border-color", MAIN_COLOR)
               .style("transform", "scale(1.05)");

            // 2. Animate Keywords (Satellites)
            nodeGroup.selectAll(".node-group")
              .filter((n: any) => n.group === d.group && n.type === 'keyword')
              .select("circle")
              .transition().duration(300).delay((_, i) => i * 15) // Ripple effect
              .attr("r", (n: any) => n.r * 1.5)
              .attr("fill", "#ffffff") // CHANGED: subtle white for readability
              .attr("opacity", 1);
              
            // 3. Highlight Keyword Labels
            labelGroup.selectAll("text")
              .filter((n: any) => n.group === d.group)
              .transition().duration(300)
              .style("fill", "#ffffff") // Bright white text
              .style("opacity", 1);

            // 4. Highlight Links
            linkGroup.selectAll("line")
              .filter((l: any) => l.source.id === d.id || l.target.id === d.id)
              .transition().duration(300)
              .attr("stroke", MAIN_COLOR)
              .attr("stroke-opacity", 0.6)
              .attr("stroke-width", 1.5);
        }
    })
    .on("mouseleave", function(event, d) {
        if (d.type === 'topic') {
            // Reset Topic
            d3.select(this).select("circle")
              .transition().duration(300)
              .attr("r", d.r)
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 1)
              .attr("stroke-opacity", 0.4);

             d3.select(this).select("foreignObject div span")
               .style("background", "rgba(0,0,0,0.8)")
               .style("border-color", "rgba(255,255,255,0.1)")
               .style("transform", "scale(1)");

            // Reset Keywords - RETURN TO WHITE
            nodeGroup.selectAll(".node-group")
              .filter((n: any) => n.group === d.group && n.type === 'keyword')
              .select("circle")
              .transition().duration(300)
              .attr("r", (n: any) => n.r)
              .attr("fill", "#ffffff") // Back to White
              .attr("opacity", 0.8);
            
            // Reset Keyword Labels
            labelGroup.selectAll("text")
              .filter((n: any) => n.group === d.group)
              .transition().duration(300)
              .style("fill", "#a1a1aa") // Back to Grey
              .style("opacity", 0.7);

             // Reset Links
            linkGroup.selectAll("line")
              .filter((l: any) => l.source.id === d.id || l.target.id === d.id)
              .transition().duration(300)
              .attr("stroke", MAIN_COLOR)
              .attr("stroke-opacity", 0.2)
              .attr("stroke-width", 1);
        }
    });

    // Topic Orbs (Glassy Orange)
    node.filter(d => d.type === 'topic')
      .append("circle")
      .attr("r", d => d.r)
      .attr("fill", `url(#grad-${cleanId})`) // Use the unified orange gradient
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.4)
      .style("filter", "url(#glow)");

    // Keyword Dots (Small, Pure White)
    node.filter(d => d.type === 'keyword')
      .append("circle")
      .attr("r", d => d.r)
      .attr("fill", "#ffffff") // White Keywords
      .attr("opacity", 0.8)
      .attr("stroke", "none");

    // 10. Draw Labels (Floating)
    const topicLabels = labelGroup.selectAll(".topic-label")
        .data(nodes.filter(d => d.type === 'topic'))
        .join("foreignObject")
        .attr("width", 160)
        .attr("height", 60)
        .style("overflow", "visible")
        .style("pointer-events", "none") 
        .html(d => `
            <div style="
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100%; 
                text-align: center;
                color: #ffffff;
                font-family: 'Inter', sans-serif;
                font-weight: 700;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding: 4px;
            ">
                <span style="background: rgba(0,0,0,0.8); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease;">
                    ${d.name}
                </span>
            </div>
        `);

    const keywordLabels = labelGroup.selectAll(".kw-label")
        .data(nodes.filter(d => d.type === 'keyword'))
        .join("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("font-family", "Inter")
        .style("font-size", "9px")
        .style("fill", "#a1a1aa") // Zinc 400 - slightly lighter text for contrast against black
        .style("opacity", 0.7)
        .style("pointer-events", "none")
        .text(d => d.name.length > 15 ? d.name.substring(0, 15) + '..' : d.name);


    // 11. Animation Tick
    const link = linkGroup.selectAll("line"); 
    
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as SimulationNode).x!)
        .attr("y1", d => (d.source as SimulationNode).y!)
        .attr("x2", d => (d.target as SimulationNode).x!)
        .attr("y2", d => (d.target as SimulationNode).y!);

      node.attr("transform", d => `translate(${d.x},${d.y})`);

      topicLabels
        .attr("x", d => d.x! - 80) 
        .attr("y", d => d.y! - 20); 

      keywordLabels
        .attr("x", d => d.x!)
        .attr("y", d => d.y!);
    });

    // 12. Drag Functions
    function dragstarted(event: any, d: SimulationNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      svg.style("cursor", "grabbing");
    }

    function dragged(event: any, d: SimulationNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: SimulationNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      svg.style("cursor", "grab");
    }

    // Handle Resize
    const handleResize = () => {
        const { width: newWidth, height: newHeight } = getDimensions();
        svg.attr("viewBox", [0, 0, newWidth, newHeight]);
        
        // Re-center force
        simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
        simulation.force("x", d3.forceX(newWidth / 2).strength(0.025));
        simulation.force("y", d3.forceY(newHeight / 2).strength(0.025));
        
        simulation.alpha(0.3).restart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  const handleZoomIn = () => {
    if (svgRef.current && zoomRef.current) {
        d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomRef.current) {
        d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1 / 1.3);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomRef.current) {
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        const initialScale = 0.55;
        const initialTx = (width - width * initialScale) / 2;
        const initialTy = (height - height * initialScale) / 2;

        d3.select(svgRef.current).transition().duration(500).call(
             zoomRef.current.transform, 
             d3.zoomIdentity.translate(initialTx, initialTy).scale(initialScale)
        );
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center p-0 overflow-hidden relative bg-black group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <svg ref={svgRef} className="w-full h-full" />
        
        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 p-1.5 rounded-lg bg-surface/80 border border-border/50 backdrop-blur-md shadow-2xl transition-opacity duration-300 opacity-60 hover:opacity-100 z-20">
          <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Zoom In">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Zoom Out">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <div className="h-px w-4 bg-border mx-auto my-0.5"></div>
          <button onClick={handleResetZoom} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Reset View">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          </button>
        </div>
    </div>
  );
};

export default ClusterChart;