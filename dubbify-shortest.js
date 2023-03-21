let lastIndex = -1, lang = "nl", utterance, subs = await getSubs(lang);
async function getSubs(langCode) {
  const ct = ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.captionTracks;
  const subsUrl = (ct.find(x => x.vssId.indexOf("." + langCode) === 0)?.baseUrl || ct.find(x => x.vssId.indexOf("a." + langCode) === 0)?.baseUrl || ct[0].baseUrl + "&tlang=" + langCode ) + "&fmt=json3";
  return (await (await fetch(url)).json()).events.map(x => ({...x, text: x.segs?.map(x => x.utf8)?.join(" ")?.replace(/\n/g,' ')?.replace(/♪|'|"|\.{2,}|\<[\s\S]*?\>|\{[\s\S]*?\}|\[[\s\S]*?\]/g,'')?.trim() || ''}));
}
function speak(text, lang, dur) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang
    speechSynthesis.speak(utterance);
    utterance.onend = () => utterance = false;
}
async function speakCurrentSub() {
  const v = document.querySelector('video');
  const currentIndex = subs.findIndex(x => x.start <= v.currentTime && x.start + x.dur >= v.currentTime);
  if (currentIndex === -1 || lastIndex === currentIndex) return;
  if (utterance) { 
    v.pause();
    return setTimeout(speakCurrentSub, 100);
  }
  v.play();
  lastIndex = currentIndex;
  speak(subs[currentIndex].text, lang, subs[currentIndex].dur);
}
setInterval(speakCurrentSub, 10);


/*

  async function fetchYtInitialPlayerResponse() {
    try { return JSON.parse(await (await fetch(window.location.href)).text().split(`ytInitialPlayerResponse = `)[1].split(`;var`)[0]); } catch (e) { return ytInitialPlayerResponse }
  }
  ytInitialPlayerResponse = await fetchYtInitialPlayerResponse();

*/