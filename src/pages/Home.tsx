import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import BedOutlined from '@mui/icons-material/BedOutlined';
import SupportAgentOutlined from '@mui/icons-material/SupportAgentOutlined';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import RestaurantOutlined from '@mui/icons-material/RestaurantOutlined';
import './Home.css';

const ResidenceScene = lazy(() => import('../components/experience/ResidenceScene'));
const LiquidLogo = lazy(() => import('../components/experience/LiquidLogo'));
const Atmosphere = lazy(() => import('../components/experience/Atmosphere'));
const GlassSurface = lazy(() => import('../components/experience/GlassSurface'));

class GraphicsBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const spaces = [
  { name: 'The residence', caption: 'A little space. A lot of possibility.', label: 'Exterior' },
  { name: 'Your room', caption: 'Space to recharge, study, and make it yours.', label: 'Room' },
  { name: 'The common room', caption: 'Good conversations start here.', label: 'Lounge' },
];

export default function Home() {
  const [space, setSpace] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(query.matches);
    updateMotion();
    query.addEventListener('change', updateMotion);
    const probe = document.createElement('canvas');
    const context = probe.getContext('webgl2');
    setWebgl(Boolean(context));
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    let inView = true;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateVisibility(); });
    if (stage.current) observer.observe(stage.current);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
      query.removeEventListener('change', updateMotion);
    };
  }, []);

  const animated = visible && !paused && !reduced;
  const fallback = <div className="residence-fallback"><img src="/hostel-hero-premium.png" alt="A welcoming hostel room" /><span>Explore your next home</span></div>;

  return (
    <div className="hostel-home">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="home-header">
        <Link to="/" className="home-brand" aria-label="HostelMate home">
          <span className="brand-mark"><img src="/hostel-mark.svg" alt="" />{webgl && visible && <GraphicsBoundary fallback={null}><Suspense fallback={null}><LiquidLogo animated={animated} /></Suspense></GraphicsBoundary>}</span>
          HostelMate<span className="brand-dot">.</span>
        </Link>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="home-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <nav id="home-nav" className={menuOpen ? 'home-nav is-open' : 'home-nav'} aria-label="Main navigation">
          <a href="#spaces" onClick={() => setMenuOpen(false)}>The spaces</a>
          <a href="#living" onClick={() => setMenuOpen(false)}>Life, simplified</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
        </nav>
        <Link className="header-login" to="/signin"><span className="resident-word">Resident </span>login <ArrowOutward fontSize="small" /></Link>
      </header>
      <main id="main">
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
            <h1 id="hero-title">More than<br />a room.<br /><span>A place to belong.</span></h1>
            <p>Find your space. Meet your people. Make yourself at home. Student living, with the everyday taken care of.</p>
            <div className="hero-actions"><Link className="home-button primary" to="/signup">Find my space <ArrowForward fontSize="small" /></Link><a className="text-link" href="#spaces">Take a look around <span>↗</span></a></div>
            <div className="hero-note"><span className="note-lines">⌂</span><div><strong>A home for your university years.</strong><span>Rooms, meals, and support. All in one place.</span></div></div>
          </div>
          <div ref={stage} className="residence-stage" id="spaces">
            <div className="stage-grid" aria-hidden="true" />
            <div className="stage-heading"><span><i /> THE HOSTELMATE EXPERIENCE</span><span className="stage-number">0{space + 1} / 03</span></div>
            <div className="scene-container" role="img" aria-label={'Interactive architectural illustration: ' + spaces[space].name + '. Drag to rotate.'}>
              {webgl ? <GraphicsBoundary fallback={fallback}><Suspense fallback={fallback}><ResidenceScene space={space} animated={animated} /></Suspense></GraphicsBoundary> : fallback}
            </div>
            <div className="scene-label"><span className="scene-label-dot" /><div><strong>{spaces[space].name}</strong><span>{spaces[space].caption}</span></div></div>
            <div className="scene-controls">
              {webgl && visible && <Suspense fallback={null}><GlassSurface /></Suspense>}
              <div className="space-tabs" role="group" aria-label="Explore the spaces">{spaces.map((item, index) => <button key={item.label} aria-pressed={index === space} onClick={() => setSpace(index)}>{item.label}</button>)}</div>
              <button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume automatic rotation' : 'Pause automatic rotation'} disabled={reduced}>{paused || reduced ? '▷' : 'Ⅱ'}</button>
            </div>
            <div className="stage-footer"><span>CONCEPT RESIDENCE · 3D EXPLORER</span><span>↔ DRAG TO ROTATE</span></div>
          </div>
        </section>
        <div className="amenity-strip" aria-label="Living essentials"><span>YOUR EVERYDAY,<br /><strong>UPGRADED.</strong></span><div><span>⌁</span> Room bookings</div><div><span>◎</span> Warden support</div><div><span>▤</span> Payment history</div><div><span>♧</span> Mess menus</div></div>
        <section className="living-section" id="living" aria-labelledby="living-title">
          <div className="section-heading"><div><span className="eyebrow">LESS ADMIN. MORE LIVING.</span><h2 id="living-title">The good part of student life.<br /><em>Without the extra tabs.</em></h2></div><p>Everything you need to settle in,<br />stay organised, and get on with your day.</p></div>
          <div className="living-grid">
            <Link to="/signin" className="living-feature room-feature"><span className="feature-top"><BedOutlined /><ArrowOutward /></span><div className="room-illustration" aria-hidden="true"><div className="mini-window" /><div className="mini-bed"><span /><span /></div><div className="mini-rug" /></div><span className="feature-index">01 / YOUR SPACE</span><h3>A room that fits your life.</h3><p>Browse rooms, see the amenities, and manage your bookings from your resident dashboard.</p><span className="feature-link">Explore room bookings <ArrowForward fontSize="small" /></span></Link>
            <Link to="/signin" className="living-feature support-feature"><span className="feature-top"><SupportAgentOutlined /><ArrowOutward /></span><div className="support-illustration" aria-hidden="true"><span className="message-bubble">Need a hand? <span>↗</span></span><span className="message-reply">Your warden is a message away.</span></div><span className="feature-index">02 / YOUR SUPPORT</span><h3>Small issues. Simple solutions.</h3><p>Raise a complaint, send a request, and keep track of the response. No chasing things up.</p><span className="feature-link">Meet your resident dashboard <ArrowForward fontSize="small" /></span></Link>
            <div className="living-small-stack"><Link to="/signin" className="living-feature compact-feature"><span className="feature-top"><ReceiptLongOutlined /><ArrowOutward /></span><span className="feature-index">03 / YOUR PEACE OF MIND</span><h3>Keep payments in view.</h3><p>Your payment history, organised in one place.</p></Link><Link to="/signin" className="living-feature compact-feature meals-feature"><span className="feature-top"><RestaurantOutlined /><ArrowOutward /></span><span className="feature-index">04 / YOUR EVERYDAY</span><h3>What's on the menu?</h3><p>Check your mess menu before mealtime.</p></Link></div>
          </div>
        </section>
        <section className="steps-section" id="how-it-works"><div><span className="eyebrow">MAKE YOURSELF AT HOME</span><h2>New beginnings.<br />Three simple steps.</h2></div><ol><li><span>01</span><div><h3>Create your account</h3><p>A few details, and you're ready to explore.</p></div></li><li><span>02</span><div><h3>Find your room</h3><p>Sign in to browse rooms and book your space.</p></div></li><li><span>03</span><div><h3>Settle into your rhythm</h3><p>Manage your stay from your resident dashboard.</p></div></li></ol></section>
        <section className="home-cta"><div className="cta-atmosphere" aria-hidden="true">{webgl && <GraphicsBoundary fallback={null}><Suspense fallback={null}><Atmosphere /></Suspense></GraphicsBoundary>}</div><span className="eyebrow">A LITTLE ROOM FOR YOUR NEXT BIG THING</span><h2>Your next chapter<br />has a home.</h2><Link className="home-button light" to="/signup">Let's get you settled <ArrowForward fontSize="small" /></Link><p>Already part of the community? <Link to="/signin">Sign in ↗</Link></p></section>
      </main>
      <footer className="home-footer"><Link className="footer-brand" to="/">HostelMate.</Link><span>Made for the way you live.</span><span>© {new Date().getFullYear()} HostelMate</span><a href="#main">Back to top ↑</a></footer>
    </div>
  );
}
