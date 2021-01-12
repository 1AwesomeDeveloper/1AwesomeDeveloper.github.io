const myStorage = window.sessionStorage

function logout(home){
    warnmsg('Please wait we are loging you out.')
    loading()
    axios({
      method:'get',
      url:`https://drone-management-api-ankit1998.herokuapp.com/developer/logout`,
      headers:{
        auth:myStorage.getItem('DronePointdeveloperPermanentToken')
      }
    }).then(response =>{
        console.log(response)
        myStorage.removeItem('DronePointdeveloperPermanentToken')
        successmsg(response.data.message + '. Please dont press back or refresh you will be redirected.')
        setTimeout(() => {
          window.location.replace(home)
        }, 1000);
    }).catch(e =>{
        console.log(e)
        console.error(e.response);
        errormsg('Something went wrong Please refresh or login agian')
    })
  }

  function checkProfile(home){
    axios({
        method:'get',
        url:`https://drone-management-api-ankit1998.herokuapp.com/developer/profile`,
        headers:{
          auth:myStorage.getItem('DronePointdeveloperPermanentToken')
        }
      }).then(response =>{
          if(response.data.error)
            throw new Error()
      }).catch(e =>{
          console.log(e)
          console.error(e.response);
          errormsg('You are loged out. we are redirecting you to login page')
          setTimeout(() => {
            window.location.replace(home)
          }, 1000);
      })
  }

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