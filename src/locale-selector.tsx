import React, { useState } from 'react';

interface LocaleSelectorProps {
  children: (locale: string) => React.ReactNode;
}
export function LocaleSelector({ children }: LocaleSelectorProps) {
  const [state, setState] = useState('en');
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div style={{ marginRight: '20px' }}>{children(state)}</div>
      <select value={state} onChange={event => setState(event.target.value)}>
        <option value="ar">Arabic</option>
        <option value="am">Amharic</option>
        <option value="bg">Bulgarian</option>
        <option value="bn">Bengali</option>
        <option value="ca">Catalan</option>
        <option value="cs">Czech</option>
        <option value="da">Danish</option>
        <option value="de">German</option>
        <option value="el">Greek</option>
        <option value="en">English</option>
        <option value="en-GB">English (Great Britain)</option>
        <option value="en-US">English (USA)</option>
        <option value="en-CA">English (Canada)</option>
        <option value="es">Spanish</option>
        <option value="es-419">Spanish (Latin America and Caribbean)</option>
        <option value="et">Estonian</option>
        <option value="fa">Persian</option>
        <option value="fi">Finnish</option>
        <option value="fil">Filipino</option>
        <option value="fr">French</option>
        <option value="fr-CA">French (Canada)</option>
        <option value="gu">Gujarati</option>
        <option value="he">Hebrew</option>
        <option value="hi">Hindi</option>
        <option value="hr">Croatian</option>
        <option value="hu">Hungarian</option>
        <option value="id">Indonesian</option>
        <option value="it">Italian</option>
        <option value="ja">Japanese</option>
        <option value="kn">Kannada</option>
        <option value="ko">Korean</option>
        <option value="lt">Lithuanian</option>
        <option value="lv">Latvian</option>
        <option value="ml">Malayalam</option>
        <option value="mr">Marathi</option>
        <option value="ms">Malay</option>
        <option value="nl">Dutch</option>
        <option value="no">Norwegian</option>
        <option value="pl">Polish</option>
        <option value="pt-BR">Portuguese (Brazil)</option>
        <option value="pt-PT">Portuguese (Portugal)</option>
        <option value="ro">Romanian</option>
        <option value="ru">Russian</option>
        <option value="sk">Slovak</option>
        <option value="sl">Slovenian</option>
        <option value="sr">Serbian</option>
        <option value="sv">Swedish</option>
        <option value="sw">Swahili</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="th">Thai</option>
        <option value="tr">Turkish</option>
        <option value="uk">Ukrainian</option>
        <option value="vi">Vietnamese</option>
        <option value="zh-CN">Chinese (China)</option>
        <option value="zh-TW">Chinese (Taiwan)</option>
      </select>
    </div>
  );
}
