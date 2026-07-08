import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, usePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Plus, TrendingUp, Cpu, Shield, BarChart, Database, ArrowLeft, Network, Briefcase, User } from 'lucide-react';

const chaptersData = [
  { 
    id: "optic-cables",
    name: "Optic cables", 
    image: "./optic_cables.png",
    icon: Network,
    title: "Optic Cables & Low-Latency Infrastructure",
    subtitle: "How we leverage cutting-edge hardware for microsecond execution.",
    content: "In algorithmic trading, execution speed is a primary edge. Neuro Frequency Labs utilizes co-located servers placed directly inside exchange data centers. These systems are connected via ultra-low latency fiber-optic lines, routing market data and order flows with sub-millisecond round-trip times.",
    strategy: "Our proprietary HFT models run on specialized network interface cards (NICs). We deploy high-frequency market-making and cross-exchange arbitrage strategies that capture fleeting price discrepancies. By the time market data reaches standard connections, our orders have already executed and cleared."
  },
  { 
    id: "nse-bse",
    name: "about NSE and BSE", 
    image: "./nse_bse.png",
    icon: TrendingUp,
    title: "Trading the NSE & BSE Markets",
    subtitle: "Capitalizing on the growth and liquidity of India's premier exchanges.",
    content: "The National Stock Exchange (NSE) and Bombay Stock Exchange (BSE) represent the core of our daily trading operations. We specialize in high-liquidity segments, focusing primarily on Nifty 50 index futures, options contracts, and highly liquid equity derivatives.",
    strategy: "Our systems run delta-neutral options market-making and statistical arbitrage models. We constantly feed liquidity into the NSE and BSE order books, capturing market spreads. By using real-time order flow analysis and volatility forecasting, we adapt our position sizing dynamically to secure consistent returns while minimizing market impact."
  },
  { 
    id: "bonds",
    name: "Bonds market", 
    image: "./bonds.jpg",
    icon: Briefcase,
    title: "Bonds & Fixed-Income Arbitrage",
    subtitle: "Deploying systematic models in debt and sovereign securities.",
    content: "The debt and bond markets offer highly structured price relationships and predictable yield curves. We trade across government securities (G-Secs), treasury bills, and high-grade corporate debt instruments, looking for price anomalies relative to interest rate dynamics.",
    strategy: "We execute yield-curve arbitrage and basis trading strategies (cash vs. interest rate futures). By modeling the term structure of interest rates, our systems identify minor mispricings along the curve. These positions are hedged against duration and interest rate risks, creating a market-neutral stream of returns."
  },
  { 
    id: "about-me",
    name: "about me", 
    image: "./about_me.png",
    icon: User,
    title: "About Me & Neuro Frequency Labs",
    subtitle: "The vision, the discipline, and the journey toward consistent alpha.",
    content: "Neuro Frequency Labs was established to bridge the gap between quantitative research and disciplined execution. Founded by a dedicated algorithmic trader, the firm is built on the philosophy that market frequencies can be decoded through mathematical models, clean infrastructure, and rigid risk control.",
    strategy: "We manage internal proprietary capital with an absolute return mandate. Our recent milestone—generating a 10% return on initial capital during April—stands as a validation of our systematic framework. We believe in continuous iteration, scaling only when models prove mathematical consistency under live market friction."
  }
];

