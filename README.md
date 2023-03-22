# YouTube Video Dubbing with Automatic Voices with 19 lines of code
## Usage

- Open a YouTube video in a browser.
- Open the browser's developer console.
- Copy and paste the entire script into the console.
- Press Enter to execute the script.
- The video should now play with the dubbed voice according to the selected language.

Note 1: you can change the language in the script `lang = "ru"`. Use languagecode here  
Note 2: This script uses the Web Speech API which might not be supported in all browsers. Please ensure that you are using a supported browser, such as Google Chrome or Mozilla Firefox, for the best experience.

# Explanation

## Description 
This script automatically dubs YouTube videos with synthesized voices using the Web Speech API. It fetches the video's subtitles, and as the video plays, it speaks the subtitles in the selected language.

## Code Documentation

*fetchYTData function:*
- Purpose: Fetches and parses the YouTube video data from the current page.
- Return: A JSON object containing the initial player response data.

*Variable declarations:*
- lastIndex: Stores the last subtitle index that was spoken.
- lang: Language code for the desired dubbing language (default: "ru").
- voice: Stores the current SpeechSynthesisUtterance instance.
- vid: Stores the video element from the YouTube page.
- ct: Stores the caption tracks from the YouTube video.
- subs: Stores the fetched and processed subtitles for the desired language.
- baseVolume: Stores the original video volume.

*getSubs function:*
- Purpose: Fetches and processes the video's subtitles for the given language.
- Input: langCode (String) - Language code for the desired subtitles.
- Return: An array of subtitle objects with timestamp and text properties.

*speak function:*
- Purpose: Speaks the current subtitle in the selected language using the Web Speech API.
- Behavior: Pauses the video if a voice is already speaking, continues playback when the speech has ended, and adjusts the video volume during speech.

*setInterval(speak, 10):*
- Purpose: Continuously calls the speak function every 10 milliseconds to ensure that the appropriate subtitle is spoken at the correct time.