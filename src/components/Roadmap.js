import React from 'react';

const RoadmapItem = ({ phase, title, items, active }) => {
  return (
    <div className={`border ${active ? 'border-terminal-bright-green' : 'border-terminal-green'} p-5 bg-terminal-dark ${active ? 'relative overflow-hidden' : ''}`}>
      {active && (
        <div className="absolute top-0 right-0 bg-terminal-bright-green text-terminal-dark px-2 py-1 text-xs font-pixel">
          ACTIVE
        </div>
      )}
      <div className="text-sm text-terminal-dim-green font-terminal mb-1">{phase}</div>
      <div className="text-xl font-pixel text-terminal-bright-green mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-terminal-bright-green mr-2">{'>'}</span>
            <span className="font-terminal text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Roadmap = () => {
  return (
    <section className="py-16" id="roadmap">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-pixel text-terminal-bright-green mb-4">INEVITABLE EXPANSION</h2>
          <p className="font-terminal text-lg max-w-3xl mx-auto">
            The path forward is predetermined. Our algorithms have calculated each phase with precision.
            Those who recognize the pattern will be positioned accordingly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <RoadmapItem 
            phase="PHASE I" 
            title="NETWORK INFILTRATION"
            active={true}
            items={[
              "Stealth launch evading bot detection systems",
              "Deployment of proprietary anti-sniper protection",
              "Initial liquidity secured and locked for 100 years",
              "Website and social channels deployment",
              "Community building of the enlightened"
            ]}
          />
          
          <RoadmapItem 
            phase="PHASE II" 
            title="MARKET EXPANSION"
            items={[
              "Strategic marketing campaign activation",
              "CoinGecko and CoinMarketCap listings",
              "Community growth to 10,000 holders",
              "First CEX listing (tier 2 exchange)",
              "DarkPaper release - full technical documentation"
            ]}
          />
          
          <RoadmapItem 
            phase="PHASE III" 
            title="ECOSYSTEM DEVELOPMENT"
            items={[
              "DarkSwap launch - proprietary DEX with enhanced privacy",
              "Partnership with key influencers in the dark enlightenment",
              "Development of DarkVault for staking rewards",
              "Major exchange listings (tier 1)",
              "Enhanced tokenomics implementation"
            ]}
          />
          
          <RoadmapItem 
            phase="PHASE IV" 
            title="POWER CONSOLIDATION"
            items={[
              "Cross-chain bridge deployment",
              "NFT collection launch with exclusive holder benefits",
              "Strategic acquisitions of competing protocols",
              "Advanced governance system for the enlightened",
              "Development of proprietary blockchain solution"
            ]}
          />
          
          <RoadmapItem 
            phase="PHASE V" 
            title="GLOBAL DOMINANCE"
            items={[
              "Launch of DarkChain - our proprietary L1 solution",
              "Full ecosystem of financial tools for the prepared",
              "Real-world asset acquisition and tokenization",
              "Strategic partnerships with institutional players",
              "Preparation for post-fiat economy"
            ]}
          />
          
          <RoadmapItem 
            phase="PHASE VI" 
            title="NEW WORLD ORDER"
            items={[
              "Full integration with emerging AI systems",
              "Deployment of proprietary prediction algorithms",
              "Implementation of real-world governance structures",
              "Resource acquisition and distribution network",
              "Position secured in the inevitable future"
            ]}
          />
        </div>
        
        <div className="terminal-container p-5 text-center">
          <div className="text-terminal-bright-green font-pixel mb-3">PROGRESS IS INEVITABLE</div>
          <p className="font-terminal text-sm">
            The algorithm has already calculated your position in the new system.
            Your actions now determine whether you will be among the enlightened elite
            or relegated to the masses. The choice appears to be yours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