const alphaPillsData = [
  {
    id: "nifty-50",
    name: "Nifty 50",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    icon: TrendingUp,
    title: "Nifty 50 Index Trading",
    subtitle: "Trading the benchmark index of the Indian stock market.",
    content: "The NSE Nifty 50 represents India's top 50 blue-chip companies. We focus our core trading models on this index due to its deep liquidity, high tick activity, and robust options chains.",
    strategy: "Our models execute delta-hedging and statistical arbitrage strategies on Nifty 50 index futures and option chains, capturing tick-level spreads and pricing anomalies during active sessions."
  },
  {
    id: "algorithms",
    name: "Algorithms",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop",
    icon: Cpu,
    title: "Mathematical Algorithms",
    subtitle: "Emotionless execution built on statistical probabilities.",
    content: "Our quantitative algorithms process tick-by-tick market data in real-time, executing trades based on mathematical expectancy and statistical patterns rather than human bias.",
    strategy: "We deploy systematic mean-reversion, trend-following, and market-making algorithms that automatically adjust execution parameters as volatility and order-book depth change."
  },
  {
    id: "risk-control",
    name: "Risk Control",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
    icon: Shield,
    title: "Strict Risk Control",
    subtitle: "Preserving trading capital through rigid mathematical constraints.",
    content: "Risk management is the absolute foundation of our prop firm. We prioritize capital preservation through hard-coded leverage limits, position sizing rules, and asset correlation caps.",
    strategy: "Every execution router is bound by automated circuit breakers. Our models dynamically adjust equity exposure based on real-time volatility indexes (such as India VIX), ensuring max drawdowns stay strictly controlled."
  },
  {
    id: "performance",
    name: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    icon: BarChart,
    title: "Consistent Performance Metrics",
    subtitle: "Targeting high Sharpe ratios and stable absolute returns.",
    content: "We define performance by consistency. Our metrics focus on absolute returns, high risk-adjusted Sharpe ratios, and low correlation to traditional indices.",
    strategy: "Our milestone of +10% return in April on initial capital validates our execution pipeline. We backtest every strategy against millisecond-level historical tick data before running them live."
  },
  {
    id: "models",
    name: "Models",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    icon: Database,
    title: "Custom LLM Trading Model: EVI",
    subtitle: "Proprietary AI and LLM technology engineered for market forecasting.",
    content: "Neuro Frequency Labs has developed its own custom Large Language Model (LLM) named 'EVI'. Unlike generic LLMs, EVI is pre-trained specifically on financial market data, order books, and real-time market sentiment to forecast trend shifts.",
    strategy: "EVI processes unstructured data (corporate filings, global news) alongside microsecond-level order book imbalances. It generates intraday trend probability vectors and feeds them directly into our execution routes, giving our Nifty 50 trading models a unique intelligence edge."
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function SandTransitionImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isPresent, safeToRemove] = usePresence();
  const filterId = useRef(`sand-${Math.random().toString(36).substr(2, 9)}`).current;
  const filterRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let start: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / 900, 1);
      
      const filter = filterRef.current;
      if (filter) {
        const t = isPresent ? progress : progress;
        const eased = isPresent 
          ? 1 - Math.pow(1 - t, 4) 
          : Math.pow(t, 3);

        const displacement = filter.querySelector('feDisplacementMap');
        const offset = filter.querySelector('feOffset');
        const blur = filter.querySelector('feGaussianBlur');
        const colorMatrix = filter.querySelector('feColorMatrix');

        if (displacement && offset && blur && colorMatrix) {
          if (isPresent) {
            displacement.setAttribute('scale', String((1 - eased) * 150));
            offset.setAttribute('dy', String((1 - eased) * -80));
            blur.setAttribute('stdDeviation', String((1 - eased) * 6));
            colorMatrix.setAttribute('values', `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${eased} 0`);
          } else {
            displacement.setAttribute('scale', String(eased * 150));
            offset.setAttribute('dy', String(eased * 120));
            blur.setAttribute('stdDeviation', String(eased * 6));
            colorMatrix.setAttribute('values', `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${Math.max(0, 1 - (eased * 1.2))} 0`);
          }
        }
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else if (!isPresent && safeToRemove) {
        safeToRemove();
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPresent, safeToRemove]);

  return (
    <>
      <svg width="0" height="0" className="absolute pointer-events-none" ref={filterRef}>
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feOffset dx="0" dy="0" in="displaced" result="offset" />
          <feGaussianBlur stdDeviation="0" in="offset" result="blurred" />
          <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" in="blurred" />
        </filter>
      </svg>
      <motion.img 
        src={src} 
        alt={alt} 
        className={className} 
        style={{ filter: `url(#${filterId})` }}
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer"
      />
    </>
  );
}

