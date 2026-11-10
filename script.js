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
