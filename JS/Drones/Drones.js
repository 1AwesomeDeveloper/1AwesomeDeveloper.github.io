window.onload = () => {
  checkProfile("../Login/Login.html")
  getDrones()
}

function getDrones() {
  axios({
    method: 'get',
    url: 'https://drone-management-api-ankit1998.herokuapp.com/drone/viewDrones',
    headers: {
      auth: localStorage.getItem('DronePointdeveloperPermanentToken')
    }
  }).then(response => {
    console.log(response)
    const list = document.getElementById('droneList')
    response.data.forEach(drone => {
      list.innerHTML += `
            <li class="table-row">
                <div class="col col-1" data-label="View"><button onclick="view('${drone._id}')">View</button></div>
                <div class="col col-2" data-label="Drone No.">${drone.droneNo}</div>
                <div class="col col-3" data-label="Modal">${drone.modal}</div>
                <div class="col col-4" data-label="Assigned To">${drone.assignedTo}</div>
            </li>
            `
    })
    unloading()
  }).catch(e => {
    console.log(e)
    console.log(e.response)
    errormsg('Something went wrong refresh or login again')
  })
}

function view(id) {
  localStorage.setItem('dpdroneId', id)
  window.location.href = "./viewDrone/view.html"
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
  document.getElementById('content').style.display = 'block'
}