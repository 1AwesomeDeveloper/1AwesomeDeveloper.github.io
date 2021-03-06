const myStorage = window.sessionStorage

const developer = document.getElementById('Developer')
const content = document.getElementById('content')
const button = document.getElementById('button')
const heading = document.getElementById('heading')

function loadContent(value){
    heading.innerHTML = 'Developer'
    document.getElementById('loader').style.display ='none'
    button.style.display = 'none'
    content.style.display = 'block'
    document.getElementById('reg').style.display = 'none'
    document.getElementById('log').style.display = 'none'
    document.getElementById('lrbtn').style.display = 'block'
    document.getElementById('otp').style.display = 'none'
    document.getElementById('back').style.display = 'block'
}

function login(value){
    loading()
    checkLogin(value)
}

function register(value){
    document.getElementById('loader').style.display ='none'
    document.getElementById('lrbtn').style.display = 'none'
    document.getElementById('log').style.display = 'none'
    document.getElementById('reg').style.display = 'block'
    document.getElementById('developerreg').style.display = 'block'
    document.getElementById('back').style.display = 'block'
}


function back(){
    document.getElementById('loader').style.display ='none'
    heading.innerHTML = 'Welcome'
    button.style.display = 'block'
    content.style.display = 'none'
    document.getElementById('reg').style.display = 'none'
    document.getElementById('log').style.display = 'none'
    document.getElementById('lrbtn').style.display = 'none'
    document.getElementById('back').style.display = 'none'
    document.getElementById('DLForm').reset()
    document.getElementById('DRForm').reset()

}

function loginD(){
    
    const data = createData('DLForm')

    const valid = ValidateEmail(data.email)
    if(!valid || !data.email || !data.password){
        errormsg('Please Enter valid Email and password')
        console.log('we are in error')
        return null
    }
    
    let body = {
        url:'https://drone-management-api-ankit1998.herokuapp.com/developer/login',
        data:data
    }

    console.log(data)
    loading()
    loginReq(body, 'developer')
}

function registerD(){
    const data = createData('DRForm')

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
        url:'https://drone-management-api-ankit1998.herokuapp.com/developer/register',
        data:data
    }

    loading()
    registerreq(body, 'developer')
}

async function loginReq(body, value){
    await axios({
        method:'post',
        url:body.url,
        data:body.data
    })
    .then(response => {
        if(response.data.error){
            errormsg(response.data.error.message)
            document.getElementById('loader').style.display = 'none'
            document.getElementById('log').style.display = 'block'
            return
        }

        content.style.display = 'block'
        document.getElementById('loader').style.display = 'none'
        document.getElementById('otp').style.display = 'block'
        document.getElementById('DOtp').style.display = 'block'
        document.getElementById('DLForm').reset()
        console.log(response.data)
        let tokenName = `DronePoint${value}LoginToken`
        myStorage.setItem(tokenName,response.data.loginToken)
        successmsg(response.data.message)
        
    })
    .catch(e => {
        console.log(e)
        errormsg('Something went Wrong regresh and try again' )
    })
}

function registerreq(body){
    axios({
        method:'post',
        url:body.url,
        data:body.data
    })
    .then(response => {
        console.log(response)
        if(response.data.error){
            errormsg(response.data.error.message)
            document.getElementById('loader').style.display = 'none'
            document.getElementById('reg').style.display = 'block'
            return 0
        }
        document.getElementById('DRForm').reset()
        successmsg(response.data.message+'<br> Don"t press back you will be redirected shortly')
        setTimeout(()=>{location.reload()},10000)
    })
    .catch(e => {
        console.log(e)
        if(e.response.data.error.message)
            errormsg(e.response.data.error.message)
        else
            errormsg('Something went Wrong regresh and try agian')

        document.getElementById('loader').style.display = 'none'
        document.getElementById('reg').style.display = 'block'
    })
}

function sendOtp(value){
    loading()
    console.log(myStorage.getItem(`DronePoint${value}LoginToken`))
    axios({
         method:'post',
         url:`https://drone-management-api-ankit1998.herokuapp.com/${value}/otpValidation`,
         headers:{loingauth:myStorage.getItem(`DronePoint${value}LoginToken`)},
         data:{otp:document.getElementById(`${value}Otp`).value}
    }).then(response =>{
        console.log(response)
        if(response.data.error){
            errormsg(response.data.error.message)
            document.getElementById('loader').style.display = 'none'
            document.getElementById('otp').style.display = 'block'
            return 0
        }

        myStorage.setItem(`DronePoint${value}PermanentToken`, response.data.accessToken)
        myStorage.removeItem(`DronePoint${value}LoginToken`)
        console.log(`DronePoint${value}PermanentToken`)
        successmsg(response.data.message + '<br>Dont press back or refresh you will be redirected shortly')

        setTimeout(() => {
                window.location.href = '../Dashboard/dashboard.html'
        }, 5000);
    }).catch(e => {
        console.log(e)
        errormsg('Something went Wrong regresh and try agian')
    })
}

function checkLogin(value){
    if(!myStorage.getItem(`DronePoint${value}PermanentToken`)){
        displayLogin(value)
        return 0
    }
    axios({
         method:'get',
         url:`https://drone-management-api-ankit1998.herokuapp.com/${value}/profile`,
         headers:{auth:myStorage.getItem(`DronePoint${value}PermanentToken`)},
    }).then(response =>{
        console.log(response)
        if(response.data.error){
            throw new Error()
        }

        successmsg(response.data.message + `<br> Please don't refresh you will be redirected shortly`)
        setTimeout(() => {
            if(value == 'developer'){
                window.location.href = './../Dashboard/dashboard.html'
            }
        }, 5000);
    }).catch(e => {
        console.log(e)
        displayLogin(value)
    })
}

function displayLogin(value){
        myStorage.removeItem(`DronePoint${value}PermanentToken`)
        document.getElementById('loader').style.display ='none'
        document.getElementById('lrbtn').style.display = 'none'
        document.getElementById('reg').style.display = 'none'
        document.getElementById('log').style.display = 'block'
        document.getElementById('developerlog').style.display = 'block'
        document.getElementById('back').style.display = 'block'
}

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function scrollToTop() {
    if(document.getElementById('top').scrollHeight < document.getElementById('top').clientHeight)
        return 0

    var position =
        document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
        window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
        scrollAnimation = setTimeout("scrollToTop()", 30);
    }
}


function loading(){
    document.getElementById('loader').style.display ='block'
    button.style.display = 'none'
    document.getElementById('reg').style.display = 'none'
    document.getElementById('log').style.display = 'none'
    document.getElementById('lrbtn').style.display = 'none'
    document.getElementById('otp').style.display = 'none'
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