(function () {
  "use strict";
  var form=document.getElementById("aaExploreForm");
  var result=document.getElementById("aaResult");
  var copy=document.getElementById("aaCopy");
  var reset=document.getElementById("aaReset");
  if(!form||!result||!copy||!reset)return;
  var data={
    romantic:{title:"Romantic attraction",question:"Am I drawn to this person in a way that I understand as romantic, or do I want a different form of closeness?",self:"I am still exploring what romantic attraction means to me.",conversation:"I want us to talk about what each of us means by romance, rather than guessing from our actions.",support:"What does romantic attraction mean to you, if that word feels useful?",note:"Wanting a partner and feeling romantic attraction are related questions, not identical ones."},
    sexual:{title:"Sexual attraction",question:"Am I experiencing attraction toward this person, or noticing beauty, closeness, curiosity, or something else?",self:"I want space to understand how sexual attraction, if any, shows up for me.",conversation:"I want to be clear about what I feel and what I don't; attraction is not a promise of any activity.",support:"Would you like to talk about what kinds of attraction you experience, without my assumptions?",note:"Sexual attraction is distinct from libido, arousal, and sexual behavior."},
    libido:{title:"Libido and desire",question:"Am I noticing a general sexual drive, rather than attraction to a particular person?",self:"My level of desire doesn't, by itself, tell me what identity word fits.",conversation:"I'd like to describe my desire and comfort without assuming that it defines my orientation.",support:"You can describe desire separately from who you feel drawn to.",note:"Changes in libido, behavior or health do not automatically establish an orientation."},
    behavior:{title:"Choices and actions",question:"What activity, if any, do I freely want, independently of labels and expectations?",self:"What I do or don't do is my decision, not proof of an identity.",conversation:"I want us to agree on what each of us actually wants to do—not what we think a label requires.",support:"Your choices do not have to prove anything about your identity.",note:"Going on dates or having sex is behavior. Consent can be changed or withdrawn."},
    partner:{title:"Relationship hopes",question:"What kind of closeness, commitment or independence would I choose if nobody expected romance or sex?",self:"I can value partnership, friendship, chosen family or independence on my own terms.",conversation:"Can we describe the kind of relationship we each want before deciding what to call it?",support:"What kind of connection would you like, if any?",note:"Relationship structure does not diagnose romantic or sexual attraction."},
    boundary:{title:"Consent and boundaries",question:"Which parts are genuinely wanted, and which would feel like performing for someone else?",self:"I can say yes, no, or not now without having to explain my identity.",conversation:"I care about your needs, and I want any agreement to be freely chosen by both of us.",support:"What boundaries would help you feel respected?",note:"Consent must be freely given and can be withdrawn. Identity never removes that requirement."}
  };
  var currentSentence="";
  function render() {
    var topic=form.elements.topic.value;
    var setting=form.elements.setting.value;
    var item=data[topic]||data.romantic;
    var sentence=item[setting]||item.self;
    result.textContent="";
    var heading=document.createElement("h3");heading.textContent=item.title;
    var p1=document.createElement("p");var b1=document.createElement("strong");
    b1.textContent="Question to consider: ";p1.appendChild(b1);p1.appendChild(document.createTextNode(item.question));
    var p2=document.createElement("p");var b2=document.createElement("strong");
    b2.textContent="Words you can adapt: ";p2.appendChild(b2);p2.appendChild(document.createTextNode(sentence));
    var p3=document.createElement("p");p3.className="aa-small";p3.textContent=item.note+" This is a reflection prompt, not a label or test result.";
    result.appendChild(heading);result.appendChild(p1);result.appendChild(p2);result.appendChild(p3);
    currentSentence=sentence;
    copy.textContent="Copy conversation sentence";
  }
  form.addEventListener("submit",function(event){event.preventDefault();render();});
  copy.addEventListener("click",function(){
    if(!currentSentence)render();
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(currentSentence).then(function(){copy.textContent="Copied";},function(){fallback();});
    }else fallback();
  });
  function fallback(){
    var old=result.querySelector(".aa-copy-fallback");
    if(old)old.remove();
    var field=document.createElement("textarea");
    field.className="aa-copy-fallback";field.setAttribute("readonly","");
    field.setAttribute("aria-label","Select and copy this conversation sentence");
    field.value=currentSentence;field.rows=3;
    result.appendChild(field);field.focus();field.select();
    copy.textContent="Select the text and copy";
  }
  reset.addEventListener("click",function(){
    form.reset();currentSentence="";copy.textContent="Copy conversation sentence";
    result.textContent="";
    var h=document.createElement("h3");h.textContent="Start with one distinction";
    var p=document.createElement("p");p.textContent="Choose a topic and select “Show reflection prompts.” Your choices remain on this page.";
    result.appendChild(h);result.appendChild(p);
  });
})();