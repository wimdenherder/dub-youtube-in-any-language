let lastIndex = -1, lang = "nl", speaking = false, subs = await getSubs(lang);
async function getSubs(langCode) {
  const ct = ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.captionTracks;
  const subsUrl = ct.find(x => x.vssId.indexOf("." + langCode) === 0)?.baseUrl || ct.find(x => x.vssId.indexOf("a." + langCode) === 0)?.baseUrl || ct[0].baseUrl + "&tlang=" + langCode;
  const subs = await (await fetch(subsUrl)).text();
  const xml = new DOMParser().parseFromString(subs, "text/xml");
  return [...xml.getElementsByTagName("text")].map((x) => ({text: x.textContent?.replaceAll("&#39;", "'"),dur: JSON.parse(x.getAttribute("dur")),start: JSON.parse(x.getAttribute("start"))}))
}
function speak(text, lang, dur) {
    speaking = true
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang
    speechSynthesis.speak(utterance);
    utterance.onend = () => speaking = false;
}
async function speakCurrentSub() {
  const v = document.querySelector('video');
  const currentIndex = subs.findIndex(x => x.start <= v.currentTime && x.start + x.dur >= v.currentTime);
  if (currentIndex === -1 || lastIndex === currentIndex) return;
  if (speaking) { 
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