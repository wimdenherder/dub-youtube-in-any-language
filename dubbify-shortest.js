let lastIndex = -1, lang = "nl", voice, subs = await getSubs(lang), vid = document.querySelector('video'), ct = ytInitialPlayerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks
async function getSubs(langCode) {
  const subsUrl = (ct.find(x => x.vssId.indexOf("." + langCode) === 0)?.baseUrl || ct.find(x => x.vssId.indexOf("a." + langCode) === 0)?.baseUrl || ct[0].baseUrl + "&tlang=" + langCode ) + "&fmt=json3";
  return (await (await fetch(url)).json()).events.map(x => ({...x, text: x.segs?.map(x => x.utf8)?.join(" ")?.replace(/\n/g,' ')?.replace(/♪|'|"|\.{2,}|\<[\s\S]*?\>|\{[\s\S]*?\}|\[[\s\S]*?\]/g,'')?.trim() || ''}));
}
function speak(text, lang) {
    voice = new SpeechSynthesisUtterance(text);
    voice.lang = lang
    voice.onend = () => voice = false;
    speechSynthesis.speak(voice);
}
async function speakCurrentSub() {
  const currentIndex = subs.findIndex(x => x.start <= vid.currentTime && x.start + x.dur >= vid.currentTime);
  if (currentIndex === -1 || lastIndex === currentIndex) return;
  if (voice)
    return setTimeout(speakCurrentSub, 100) && vid.pause();
  vid.play();
  speak(subs[(lastIndex = currentIndex)].text, lang);
}
setInterval(speakCurrentSub, 10);


/*

  async function fetchYtInitialPlayerResponse() {
    try { return JSON.parse(await (await fetch(window.location.href)).text().split(`ytInitialPlayerResponse = `)[1].split(`;var`)[0]); } catch (e) { return ytInitialPlayerResponse }
  }
  ytInitialPlayerResponse = await fetchYtInitialPlayerResponse();

*/