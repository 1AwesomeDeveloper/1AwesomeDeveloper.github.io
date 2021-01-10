window.onload = ()=>{
    successmsg('It will take a minute to load modals for selection')
    getModals()
}

function getModals(){
    axios({
        method:'get',
        url:'https://drone-management-api-ankit1998.herokuapp.com/drone/modals',
        headers:{
            auth:localStorage.getItem(`DronePointdeveloperPermanentToken`)
        }
    }).then(response =>{
        console.log(response.data)
        const select = document.getElementById('modalSelect')
        response.data.modalNames.forEach(modal =>{
            select.innerHTML += `<option value="${modal.modalName}">${modal.modalName}</option>`
        })
    }).catch(e=>{
        console.log(e)
        console.log(e.response)
        errormsg('Somthing went wrong refresh or try login agian')
    })
}


function registerreq(){
  
    const From = document.getElementById('Form')
    var x = Form.elements.length;
    
    const body = {}
    for(let i =0;i < x;i++){
        if(!Form.elements[i] || Form.elements[i].value == ""){
          console.log(Form.elements[i].name)
          errormsg('Please fill all the feilds.')
          return 0
        }
        let key = Form.elements[i].name
        body[key] = Form.elements[i].value
    }

    console.log(body)
    const valid = ValidateEmail(body.assignedTo)
    if(!valid){
        errormsg('Please prorive valid email of coustmer')
        return 0
    }
    
    loading()
    axios({
      method:'post',
      url:'https://drone-management-api-ankit1998.herokuapp.com/drone/droneRegestration',
      headers:{
        auth:localStorage.getItem(`DronePointdeveloperPermanentToken`),
      },
      data: body
    }).then(response =>{
      console.log(response)
      if(response.data.error){
        unloading()
        errormsg(response.data.error.message)
        return 0
      }
  
      successmsg(response.data.message + '. Dont Press back of refresh you will be redirected')
      setTimeout(() => {
        window.location.replace('./../Drones.html')
      }, 2000);
    })
    .catch(e =>{
      console.log(e)
      console.log(e.response)
      unloading()
      errormsg(e.response.data.error.message||"Something went wrong refresh, login agian and check your info")
    })
  
  }







  function ValidateEmail(mail) 
  {
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
      return (true)
    }
      return (false)
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
  }
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
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
