const F = "fonts";
const INK = "#101014";
const INK2 = "#17171d";
const PAPER = "#f2eee8";
const VIOLET = "#a970ff";
const MUTE = "#9a97a3";

// 120 BPM grid expressed in seconds (bpm={60} below): one bar = 2s.
const step = (from: number, to: number, every: number, off = 0) =>
  Array.from({ length: Math.round((to - from) / every) }, (_, i) => from + off + i * every).filter((t) => t < to);

const WIN = { left: 192, top: 56, width: 1536, height: 864 };

function GameShot(props: {
  at: number;
  len: number;
  src: string;
  from: number;
  n: string;
  kind: string;
  name: string;
  line: string;
  accent: string;
}) {
  const { at, len, src, from, n, kind, name, line, accent } = props;
  return (
    <box in={at} out={at + len} top={0} left={0} width={1920} height={1080}>
      <box {...WIN} left={WIN.left - 6} top={WIN.top - 6} width={WIN.width + 12} height={WIN.height + 12} radius={30} bg={accent} enter="fade" enterBeats={0.3} />
      <clip src={src} from={from} {...WIN} radius={24} fit="cover" enter="fade" enterBeats={0.3} />
      <box left={WIN.left} top={958} direction="row" align="center" gap={28} in={at + 0.25} enter="slide-up" enterBeats={0.35}>
        <text font="mono" size={48} color={accent} tracking={0.06} nowrap>{`${n} · ${kind}`}</text>
        <text font="xb" size={84} color={PAPER} tracking={-0.03} nowrap>{name}</text>
      </box>
      <text right={WIN.left} top={978} font="sb" size={48} color={MUTE} in={at + 0.5} enter="fade" enterBeats={0.35} nowrap>{line}</text>
    </box>
  );
}

export default (
  <scene size={[1920, 1080]} tier="rich" bpm={60} beats={30} bg={INK} fonts={{ xb: `${F}/Bricolage-800.ttf`, sb: `${F}/Bricolage-600.ttf`, mono: `${F}/GeistMono-600.ttf` }}>
    {/* 0-4 intro */}
    <card in={0} out={4} direction="column" gap={36}>
      <image src="assets/logo.png" width={280} height={280} radius={56} in={0.5} enter="pop" enterBeats={0.5} />
      <text font="xb" size={150} color={PAPER} tracking={-0.04} in={1} enter="slide-up" nowrap>Crafter Games</text>
      <text font="mono" size={48} color={VIOLET} tracking={0.06} in={2} enter="type" enterBeats={1} nowrap>por Crafter Station · hecho en Perú</text>
    </card>

    {/* 4-6 claim */}
    <card in={4} out={6} direction="column" gap={0}>
      <text font="xb" size={190} color={PAPER} tracking={-0.05} enter="slide-up" enterBeats={0.3} nowrap>Jugamos</text>
      <text font="xb" size={190} color={VIOLET} tracking={-0.05} in={4.5} enter="slide-up" enterBeats={0.3} nowrap>lo que shipeamos.</text>
    </card>

    <GameShot at={6} len={5} src="assets/smash.mp4" from={2} n="01" kind="PELEA" name="Crafter Smash" line="los crafters, a golpes" accent="#FFB23F" />
    <GameShot at={11} len={5} src="assets/ones.mp4" from={6} n="02" kind="ARTILLERÍA" name="Craft Ones" line="criaturas peruanas, 1v1" accent="#9BE08A" />
    <GameShot at={16} len={5} src="assets/iris.mp4" from={27} n="03" kind="VISUAL NOVEL" name="Iris.exe" line="¿confías en mí?" accent="#6FE3EC" />

    {/* 21-26 learn (screens until real gameplay is recorded) */}
    <box in={21} out={26} top={0} left={0} width={1920} height={1080} direction="column" padding={[100, 96]} gap={56}>
      <text font="xb" size={120} color={PAPER} tracking={-0.04} enter="slide-up" enterBeats={0.3} nowrap>Y para aprender.</text>
      <box direction="row" gap={48}>
        <box direction="column" gap={20} in={21.5} enter="pop" enterBeats={0.4}>
          <image src="assets/learnclaudecode.jpg" width={840} height={472} radius={24} fit="cover" focus={[0.5, 0]} />
          <text font="sb" size={52} color="#FF7A4D" nowrap>learnclaudecode</text>
        </box>
        <box direction="column" gap={20} in={22} enter="pop" enterBeats={0.4}>
          <image src="assets/learnaws.jpg" width={840} height={472} radius={24} fit="cover" focus={[0.5, 0]} />
          <text font="sb" size={52} color="#FFD23F" nowrap>learnaws</text>
        </box>
      </box>
    </box>

    {/* 26-30 outro */}
    <box in={26} out={30} top={0} left={0} width={1920} height={1080} direction="column" align="center" justify="center" gap={48}>
      <box direction="row" gap={24} enter="fade" enterBeats={0.3}>
        <clip src="assets/smash.mp4" from={9} width={560} height={315} radius={20} fit="cover" />
        <clip src="assets/ones.mp4" from={20} width={560} height={315} radius={20} fit="cover" />
        <clip src="assets/iris.mp4" from={33} width={560} height={315} radius={20} fit="cover" />
      </box>
      <text font="xb" size={140} color={PAPER} tracking={-0.04} in={26.5} enter="slide-up" nowrap>games.crafter.run</text>
      <text font="mono" size={48} color={VIOLET} tracking={0.06} in={27} enter="type" enterBeats={1} nowrap>gratis · en el navegador · open source</text>
    </box>

    {/* beat: 120 BPM, build 0-6, drop at 6, breakdown 21-22, final hit 29.5 */}
    <audio sound="kick" at={[...step(0, 4, 1), ...step(4, 6, 0.5), ...step(6, 21, 0.5), ...step(22, 29.5, 0.5), 29.5]} gain={0.95} />
    <audio sound="snare" at={[...step(6, 21, 1, 0.5), ...step(22, 29, 1, 0.5), ...step(5, 6, 0.125)]} gain={0.55} />
    <audio sound="hat" at={[...step(2, 6, 0.5, 0.25), ...step(6, 21, 0.25), ...step(22, 29.5, 0.25)]} gain={0.22} />
    <audio sound="bass" at={[...step(6, 21, 0.5), ...step(22, 29.5, 0.5)]} notes={[33, 33, 45, 33, 36, 36, 48, 31]} gain={0.55} />
    <audio sound="pluck" at={[...step(0, 6, 0.25), ...step(21, 22, 0.25)]} notes={[69, 72, 76, 81, 72, 76, 79, 84]} gain={0.3} />
    <audio sound="pluck" at={step(6, 29.5, 0.25)} notes={[81, 76, 72, 76, 84, 79, 76, 79, 81, 76, 72, 69, 72, 76, 79, 76]} gain={0.2} />
    <audio sound="blip" at={[6, 11, 16, 21, 26]} gain={0.5} />
  </scene>
);
