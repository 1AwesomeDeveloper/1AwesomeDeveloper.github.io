window.onload = () => {
  checkProfile('../Login/Login.html')
  getProfile()
}

function getProfile() {
  axios({
    method: 'get',
    url: `https://drone-management-api-ankit1998.herokuapp.com/developer/profile`,
    headers: {
      auth: localStorage.getItem('DronePointdeveloperPermanentToken')
    }
  }).then(response => {
    console.log(response)
    if (response.status == 200) {
      document.getElementById('welcome').innerHTML = `Welcome ${response.data.name}, Good to see you back`
      document.getElementById('email').innerHTML = response.data.email
      document.getElementById('name').innerHTML = response.data.name
      document.getElementById('mobile').innerHTML = response.data.mobile
    }
    unloading()
  }).catch(e => {
    console.log(e)
    console.error(e.response);
    errormsg('Something went wrong Please refresh or login agian')
  })
}

function deleteAcc() {
  warnmsg('Please wait we are deleting your account.')
  loading()
  axios({
    method: 'delete',
    url: `https://drone-management-api-ankit1998.herokuapp.com/developer//deleteAccount`,
    headers: {
      auth: localStorage.getItem('DronePointdeveloperPermanentToken')
    }
  }).then(response => {
    console.log(response)
    localStorage.removeItem('DronePointdeveloperPermanentToken')
    successmsg(response.data.message + '. Please dont press back or refresh you will be redirected.')
    setTimeout(() => {
      window.location.replace('../Login/Login.html')
    }, 5000);
  }).catch(e => {
    console.log(e)
    console.error(e.response);
    errormsg('Something went wrong Please refresh or login agian')
  })
}



function successmsg(msg) {
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'green'
  document.getElementById('errormsg').innerHTML = msg
}

function errormsg(msg) {
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'red'
  document.getElementById('errormsg').innerHTML = msg
}

function warnmsg(msg) {
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'yellow'
  document.getElementById('errormsg').innerHTML = msg
}

function loading() {
  document.getElementById('loading').style.display = 'block'
  document.getElementById('content').style.display = 'none'
}

function unloading() {
  document.getElementById('loading').style.display = 'none'
  document.getElementById('content').style.display = 'flex'
}