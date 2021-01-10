window.onload = () =>{
    checkProfile('../Login/Login.html')
    loadUnverified()
}

function loadUnverified(){
    const developer = document.getElementById('developer')
    const customer = document.getElementById('customer')
    let count = 1
    axios({
        method:'get',
        url:`https://drone-management-api-ankit1998.herokuapp.com/developer/unverifiedAccounts`,
        headers:{
          auth:localStorage.getItem('DronePointdeveloperPermanentToken')
        }
    }).then(response =>{
            if(!response.data.unverifiedDev[0]){
                developer.innerHTML = `<div style="text-align: center;"><p>No Developer to verify.</p></div>`
            } else {
                response.data.unverifiedDev.forEach(dev =>{
                    console.log(dev._id)
                    developer.innerHTML += `
                    <tr>
                        <td>${count}</td>
                        <td>${dev.name}</td>
                        <td>${dev.email}</td>
                        <td>${dev.phNumber}</td>
                        <td id="id${dev._id}"><button class="tick" onclick="verify('Dev', '${dev._id}')">✓</button></td>
                    </tr>`
                    count++
                })
            }
            
            count = 1
            if(!response.data.unverifiedCts[0]){
                customer.innerHTML = `<div style="text-align: center;"><p>No Customer to verify.</p></div>`
            } else {
                response.data.unverifiedCts.forEach(cts =>{
                    console.log(cts._id)
                    customer.innerHTML += `
                    <tr>
                        <td>${count}</td>
                        <td>${cts.name}</td>
                        <td>${cts.email}</td>
                        <td>${cts.phNumber}</td>
                        <td id="id${cts._id}"><button class="tick" onclick="verify('Cts', '${cts._id}')">✓</button></td>
                    </tr>`
                    count++
                })   
            }
            unloading()
    }).catch(e =>{
        console.log(e)
        console.log(e.response)
        errormsg('Something went wrong refresh or login again')
    })
}

function verify(value, id){
    const tick = document.getElementById(`id${id}`)
    tick.innerHTML = `<div class="loader small"></div>`

    axios({
        method:'get',
        url:`https://drone-management-api-ankit1998.herokuapp.com/developer/verify${value}/${id}`,
        headers:{
          auth:localStorage.getItem('DronePointdeveloperPermanentToken')
        }
    }).then(response =>{
        console.log(response)
        if(response.status == 200){
            tick.innerHTML = `<button class="tick" style="background-color: greenyellow;" disabled>Verified</button>`
        }
    }).catch(e =>{
        console.log(e)
        console.error(e.response);
        errormsg('Something went wrong Please refresh or login agian')
        tick.innerHTML = `<button class="tick" onclick="verify('${value}', '${id}')">✓</button>`
    })
}


function successmsg(msg){
    document.getElementById('error').style.display = 'block'
    document.getElementById('error').style.backgroundColor = 'green'
    document.getElementById('errormsg').innerHTML = msg
}

function errormsg(msg){
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'red'
  document.getElementById('errormsg').innerHTML = msg
}

function warnmsg(msg){
  document.getElementById('error').style.display = 'block'
  document.getElementById('error').style.backgroundColor = 'yellow'
  document.getElementById('errormsg').innerHTML = msg
}

function loading(){
    document.getElementById('loading').style.display = 'block'
    document.getElementById('content').style.display = 'none'
}

function unloading(){
    document.getElementById('loading').style.display = 'none'
    document.getElementById('content').style.display = 'block'
}