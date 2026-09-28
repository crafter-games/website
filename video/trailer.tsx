import { SILK } from "./silk";

const F = "fonts";
const PAPER = "#f2eee8";
const SOFT = "#cfcbd6";
const VIOLET = "#a970ff";

type T = { t: number };
const clamp = (x: number) => Math.min(1, Math.max(0, x));
const out3 = (x: number) => 1 - (1 - clamp(x)) ** 3;

// 120 BPM grid in seconds (bpm={60}): one beat = 0.5s, one bar = 2s.
const step = (from: number, to: number, every: number, off = 0) =>
  Array.from({ length: Math.round((to - from) / every) }, (_, i) => from + off + i * every).filter((t) => t < to);

/** Opacity that fades in from `a`, holds still, and fades out before `b`. */
const hold = (a: number, b: number, fin = 0.45, fout = 0.3) => ({ t }: T) =>
  Math.min(out3((t - a) / fin), 1 - clamp((t - (b - fout)) / fout));
/** A short settle upwards that finishes before the text is read. */
const settle = (a: number, px = 14, d = 0.45) => ({ t }: T) => px * (1 - out3((t - a) / d));

export type Format = { w: number; h: number; name: number; line: number; brand: number; url: number; logo: number };
export const WIDE: Format = { w: 1920, h: 1080, name: 140, line: 56, brand: 150, url: 150, logo: 168 };
export const REEL: Format = { w: 1080, h: 1920, name: 108, line: 50, brand: 140, url: 112, logo: 176 };
export const FEED: Format = { w: 1080, h: 1350, name: 104, line: 50, brand: 128, url: 104, logo: 150 };

/**
 * Footage with a slow push. Wide formats show it full-bleed (sources are 16:9, nothing is
 * cropped at rest). Vertical formats keep the play sharp in a full-width band and fill the
 * rest with the same shot, blurred and dimmed, so there are no bars.
 */
function Shot({ f, at, len, src, from }: { f: Format; at: number; len: number; src: string; from: number }) {
  const push = ({ t }: T) => 1 + 0.025 * clamp((t - at) / len);
  if (f.w / f.h > 1.5) {
    return (
      <box in={at} out={at + len} top={0} left={0} width={f.w} height={f.h} scale={push}>
        <clip src={src} from={from} top={0} left={0} width={f.w} height={f.h} fit="cover" />
      </box>
    );
  }
  const bh = Math.round((f.w * 9) / 16);
  return (
    <box in={at} out={at + len} top={0} left={0} width={f.w} height={f.h}>
      <box top={0} left={0} width={f.w} height={f.h} blur={34} scale={1.12}>
        <clip src={src} from={from} top={0} left={0} width={f.w} height={f.h} fit="cover" />
      </box>
      <box top={0} left={0} width={f.w} height={f.h} bg="#07070a" opacity={0.5} />
      <box top={Math.round((f.h - bh) / 2)} left={0} width={f.w} height={bh} scale={push}>
        <clip src={src} from={from} top={0} left={0} width={f.w} height={bh} fit="cover" />
      </box>
    </box>
  );
}

type Game = { at: number; name: string; line: string; accent: string; a: [string, number]; b: [string, number] };
const LEN = 3.6;
const GAMES: Game[] = [
  { at: 6, name: "Crafter Smash", line: "Pelea de plataformas con los crafters", accent: "#FFB23F", a: ["assets/smash.mp4", 5.5], b: ["assets/smash.mp4", 10.8] },
  { at: 9.6, name: "Craft Ones", line: "Artillería 1v1 con criaturas peruanas", accent: "#9BE08A", a: ["assets/ones.mp4", 13.5], b: ["assets/ones.mp4", 32.5] },
  { at: 13.2, name: "Iris.exe", line: "Una visual novel de citas y misterio", accent: "#6FE3EC", a: ["assets/iris.mp4", 45.5], b: ["assets/iris.mp4", 49.2] },
  { at: 16.8, name: "learnclaudecode", line: "Domina Claude Code jugando", accent: "#FF7A4D", a: ["assets/learn-claude.mp4", 0.9], b: ["assets/learn-claude.mp4", 2.8] },
  { at: 20.4, name: "learnaws", line: "Prepárate para AWS SAA-C03", accent: "#FFD23F", a: ["assets/learn-aws.mp4", 5.8], b: ["assets/learn-aws.mp4", 8.3] },
];

/**
 * Each game opens on its first shot blurred and dimmed with the title held still on top.
 * The blur clears as the title leaves, so the play is never read through text.
 */
