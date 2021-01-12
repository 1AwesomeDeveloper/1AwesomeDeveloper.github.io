let id

window.onload = () => {
  checkProfile('../../Login/Login.html')
  loading()
  document.getElementById('modalNo').innerHTML = 'Modal Number: ' + myStorage.getItem('modalNo')
  id = myStorage.getItem('dmodalId')
  getallFirmware()

  const url = `https://drone-management-api-ankit1998.herokuapp.com/drone/latestFirmwareDownload?id=${id}&token=${myStorage.getItem('DronePointdeveloperPermanentToken')}`
  document.getElementById('downLtf').href = url
}

function upload() {
  const btn = document.getElementById('uploadBtn')
  btn.innerHTML = `<div class="loader small"></div>`

  const form = new FormData()
  const version = document.getElementById('version').value
  if (!version) {
    errormsg('Please enter a valid version of firmware.')
  }
  const file = document.getElementById('firmFile').files[0]
  if (!file) {
    errormsg('Please provide a bin/hex/apj file for upload.')
  }

  form.append('firmFile', file)
  form.append('version', version)
  form.append('id', id)

  axios({
    method: 'post',
    url: `https://drone-management-api-ankit1998.herokuapp.com/drone/uploadFirmware`,
    headers: {
      auth: myStorage.getItem('DronePointdeveloperPermanentToken')
    },
    data: form
  }).then(res => {
    console.log(res)
    if (res.data.error) {
      errormsg(res.data.error.message)
      return 0
    }

    successmsg(res.data.message + ". Refresh to update registry.")
    document.getElementById('version').value = ''
    document.getElementById('firmFile').value = ''
    btn.innerHTML = `<button onclick="upload()" class="uploadbtn">Upload</button>`
  }).catch(e => {
    console.error(e)
    console.log(e.response)
  })
}

function getallFirmware() {
  axios({
    method: 'get',
    url: `https://drone-management-api-ankit1998.herokuapp.com/drone/allFirmware/${id}`,
    headers: {
      auth: myStorage.getItem('DronePointdeveloperPermanentToken')
    }
  }).then(res => {
    console.log(res)
    if (res.data.error) {
      errormsg(res.data.error.message)
      return 0
    }

    loadregistry(res.data.firmwareRegistry)
  }).catch(e => {
    console.error(e)
    console.log(e.response)
  })
}

function loadregistry(data) {
  const reg = document.getElementById('registry')
  let date
  let url
  let dateString
  let time
  let count = data.length
  if (!data[0]) {
    reg.innerHTML = `<div style="text-align: center;"><p>Drone is not accessed till now</p></div>`
  } else {
    data.forEach(firm => {
      url = `https://drone-management-api-ankit1998.herokuapp.com/drone/latestFirmwareDownload?id=${id}&token=${myStorage.getItem('DronePointdeveloperPermanentToken')}&fid=${firm._id}`
      date = new Date(firm.time)
      dateString = date.toDateString()
      time = date.toTimeString()
      reg.insertAdjacentHTML("afterend", `
        <tr>
          <td class="count">${count}</td>
          <td>${firm.version}</td>
          <td>${dateString}</td>
          <td>${time}</td>
          <td id="id${firm._id}"><a href='${url}'><button class="downbtn">Download</button></a></td>
        </tr>`)
      count--
    })
  }

  unloading()

}

function successmsg(msg) {
  scrollToTop()
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'green'
  document.getElementById('errormsg').innerHTML = msg
}

function errormsg(msg) {
  scrollToTop()
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'red'
  document.getElementById('errormsg').innerHTML = msg
}

function warnmsg(msg) {
  scrollToTop()
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