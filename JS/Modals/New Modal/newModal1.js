
function registerreq(){
  
  const From = document.getElementById('Form')
  var x = Form.elements.length;
  const formData = new FormData
  for(let i =1;i < x;i++){
      if(!Form.elements[i] || Form.elements[i].value == ""){
        console.log(Form.elements[i].value)
        errormsg('Please fill all the feilds.')
        scrollToTop()
        return 0
      }
      if(Form.elements[i].name == 'imagePic'){
        formData.append(Form.elements[i].name, Form.elements[i].files[0])
        continue
      }
      formData.append(Form.elements[i].name, Form.elements[i].value) 
  }
  formData.append('hello', 'world')
  console.log(formData)
  
  axios({
    method:'post',
    headers:{
      auth:myStorage.getItem(`DronePointdeveloperPermanentToken`),
      
    }
  })


}














function errormsg(msg){
  scrollToTop()
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'red'
  document.getElementById('errormsg').innerHTML = msg
}

function successmsg(msg){
  scrollToTop()
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'green'
  document.getElementById('errormsg').innerHTML = msg
}

//scrop on top when error
function scrollToTop() {
  // if(document.getElementById('top').scrollHeight < document.getElementById('top').clientHeight)
  //     return 0

  var position =
      document.body.scrollTop || document.documentElement.scrollTop;
  if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
      scrollAnimation = setTimeout("scrollToTop()", 30);
  }
}





//theme changer
const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  
  const theme = myStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        myStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = myStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    myStorage.setItem('theme', next);
  }
  
  document.getElementById('themeButton').onclick = toggleTheme;

  const inputs = document.querySelectorAll('input');

inputs.forEach(el => {
  el.addEventListener('blur', e => {
    if(e.target.value) {
      e.target.classList.add('dirty');
    } else {
      e.target.classList.remove('dirty');
    }
  })
})