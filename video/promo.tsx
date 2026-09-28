const F = "fonts";
const INK = "#101014";
const PAPER = "#f2eee8";
const VIOLET = "#a970ff";
const MUTE = "#9a97a3";

type Beat = { t: number };
const ease = (x: number) => 1 - (1 - Math.min(1, Math.max(0, x))) ** 3;
const push = (t0: number, d = 6) => ({ t }: Beat) => 1.04 + 0.06 * ease((t - t0) / d);

function GameShot(props: {
  at: number;
  len: number;
  src: string;
  from: number;
  n: string;
  name: string;
  line: string;
  accent: string;
  top?: boolean;
}) {
  const { at, len, src, from, n, name, line, accent, top } = props;
  const place = top ? { top: 96 } : { bottom: 96 };
  return (
    <box in={at} out={at + len} top={0} left={0} width={1920} height={1080}>
      <box top={0} left={0} width={1920} height={1080} scale={push(at, len)}>
        <clip src={src} from={from} width={1920} height={1080} fit="cover" />
      </box>
      <box top={0} left={0} width={1920} height={1080} bg={INK} opacity={0.2} />
      <box left={96} {...place} padding={[28, 40]} bg={INK} radius={20} border={accent} borderWidth={3} direction="column" gap={10} in={at + 0.5} enter="slide-up" enterBeats={0.5}>
        <text font="mono" size={46} color={accent} tracking={0.08}>{`${n} · RECREATIVO`}</text>
        <text font="xb" size={120} color={PAPER} tracking={-0.03} nowrap>{name}</text>
        <text font="sb" size={50} color={MUTE} nowrap>{line}</text>
      </box>
    </box>
  );
}

export default (
  <scene size={[1920, 1080]} tier="rich" bpm={60} beats={30} bg={INK} fonts={{ xb: `${F}/Bricolage-800.ttf`, sb: `${F}/Bricolage-600.ttf`, mono: `${F}/GeistMono-600.ttf` }}>
    {/* 0-4 intro */}
    <card in={0} out={4.2} direction="column" gap={36}>
      <image src="assets/logo.png" width={280} height={280} radius={56} in={0.2} enter="pop" enterBeats={0.6} />
      <text font="xb" size={150} color={PAPER} tracking={-0.04} in={0.8} enter="slide-up" nowrap>Crafter Games</text>
      <text font="mono" size={48} color={VIOLET} tracking={0.06} in={1.6} enter="type" enterBeats={1.2} nowrap>por Crafter Station · hecho en Perú</text>
    </card>

    {/* 4-6 claim */}
    <card in={4.2} out={6.2} direction="column" gap={0}>
      <text font="xb" size={190} color={PAPER} tracking={-0.05} enter="slide-up" enterBeats={0.4} nowrap>Jugamos</text>
      <text font="xb" size={190} color={VIOLET} tracking={-0.05} in={4.6} enter="slide-up" enterBeats={0.4} nowrap>lo que shipeamos.</text>
    </card>

    <GameShot at={6.2} len={5.3} src="assets/smash-play.webm" from={2} n="01" name="Crafter Smash" line="Pelea de plataformas con los crafters" accent="#FFB23F" />
    <GameShot at={11.5} len={5.3} src="assets/ones-play.webm" from={6} n="02" name="Craft Ones" line="Artillería 1v1 con criaturas peruanas" accent="#9BE08A" />
    <GameShot at={16.8} len={5.2} src="assets/iris-play.webm" from={27} n="03" name="Iris.exe" line="Visual novel de citas y misterio" accent="#6FE3EC" top />

    {/* 22-26 learn */}
    <box in={22} out={26} top={0} left={0} width={1920} height={1080} direction="column" padding={[110, 96]} gap={56}>
      <text font="xb" size={120} color={PAPER} tracking={-0.04} enter="slide-up" enterBeats={0.4} nowrap>Y para aprender.</text>
      <box direction="row" gap={48}>
        <box direction="column" gap={20} in={22.5} enter="pop" enterBeats={0.5}>
          <image src="assets/learnclaudecode.jpg" width={840} height={472} radius={24} fit="cover" focus={[0.5, 0]} />
          <text font="sb" size={52} color="#FF7A4D" nowrap>learnclaudecode</text>
        </box>
        <box direction="column" gap={20} in={23} enter="pop" enterBeats={0.5}>
          <image src="assets/learnaws.jpg" width={840} height={472} radius={24} fit="cover" focus={[0.5, 0]} />
          <text font="sb" size={52} color="#FFD23F" nowrap>learnaws</text>
        </box>
      </box>
    </box>

    {/* 26-30 outro */}
    <box in={26} out={30} top={0} left={0} width={1920} height={1080} direction="column" align="center" justify="center" gap={48}>
      <box direction="row" gap={24} in={26} enter="fade" enterBeats={0.4}>
        <clip src="assets/smash-play.webm" from={9} width={560} height={315} radius={20} fit="cover" />
        <clip src="assets/ones-play.webm" from={20} width={560} height={315} radius={20} fit="cover" />
        <clip src="assets/iris-play.webm" from={33} width={560} height={315} radius={20} fit="cover" />
      </box>
      <text font="xb" size={140} color={PAPER} tracking={-0.04} in={26.5} enter="slide-up" nowrap>games.crafter.run</text>
      <text font="mono" size={48} color={VIOLET} tracking={0.06} in={27} enter="type" enterBeats={1} nowrap>gratis · en el navegador · open source</text>
    </box>

    <audio sound="kick" at={[0.2, 0.8, 4.2, 4.6, 6.2, 11.5, 16.8, 22, 26, 26.5]} gain={0.9} />
    <audio sound="hat" at={Array.from({ length: 44 }, (_, i) => 6.2 + i * 0.5).filter((b) => b < 26)} gain={0.35} />
    <audio sound="bass" at={Array.from({ length: 28 }, (_, i) => 1 + i)} notes={[33, 33, 36, 31]} gain={0.6} />
    <audio sound="blip" at={[1.6, 27]} gain={0.5} />
  </scene>
);
