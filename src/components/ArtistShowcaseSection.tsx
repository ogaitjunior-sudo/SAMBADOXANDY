import { useEffect, useState } from "react";
import { Disc3, Download, Instagram, Mic2, Music2, Radio, type LucideIcon } from "lucide-react";
import capaEuclidesDaCunha from "@/assets/discography/capa-euclides-da-cunha.png";
import capaFestaDeOutubro from "@/assets/discography/capa-festa-de-outubro.jpg";
import capaRaizTaNoSertao from "@/assets/discography/capa-raiz-ta-no-sertao.jpg";
import jhonBatera from "@/assets/integrantes/jhon-batera.jpeg";
import leoLapa from "@/assets/integrantes/leo-lapa.jpg";
import marcusFelipe from "@/assets/integrantes/marcus-felipe.jpg";
import pauloSantana from "@/assets/integrantes/paulo-santana.jpeg";
import ricardoGodoy from "@/assets/integrantes/ricardo-godoy.jpg";
import tiagoReis from "@/assets/integrantes/tiago-reis.jpg";
import xandyGodoy from "@/assets/integrantes/xandy-godoy.jpg";
import { siteContent } from "@/content/siteContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ArtistTab = "integrantes" | "discografia";

type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type MemberCard = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials: SocialLink[];
  mediaClass?: string;
  frameClass?: string;
  imageClass?: string;
  cardClass?: string;
  roleClass?: string;
  titleClass?: string;
  bioClass?: string;
};

const memberCards: MemberCard[] = [
  {
    name: "Xandy Godoy",
    role: "Voz principal e violão",
    bio: "Conduz a identidade do projeto com repertório forte, presença de palco e uma leitura popular que aproxima o público desde a primeira música.",
    photo: xandyGodoy,
    mediaClass: "aspect-square",
    frameClass: "bg-[radial-gradient(circle_at_top,rgba(255,190,92,0.16),#06070a_58%)]",
    imageClass: "object-cover object-center scale-[1.04] md:scale-[1.06]",
    cardClass:
      "xl:border-primary/30 xl:bg-[linear-gradient(180deg,rgba(255,187,92,0.12),rgba(12,12,18,0.94))] xl:shadow-[0_24px_60px_rgba(255,177,61,0.14)]",
    roleClass: "border-primary/32 bg-primary/12 text-primary",
    titleClass: "xl:text-[2.15rem]",
    bioClass: "text-foreground/74",
    socials: [{ label: "Instagram", href: siteContent.links.instagram, icon: Instagram }] as SocialLink[],
  },
  {
    name: "Marcus Felipe",
    role: "Tecladista e diretor musical",
    bio: "Músico com 18 anos de experiência, professor de música e multi-instrumentista (teclado, piano, violão e baixo), transformando paixão em som.",
    photo: marcusFelipe,
    frameClass: "bg-[linear-gradient(180deg,#eef2f7,#dfe7f0)]",
    imageClass: "object-cover object-top scale-[1.06]",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/marcus_felipe_m", icon: Instagram },
    ] as SocialLink[],
  },
  {
    name: "Jhon Batera",
    role: "Baterista",
    bio: "Um cara humilde que vive a música com o coração e transforma cada batida em paixão na bateria.",
    photo: jhonBatera,
    frameClass: "",
    imageClass: "object-cover object-[center_22%]",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/jhonbatera_oficial/", icon: Instagram },
    ] as SocialLink[],
  },
  {
    name: "Paulo Santana",
    role: "Voz e Percussão",
    bio: "Musicista, pai do Théo e apaixonado pela vida, ele transforma sentimentos em música e, no pagode, canta histórias de amor, superação e alegria - sempre guiado por Deus.",
    photo: pauloSantana,
    mediaClass: "aspect-[4/5]",
    frameClass: "bg-[linear-gradient(180deg,#f8f8f8,#e9e9e9)]",
    imageClass: "object-cover object-top scale-[1.0]",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/srpauloficial/", icon: Instagram },
    ] as SocialLink[],
  },
  {
    name: "Tiago Reis",
    role: "Cavaquinho",
    bio: "Entre códigos, arte e acordes de cavaquinho, ele cria soluções, espalha criatividade e vive com paz na alma e samba no coração.",
    photo: tiagoReis,
    frameClass: "",
    imageClass: "object-cover object-[center_20%] scale-[1.16]",
    cardClass: "border-primary/35 shadow-[0_18px_44px_rgba(255,177,61,0.1)]",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/ogaitjunior/", icon: Instagram },
    ] as SocialLink[],
  },
  {
    name: "Ricardo Godoy",
    role: "Voz e Percussão",
    bio: "Amigo irmão de coração, sempre firme no projeto e no clima bom da equipe, ele vive o samba e o pagode com verdade, cantando, conectando e levando alegria por onde passa.",
    photo: ricardoGodoy,
    mediaClass: "aspect-square",
    frameClass: "bg-[linear-gradient(180deg,#f1f1ef,#d9d9d3)]",
    imageClass: "object-cover object-[center_18%] scale-[1.08]",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/ricardolemos1977/", icon: Instagram },
    ] as SocialLink[],
  },
  {
    name: "Léo Lapa",
    role: "Produção e Percussão",
    bio: "Essa pessoa é sinônimo de alegria, carinho e verdade.",
    photo: leoLapa,
    mediaClass: "aspect-[3/4]",
    frameClass: "bg-[linear-gradient(180deg,#e8ecef,#cfd5da)]",
    imageClass: "object-contain object-top scale-[1.01]",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/lapa5482?igsh=YjU5czhqMnF0d2ps",
        icon: Instagram,
      },
    ] as SocialLink[],
  },
];

