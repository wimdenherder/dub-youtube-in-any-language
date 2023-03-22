const fetchYTData = async () => { try { return JSON.parse((await (await fetch(window.location.href)).text()).split(`ytInitialPlayerResponse = `)[1].split(`;var`)[0]); } catch (e) {}};
let lastIndex = -1, lang = "ru", voice, vid = document.querySelector('video'), ct = (ytInitialPlayerResponse || await fetchYTData()).captions.playerCaptionsTracklistRenderer.captionTracks, subs = await getSubs(lang), baseVolume = vid.volume;
async function getSubs(langCode) {
  const findCaptionUrl = x => ct.find(y => y.vssId.indexOf(x) === 0)?.baseUrl;
  const url = (findCaptionUrl("." + langCode) || findCaptionUrl(".") + "&tlang=" + langCode || findCaptionUrl("a." + langCode) || ct[0].baseUrl + "&tlang=" + langCode) + "&fmt=json3"
  return (await (await fetch(url)).json()).events.map(x => ({...x, text: x.segs?.map(x => x.utf8)?.join(" ")?.replace(/\n/g,' ')?.replace(/♪|'|"|\.{2,}|\<[\s\S]*?\>|\{[\s\S]*?\}|\[[\s\S]*?\]/g,'')?.trim() || ''}));
}
async function speak() {
  const currentIndex = subs.findIndex(x => x.text && x.tStartMs <= 1000 * vid.currentTime && x.tStartMs + x.dDurationMs >= 1000 * vid.currentTime);
  if ([-1,lastIndex].includes(currentIndex)) return;
  if (voice) return setTimeout(speak, 100) && vid.pause();
  vid.play();
  voice = new SpeechSynthesisUtterance(subs[(lastIndex = currentIndex)].text);
  voice.lang = lang
  voice.onend = () => (vid.volume = baseVolume || 1) && (voice = null);
  vid.volume = 0.3;
  speechSynthesis.speak(voice);
}
setInterval(speak, 10);