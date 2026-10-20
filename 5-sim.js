'use strict';
(function(){
var $=function(s){return document.querySelector(s)},BANK=window.SIMBANK||[],key='linux-learning-interview-v1';
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
var theme='dark';try{var st=JSON.parse(localStorage.getItem(key)||'{}');if(st.theme==='light')theme='light'}catch(e){}
function applyTheme(){document.body.classList.toggle('light',theme==='light');$('#themeBtn').textContent=theme==='light'?'Dark mode':'Light mode'}
$('#themeBtn').addEventListener('click',function(){theme=theme==='dark'?'light':'dark';applyTheme();try{var s=JSON.parse(localStorage.getItem(key)||'{}');s.theme=theme;localStorage.setItem(key,JSON.stringify(s))}catch(e){}});applyTheme();
var CORE=['Basics','Shell','Files','Permissions','Processes','Services','Networking','Storage','Packages','Security','Logs','Boot','Scheduling','Text','Troubleshooting','Identity'];
var topics=[...new Set(BANK.map(function(b){return b.t}))].sort(),sel=new Set(CORE.filter(function(t){return topics.indexOf(t)>=0}));
function stem(w){return w.replace(/(ing|ed|es|s)$/,'')}
function tok(t){return (t.toLowerCase().match(/[a-z][a-z0-9_\-\/.]{1,}/g)||[]).map(function(x){return x.replace(/[.\-\/]+$/,'')})}
function pool(){var lv=$('#level').value;return BANK.filter(function(b){return sel.has(b.t)&&(!lv||b.l===lv)})}
function drawTopics(){var box=$('#topics');box.replaceChildren();topics.forEach(function(t){var n=BANK.filter(function(b){return b.t===t}).length,b=el('button',null,t+' ('+n+')');b.type='button';b.setAttribute('aria-pressed',sel.has(t));b.addEventListener('click',function(){if(sel.has(t))sel.delete(t);else sel.add(t);drawTopics()});box.append(b)});
  var n=pool().length;$('#avail').textContent=n+' questions available with this selection.';$('#start').disabled=n<1}
$('#allT').addEventListener('click',function(){sel=new Set(topics);drawTopics()});$('#noneT').addEventListener('click',function(){sel=new Set();drawTopics()});$('#coreT').addEventListener('click',function(){sel=new Set(CORE.filter(function(t){return topics.indexOf(t)>=0}));drawTopics()});$('#level').addEventListener('change',drawTopics);
var Q=[],idx=0,results=[],timerId=null,left=0,mode='type',rec=null,recOn=false;
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
function show(id){['setup','run','done'].forEach(function(s){$('#'+s).hidden=s!==id});window.scrollTo({top:0,behavior:'smooth'})}
function startRun(list){Q=list;idx=0;results=[];mode=$('#mode').value;show('run');ask()}
function fmtT(s){return Math.floor(s/60)+':'+(s%60<10?'0':'')+(s%60)}
function ask(){var q=Q[idx];$('#prog').textContent='Question '+(idx+1)+' of '+Q.length;$('#topic').textContent=q.t;$('#question').textContent=q.q;$('#ans').value='';$('#ans').disabled=false;$('#fb').hidden=true;$('#submit').hidden=false;$('#skip').hidden=false;$('#micstat').textContent='';
  $('#mic').hidden=mode!=='speak'||!(window.SpeechRecognition||window.webkitSpeechRecognition);if(mode==='speak'&&$('#mic').hidden)$('#micstat').textContent='Speech input is not supported in this browser. Please type your answer.';
  clearInterval(timerId);var secs=+$('#secs').value;if(secs){left=secs;$('#timer').textContent=fmtT(left);$('#timer').classList.remove('low');timerId=setInterval(function(){left--;$('#timer').textContent=fmtT(Math.max(left,0));$('#timer').classList.toggle('low',left<=15);if(left<=0){clearInterval(timerId);submit(true)}},1000)}else $('#timer').textContent='';
  $('#ans').focus()}
function score(q,text){var words=new Set(tok(text).map(stem)),hit=[],miss=[];q.k.forEach(function(k){var ks=stem(k.toLowerCase());var ok=words.has(ks)||text.toLowerCase().indexOf(k.toLowerCase())>=0;(ok?hit:miss).push(k)});
  var n=(text.match(/\S+/g)||[]).length,pct=Math.round(hit.length/q.k.length*100);return {pct:pct,hit:hit,miss:miss,words:n}}
function verdictFor(p,w){if(w<5)return 'Too short to judge. Say a full answer in 2 to 4 sentences.';return p>=70?'Strong. You covered most key terms.':p>=40?'Partial. Add the missing terms if they fit your answer.':'Needs work. Read the model answer and try again later.'}
function submit(auto){clearInterval(timerId);stopRec();var q=Q[idx],text=$('#ans').value.trim(),r=score(q,text);if(!text){r.pct=0;r.hit=[];r.miss=q.k.slice()}r.skipped=!text;r.q=q;results.push(r);
  $('#ans').disabled=true;$('#submit').hidden=true;$('#skip').hidden=true;$('#mic').hidden=true;$('#fb').hidden=false;
  $('#sc').textContent=r.pct+'%';$('#verdict').textContent=(auto===true&&!text?'Time is up. ':'')+(text?verdictFor(r.pct,r.words):'No answer given.');
  var h=$('#hit'),m=$('#miss');h.replaceChildren();m.replaceChildren();r.hit.forEach(function(k){h.append(el('span','y',k))});r.miss.forEach(function(k){m.append(el('span','n',k))});if(!r.hit.length)h.append(el('span',null,'none'));if(!r.miss.length)m.append(el('span',null,'none, nice'));
  $('#model').textContent=q.a;$('#ex').textContent=q.e;var a=$('#src');try{var u=new URL(q.s);if(u.protocol==='https:'){a.href=u.href;a.hidden=false}else a.hidden=true}catch(e){a.hidden=true}
  $('#next').textContent=idx+1>=Q.length?'See results →':'Next question →';$('#next').focus()}
$('#submit').addEventListener('click',function(){submit(false)});
$('#skip').addEventListener('click',function(){$('#ans').value='';submit(false)});
$('#next').addEventListener('click',function(){idx++;if(idx>=Q.length)finish();else ask()});
function finish(){clearInterval(timerId);show('done');var avg=Math.round(results.reduce(function(s,r){return s+r.pct},0)/results.length);$('#fscore').textContent=avg+'%';$('#fverdict').textContent=avg>=70?'Interview ready on these topics.':avg>=40?'Getting there. Review the weak topics.':'Keep practicing. Start with the model answers.';
  var ans=results.filter(function(r){return !r.skipped}).length;$('#fstats').textContent=ans+' answered, '+(results.length-ans)+' skipped, '+results.length+' total. Keyword scoring only.';
  var bt={};results.forEach(function(r){var t=r.q.t;(bt[t]=bt[t]||[]).push(r.pct)});var box=$('#bytopic');box.replaceChildren();var weak=[];
  Object.keys(bt).forEach(function(t){var a=Math.round(bt[t].reduce(function(x,y){return x+y},0)/bt[t].length);if(a<50)weak.push(t);var row=el('div','row2');row.append(el('span',null,t+' ('+bt[t].length+')'),el('b',null,a+'%'));var m=el('div','meter'),i=el('i');i.style.width=a+'%';m.append(i);row.append(m);box.append(row)});
  var rv=$('#review');rv.replaceChildren();results.forEach(function(r){var d=el('div','rv');d.append(el('b',null,r.q.q),el('span','hint',r.pct+'% - missed: '+(r.miss.join(', ')||'nothing')));rv.append(d)});
  $('#retryWeak').hidden=!weak.length;$('#retryWeak').onclick=function(){var p=BANK.filter(function(b){return weak.indexOf(b.t)>=0});startRun(shuffle(p).slice(0,Math.min(+$('#count').value,p.length)))}}
$('#again').addEventListener('click',function(){show('setup')});
$('#start').addEventListener('click',function(){var p=pool();if(!p.length)return;startRun(shuffle(p).slice(0,Math.min(+$('#count').value,p.length)))});
function stopRec(){if(rec&&recOn){try{rec.stop()}catch(e){}}recOn=false;$('#mic').textContent='🎤 Speak'}
$('#mic').addEventListener('click',function(){var SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;if(recOn){stopRec();return}
  rec=new SR();rec.lang='en-IN';rec.interimResults=true;rec.continuous=true;var base=$('#ans').value?$('#ans').value+' ':'';
  rec.onresult=function(e){var t='';for(var i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;$('#ans').value=base+t};
  rec.onerror=function(e){$('#micstat').textContent='Mic error: '+e.error+'. You can type instead.';stopRec()};rec.onend=function(){recOn=false;$('#mic').textContent='🎤 Speak'};
  try{rec.start();recOn=true;$('#mic').textContent='⏹ Stop';$('#micstat').textContent='Listening... speak your answer.'}catch(e){$('#micstat').textContent='Could not start the mic.'}});
drawTopics();window.__sim={score:score,BANK:BANK};
})();