export default function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDetail, setActiveDetail] = useState<typeof chaptersData[0] | null>(null);
  const [showExploreDetail, setShowExploreDetail] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (activeDetail || showExploreDetail) return; // Stop auto-cycling when viewing details
    const t = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % chaptersData.length);
    }, 3500);
    return () => clearInterval(t);
  }, [activeDetail, showExploreDetail]);

  return (
    <div className="w-full relative">
      {/* iOS SCREEN / SUBPAGE ROUTING (Slide-up Detail Page) */}
      <AnimatePresence>
        {activeDetail && (
          <motion.div 
            initial={{ y: "100%", opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 30, stiffness: 150 }}
            className="fixed inset-0 bg-[#0a0a0a] text-white z-50 overflow-y-auto px-6 py-12 md:px-20 md:py-20 flex flex-col justify-between"
          >
            {/* Navigation Header */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-6 mb-12">
              <button 
                onClick={() => setActiveDetail(null)}
                className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Back to main
              </button>
              <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                NEURO FREQUENCY LABS
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center flex-1 my-auto max-w-[1200px] mx-auto w-full">
              {/* Left Column - Large Image & Icon */}
              <div className="w-full lg:w-[45%] relative aspect-square max-w-[450px] bg-black rounded-2xl overflow-hidden border border-gray-800">
                <img 
                  src={activeDetail.image} 
                  alt={activeDetail.name}
                  className="w-full h-full scale-115 object-contain grayscale opacity-90"
                />
                <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-white">
                  <activeDetail.icon size={24} />
                </div>
              </div>

              {/* Right Column - Text Data */}
              <div className="w-full lg:w-[55%] flex flex-col justify-center">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2">Segment analysis</span>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
                  {activeDetail.title}
                </h2>
                <p className="text-gray-400 font-mono text-[11px] md:text-xs tracking-wider uppercase mb-8">
                  {activeDetail.subtitle}
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2">Overview & Infrastructure</h4>
                    <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                      {activeDetail.content}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2">How Our Prop Firm Trades This Segment</h4>
                    <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                      {activeDetail.strategy}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Brand Stamp */}
            <div className="border-t border-gray-800 pt-8 mt-12 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-gray-600 max-w-[1200px] mx-auto w-full">
              <span>SYSTEMATIC ASSET TRADING</span>
              <span>EST. 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS SCREEN / SUBPAGE ROUTING (Slide-up Explore Now Detail Page) */}
      <AnimatePresence>
        {showExploreDetail && (
          <motion.div 
            initial={{ y: "100%", opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 30, stiffness: 150 }}
            className="fixed inset-0 bg-[#0a0a0a] text-white z-50 overflow-y-auto px-6 py-12 md:px-20 md:py-20 flex flex-col justify-between"
          >
            {/* Navigation Header */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-6 mb-12">
              <button 
                onClick={() => setShowExploreDetail(false)}
                className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Back to main
              </button>
              <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                NEURO FREQUENCY LABS
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center flex-1 my-auto max-w-[1200px] mx-auto w-full">
              {/* Left Column - Firm Graphic */}
              <div className="w-full lg:w-[45%] relative aspect-square max-w-[450px] bg-black rounded-2xl overflow-hidden border border-gray-800">
                <img 
                  src="./stock_market_graph.png" 
                  alt="Neuro Frequency Trading Graph"
                  className="w-full h-full object-contain grayscale opacity-90 scale-105"
                />
                <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-white">
                  <Cpu size={24} />
                </div>
              </div>

              {/* Right Column - Text Data */}
              <div className="w-full lg:w-[55%] flex flex-col justify-center">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2">Our Profile</span>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
                  About the Prop Firm
                </h2>
                <p className="text-gray-400 font-mono text-[11px] md:text-xs tracking-wider uppercase mb-8">
                  systematic alpha generation & execution
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#888] mb-2">When We Started</h4>
                    <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                      Neuro Frequency Labs was established in early 2026. Within our first few months of operations, we reached a major milestone during April, generating a 10% return on initial capital by executing high-probability algorithmic strategies.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#888] mb-2">What We Do</h4>
                    <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
                      We manage internal proprietary capital across three core focus areas:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1.5 text-gray-300 text-[14px] md:text-[15px]">
                      <li><strong>Ultra-Low Latency Execution:</strong> We run market-making systems using optical fiber colocated inside the NSE and BSE exchanges to capture microsecond discrepancies.</li>
                      <li><strong>Index & Derivatives:</strong> We execute delta-neutral option spread models and volatility arbitrage on the NSE Nifty 50.</li>
                      <li><strong>Fixed-Income Arbitrage:</strong> We trade yield curve disparities and basis relationships in sovereign bond markets to preserve capital while generating low-risk absolute returns.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Brand Stamp */}
            <div className="border-t border-gray-800 pt-8 mt-12 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-gray-600 max-w-[1200px] mx-auto w-full">
              <span>PROPRIETARY TRADING LAB</span>
              <span>EST. 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#fcfcfc]">
        {/* BACKGROUND VIDEO (Logo Video) */}
        <div className={`absolute top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 ${showVideo ? 'opacity-100' : 'opacity-0'}`}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            src="./hero-bg.mp4"
          />
        </div>

        {/* HEADER */}
        <motion.header 
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          className="pt-6 px-6 md:px-16 z-20"
        >
          {/* SUB-NAV BAR */}
          <motion.div 
            variants={{ ...fadeUp, animate: { ...fadeUp.animate, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="flex justify-between items-start mt-8 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase"
          >
            <div className="w-[15%] font-bold">
              <div>Neuro</div>
              <div>Frequency</div>
              <div>Labs</div>
            </div>
            <div className="hidden md:block w-[5%]">
              <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
            </div>
            <div className="flex-1 md:w-[30%] text-gray-800 leading-relaxed font-mono">
              <span className="hidden md:inline">Redefining market precision<br/>through algorithmic trading<br/>and neural logic.</span>
              <span className="md:hidden">Redefining market<br/>precision through<br/>algorithmic trading<br/>and neural logic.</span>
            </div>
            <div className="hidden md:block w-[5%]">
              <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
            </div>
            <div className="hidden md:flex flex-col w-[15%] space-y-1">
              <a href="#" className="text-gray-800 hover:text-black hover:underline">Strategies</a>
              <a href="#" className="text-gray-800 hover:text-black hover:underline">Performance</a>
              <a href="#" className="text-gray-800 hover:text-black hover:underline">About Us</a>
              <a href="#" className="text-gray-800 hover:text-black hover:underline">Contact</a>
            </div>
            
            {/* Hamburger button */}
            <button 
              className="md:hidden z-60 relative flex flex-col items-end gap-[6px] group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`h-[1.5px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'w-8 rotate-45 translate-y-[7.5px]' : 'w-8 group-hover:w-6'}`} />
              <div className={`h-[1.5px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'w-8 -rotate-45 -translate-y-[7.5px]' : 'w-8 group-hover:w-10'}`} />
            </button>
          </motion.div>
        </motion.header>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-0 left-0 w-full bg-[#fcfcfc] border-b border-gray-200 shadow-xl z-50 md:hidden pt-40 px-6 pb-12"
            >
              <div className="flex flex-col space-y-6 text-sm font-mono tracking-[0.2em] uppercase">
                <a href="#" className="text-gray-800">Strategies</a>
                <a href="#" className="text-gray-800">Performance</a>
                <a href="#" className="text-gray-800">About Us</a>
                <a href="#" className="text-gray-800">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEFT SIDEBAR CONTENT */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } } }}
          className="px-10 md:px-16 mt-20 sm:mt-28 md:mt-32 w-[320px] z-10 flex-1"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono">01</span>
            <div className="w-16 h-[1.5px] bg-black/20" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-[3.5rem] md:text-[5rem] font-normal tracking-tight leading-[1] mb-6">
            NEURAL<br/>LOGIC
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[13px] md:text-[14px] text-gray-700 w-[240px] leading-[1.6] mb-10">
            Leverage advanced algorithms and<br/>trade the NSE Nifty 50 with<br/>unparalleled discipline.
          </motion.p>
          <motion.div variants={fadeUp}>
            <button 
              onClick={() => setShowExploreDetail(true)}
              className="group relative overflow-hidden bg-[#1a1a1a] px-6 py-3.5 border border-[#1a1a1a] rounded-md shadow-sm transition-all duration-300 hover:-translate-y-[0.5px] hover:shadow-[3px_3px_0px_rgba(17,17,17,0.5)] active:translate-y-0 active:shadow-sm flex items-center gap-3"
            >
              <div className="absolute inset-0 bg-[#fcfcfc] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-[#111] transition-colors duration-300">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
              </div>
              <span className="relative z-10 text-[15px] font-medium text-white group-hover:text-[#111] transition-colors duration-300">Explore Now</span>
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDEBAR */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } } }}
          className="absolute right-0 top-0 hidden md:flex flex-col w-[200px] mt-12 md:mt-20 px-8 z-10"
        >
          <motion.div variants={fadeUp} className="mb-12">
            <h3 className="text-[10px] font-bold font-mono tracking-widest uppercase mb-2">April Performance</h3>
            <p className="text-[12px] text-gray-600 leading-[1.6]">Proprietary Trading<br/>Firm Model</p>
          </motion.div>
          <motion.div variants={fadeUp} className="mb-6 flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Return</span>
            <span className="text-[13px] font-medium text-green-600">+10.0%</span>
          </motion.div>
          <motion.div variants={fadeUp} className="mb-12 flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Asset</span>
            <span className="text-[13px] font-medium">NSE Nifty 50</span>
          </motion.div>
          <motion.div variants={fadeUp}>
            <button className="group flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 group-hover:border-black group-hover:bg-[#111] transition-colors duration-300">
                <Plus size={16} strokeWidth={1.5} className="group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">View Details</span>
            </button>
          </motion.div>
        </motion.div>

        {/* BOTTOM-LEFT "SCROLL TO EXPLORE" */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-[2.5rem] md:left-[4rem] hidden md:flex items-center gap-4 z-10"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
            <div className="flex gap-[4px]">
              <div className="w-[1px] h-[12px] bg-gray-600" />
              <div className="w-[1px] h-[12px] bg-gray-600" />
            </div>
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-semibold">Scroll to explore</span>
        </motion.div>
      </section>

      {/* SECTION 2: EXPLORE OUR ALPHA */}
      <section className="relative w-full min-h-[75vh] md:min-h-screen bg-[#fcfcfc] flex flex-col items-center pt-24 md:pt-32 pb-0 z-20">
        <div className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] mb-12">
          <span className="text-gray-500">[ 02 ] </span>
          <span className="text-gray-900 font-bold uppercase">Explore Our Alpha</span>
        </div>
        
        <motion.h2 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[2.2rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.1] font-medium tracking-tight text-[#111] max-w-[1000px] text-center px-4"
        >
          Unearth the power of algorithmic precision <br className="hidden md:block"/>through consistent, risk-managed trading models.
        </motion.h2>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mt-12 mb-10 md:mb-24 px-4"
        >
          {alphaPillsData.map((pill, i) => (
            <motion.button 
              key={i}
              variants={fadeUp}
              onClick={() => setActiveDetail(pill)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-[11px] font-medium uppercase tracking-wider bg-white/50 backdrop-blur-sm text-gray-800 hover:border-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <pill.icon size={14} strokeWidth={2} />
              {pill.name}
            </motion.button>
          ))}
        </motion.div>

        <div className="min-h-[220px] md:min-h-[450px] w-full" />

        <div className="absolute bottom-8 md:bottom-12 left-0 w-full px-8 md:px-16 flex justify-between pointer-events-none hidden md:flex text-[10px] font-mono tracking-widest uppercase text-gray-500 font-medium">
          <span>WE DON'T JUST TRADE MARKETS.</span>
          <span>NEURO FREQUENCY (C) 2026</span>
        </div>
      </section>

      {/* SECTION 3: NEURAL COLLECTION */}
      <section className="relative w-full bg-[#0a0a0a] text-white flex flex-col z-30 overflow-hidden">
        {/* LOGO IMAGE (Replaces Pterodactyl) */}
        <motion.img 
          initial={{ y: "-50%", opacity: 0 }}
          whileInView={{ y: "-65%", opacity: 0.8 }}
          viewport={{ margin: "100px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src="./logo.png" 
          alt="Neuro Frequency Logo" 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] md:w-[800px] pointer-events-none z-0 object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
        />

        {/* HEADING AREA */}
        <div className="px-8 md:px-16 pt-32 md:pt-48 mb-16 z-10 flex flex-col xl:flex-row justify-between relative mt-24 md:mt-32">
          <div className="xl:w-[50%] mb-12 xl:mb-0">
            <h2 className="text-[1.8rem] md:text-[3rem] lg:text-[3.8rem] xl:text-[4rem] leading-[1.15] font-medium tracking-tight text-white">
              Curated from millions of data points 
              <div className="inline-flex gap-2 md:gap-3 align-middle mx-2 md:mx-4 translate-y-[-4px]">
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 hover:bg-white hover:text-black hover:border-white transition-colors duration-300">
                  <TrendingUp size={22} />
                </div>
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 hover:bg-white hover:text-black hover:border-white transition-colors duration-300">
                  <Cpu size={22} />
                </div>
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 hover:bg-white hover:text-black hover:border-white transition-colors duration-300">
                  <Shield size={22} />
                </div>
              </div> 
              & high-probability patterns.
            </h2>
          </div>
          
          <div className="xl:w-[40%] flex flex-col justify-end xl:items-end">
            <p className="text-[9px] md:text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6 leading-relaxed xl:text-right">
              WE DON'T JUST TRADE MARKETS <br/>WE SHARE EARTH'S STORY
            </p>
            <div className="flex flex-wrap gap-3 xl:justify-end">
              {["Systematic", "Disciplined", "Consistent"].map((tag, i) => (
                <span key={i} className="px-5 py-2 rounded-full border border-gray-600 text-[9px] font-mono tracking-widest uppercase text-gray-300 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TWO-COLUMN PANEL */}
        <div className="flex flex-col md:flex-row border-t border-gray-800 z-10 relative bg-[#0a0a0a]">
          {/* Left panel */}
          <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-gray-800 min-h-[400px] md:min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="p-8">
              <span className="text-gray-500 text-xl tracking-[0.3em]">***</span>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center w-full h-full p-6">
              <AnimatePresence mode="wait">
                <SandTransitionImage 
                  key={activeChapter} 
                  src={chaptersData[activeChapter].image} 
                  alt={chaptersData[activeChapter].name} 
                  className="absolute inset-0 w-[95%] h-[95%] m-auto object-contain grayscale mix-blend-lighten opacity-80"
                />
              </AnimatePresence>
            </div>
            
            <div className="p-8 mt-auto flex items-center text-[10px] font-mono tracking-widest uppercase overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={activeChapter}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[#888]"
                >
                  0{activeChapter + 1}
                </motion.span>
              </AnimatePresence>
              <span className="text-[#333] mx-3">/</span>
              <span className="text-[#888]">0{chaptersData.length}</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-full md:w-[65%] flex flex-col">
            <div className="border-b border-gray-800 p-8 text-[10px] font-mono text-gray-400 tracking-widest flex items-center justify-between">
              <span>Execute with precision. Scale with confidence.</span>
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={activeChapter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  SYSTEM 0{activeChapter + 1}
                </motion.span>
              </AnimatePresence>
            </div>
            
            <div className="flex flex-col px-8">
              {chaptersData.map((chapter, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setActiveChapter(idx);
                    setActiveDetail(chapter); // Open page detail
                  }}
                  className={`border-b border-gray-800/80 py-8 flex justify-between items-center cursor-pointer group transition-colors duration-300 ${activeChapter === idx ? 'text-white' : 'text-[#444] hover:text-[#999]'}`}
                >
                  <h3 className="text-2xl md:text-[2rem] font-medium tracking-tight">
                    {chapter.name}
                  </h3>
                  <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                    <AnimatePresence>
                      {activeChapter === idx && (
                        <motion.div
                          initial={{ opacity: 0, x: -10, y: 10 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          exit={{ opacity: 0, x: 10, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight size={22} strokeWidth={1} className="text-gray-400 animate-pulse" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="h-[1px] bg-gray-800 w-full z-10" />
        <div className="px-8 py-8 text-[10px] font-mono tracking-widest text-gray-500 uppercase bg-[#0a0a0a] z-10">
          DECODING MARKET FREQUENCIES
        </div>
      </section>
    </div>
  );
}
