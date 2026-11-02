// Which MP3s exist in this folder.
//  'all'  -> try audio/<id>.mp3 for every item (browser voice if a file fails)
//  []     -> no MP3s yet, use browser voice only (no 404s)
//  ['tire','tire-s1',...] -> only these ids
window.AUDIO_OK = 'all';
