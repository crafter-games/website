import Image from "next/image";
import { type Game, games } from "@/lib/games";

const ORG = "https://github.com/crafter-games";

function GameMedia({ game, priority }: { game: Game; priority?: boolean }) {
  if (game.media.video) {
    return (
      <video
        className="h-full w-full object-cover"
        src={game.media.video}
        poster={game.media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
      />
    );
  }
  return (
    <Image
      className="h-full w-full object-cover object-top"
      src={game.media.poster}
      alt={`Pantalla de ${game.name}`}
      width={960}
      height={540}
    />
  );
}

function GameCard({ game, index }: { game: Game; index: number }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 transition-colors hover:border-[var(--accent)]"
      style={{ "--accent": game.accent } as React.CSSProperties}
    >
      <a
        href={game.url}
        className="relative block aspect-video overflow-hidden"
        aria-label={`Jugar ${game.name}`}
      >
        <GameMedia game={game} priority={index === 0} />
        <span className="absolute top-3 left-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[11px] text-paper uppercase tracking-wider backdrop-blur">
          {String(index + 1).padStart(2, "0")} · {game.kind}
        </span>
      </a>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display font-bold text-2xl tracking-tight">
            {game.name}
          </h3>
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ background: game.accent }}
          />
        </div>
        <p className="font-medium text-[var(--accent)]">{game.tagline}</p>
        <p className="text-mute text-sm leading-relaxed">{game.blurb}</p>
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {game.tags.map((t) => (
            <li
              key={t}
              className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-mute"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-4 pt-3 font-mono text-sm">
          <a
            href={game.url}
            className="rounded-lg px-3.5 py-2 font-semibold text-ink transition-transform active:translate-y-px"
            style={{ background: game.accent }}
          >
            Jugar ↗
          </a>
          {game.repo ? (
            <a
              href={game.repo}
              className="text-mute underline-offset-4 hover:text-paper hover:underline"
            >
              Código
            </a>
          ) : null}
          {game.credit ? (
            <span className="ml-auto text-mute text-xs">por {game.credit}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function Shelf({
  id,
  title,
  lead,
  list,
  offset,
}: {
  id: string;
  title: string;
  lead: string;
  list: Game[];
  offset: number;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display font-extrabold text-4xl tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-md text-mute">{lead}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((g, i) => (
          <GameCard key={g.slug} game={g} index={offset + i} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const play = games.filter((g) => g.kind === "recreativo");
  const learn = games.filter((g) => g.kind === "educativo");
  const reel = [...games, ...games];

  return (
    <main className="overflow-x-hidden">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-display font-bold text-lg tracking-tight">
            Crafter Games
          </span>
        </a>
        <nav className="flex items-center gap-5 font-mono text-sm text-mute">
          <a href="#jugar" className="hidden hover:text-paper sm:inline">
            Jugar
          </a>
          <a href="#aprender" className="hidden hover:text-paper sm:inline">
            Aprender
          </a>
          <a
            href={ORG}
            className="rounded-lg border border-line px-3 py-1.5 text-paper hover:border-violet"
          >
            GitHub
          </a>
        </nav>
      </header>

      <section className="grain relative">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-20">
          <div>
            <p className="mb-5 font-mono text-sm text-violet">
              ▸ por Crafter Station · hecho en Perú
            </p>
            <h1 className="font-display font-extrabold text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] tracking-tighter">
              Jugamos
              <br />
              lo que <span className="text-violet">shipeamos.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-mute leading-relaxed">
              Juegos recreativos y educativos hechos por la comunidad. Gratis,
              en el navegador y con el código abierto para que armes el
              siguiente.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
              <a
                href="#jugar"
                className="rounded-xl bg-violet px-5 py-3 font-semibold text-ink shadow-[0_4px_0_var(--color-violet-deep)] transition-transform active:translate-y-1 active:shadow-none"
              >
                Elegir un juego
              </a>
              <a
                href={ORG}
                className="rounded-xl border border-line px-5 py-3 hover:border-violet"
              >
                Crear el tuyo
              </a>
            </div>
            <dl className="mt-10 flex gap-8 font-mono text-sm">
              <div>
                <dt className="text-mute">juegos</dt>
                <dd className="font-display font-bold text-3xl">
                  {games.length}
                </dd>
              </div>
              <div>
                <dt className="text-mute">recreativos</dt>
                <dd className="font-display font-bold text-3xl">
                  {play.length}
                </dd>
              </div>
              <div>
                <dt className="text-mute">educativos</dt>
                <dd className="font-display font-bold text-3xl">
                  {learn.length}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative grid grid-cols-6 grid-rows-6 gap-3 [aspect-ratio:1/1] max-lg:max-h-[520px]">
            {play.map((g, i) => (
              <a
                key={g.slug}
                href={g.url}
                aria-label={`Jugar ${g.name}`}
                className={[
                  "overflow-hidden rounded-2xl border-2 border-line transition-transform hover:-translate-y-1",
                  i === 0 && "col-span-6 row-span-3",
                  i === 1 && "col-span-3 row-span-3",
                  i === 2 && "col-span-3 row-span-3",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ borderColor: g.accent }}
              >
                <GameMedia game={g} priority />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div
        aria-hidden
        className="border-line border-y bg-violet py-3 font-display font-bold text-ink text-xl"
      >
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {reel.map((g, i) => (
            <span key={`${g.slug}-${i}`} className="flex items-center gap-10">
              {g.name}
              <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      <section
        id="trailer"
        className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6"
      >
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display font-extrabold text-4xl tracking-tight sm:text-5xl">
            Tráiler
          </h2>
          <p className="max-w-md text-mute">
            Treinta segundos de partidas reales. Dale play con sonido.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-violet/40 bg-ink-2 shadow-[0_30px_80px_-30px_rgb(169_112_255/0.45)]">
          <video
            className="aspect-video w-full"
            src="/media/trailer.mp4"
            poster="/media/trailer.jpg"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </section>

      <Shelf
        id="jugar"
        title="Para jugar"
        lead="Pelea, artillería y misterio. Invita a alguien, conecta un mando o ponte los audífonos."
        list={play}
        offset={0}
      />
      <Shelf
        id="aprender"
        title="Para aprender"
        lead="Estudio con método: práctica de recuperación, repetición espaciada y rondas de cuatro minutos."
        list={learn}
        offset={play.length}
      />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 rounded-3xl border border-violet/40 bg-[radial-gradient(120%_120%_at_0%_0%,rgb(169_112_255/0.22),transparent_60%)] p-8 sm:p-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="mb-3 font-mono text-sm text-violet">▸ en el taller</p>
            <h2 className="font-display font-extrabold text-4xl tracking-tight">
              Crafter Pad
            </h2>
            <p className="mt-3 max-w-lg text-mute leading-relaxed">
              Tu teléfono como mando. El juego corre en la PC o la TV, escaneas
              un QR y juegas. Ya habla con Smash y Craft Ones.
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-sm md:items-end">
            <p className="text-mute">¿Tienes un juego a medias?</p>
            <a
              href={ORG}
              className="rounded-xl bg-paper px-5 py-3 font-semibold text-ink"
            >
              Súmalo a crafter-games ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="border-line border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 font-mono text-mute text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            Crafter Games es parte de{" "}
            <a
              href="https://crafterstation.com"
              className="text-paper hover:text-violet"
            >
              Crafter Station
            </a>
          </span>
          <a href={ORG} className="hover:text-paper">
            github.com/crafter-games
          </a>
        </div>
      </footer>
    </main>
  );
}
