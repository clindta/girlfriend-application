// ====================================================================
// Quiz-Defaults: Schritte, Fragen, Optionen, Adjektive.
// Wird vom Formular als Fallback genutzt (wenn DB leer ist) und vom
// Admin-Dashboard als Vorlage für "Defaults synchronisieren".
// ====================================================================

window.GF_DEFAULTS = (function(){
  const STEPS = ['typ','adjektive','sonntag','greenflags','interesse','love_lang','happy','date','comms','universe','rueckfrage','message','kontakt'];

  const ADJEKTIVE = [
    { de:'aufgeschlossen',   en:'open-minded' },
    { de:'sarkastisch',      en:'sarcastic' },
    { de:'empathisch',       en:'empathetic' },
    { de:'spontan',          en:'spontaneous' },
    { de:'ehrgeizig',        en:'ambitious' },
    { de:'aufmerksam',       en:'attentive' },
    { de:'zuverlässig',      en:'reliable' },
    { de:'ungeduldig',       en:'impatient' },
    { de:'stur',             en:'stubborn' },
    { de:'abenteuerlustig',  en:'adventurous' },
    { de:'chaotisch',        en:'chaotic' },
    { de:'optimistisch',     en:'optimistic' },
    { de:'direkt',           en:'direct' },
    { de:'verträumt',        en:'dreamy' },
    { de:'loyal',            en:'loyal' },
    { de:'laut',             en:'loud' },
    { de:'leise',            en:'quiet' }
  ];

  const STEP_DATA = {
    typ: {
      type: 'single',
      question: { de:'Was suchst du hier eigentlich?', en:"So what are you actually here for?" },
      subtitle: { de:'Ehrlich. Erspart uns beiden Zeit.', en:'Be honest. Saves us both time.' },
      options: [
        { label:{ de:'Eine Beziehung',                en:'A relationship' },                value:'Beziehung' },
        { label:{ de:'Was lockeres, mal sehen wohin', en:"Something casual, let's see" },   value:'Situationship' },
        { label:{ de:'Keine Ahnung, bin offen',       en:'No clue, just open' },            value:'Unklar' }
      ]
    },
    adjektive: {
      type: 'chips',
      question: { de:'So würdest du dich beschreiben:', en:"That's how you'd describe yourself:" },
      subtitle: { de:'Such drei bis fünf raus. Lieber ehrlich als beeindruckend.', en:'Pick three to five. Honest beats impressive.' },
      options: ADJEKTIVE
    },
    sonntag: {
      type: 'single',
      question: { de:'Sonntag, 11 Uhr.\nWas machst du?', en:'Sunday, 11 AM.\nWhat are you doing?' },
      subtitle: { de:'Verrät tatsächlich am meisten. Wirklich.', en:'Honestly tells me the most. Really.' },
      options: [
        { label:{ de:'Früh raus, eine Runde Laufen oder Pilates.',     en:'Get up early, go for a run or do some Pilates.' },         value:'Diszipliniert' },
        { label:{ de:'Lange ausschlagen, dann lesen oder lernen',      en:'Still in bed, scrolling TikTok' },                          value:'Bett' },
        { label:{ de:'Brunch mit zu vielen Carbs',                     en:'Brunch with too many carbs' },                              value:'Brunch' },
        { label:{ de:'Mit Freundinnen alles vom Wochenende durchgehen', en:'With friends, processing the whole weekend' },             value:'Freundinnen' },
        { label:{ de:'ich gehe arbeiten. Von nichts kommt nichts.',    en:"I'm going to work. You can't get something for nothing." }, value:'Cafe' },
        { label:{ de:'Raus aus der Staft. Wandern, See, frische Luft', en:'' },                                                        value:'' }
      ]
    },
    greenflags: {
      type: 'text',
      question:   { de:'Drei deiner Green Flags.', en:'Three of your green flags.' },
      subtitle:   { de:'Die Sachen, die mir auffallen werden, wenn ich Glück habe.', en:"The things I'll notice if I get lucky." },
      placeholder:{ de:'Ich antworte auf Nachrichten in unter 12h. Ich kann Niederlagen zugeben. Ich kann kochen ohne Rezept…',
                    en:'I reply to messages within 12 hours. I can admit defeat. I can cook without a recipe…' },
      minLength: 3
    },
    interesse: {
      type: 'text',
      question:   { de:'Daran erkenne ich, dass du wirklich Interesse hast:', en:"This is how I'll know you're actually interested:" },
      subtitle:   { de:'Dein persönlicher Tell. Verrate ihn ruhig.', en:'Your personal tell. Feel free to spill.' },
      placeholder:{ de:'Ich schick dir Memes die nur du verstehst.', en:'I send you memes only you would get.' },
      minLength: 3
    },
    love_lang: {
      type: 'single',
      question: { de:'Was ist deine Love Language?', en:'What is your love language?' },
      subtitle: { de:'Wonach blühst du auf?', en:'What makes you bloom?' },
      options: [
        { label:{ de:'Worte der Anerkennung', en:'Words of Affirmation' }, sub:{ de:'Sag mir, was du an mir magst.',                    en:'Tell me what you love about me.' },             value:'Words of Affirmation' },
        { label:{ de:'Zeit zu zweit',         en:'Quality Time' },         sub:{ de:'Volle Aufmerksamkeit. Kein Handy.',                en:'Full attention. No phone.' },                   value:'Quality Time' },
        { label:{ de:'Hilfsbereitschaft',     en:'Acts of Service' },      sub:{ de:'Etwas für mich tun, ohne dass ich fragen muss.',   en:'Doing things for me without being asked.' },    value:'Acts of Service' },
        { label:{ de:'Zärtlichkeit',          en:'Physical Touch' },       sub:{ de:'Berührung, Umarmung, Nähe.',                       en:'Touch, hugs, closeness.' },                     value:'Physical Touch' },
        { label:{ de:'Geschenke',             en:'Receiving Gifts' },      sub:{ de:'Kleine Aufmerksamkeiten. An mich gedacht.',        en:'Small thoughtful gestures. Thinking of me.' },  value:'Receiving Gifts' }
      ]
    },
    happy: {
      type: 'single',
      question: { de:'Wie kann ich dich glücklich machen?', en:'How can I make you happy?' },
      subtitle: { de:"Such dir eins aus. Spoiler: ich notier's mir.", en:"Pick one. Spoiler: I'll note it down." },
      options: [
        { label:{ de:'Frühstück machen, bevor du wach bist',                     en:'Make breakfast before you wake up' },             sub:{ de:'Acts of Service, höchste Stufe.',          en:'Acts of service, top tier.' },          value:'Frühstück' },
        { label:{ de:'Dir ungefragt sagen, was ich an dir mag',                  en:'Tell you what I love about you, unprompted' },    sub:{ de:'Worte. Klare Worte.',                      en:'Words. Clear words.' },                 value:'Worte' },
        { label:{ de:'Blumen mitbringen, einfach so',                            en:'Bring you flowers, just because' },               sub:{ de:'Der Klassiker. Funktioniert immer noch.',  en:'The classic. Still works.' },           value:'Blumen' },
        { label:{ de:'Spontan ein Wochenende für uns planen',                    en:'Plan a spontaneous weekend for us' },             sub:{ de:'Ich plane, du kommst einfach mit.',        en:'I plan, you just come along.' },        value:'Wochenende' },
        { label:{ de:'Richtig schöne Geschenke machen',                          en:'Get you really nice gifts' },                     sub:{ de:'Sachen, an die du selbst nicht denkst.',   en:"Things you wouldn't think of yourself." }, value:'Geschenke' },
        { label:{ de:'Was mitbringen, das du vor Wochen beiläufig erwähnt hast', en:'Bring you something you mentioned weeks ago in passing' }, sub:{ de:'Stille Aufmerksamkeit.',           en:'Quiet attention.' },                    value:'Aufmerksamkeit' },
        { label:{ de:'Stress vom Tisch nehmen, wenn du grad keine Luft hast',    en:"Take stress off your plate when you can't breathe" },    sub:{ de:'Ich regel, du atmest.',           en:'I handle it, you exhale.' },             value:'Alltag' },
        { label:{ de:'Überrasch mich. Was wäre dein Move?',                      en:'Surprise me. What would your move be?' },         sub:{ de:'Bonus-Frage. Falls du eigene Ideen hast.', en:'Bonus question. In case you have your own ideas.' }, value:'Überraschung', allowText:true }
      ]
    },
    date: {
      type: 'single',
      question: { de:'Welches Date plane ich für uns?', en:'Which date should I plan for us?' },
      subtitle: { de:'Such dir eins aus. Ich kümmere mich um den Rest. Wirklich.', en:'Pick one. I handle the rest. Really.' },
      options: [
        { label:{ de:'Abendessen',                                    en:'Dinner' },                                sub:{ de:'Reservierung mach ich. Du bringst Hunger und Geschichten mit.', en:"I'll book it. You bring appetite and stories." },             value:'Abendessen' },
        { label:{ de:'City Trip',                                     en:'City trip' },                              sub:{ de:'Wochenende weg. Irgendwo, wo wir beide noch nicht waren.',      en:"Weekend away. Somewhere neither of us has been." },             value:'City Trip' },
        { label:{ de:'Pottery, Painting oder Lego bauen',             en:'Pottery, painting or building Lego' },     sub:{ de:'Hands-on, low-stakes, garantiert eine gute Geschichte später.', en:'Hands-on, low-stakes, guaranteed a good story later.' },       value:'Pottery/Painting/Lego' },
        { label:{ de:'Sonntag früh raus & wandern',                   en:'Early Sunday & hiking' },                  sub:{ de:'Berge, Thermoskanne, gute Schuhe. Frühaufsteher only.',         en:'Mountains, thermos, good shoes. Early risers only.' },         value:'Wandern' },
        { label:{ de:'Karaoke',                                       en:'Karaoke' },                                sub:{ de:'Mut beweisen, peinlich werden, nur zu zweit.',                  en:'Prove courage, get embarrassed, just the two of us.' },        value:'Karaoke' },
        { label:{ de:'Ich koche für dich. Oder wir kochen zusammen.', en:"I'll cook for you. Or we cook together." }, sub:{ de:'Bold Move, ich weiß. Aber ich kann kochen.',                   en:'Bold move, I know. But I can cook.' },                          value:'Kochen' },
        { label:{ de:'Museum',                                        en:'Museum' },                                 sub:{ de:'Was Schönes anschauen, danach zwei Stunden darüber reden.',    en:'See something good, then talk about it for two hours.' },      value:'Museum' },
        { label:{ de:'Überrasch mich. Was wäre dein Move?',           en:'Surprise me. What would your move be?' },   sub:{ de:'Bonus-Frage. Falls du lieber selber planst.',                   en:'Bonus question. In case you prefer planning yourself.' },      value:'Überraschung', allowText:true }
      ]
    },
    comms: {
      type: 'single',
      question: { de:'Sprachnachricht oder Text?', en:'Voice notes or text?' },
      subtitle: { de:'Verrät mehr als jede Bio.', en:'Reveals more than any bio.' },
      options: [
        { label:{ de:'Voicenotes, immer',                  en:'Voice notes, always' },              sub:{ de:'Ich rede schneller als ich tippe.', en:'I talk faster than I type.' },          value:'Voicenotes' },
        { label:{ de:'Text. Voicenotes sind Verbrechen.',  en:'Text. Voice notes are a crime.' },   sub:{ de:'Knapp und klar. Respektiere ich.',  en:'Short and clear. Respect that.' },     value:'Text' },
        { label:{ de:'Kommt auf die Stimmung an',          en:'Depends on the mood' },              sub:{ de:'Diplomatisch. Auch ok.',            en:'Diplomatic. Also fine.' },              value:'Beides' },
        { label:{ de:'Voicenotes nur an die Lieben',       en:'Voice notes only for the loved ones' }, sub:{ de:'Soft launch sozusagen.',        en:'A soft launch, so to speak.' },         value:'Selektiv' }
      ]
    },
    universe: {
      type: 'text',
      question:   { de:'Wenn du dem Universum eine Frage stellen könntest, welche?', en:'If you could ask the universe one question, what would it be?' },
      subtitle:   { de:'Egal ob existentiell oder absurd. Beides zählt.', en:'Existential or absurd. Both count.' },
      placeholder:{ de:'„Existieren wir wirklich?" oder „Warum schmeckt Koriander für manche nach Seife?"',
                    en:"'Do we actually exist?' or 'Why does cilantro taste like soap to some people?'" },
      minLength: 3
    },
    rueckfrage: {
      type: 'text',
      question:   { de:'Überrasche mich mit einer Frage zurück.', en:'Surprise me with a question back.' },
      subtitle:   { de:'Optional. Aber lustig, weird oder beides ist immer richtig.', en:'Optional. But funny, weird or both is always right.' },
      placeholder:{ de:'z.B. „Wenn du dein Leben morgen umkrempeln müsstest, was würdest du als allererstes ändern?"',
                    en:"e.g. 'If you had to flip your life tomorrow, what's the first thing you'd change?'" },
      minLength: 0,
      skipable: true
    },
    message: {
      type: 'message',
      question: { de:'Erzähl mir, wer du bist.', en:'Tell me who you are.' },
      subtitle: { de:'Sprache, Video oder Text. Voice und Video sind ehrlicher. Kein Muss.', en:'Voice, video or text. Voice and video are more honest. Not required.' },
      skipable: true
    },
    kontakt: {
      type: 'contact',
      question: { de:'Wohin schick ich dir die Rückmeldung?', en:'Where should I send my reply?' },
      subtitle: { de:'Letzter Schritt. Versprochen.', en:'Last step. Promise.' }
    }
  };

  return { STEPS, STEP_DATA, ADJEKTIVE };
})();
