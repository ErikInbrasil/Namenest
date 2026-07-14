'use client';

import { useEffect, useMemo, useState } from 'react';
import { normalizeSpokenName, speechLocaleForLanguage } from '@/lib/speech';
import { speechText } from '@/lib/uiText';
import type { Language } from '@/lib/types';

const exampleName = 'Suzana Vera Brito Macedo Hansen';

export function FullNameSpeaker({ language = 'pt' }: { language?: Language }) {
  const [fullName, setFullName] = useState(exampleName);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState('');
  const [message, setMessage] = useState('');
  const [supported, setSupported] = useState(true);
  const text = speechText[language];
  const speechLocale = speechLocaleForLanguage(language);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setSupported(false);
      return;
    }

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const preferredVoices = useMemo(() => {
    const localeRoot = speechLocale.split('-')[0];
    return voices
      .filter((voice) => voice.lang.toLowerCase().startsWith(localeRoot))
      .concat(voices.filter((voice) => !voice.lang.toLowerCase().startsWith(localeRoot)));
  }, [speechLocale, voices]);

  function speakName() {
    const spokenName = normalizeSpokenName(fullName);
    if (!spokenName) {
      setMessage(text.emptyName);
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setMessage(text.unsupported);
      setSupported(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(spokenName);
    utterance.lang = speechLocale;
    utterance.rate = 0.82;
    utterance.pitch = 1;

    const selectedVoice = voices.find((voice) => voice.voiceURI === voiceURI);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }

    setMessage('');
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  return (
    <section className="section container">
      <div className="card voice-card">
        <p className="eyebrow">{text.eyebrow}</p>
        <h2>{text.title}</h2>
        <p>{text.intro}</p>
        <div className="grid two">
          <label>{text.fullName}
            <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder={exampleName} />
          </label>
          <label>{text.voice}
            <select value={voiceURI} onChange={(event) => setVoiceURI(event.target.value)} disabled={!supported}>
              <option value="">{text.defaultVoice}</option>
              {preferredVoices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} · {voice.lang}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="actions">
          <button className="btn" type="button" onClick={speakName} disabled={!supported}>{text.speak}</button>
          <button className="btn secondary" type="button" onClick={stopSpeech}>{text.stop}</button>
        </div>
        {!supported && <p className="notice">{text.unsupported}</p>}
        {message && <p className="notice">{message}</p>}
      </div>
    </section>
  );
}
