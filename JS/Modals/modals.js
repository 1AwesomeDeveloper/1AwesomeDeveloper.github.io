window.onload = () => {
  checkProfile('../Login/Login.html')
  getDrones()
}

function getDrones() {
  axios({
    method: 'get',
    url: 'https://drone-management-api-ankit1998.herokuapp.com/drone/viewModals',
    headers: {
      auth: localStorage.getItem('DronePointdeveloperPermanentToken')
    }
  }).then(response => {
    console.log(response)
    const cards = document.getElementById('modalCards')
    response.data.modals.forEach(modal => {
      cards.innerHTML += `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="data:image/png;base64, ${modal.RPASModelPhoto}" alt="Drone" style="width:300px;height:300px;">
          </div>
          <div class="flip-card-back">
          <h1>${modal.modalName}</h1>
            <p>Modal Number <br>${modal.modalNumber}</p>
            <p>Wing Type<br>${modal.wingType}</br></p>
            <button class="view" onclick="openModal('id${modal._id}')">View</button>
          </div>
          </div>
        </div>`
    });

    addModals(response.data.modals)

  }).catch(e => {
    errormsg('Something went wrong Please refresh or login agian !!!')
    console.log(e.response)
  })
}

//modal popup
function openModal(id) {
  document.getElementById(id).style.width = "100%";
}

function closeModal(id) {
  document.getElementById(id).style.width = "0%";
}


function addModals(array) {
  const fullview = document.getElementById('fullview')
  array.forEach(modal => {
    fullview.innerHTML += `
      <div id="id${modal._id}" class="overlay">
        <a href="javascript:void(0)" class="closebtn" onclick="closeModal('id${modal._id}')">&times;</a>
        <div>
          <div class="overlay-content">
            <div>
              <img src="data:image/png;base64, ${modal.RPASModelPhoto}" alt="Drone" style="width:400px;height:400px;" class="modalImage">
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>Modal Name</td>
                    <td>${modal.modalName}</td>
                  </tr>
                  <tr>
                    <td>Modal Number</td>
                    <td id="modalNo">${modal.modalNumber}</td>
                  </tr>
                  <tr>
                    <td>Wing Type</td>
                    <td>${modal.wingType}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>${modal.droneCategoryType}</td>
                  </tr>
                  <tr>
                    <td>Fuel Capacity</td>
                    <td>${modal.fuelCapacity}</td>
                  </tr>
                  <tr>
                    <td>Propeller Details</td>
                    <td>${modal.propellerDetails}</td>
                  </tr>
                  <tr>
                    <td>Max Take Off Weight</td>
                    <td>${modal.maxTakeOffWeight}</td>
                  </tr>
                  <tr>
                    <td>Max Height Attainable</td>
                    <td>${modal.maxHeightAttainable}</td>
                  </tr>
                  <tr>
                    <td>Compatible Payload</td>
                    <td>${modal.compatiblePayload}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="content">
          <hr>
          <div>
            <h1>Purpose Of Operation</h1>
          </div>
          <div>
            <p>
              ${modal.purposeOfOperation}
            </p>
          </div>
          <hr>

          <div class="grid3">
            <div>
              <div>Engine Type</div>
              <div>${modal.engineType}</div>
            </div>

            <div>
              <div>Engine Power</div>
              <div>${modal.enginePower}</div>
            </div>

            <div>
              <div>Engine Count</div>
              <div>${modal.engineCount}</div>
            </div>

            <div>
              <div>Max Endurance</div>
              <div>${modal.maxEndurance}</div>
            </div>

            <div>
              <div>Max Range</div>
              <div>${modal.maxRange}</div>
            </div>

            <div>
              <div>Max Speed</div>
              <div>${modal.maxSpeed}</div>
            </div>

            <div>
              <div>Length</div>
              <div>${modal.length}</div>
            </div>

            <div>
              <div>Breadth</div>
              <div>${modal.breadth}</div>
            </div>

            <div>
              <div>Height</div>
              <div>${modal.height}</div>
            </div>
          </div>
        </div>
        <hr>


        <div class="btn">
          <button onclick="deleteModal('${modal._id}')" class="delete">Delete Modal</button>
          <button onclick="firmware('${modal._id}')" class="view">Upload/Download Firmware</button>
        </div>
        
        <hr>
      </div>
      `
  })
  unloading()
}

function deleteModal(_id) {
  loading()
  warnmsg('Your Drone is being Delete Please don"t refresh or close')
  closeModal(`id${_id}`)
  axios({
    method: 'delete',
    url: `https://drone-management-api-ankit1998.herokuapp.com/drone/removeModal/${_id}`,
    headers: {
      auth: localStorage.getItem('DronePointdeveloperPermanentToken')
    }
  }).then(response => {
    if (response.data.error)
      throw new Error()
    document.getElementById(`id${_id}`).innerHTML = ''
    successmsg(response.data.message + ` Please refresh page to see changes.`)
    console.log(response)
  }).catch(e => {
    console.log(e)
    console.log(e.response)
  })
}

function firmware(id) {
  localStorage.setItem('dmodalId', id)
  localStorage.setItem('modalNo', document.getElementById('modalNo').innerHTML)
  window.location.href = './Firmware/firmware.html'
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