const releases = [
  {
    title: "A Raiz Tá no Sertão (Ao Vivo)",
    artist: siteContent.brand.name,
    format: "Álbum ao vivo",
    cover: capaRaizTaNoSertao,
    coverClass: "object-cover object-center",
    ctaLabel: "Baixar CD",
    href: "https://suamusica.com.br/SambadoXandy/samba-do-xandy-a-raiz-ta-no-sertao-ao-vivo",
  },
  {
    title: "Festa de Outubro 2023",
    artist: "Ribeira do Pombal - BA",
    format: "Show ao vivo",
    cover: capaFestaDeOutubro,
    coverClass: "object-cover object-center",
    ctaLabel: "Baixar CD",
    href: "https://suamusica.com.br/SambadoXandy/samba-do-xandy-ao-vivo-na-festa-de-outubro-2023-ribeira-do-pombal-ba",
  },
  {
    title: "Ao Vivo em Euclides da Cunha",
    artist: "Euclides da Cunha - BA",
    format: "Show ao vivo",
    cover: capaEuclidesDaCunha,
    coverClass: "object-cover object-center",
    ctaLabel: "Baixar CD",
    href: "https://suamusica.com.br/SambadoXandy/samba-do-xandy-ao-vivo-em-euclides-da-cunha",
  },
];

const roleIcons = [Mic2, Music2, Disc3, Radio, Music2, Mic2, Radio];

