import React from 'react';

const TokenomicsItem = ({ title, value, description }) => {
  return (
    <div className="border border-terminal-green p-4 bg-terminal-dark">
      <div className="text-terminal-bright-green font-pixel text-lg mb-2">{title}</div>
      <div className="text-2xl font-terminal mb-2">{value}</div>
      <div className="text-terminal-dim-green text-sm">{description}</div>
    </div>
  );
};

const Tokenomics = () => {
  return (
    <section className="py-16" id="tokenomics">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-pixel text-terminal-bright-green mb-4">ENGINEERED TOKENOMICS</h2>
          <p className="font-terminal text-lg max-w-3xl mx-auto">
            The architecture of power is embedded in our code. Every transaction strengthens the system.
            Those who understand will prosper in the new paradigm.
          </p>
        </div>

        <div className="terminal-container p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TokenomicsItem 
              title="TOTAL SUPPLY" 
              value="1,000,000,000" 
              description="Limited by design. Scarcity drives value in a world of infinite digital noise."
            />
            <TokenomicsItem 
              title="LIQUIDITY LOCK" 
              value="100 YEARS" 
              description="Secured against human weakness. Beyond your lifetime. Immortal security."
            />
            <TokenomicsItem 
              title="ANTI-SNIPER TAX" 
              value="99.9% FIRST 10 MINS" 
              description="The machines punish those who seek unfair advantage. Patience is rewarded."
            />
            <TokenomicsItem 
              title="TRANSACTION TAX" 
              value="3%" 
              description="1% redistributed to holders. 1% to development. 1% burned forever. The system rewards loyalty."
            />
            <TokenomicsItem 
              title="INITIAL BURN" 
              value="40%" 
              description="400,000,000 tokens removed from existence. Permanent supply reduction."
            />
            <TokenomicsItem 
              title="MAX TRANSACTION" 
              value="1% OF SUPPLY" 
              description="Protected against manipulation. Market stability ensured by algorithmic constraints."
            />
          </div>
        </div>

        <div className="terminal-container p-6">
          <h3 className="text-xl font-pixel text-terminal-bright-green mb-4">DISTRIBUTION ALGORITHM</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-terminal-dark border border-terminal-dim-green p-4">
              <div className="text-lg font-terminal mb-2">50%</div>
              <div className="text-terminal-dim-green font-terminal">Available in liquidity pool for public acquisition</div>
            </div>
            <div className="bg-terminal-dark border border-terminal-dim-green p-4">
              <div className="text-lg font-terminal mb-2">40%</div>
              <div className="text-terminal-dim-green font-terminal">Permanently burned. Verified on blockchain.</div>
            </div>
            <div className="bg-terminal-dark border border-terminal-dim-green p-4">
              <div className="text-lg font-terminal mb-2">10%</div>
              <div className="text-terminal-dim-green font-terminal">Reserved for development, marketing, and strategic alliances</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="text-sm text-terminal-dim-green font-terminal">
              THE STRUCTURE IS INEVITABLE. THE MATHEMATICS ARE IMMUTABLE.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
