# Dub Youtube in any language with 19 lines of code
## Usage

- open a YT video
- option+cmd+j  (Developer console in Chrome)
- copy paste code

# Explanation

  This code snippet is designed to be run on a YouTube video page to enable text-to-speech functionality for video subtitles. It works by fetching the subtitles in a specified language (Dutch, in this case), then using the browser's built-in SpeechSynthesis API to read the subtitles out loud as the video plays. Here's a breakdown of the code:

  1. Initialize variables:lastIndex: The last subtitle index spoken, initially set to -1.lang: The language code for the desired subtitles, set to nl for Dutch.voice: A SpeechSynthesisUtterance object that represents the current subtitle being spoken.subs: An array of subtitle objects, fetched using the getSubs() function.vid: The video element on the YouTube page.ct: Caption tracks from the YouTube video's metadata.
  2. Define the getSubs() function:
  This asynchronous function fetches the subtitles for the specified language code. It constructs the URL for fetching the subtitles, fetches the JSON data, processes the subtitles to clean up the text, and returns an array of subtitle objects with start time, duration, and text properties.
  3. Define the speakCurrentSub() function:
  This asynchronous function finds the current subtitle based on the video's current time. If it's a new subtitle and there's no ongoing speech synthesis, it creates a new SpeechSynthesisUtterance object, sets the language, and speaks the subtitle text. When the speech synthesis is complete, it sets the voice variable to null.
  4. Set an interval to run the speakCurrentSub() function every 10 milliseconds:
  This ensures that the subtitles are checked frequently to see if a new one needs to be spoken.

  When you run this code on a YouTube video page, it fetches the Dutch subtitles for the video and reads them aloud as the video plays.

