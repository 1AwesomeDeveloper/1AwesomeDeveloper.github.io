window.onload = () => {
    checkProfile('../../Login/Login.html')
    loading()
    loadDrone()
}

function loadDrone() {
    const id = localStorage.getItem('dpdroneId')
    document.getElementById('delete').innerHTML = `<i class="fas fa-trash-alt fa-2x" onclick="deregister('${id}')"></i>`
    axios({
        method: 'get',
        url: `https://drone-management-api-ankit1998.herokuapp.com/drone/droneDetails/${id}`,
        headers: {
            auth: localStorage.getItem('DronePointdeveloperPermanentToken')
        }
    }).then(response => {
        console.log(response)
        if (response.data.error) {
            errormsg(response.data.error.message)
            return 0
        }

        writeToPage(response.data)
    }).catch(e => {
        console.log(e)
        console.log(e.response)
        errormsg('Something went wrong refresh or login again')
    })
}

function deregister(id) {
    loading()
    warnmsg('Your Drone is being deregister Please dont press back or refresh.')
    axios({
        method: 'delete',
        url: `https://drone-management-api-ankit1998.herokuapp.com/drone/deRegisterDrone/${id}`,
        headers: {
            auth: localStorage.getItem('DronePointdeveloperPermanentToken')
        }
    }).then(response => {
        console.log(response)
        if (response.data.error) {
            unloading()
            errormsg(response.data.error.message)
            return 0
        }
        localStorage.removeItem('dpdroneId')
        successmsg('Your Drone has been deregistred pelase dont press back or refresh you will be redirected')
        setTimeout(() => {
            window.location.replace('./../Drones.html')
        }, 3000);
    }).catch(e => {
        unloading()
        console.log(e)
        console.log(e.response)
        errormsg('Something went wrong refresh or login again')
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
    document.getElementById('content').style.display = 'block'
}


function writeToPage(data) {
    const id = localStorage.getItem('dpdroneId')
    let url
    document.getElementById('droneNo').innerHTML = data.droneNo
    let date = new Date(data.manufactringDate)
    let dateString = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
    let time
    let count = 1
    document.getElementById('droneInfo').innerHTML =
        `<div class="uuid">
                <div>
                    UUID
                </div>
                <div>
                    ${data.UUID}
                </div>
            </div>
            <div class="grid3">
                <div>
                    <div>Modal</div>
                    <div>${data.modal}</div>
                </div>
                <div>
                    <div>Serial No.</div>
                    <div>${data.serialNumber}</div>
                </div>
                <div>
                    <div>Assigned To</div>
                    <div>${data.assignedTo}</div>
                </div>
            </div>
            <hr>
            <h3>Manufactring</h3>
            <hr>
            <div class="grid3">
                <div>
                    <div>Date</div>
                    <div>${dateString}</div>
                </div>
                <div>
                    <div>Batch</div>
                    <div>${data.manufactringBatch}</div>
                </div>
                <div>
                    <div>Shift</div>
                    <div>${data.manufactringShift}</div>
                </div>
            </div>
            <hr>
            <h3>Hardware</h3>
            <hr>
            <div class="grid3">
                <div>
                    <div>Make</div>
                    <div>${data.hardMake}</div>
                </div>
                <div>
                    <div>Vesion</div>
                    <div>${data.hardVersion}</div>
                </div>
                <div>
                    <div>Serial Number</div>
                    <div>${data.hardSerialNumber}</div>
                </div>
            </div>
            <hr>
            <h3>Software</h3>
            <hr>
            <div class="grid3">
                <div>
                    <div>Make</div>
                    <div>${data.softMake}</div>
                </div>
                <div>
                    <div>Vesion</div>
                    <div>${data.softVersion}</div>
                </div>
                <div>
                    <div>Serial Number</div>
                    <div>${data.softSerialNumber}</div>
                </div>
            </div>`
    console.log('we are here')

    const keyregistry = document.getElementById('keyregistry')
    if (!data.keyRegistry[0]) {
        keyregistry.innerHTML = `
        <div style="text-align: center;"><p>There are no keys availabe.</p></div>
        `
    } else {
        count = data.keyRegistry.length
        data.keyRegistry.forEach(d => {
            url = `https://drone-management-api-ankit1998.herokuapp.com/developer/downloadKey?id=${id}&token=${localStorage.getItem('DronePointdeveloperPermanentToken')}&kid=${d._id}`
            
            date = new Date(d.time)
            dateString = date.toDateString()
            time = date.toTimeString()
            keyregistry.insertAdjacentHTML("afterend",`
            <tr>
                <td class='count'>${count}</td>
                <td>${dateString}</td>
                <td>${time}</td>
                <td id="id${d._id}"><a href='${url}'><button class="downbtn">Download</button></a></td>
            </tr>
            `)
            count--
        })
    }

    const logregistry = document.getElementById('logregistry')
    if (!data.logRegistry[0]) {
        logregistry.innerHTML = `
        <div style="text-align: center;"><p>There are no logs available</p></div>
        `
    } else {
        count = data.logRegistry.length
        data.logRegistry.forEach(d => {
            url = `http://drone-management-api-ankit1998.herokuapp.com/developer/downloadLog?id=${id}&token=${localStorage.getItem('DronePointdeveloperPermanentToken')}&lid=${d._id}`
            
            date = new Date(d.time)
            dateString = date.toDateString()
            time = date.toTimeString()
            logregistry.insertAdjacentHTML("afterend",`
            <tr>
                <td class='count'>${count}</td>
                <td>${dateString}</td>
                <td>${time}</td>
                <td id="id${d._id}"><a href='${url}'><button class="downbtn">Download</button></a></td>
            </tr>
            `)
            count--
        })
    }


    unloading()
}