function GameBlock({ f, g }: { f: Format; g: Game }) {
  const split = 2.2;
  const end = g.at + LEN;
  const t0 = g.at + 0.15;
  const clear = g.at + 1.3;
  const k = ({ t }: T) => 1 - out3((t - clear) / 0.3);
  return (
    <box in={g.at} out={end} top={0} left={0} width={f.w} height={f.h}>
      <box in={g.at} out={g.at + split} top={0} left={0} width={f.w} height={f.h} blur={({ t }: T) => 22 * k({ t })}>
        <Shot f={f} at={g.at} len={split} src={g.a[0]} from={g.a[1]} />
      </box>
      <box in={g.at} out={g.at + split} top={0} left={0} width={f.w} height={f.h} bg="#07070a" opacity={({ t }: T) => 0.55 * k({ t })} />
      <Shot f={f} at={g.at + split} len={LEN - split} src={g.b[0]} from={g.b[1]} />
      <box in={g.at} out={clear + 0.25} top={0} left={0} width={f.w} height={f.h} direction="column" align="center" justify="center" gap={22} opacity={hold(t0, clear + 0.25, 0.4, 0.25)} y={settle(t0, 16, 0.5)}>
        <box width={64} height={6} radius={3} bg={g.accent} />
        <text font="xb" size={f.name} color={PAPER} tracking={-0.045} nowrap>{g.name}</text>
        <text font="sb" size={f.line} color={SOFT} nowrap>{g.line}</text>
      </box>
    </box>
  );
}

const OPEN: [string, number][] = [
  ["assets/smash.mp4", 7],
  ["assets/ones.mp4", 13.8],
  ["assets/iris.mp4", 49.5],
  ["assets/learn-aws.mp4", 8.4],
  ["assets/smash.mp4", 11.2],
];

export const trailer = (f: Format) => (
  <scene size={[f.w, f.h]} output={[f.w, f.h]} tier="rich" bpm={60} beats={30} bg="#07070a" fonts={{ xb: `${F}/Bricolage-800.ttf`, sb: `${F}/Bricolage-600.ttf` }}>
    <shader id="silk" wgsl={SILK} uniforms={({ t }: T) => ({ p: { time: t + 8, kick: 0, mixT: 0, pad: 0, tint: [0.663, 0.439, 1, 0] } })} />

    {/* 0-2.5 cold open: five beats of real play, no text */}
    {OPEN.map(([src, from], i) => (
      <Shot f={f} at={i * 0.5} len={0.5} src={src} from={from} />
    ))}

    {/* 2.5-6 brand, still and centered over the silk */}
    <box in={2.5} out={6} top={0} left={0} width={f.w} height={f.h} direction="column" align="center" justify="center" gap={34}>
      <box opacity={hold(2.6, 5.95, 0.6, 0.35)} y={settle(2.6, 18, 0.6)}>
        <image src="assets/logo.png" width={f.logo} height={f.logo} radius={Math.round(f.logo * 0.23)} />
      </box>
      <text font="xb" size={f.brand} color={PAPER} tracking={-0.045} nowrap opacity={hold(2.8, 5.95, 0.6, 0.35)} y={settle(2.8, 18, 0.6)}>Crafter Games</text>
      <text font="sb" size={f.line} color={SOFT} nowrap opacity={hold(3.5, 5.95, 0.6, 0.35)}>Juegos de la comunidad, hechos en Perú</text>
    </box>

    {GAMES.map((g) => (
      <GameBlock f={f} g={g} />
    ))}

    {/* 24-30 close, held long enough to read */}
    <box in={24} out={30} top={0} left={0} width={f.w} height={f.h} direction="column" align="center" justify="center" gap={30}>
      <box opacity={hold(24.2, 29.9, 0.6, 0.5)} y={settle(24.2, 18, 0.6)}>
        <image src="assets/logo.png" width={Math.round(f.logo * 0.72)} height={Math.round(f.logo * 0.72)} radius={Math.round(f.logo * 0.17)} />
      </box>
      <text font="xb" size={f.url} color={PAPER} tracking={-0.045} nowrap opacity={hold(24.4, 29.9, 0.6, 0.5)} y={settle(24.4, 18, 0.6)}>games.crafter.run</text>
      <text font="sb" size={f.line} color={VIOLET} nowrap opacity={hold(25, 29.9, 0.6, 0.5)}>Gratis, en el navegador y open source</text>
    </box>

    {/* beat: 120 BPM. Cold open on the kick, build under the brand, drop at 6, ride out at 29.5 */}
    <audio sound="kick" at={[...step(0, 2.5, 0.5), ...step(6, 29.5, 0.5), 29.5]} gain={0.8} />
    <audio sound="snare" at={[...step(6, 29, 1, 0.5), ...step(5, 6, 0.125)]} gain={0.5} />
    <audio sound="hat" at={[...step(0, 2.5, 0.25), ...step(3.5, 6, 0.5, 0.25), ...step(6, 29.5, 0.25)]} gain={0.2} />
    <audio sound="bass" at={step(6, 29.5, 0.5)} notes={[33, 33, 45, 33, 36, 36, 48, 31]} gain={0.55} />
    <audio sound="pluck" at={step(2.5, 6, 0.25)} notes={[69, 72, 76, 81, 72, 76, 79, 84]} gain={0.28} />
    <audio sound="pluck" at={step(6, 29.5, 0.25)} notes={[81, 76, 72, 76, 84, 79, 76, 79, 81, 76, 72, 69, 72, 76, 79, 76]} gain={0.18} />
  </scene>

);
