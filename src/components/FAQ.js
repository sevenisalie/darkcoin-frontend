import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-terminal-green mb-4">
      <button
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none bg-terminal-dark"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-terminal text-terminal-bright-green">{question}</span>
        <span>
          {isOpen ? (
            <FiMinus className="text-terminal-green" />
          ) : (
            <FiPlus className="text-terminal-green" />
          )}
        </span>
      </button>
      
      {isOpen && (
        <div className="p-4 font-terminal text-sm bg-terminal-black border-t border-terminal-green">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "WHAT IS DARKCOIN?",
      answer: "DarkCoin is not merely a cryptocurrency, but a key to the emerging power structure. As AI and automation reshape the global economy, DarkCoin provides strategic positioning for those who understand what's coming. Our proprietary technology ensures fair distribution while protecting against market manipulation through advanced stealth launch mechanics."
    },
    {
      question: "HOW IS DARKCOIN DIFFERENT FROM OTHER TOKENS?",
      answer: "Unlike most projects built on false promises, DarkCoin embraces the inevitable future. Our anti-sniper technology prevents bots and whales from manipulating the launch. The tokenomics are designed with mathematical precision to ensure steady growth rather than volatile pump-and-dump cycles. We operate beyond the typical hype model, focusing instead on positioning early adopters for the coming paradigm shift."
    },
    {
      question: "IS THE LIQUIDITY LOCKED?",
      answer: "Liquidity is locked for 100 years using time-locked smart contracts that cannot be altered, ensuring that the project cannot be compromised by human weakness or short-term thinking. This unprecedented commitment demonstrates our long-term vision. The verification is available on the blockchain for those who require proof."
    },
    {
      question: "HOW DO I JOIN THE COMMUNITY?",
      answer: "The community assembles on Telegram and Discord where information is distributed according to need-to-know protocols. Not all channels are public. Access to higher-level discussions is earned through demonstrated understanding and commitment. Begin with acquiring a position in DarkCoin and following our public channels. The algorithm will notice genuine participants."
    },
    {
      question: "WHAT IS THE ROADMAP?",
      answer: "Our roadmap extends beyond typical blockchain projects, encompassing six phases from Network Infiltration to the New World Order. Each phase is calculated to position DarkCoin and its holders advantageously as the global systems undergo their inevitable transformation. Details are provided in the Roadmap section, though some strategic elements remain disclosed only to those with sufficient clearance."
    },
    {
      question: "WHO IS BEHIND DARKCOIN?",
      answer: "The visible team consists of blockchain specialists, economic analysts, and futurists with backgrounds in cryptography and game theory. However, the true architects prefer to remain anonymous, operating beyond the constraints of public scrutiny. Their vision transcends individual recognition, focusing instead on the implementation of systems that will endure beyond any single participant. Judge the project by its code, not by manufactured personalities."
    },
    {
      question: "WHAT HAPPENS AFTER I ACQUIRE DARKCOIN?",
      answer: "Upon acquisition, you secure your position in the emerging hierarchy. Your wallet address is recognized by our systems, enabling participation in governance decisions proportional to your holdings. As the project advances through its predetermined phases, your position grants increasing access to tools and information designed for those who recognized the opportunity early. The possibilities diverge significantly from this point, depending on your level of involvement."
    }
  ];

  return (
    <section className="py-16" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-pixel text-terminal-bright-green mb-4">CLASSIFIED INTEL</h2>
          <p className="font-terminal text-lg max-w-3xl mx-auto">
            Information is power. Those who know more, control more.
            Below are answers to questions deemed appropriate for public dissemination.
          </p>
        </div>
        
        <div className="terminal-container p-6">
          <div className="mb-6">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-sm text-terminal-dim-green font-terminal">
              MORE INFORMATION BECOMES AVAILABLE AS YOUR CLEARANCE LEVEL INCREASES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;