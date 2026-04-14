import { useEffect, useRef, useState } from "react";
import { ArrowRight, Instagram, MoveDown, Volume2, VolumeX, Youtube } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import logo from "@/assets/logo-samba-do-xandy.png";
import { siteContent } from "@/content/siteContent";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video || videoFailed) {
      return;
    }

    const tryAutoplay = async () => {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;

      try {
        await video.play();
      } catch {
        // Mantem o fallback visual enquanto o navegador prepara a midia.
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void tryAutoplay();
      }
    };

    const handlePlaying = () => {
      setVideoStarted(true);
    };

    void tryAutoplay();
    video.addEventListener("loadeddata", tryAutoplay);
    video.addEventListener("canplay", tryAutoplay);
    video.addEventListener("playing", handlePlaying);
    window.addEventListener("pageshow", tryAutoplay);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      video.removeEventListener("loadeddata", tryAutoplay);
      video.removeEventListener("canplay", tryAutoplay);
      video.removeEventListener("playing", handlePlaying);
      window.removeEventListener("pageshow", tryAutoplay);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [videoFailed]);

  const toggleSound = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextSoundEnabled = !soundEnabled;
    video.muted = !nextSoundEnabled;
    video.volume = nextSoundEnabled ? 1 : 0;

    try {
      await video.play();
      setSoundEnabled(nextSoundEnabled);
    } catch {
      video.muted = true;
      video.volume = 0;
      setSoundEnabled(false);
    }
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={gallery1}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoStarted && !videoFailed ? "opacity-0" : "opacity-100"
          }`}
        />

        {!videoFailed ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
            onPlaying={() => setVideoStarted(true)}
            onError={() => setVideoFailed(true)}
          >
            <source src={siteContent.media.heroVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <img src={gallery1} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        )}

        <div className="absolute inset-0 bg-black/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,190,92,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,11,0.56),rgba(7,7,11,0.8)_52%,rgba(7,7,11,0.97))]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-16 pt-28 md:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <p className="fade-in mb-5 inline-flex rounded-full border border-primary/30 bg-black/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-primary backdrop-blur-sm">
            {siteContent.hero.eyebrow}
          </p>

          <h1 className="sr-only">{siteContent.hero.title}</h1>
          <img
            src={logo}
            alt={siteContent.hero.title}
            className="fade-in fade-in-delay-1 mx-auto w-full max-w-[420px] drop-shadow-[0_20px_44px_rgba(0,0,0,0.72)] md:max-w-[520px]"
          />

          <p className="fade-in fade-in-delay-2 mx-auto mt-6 max-w-3xl text-lg leading-8 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.72)] md:text-2xl md:leading-10">
            {siteContent.brand.tagline}
          </p>
          <p className="fade-in fade-in-delay-2 mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/82 drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)] md:text-base">
            {siteContent.hero.subtitle}
          </p>

          <div className="fade-in fade-in-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollTo(siteContent.hero.primaryAction.href)}
              className="glow-accent inline-flex min-w-[240px] items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.28em] text-accent-foreground transition-all hover:brightness-110"
            >
              {siteContent.hero.primaryAction.label}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={siteContent.hero.secondaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/18 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all hover:border-primary hover:text-primary"
            >
              {siteContent.hero.secondaryAction.label}
            </a>
          </div>

          <div className="fade-in fade-in-delay-3 mt-8 flex justify-center">
            <button
              type="button"
              onClick={toggleSound}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-5 py-3 text-sm text-white/88 backdrop-blur-sm transition-colors hover:border-primary hover:text-white"
          >
              {soundEnabled ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {soundEnabled ? "Silenciar vídeo" : "Ativar som do vídeo"}
            </button>
          </div>

          <div className="fade-in fade-in-delay-3 mt-8 flex items-center justify-center gap-4">
            <a
              href={siteContent.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/85 transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={siteContent.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir YouTube"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/85 transition-colors hover:border-primary hover:text-primary"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo("#videos")}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground/60 transition-colors hover:text-primary"
        aria-label="Ir para a próxima seção"
      >
        <span className="text-xs uppercase tracking-[0.35em]">Role</span>
        <MoveDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
