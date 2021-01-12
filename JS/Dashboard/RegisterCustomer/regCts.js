function register(){
    const data = createData('Form')

    console.log(data)
    const valid = ValidateEmail(data.email)
    if(!data.email||!data.name||!data.phNumber||!data.password||!data.confPassword){
        errormsg('Please fill all feilds.')
        return 0
    }
    if(!valid){
        errormsg('Enter a Valid Email')
        return 0
    }

    if((data.phNumber + "").length != '10'){
        console.log(data.phNumber.length)
        errormsg('Please enter an valid Mobile of 10 digits')
        return 0
    }

    if(data.password != data.confPassword){
        errormsg('Password and Confirm Password are not same.')
        return 0
    }

    let body = {
        url:'http://localhost:3000/developer/registerCustomer',
        data:data
    }

    loading()
    registerreq(body, 'developer')
}

function registerreq(body){
    axios({
        method:'post',
        url:body.url,
        headers:{
            auth:myStorage.getItem('DronePointdeveloperPermanentToken')
        },
        data:body.data
    })
    .then(response => {
        console.log(response)
        if(response.data.error){
            errormsg(response.data.error.message)
            unloading()
            return 0
        }
        document.getElementById('Form').reset()
        unloading()
        successmsg(response.data.message+'<br>You can register more if you want.')
    })
    .catch(e => {
        console.log(e)
        console.log(e.response)
        if(e.response)
            if(e.response.data)
                if(e.response.data.error)
                    errormsg(e.response.data.error.message)
        else
            errormsg('Something went Wrong regresh and try agian')

        unloading()
    })
}

function createData(formtag){
    const form = document.getElementById(formtag)
    var x = form.elements.length;
    let data = {}
    for(let i = 0;i < x;i++){
        let name = form.elements[i].name
        data[name] = form.elements[i].value
        if(!data[name]|| data[name].lenght == 0){
            data[name] = null
        }
    }

    return data
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

  function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}