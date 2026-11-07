(function(root){
  'use strict';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=(value,language)=>typeof value==='string'?value:(value?.[language]??value?.en??'');
  const tr=(language,en,sv)=>language==='sv'?sv:en;
  const normal=value=>String(value??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const anchor=(subject,topic)=>'video-'+subject+'-'+topic.replace(/[^a-z0-9-]/gi,'-');
  const patterns={
    calculus:/deriv|differentiat|integral|calculus|matematisk analys|produktregel|product rule/,
    chemical:/chemical|chemistry|kemisk|reaktion|reaction|molecule|molekyl|atom/,
    circuits:/circuit|krets|voltage|spanning|strom|current|resistan|ohm|kirchhoff/,
    traffic:/traffic|trafik|flow|flode|junction|knutpunkt|network|natverk/,
    interpolation:/polynomial|polynom|interpol|curve|kurva|parabol|pass.*point|genom.*punkt/,
    elementary:/elementary|elementar|row operation|radoperation/,
    inverse:/inverse|invers|invertib|inverterbar|singular|⁻¹/,
    transformations:/transformation|avbildning|rotation|reflection|spegling|projection|projektion/,
    composition:/composition|sammansatt|sammansattning|successive|efter varandra/,
    symmetry:/symmetric|symmetri|triangular|triangular|diagonal/,
    matrices:/matrix|matris|transpose|transpon|trace|spar|multiplication|multiplikation/,
    systems:/equation|ekvation|gauss|system|eliminat/,
    leontief:/leontief|input.output|consumption|konsumtion|production|produktion/,
    cross:/cross.product|kryssprodukt|vector.product|vektorprodukt|right.hand|hogerhands/,
    dot:/dot.product|scalar.product|skalarprodukt|projection|projektion/,
    unitVectors:/unit.vector|enhetsvektor/,
    components:/component|komponent|trigon|cosine|cosinus|sine|sinus/,
    estimates:/estimat|uppskatt|order.of.magnitude|storleksordning|fermi/,
    uncertainty:/uncertainty|osakerhet|significant|vardesiffr|precision|noggrannhet/,
    units:/unit|enhet|convert|omvandl|dimension|prefix|density|densitet/
  };
  function topicIds(subject,topic,context={}){
    const words=normal([context.title,context.prompt].join(' '));
    if(subject==='math'){
      if(topic!=='review')return [topic];
      if(patterns.calculus.test(words))return ['calculus'];
      if(patterns.leontief.test(words))return ['1.11'];
      if(patterns.chemical.test(words)||patterns.circuits.test(words)||patterns.traffic.test(words)||patterns.interpolation.test(words))return ['1.10'];
      if(patterns.composition.test(words))return ['1.9'];
      if(patterns.transformations.test(words))return ['1.8','1.9'];
      if(patterns.elementary.test(words))return ['1.5','1.2'];
      if(patterns.inverse.test(words))return ['1.4','1.6'];
      if(patterns.symmetry.test(words))return ['1.7'];
      if(patterns.matrices.test(words))return ['1.3'];
      return ['1.1','1.2'];
    }
    if(topic==='precision')return patterns.uncertainty.test(words)?['uncertainty']:patterns.estimates.test(words)?['estimates']:['uncertainty','estimates'];
    if(topic==='products'){
      const cross=patterns.cross.test(words),dot=patterns.dot.test(words);
      return cross&&!dot?['cross']:dot&&!cross?['dot']:['dot','cross'];
    }
    if(topic==='vectors')return patterns.unitVectors.test(words)?['unit']:patterns.components.test(words)?['components','arrows']:['arrows','components'];
    if(topic==='reasoning')return ['nature','method'];
    return [topic];
  }
  function select(subject,topic,language='en',context={}){
    const data=root.StudyVideoData?.[subject];if(!data)return [];
    const wanted=topicIds(subject,topic,context),words=normal([context.title,context.prompt].join(' '));
    let candidates=data.videos.filter(v=>v.topics.some(id=>wanted.includes(id)));
    if(subject==='math'&&patterns.calculus.test(words)){
      const extra=data.videos.filter(v=>v.topics.includes('calculus'));
      candidates=[...new Map([...extra,...candidates].map(v=>[v.id,v])).values()];
    }
    const matchingTags=Object.keys(patterns).filter(tag=>patterns[tag].test(words));
    const rank=v=>(v.tags||[]).filter(tag=>matchingTags.includes(tag)).length*20+(v.language===language?5:0)+(v.kind==='foundation'?2:0);
    return candidates.map((v,index)=>({v,index,rank:rank(v)})).sort((a,b)=>b.rank-a.rank||a.index-b.index).map(x=>x.v);
  }
  function card(video,language){
    let url;try{url=new URL(video.url);if(url.protocol!=='https:')return '';}catch{return '';}
    const name=text(video.title,language),spoken=video.language==='sv'?tr(language,'Swedish','Svenska'):tr(language,'English','Engelska');
    const platform=/youtube\.com$|youtu\.be$/.test(url.hostname)?'YouTube':tr(language,'Teaching website','Undervisningssida');
    return '<li class="study-video-card" data-video-id="'+esc(video.id)+'"><a class="study-video-link" href="'+esc(video.url)+'" target="_blank" rel="noopener noreferrer" title="'+esc(video.originalTitle||name)+'"><span>'+esc(name)+'</span><span aria-hidden="true">↗</span><span class="study-video-sr">'+tr(language,' (opens in a new tab)',' (öppnas i en ny flik)')+'</span></a><p class="study-video-meta"><span class="study-video-language">'+spoken+'</span><span>'+esc(video.creator)+'</span><span>'+platform+'</span></p><p class="study-video-description">'+esc(text(video.reason,language))+'</p></li>';
  }
  function render(subject,topic,language='en',context={}){
    const videos=select(subject,topic,language,context);if(!videos.length)return '';
    const target=topicIds(subject,topic,context)[0],key=[subject,topic,context.id||'topic'].join(':');
    const chosen=videos.slice(0,3),preferred=videos.find(v=>v.language===language),hasPreferred=!!preferred;
    if(preferred&&!chosen.some(v=>v.language===language))chosen[chosen.length-1]=preferred;
    return '<details class="study-video-help" data-video-key="'+esc(key)+'"><summary>'+tr(language,'Need another explanation? Watch a video','Behöver du en annan förklaring? Se en video')+'</summary><p class="study-video-tip">'+tr(language,'Watch the relevant method, pause and try a step yourself, then return to this exercise. These videos explain the topic; they are not recordings of this exact book solution.','Se metoden, pausa och prova ett steg själv. Återvänd sedan till uppgiften. Videorna förklarar området och visar inte nödvändigtvis just denna bokuppgift.')+'</p>'+(!hasPreferred?'<p class="study-video-fallback">'+tr(language,'The available videos for this topic are in Swedish.','Videorna som finns här för detta område är på engelska.')+'</p>':'')+'<ul class="study-video-list">'+chosen.map(v=>card(v,language)).join('')+'</ul><a class="study-video-more" href="#'+anchor(subject,target)+'">'+tr(language,'See all videos for this topic','Se alla videor för detta område')+' →</a></details>';
  }
  function renderLibrary(subject,language='en'){
    const data=root.StudyVideoData?.[subject];if(!data)return '';
    return '<p class="kicker">'+tr(language,'WATCH · PAUSE · TRY AGAIN','TITTA · PAUSA · PROVA IGEN')+'</p><h2 tabindex="-1">'+tr(language,'A video when you need it','En video när du behöver den')+'</h2><p>'+tr(language,'Choose the topic you want to repeat. Start with the idea, then watch a worked method and return to your own question. The badge shows the video’s spoken language; changing this page’s language does not translate the video.','Välj området du vill repetera. Börja med grundidén, se hur metoden används och återvänd till din egen uppgift. Märkningen visar videons talade språk. Sidans språkval översätter inte själva videon.')+'</p><div class="study-video-library">'+data.topics.map(topic=>{
      const videos=select(subject,topic.id,language);
      return '<details class="study-video-topic" data-video-key="library-'+subject+'-'+topic.id+'"><summary id="'+anchor(subject,topic.id)+'"><span>'+esc(topic.id==='calculus'?tr(language,'Prerequisite','Förkunskap'):subject==='math'?topic.id:topic.section)+'</span> '+esc(text(topic.title,language))+'</summary><ul class="study-video-list">'+videos.map(v=>card(v,language)).join('')+'</ul></details>';
    }).join('')+'</div><p class="caption study-video-note">'+tr(language,'Links and publisher descriptions checked on 7 November 2026. Videos open on the creator’s site or YouTube in a new tab. External availability can change.','Länkar och utgivarnas beskrivningar kontrollerades den 7 november 2026. Videorna öppnas på utgivarens webbplats eller YouTube i en ny flik. Tillgängligheten kan ändras.')+'</p>';
  }
  if(typeof document!=='undefined')document.addEventListener('click',event=>{
    const link=event.target.closest?.('.study-video-more');if(!link)return;
    const summary=document.getElementById(link.hash.slice(1));if(!summary)return;
    summary.parentElement.open=true;summary.focus({preventScroll:true});
  });
  root.StudyVideos={render,renderLibrary,select,topicIds};
})(globalThis);