const ArtistShowcaseSection = () => {
  const [activeTab, setActiveTab] = useState<ArtistTab>("integrantes");
  const activeIntro = siteContent.artistShowcase[activeTab];
  const featuredMember = memberCards[0];
  const supportingMembers = memberCards.slice(1);
  const FeaturedRoleIcon = roleIcons[0];

  useEffect(() => {
    const handleTabNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<{ tab?: ArtistTab }>;

      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
      }
    };

    window.addEventListener("artist-tabs:navigate", handleTabNavigation as EventListener);

    return () => {
      window.removeEventListener("artist-tabs:navigate", handleTabNavigation as EventListener);
    };
  }, []);

  return (
    <section id="artist-showcase" className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,185,78,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,116,50,0.08),transparent_26%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.32em] text-primary">
            {siteContent.artistShowcase.eyebrow}
          </p>
          <h2 className="text-4xl leading-none text-foreground md:text-6xl">{activeIntro.title}</h2>
          {activeIntro.description ? (
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/68 md:text-lg">
              {activeIntro.description}
            </p>
          ) : null}
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ArtistTab)} className="mt-12">
          <TabsList className="h-auto rounded-full border border-white/10 bg-white/5 p-1.5">
            <TabsTrigger
              value="integrantes"
              onClick={() => setActiveTab("integrantes")}
              className="rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/72 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_18px_38px_rgba(255,178,61,0.22)]"
            >
              Integrantes
            </TabsTrigger>
            <TabsTrigger
              value="discografia"
              onClick={() => setActiveTab("discografia")}
              className="rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/72 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_18px_38px_rgba(255,178,61,0.22)]"
            >
              Discografia
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,17,24,0.92),rgba(10,11,16,0.98))] p-3 md:p-4">
            <TabsContent value="integrantes" className="fade-in mt-0">
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
                <article
                  className={`group overflow-hidden rounded-[30px] border border-primary/25 bg-[linear-gradient(180deg,rgba(255,187,92,0.14),rgba(12,12,18,0.96))] shadow-[0_28px_70px_rgba(255,177,61,0.14)] transition-all duration-500 md:hover:-translate-y-1 md:hover:border-primary/40 ${featuredMember.cardClass ?? ""}`}
                >
                  <div className="p-4 md:p-5">
                    <div className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-[radial-gradient(circle_at_top,rgba(179,126,56,0.34),transparent_26%),linear-gradient(180deg,rgba(64,46,28,0.98),rgba(18,14,12,0.98))] px-4 py-5 shadow-[inset_0_0_0_1px_rgba(255,207,126,0.08)] md:px-5 md:py-6">
                      <div className="pointer-events-none absolute inset-[10px] rounded-[22px] border border-primary/16" />

                      <div className="relative z-10 flex flex-col gap-5">
                        <div className="text-center">
                          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/18 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                            <FeaturedRoleIcon className="h-3.5 w-3.5" />
                            Destaque
                          </span>

                          <h3 className={`mt-5 text-4xl leading-none text-foreground md:text-[3.2rem] ${featuredMember.titleClass ?? ""}`}>
                            {featuredMember.name}
                          </h3>

                          <div className="mx-auto mt-4 flex max-w-sm items-center gap-3 text-primary/70">
                            <div className="h-px flex-1 bg-primary/22" />
                            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(255,187,92,0.75)]" />
                            <div className="h-px flex-1 bg-primary/22" />
                          </div>

                          <p className={`mx-auto mt-5 max-w-xl text-base leading-8 ${featuredMember.bioClass ?? "text-foreground/70"}`}>
                            {featuredMember.bio}
                          </p>
                        </div>

                        <div className={`relative overflow-hidden rounded-[24px] border border-white/10 ${featuredMember.frameClass ?? ""}`}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,196,99,0.16),transparent_40%)]" />
                          <div className="relative aspect-[11/12] overflow-hidden md:aspect-[10/11]">
                            <img
                              src={featuredMember.photo}
                              alt={featuredMember.name}
                              loading="lazy"
                              className={`h-full w-full transform-gpu transition-transform duration-700 md:group-hover:scale-[1.03] ${featuredMember.imageClass ?? "object-cover object-center"}`}
                            />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/70 to-transparent" />
                        </div>

                        <div className="flex justify-center">
                          {featuredMember.socials.map((link) => {
                            const Icon = link.icon;

                            return (
                              <a
                                key={`${featuredMember.name}-${link.label}`}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-black/12 px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                              >
                                <Icon className="h-4 w-4" />
                                + Seguir perfil
                              </a>
                            );
                          })}
                        </div>

                        <div className="rounded-[22px] border border-primary/22 bg-black/14 p-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                            Em resumo
                          </p>
                          <p className="mt-4 text-base leading-8 text-foreground/78">
                            Descubra a fusão de pagode, carisma e identidade de Xandy Godoy que energiza e inspira o público.
                          </p>
                        </div>

                        <div className="flex justify-center">
                          <a
                            href="#agenda"
                            className="inline-flex items-center gap-2 rounded-full border border-primary/35 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                          >
                            + Saiba mais
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <div className="grid gap-4 sm:grid-cols-2">
                  {supportingMembers.map((member, index) => {
                    const RoleIcon = roleIcons[index + 1];
                    const mediaClass = member.mediaClass ?? "aspect-[4/3]";

                    return (
                      <article
                        key={member.name}
                        className={`group flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,18,26,0.94),rgba(10,11,16,0.98))] transition-all duration-500 md:hover:-translate-y-1 md:hover:border-primary/35 md:hover:shadow-[0_22px_50px_rgba(0,0,0,0.3)] ${member.cardClass ?? ""}`}
                      >
                        <div className={`relative overflow-hidden ${mediaClass} ${member.frameClass ?? ""}`}>
                          <img
                            src={member.photo}
                            alt={member.name}
                            loading="lazy"
                            className={`h-full w-full transform-gpu transition-transform duration-700 md:group-hover:scale-[1.04] ${member.imageClass ?? "object-cover object-center"}`}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/45 to-transparent" />
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-primary">
                            <RoleIcon className="h-3.5 w-3.5" />
                            {member.role}
                          </span>

                          <h3 className="mt-4 text-[1.85rem] leading-none text-foreground">{member.name}</h3>
                          <p className="mt-3 flex-1 text-sm leading-7 text-foreground/68">{member.bio}</p>

                          <div className="mt-6 flex flex-wrap gap-3">
                            {member.socials.map((link) => {
                              const Icon = link.icon;

                              return (
                                <a
                                  key={`${member.name}-${link.label}`}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground/74 transition-all hover:border-primary hover:text-primary"
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                  {link.label}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="discografia" className="fade-in mt-0">
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {releases.map((release) => (
                  <article
                    key={release.title}
                    className="group mx-auto flex h-full max-w-[320px] flex-col text-center transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="overflow-hidden rounded-[18px] bg-[#0b0d12] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                      <img
                        src={release.cover}
                        alt={release.title}
                        loading="lazy"
                        className={`aspect-square h-full w-full transition-transform duration-700 group-hover:scale-[1.03] ${release.coverClass}`}
                      />
                    </div>

                    <div className="flex flex-1 flex-col items-center px-3 pb-2 pt-5">
                      <h3 className="text-balance text-[1.65rem] leading-tight text-foreground">{release.title}</h3>
                      <p className="mt-2 text-lg text-foreground/72">{release.artist}</p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.28em] text-primary/90">
                        {release.format}
                      </p>
                      <a
                        href={release.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/12 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Download className="h-4 w-4" />
                        {release.ctaLabel}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default ArtistShowcaseSection;
