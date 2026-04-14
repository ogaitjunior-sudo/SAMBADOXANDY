import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";
import Index from "@/pages/Index";

describe("Index page", () => {
  it("renders the restored landing structure with hero video and main navigation", () => {
    const { container } = render(<Index />);
    const heroVideo = container.querySelector("video");
    const featuredVideo = screen.getByTitle(/samba do xandy ao vivo no youtube/i);

    expect(screen.getAllByRole("button", { name: /in[ií]cio/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /integrantes/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /discografia/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /v[ií]deos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /agenda/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /galeria/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /contato/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: /samba do xandy/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /solicitar or[cç]amento/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/show ao vivo em destaque/i)).toBeInTheDocument();
    expect(screen.getByText(/identidade art[ií]stica/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^xandy godoy$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^marcus felipe$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^jhon batera$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^paulo santana$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^tiago reis$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^ricardo godoy$/i })).toBeInTheDocument();
    expect(screen.getAllByAltText(/a raiz t[aá] no sert[aã]o/i).length).toBeGreaterThan(0);
    expect(heroVideo).toBeInTheDocument();
    expect(featuredVideo).toBeInTheDocument();
    expect(featuredVideo).toHaveAttribute("src", expect.stringContaining("youtube.com/embed/Cn9HBWaZMAU?start=135"));
    expect(heroVideo).toHaveAttribute("autoplay");
    expect(heroVideo).toHaveAttribute("loop");
    expect((heroVideo as HTMLVideoElement).muted).toBe(true);
    expect((heroVideo as HTMLVideoElement).playsInline).toBe(true);
  });

  it("switches between integrantes and discografia without reloading the page", async () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("tab", { name: /discografia/i }));

    await waitFor(() => {
      expect(screen.getByText(/a raiz t[aá] no sert[aã]o \(ao vivo\)/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/festa de outubro 2023/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ao vivo em euclides da cunha/i })).toBeInTheDocument();
    expect(screen.getByText(/pagode é sentimento/i)).toBeInTheDocument();
    expect(screen.getByText(/álbum ao vivo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/show ao vivo/i).length).toBeGreaterThanOrEqual(2);
    expect(
      screen
        .getAllByRole("link", { name: /baixar cd/i })
        .map((link) => link.getAttribute("href")),
    ).toEqual([
      "https://suamusica.com.br/SambadoXandy/samba-do-xandy-a-raiz-ta-no-sertao-ao-vivo",
      "https://suamusica.com.br/SambadoXandy/samba-do-xandy-ao-vivo-na-festa-de-outubro-2023-ribeira-do-pombal-ba",
      "https://suamusica.com.br/SambadoXandy/samba-do-xandy-ao-vivo-em-euclides-da-cunha",
    ]);

    fireEvent.click(screen.getByRole("tab", { name: /integrantes/i }));

    expect(screen.getByRole("heading", { name: /xandy godoy/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /\+ seguir perfil/i })).toBeInTheDocument();
    expect(screen.getAllByText(/voz e percus/i).length).toBeGreaterThanOrEqual(2);

    const marcusCard = screen.getByRole("heading", { name: /marcus felipe/i }).closest("article");

    expect(marcusCard).not.toBeNull();
    expect(within(marcusCard as HTMLElement).getByText(/tecladista e diretor musical/i)).toBeInTheDocument();
    expect(
      within(marcusCard as HTMLElement).getByRole("link", { name: /instagram/i }),
    ).toHaveAttribute("href", "https://www.instagram.com/marcus_felipe_m");

    const jhonCard = screen.getByRole("heading", { name: /jhon batera/i }).closest("article");

    expect(jhonCard).not.toBeNull();
    expect(within(jhonCard as HTMLElement).getByText(/^baterista$/i)).toBeInTheDocument();
    expect(
      within(jhonCard as HTMLElement).getByRole("link", { name: /instagram/i }),
    ).toHaveAttribute("href", "https://www.instagram.com/jhonbatera_oficial/");

    const pauloCard = screen.getByRole("heading", { name: /paulo santana/i }).closest("article");

    expect(pauloCard).not.toBeNull();
    expect(within(pauloCard as HTMLElement).getByText(/voz e percus/i)).toBeInTheDocument();
    expect(
      within(pauloCard as HTMLElement).getByRole("link", { name: /instagram/i }),
    ).toHaveAttribute("href", "https://www.instagram.com/srpauloficial/");

    const showcase = document.getElementById("artist-showcase");
    const tiagoCard = screen.getByRole("heading", { name: /tiago reis/i }).closest("article");

    expect(tiagoCard).not.toBeNull();
    expect(within(tiagoCard as HTMLElement).getByText(/^cavaquinho$/i)).toBeInTheDocument();
    expect(
      within(tiagoCard as HTMLElement).getByRole("link", { name: /instagram/i }),
    ).toHaveAttribute("href", "https://www.instagram.com/ogaitjunior/");

    const ricardoCard = screen.getByRole("heading", { name: /ricardo godoy/i }).closest("article");

    expect(ricardoCard).not.toBeNull();
    expect(within(ricardoCard as HTMLElement).getByText(/voz e percuss/i)).toBeInTheDocument();
    expect(
      within(ricardoCard as HTMLElement).getByRole("link", { name: /instagram/i }),
    ).toHaveAttribute("href", "https://www.instagram.com/ricardolemos1977/");

    const leoCard = screen.getByRole("heading", { name: /léo lapa/i }).closest("article");

    expect(leoCard).not.toBeNull();
    expect(within(leoCard as HTMLElement).getByText(/produção e percussão/i)).toBeInTheDocument();
    expect(
      within(leoCard as HTMLElement).getByRole("link", { name: /instagram/i }),
    ).toHaveAttribute("href", "https://www.instagram.com/lapa5482?igsh=YjU5czhqMnF0d2ps");

    expect(showcase).not.toBeNull();
    expect(within(showcase as HTMLElement).queryByRole("link", { name: /contato/i })).not.toBeInTheDocument();
  });

  it("opens an email draft from the booking form", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<Index />);

    fireEvent.change(screen.getByPlaceholderText(/seu nome/i), {
      target: { value: "Maria" },
    });
    fireEvent.change(screen.getByPlaceholderText(/telefone/i), {
      target: { value: "(71) 99999-9999" },
    });
    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
      target: { value: "maria@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/conte sobre seu evento/i), {
      target: { value: "Quero mais informações sobre as próximas datas." },
    });

    fireEvent.submit(screen.getByRole("button", { name: /enviar proposta por e-mail/i }).closest("form")!);

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining("mailto:contato@sambadoxandy.com.br?subject="),
      "_self",
    );

    openSpy.mockRestore();
  });
});
