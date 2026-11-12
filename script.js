// checkboxes + progress
  const KEY='poe330_act1';
  const state=JSON.parse(localStorage.getItem(KEY)||'{}');
  const boxes=[...document.querySelectorAll('input[type="checkbox"]')];
  boxes.forEach(b=>{
    if(state[b.id]) b.checked=true;
    b.addEventListener('change',()=>{
      state[b.id]=b.checked;
      localStorage.setItem(KEY,JSON.stringify(state));
      updateProgress();
    });
  });
  function updateProgress(){
    const done=boxes.filter(b=>b.checked).length;
    document.getElementById('progress').textContent=done+' / '+boxes.length;
  }
  updateProgress();

  // dark theme
  const savedTheme=localStorage.getItem('poe330_theme');
  if(savedTheme) document.documentElement.dataset.theme=savedTheme;
  document.getElementById('themeBtn').addEventListener('click',()=>{
    const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
    if(next==='light'){delete document.documentElement.dataset.theme; localStorage.removeItem('poe330_theme');}
    else{document.documentElement.dataset.theme='dark'; localStorage.setItem('poe330_theme','dark');}
  });


 // Highlight the navigation item for the section currently in view.
const navLinks=[...document.querySelectorAll('.nav-link')];
const navSections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);

// Triangle appears only on the clicked navigation item.
navLinks.forEach(link=>link.addEventListener('click',()=>{
  navLinks.forEach(item=>item.classList.remove('clicked'));
  link.classList.add('clicked');
}));

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
    if(!visible.length) return;
    const currentId=visible[0].target.id;
   navLinks.forEach(link=>{
  const active=link.getAttribute('href')==='#'+currentId;

  link.classList.toggle('active',active);
  link.classList.toggle('clicked',active);

  if(active && window.matchMedia('(max-width: 760px)').matches){
    link.scrollIntoView({block:'nearest',inline:'nearest'});
  }
});
  },{rootMargin:'-18% 0px -65% 0px',threshold:[0,0.1,0.25,0.5]});
  navSections.forEach(section=>observer.observe(section));
}
async function copyRegex(button){
  const regex = button.closest('.regex-card').querySelector('code').textContent;

  try{
    await navigator.clipboard.writeText(regex);

    button.textContent='Copied!';
    button.classList.add('copied');

    clearTimeout(button.feedbackTimer);
    button.feedbackTimer=setTimeout(()=>{
      button.textContent='Copy';
      button.classList.remove('copied');
    },1200);

  }catch(error){
    button.textContent='Failed';

    setTimeout(()=>{
      button.textContent='Copy';
    },1200);
  }
}
