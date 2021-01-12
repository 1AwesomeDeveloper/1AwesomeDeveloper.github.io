const myStorage = window.sessionStorage;

function registerreq(){
  const formData = new FormData()
  const From = document.getElementById('Form')
  var x = Form.elements.length;
  //const formData = new FormData
  
  for(let i =0;i < x;i++){
    console.log(Form.elements[i].name)
      if(!Form.elements[i] || Form.elements[i].value == ""){
        console.log(Form.elements[i].value)
        errormsg('Please fill all the feilds.')
        return 0
      }

      if(From.elements[i].name == 'imagePic'){
        console.log(Form.elements[i].files[0])
        formData.append('imagePic', Form.elements[i].files[0])
        continue
      }

      formData.append(Form.elements[i].name, Form.elements[i].value) 
  }
  
  loading()
  axios({
    method:'post',
    url:'http://localhost:3000/drone/modalRegestration',
    headers:{
      auth:myStorage.getItem(`DronePointdeveloperPermanentToken`),
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  }).then(response =>{
    console.log(response)
    if(response.data.error){
      unloading()
      errormsg(response.data.error.message)
      return 0
    }
    document.getElementById('Form').reset()
    unloading()
    successmsg(response.data.message)
  })
  .catch(e =>{
    console.log(e)
    console.log(e.response)
    unloading()
    errormsg('Something went Wrong regresh and try agian.')
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

function loading(){
  document.getElementById('regForm').style.display = 'none'
  document.getElementById('loader').style.display = 'block'
}

function unloading(){
  document.getElementById('regForm').style.display = 'block'
  document.getElementById('loader').style.display = 'none'
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