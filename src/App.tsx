import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ProjectWheel } from "./components/ProjectWheel/ProjectWheel";
import { TopBar } from "./components/TopBar/TopBar";
import { MenuPanel, ContentPanel } from "./components/MenuPanel/MenuPanel";
import { CTAButton } from "./components/CTAButton/CTAButton";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { PageTransition } from "./components/PageTransition/PageTransition";
import { AppProvider } from "./hooks/useAppContext";
import { IntroProvider, useIntro } from "./hooks/useIntroContext";
import { AboutContent } from "./pages/AboutContent";
import { BuildingContent } from "./pages/BuildingContent";
import { StoryContent } from "./pages/StoryContent";
import { StackContent } from "./pages/StackContent";
import { NowContent } from "./pages/NowContent";
import { HeroTagline } from "./components/HeroTagline/HeroTagline";
import { SECTIONS } from "./lib/constants";

function RoutePanel() {
  const location = useLocation();
  const { contentVisible } = useIntro();

  const path = location.pathname;
  const isHome = path === "/";

  if (isHome || !contentVisible) return null;

  const configs: Record<string, { title: string; content: React.ReactNode }> = {
    "/building": { title: SECTIONS.building.label, content: <BuildingContent /> },
    "/story": { title: SECTIONS.story.label, content: <StoryContent /> },
    "/stack": { title: SECTIONS.stack.label, content: <StackContent /> },
    "/now": { title: SECTIONS.now.label, content: <NowContent /> },
  };

  const config = configs[path];
  if (!config) return null;

  return (
    <RoutePanelInner title={config.title}>{config.content}</RoutePanelInner>
  );
}

function RoutePanelInner({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <ContentPanel open onClose={() => navigate("/")} title={title}>
      {children}
    </ContentPanel>
  );
}

function AppInner() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { contentVisible } = useIntro();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setAboutOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <div className="app-shell">
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <TopBar
        onMenuOpen={() => setMenuOpen(true)}
        onWorkOpen={() => navigate("/building")}
      />
      <div className="hero-stage">
        {contentVisible && <ProjectWheel />}
      </div>

      {isHome && contentVisible && <HeroTagline />}

      <div className="hero-bottom">
        <CTAButton
          label="View Work"
          onClick={() => navigate("/building")}
        />
      </div>

      <ThemeToggle />
      <MenuPanel
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onAboutOpen={() => setAboutOpen(true)}
      />
      <ContentPanel open={aboutOpen} onClose={() => setAboutOpen(false)} title="ABOUT">
        <AboutContent />
      </ContentPanel>
      <RoutePanel />
    </div>
  );
}

export default function App() {
  return (
    <IntroProvider>
      <AppProvider>
        <PageTransition>
          <Routes>
            <Route path="/" element={<AppInner />} />
            <Route path="/building" element={<AppInner />} />
            <Route path="/story" element={<AppInner />} />
            <Route path="/stack" element={<AppInner />} />
            <Route path="/now" element={<AppInner />} />
          </Routes>
        </PageTransition>
      </AppProvider>
    </IntroProvider>
  );
}
