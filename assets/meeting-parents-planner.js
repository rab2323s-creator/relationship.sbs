(function(){'use strict';
var form=document.getElementById('mpPlanner'),output=document.getElementById('mpResult'),copy=document.getElementById('mpCopy');if(!form||!output||!copy)return;
var current='';
function p(venue,tone,food,time){
var items=['Confirm names, preferred greetings, and the exact time with your partner.','Agree on one discreet check-in signal and a respectful exit plan.','Choose two conversation topics and one genuine follow-up; skip interview-style questioning.'];
if(venue==='home')items.push('Ask about shoes, household customs and whether the host wants help; thank them for having you.');
if(venue==='restaurant')items.push('Confirm the reservation, payment expectations and dietary needs before the meal.');
if(venue==='video')items.push('Check time zones, audio, camera framing and who will be on the call.');
if(venue==='outside')items.push('Check the weather, walking conditions, accessibility and a backup meeting point.');
if(tone==='formal')items.push('Ask your partner about dress and honorifics; choose comfortable, occasion-appropriate clothes.');
if(tone==='casual')items.push('Keep clothes simple and comfortable; be ready for an informal conversation.');
if(tone==='unsure')items.push('Ask your partner one direct question: “Is this a relaxed visit or a more formal introduction?”');
if(food==='yes'&&venue==='home')items.push('If a host gift fits the occasion, bring one modest food item that meets confirmed dietary needs.');
else if(food==='no')items.push('Skip food and alcohol gifts; choose a warm greeting, a note or no gift.');
else if(food==='unknown')items.push('Do not guess about allergies or alcohol; check with your partner before bringing anything edible.');
if(time==='short')items.push('Pick one easy topic and finish graciously at the planned time.');
if(time==='medium')items.push('Make space for the conversation to settle; offer help once if appropriate.');
if(time==='long')items.push('Plan hydration, breaks and transport; agree beforehand when you will leave.');
items.push('Thank your hosts afterward; avoid reading a single awkward moment as a verdict.');
return items;
}
function render(items){
output.textContent='';var h=document.createElement('h3');h.textContent='Your first-meeting plan';output.appendChild(h);var ul=document.createElement('ul');items.forEach(function(item){var li=document.createElement('li');li.textContent=item;ul.appendChild(li)});output.appendChild(ul);current=items.map(function(x,i){return(i+1)+'. '+x}).join('\n');copy.textContent='Copy plan';
}
form.addEventListener('submit',function(e){e.preventDefault();render(p(form.elements.venue.value,form.elements.tone.value,form.elements.food.value,form.elements.time.value));});
copy.addEventListener('click',function(){if(!current){render(p(form.elements.venue.value,form.elements.tone.value,form.elements.food.value,form.elements.time.value));}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(current).then(function(){copy.textContent='Copied';},function(){copy.textContent='Select the plan to copy';});}else{copy.textContent='Select the plan to copy';}});
})();