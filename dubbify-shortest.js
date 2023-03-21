let lastIndex = -1, lang = "nl", utterance, subs = await getSubs(lang);
async function getSubs(langCode) {
  const subsUrl = ((ct = ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.captionTracks).find(x => x.vssId.indexOf("." + langCode) === 0)?.baseUrl || ct.find(x => x.vssId.indexOf("a." + langCode) === 0)?.baseUrl || ct[0].baseUrl + "&tlang=" + langCode ) + "&fmt=json3";
  return (await (await fetch(url)).json()).events.map(x => ({...x, text: x.segs?.map(x => x.utf8)?.join(" ")?.replace(/\n/g,' ')?.replace(/♪|'|"|\.{2,}|\<[\s\S]*?\>|\{[\s\S]*?\}|\[[\s\S]*?\]/g,'')?.trim() || ''}));
}
function speak(text, lang) {
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang
    utterance.onend = () => utterance = false;
    speechSynthesis.speak(utterance);
}
async function speakCurrentSub() {
  const currentIndex = subs.findIndex(x => x.start <= (vid = document.querySelector('video')).currentTime && x.start + x.dur >= vid.currentTime);
  if (currentIndex === -1 || lastIndex === currentIndex) return;
  if (utterance)
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