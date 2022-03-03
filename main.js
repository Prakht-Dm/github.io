async function whatGender(event){
    event.preventDefault();
    let firstName = this.firstElementChild.value;
    let serverUrl = 'https://api.genderize.io';
    let url = `${serverUrl}?name=${firstName}`;
    let response = await fetch(url);
if (response.ok) { 
  let json = await response.json();
  let outGender = document.createElement('p');
        outGender.className='listString'; 
        outGender.innerHTML=`${firstName} is a ${json['gender']} name`;
    if(json['gender']){
        this.after(outGender);
    }else {
        outGender.innerHTML=`${firstName} is not found`;  
        this.after(outGender);
}
} else {
  alert("ERROR: Name not found");
}
this.firstElementChild.value="";
}

function addNewEvent(classN, events, func){
    let crossCheck=document.querySelectorAll(classN);
    for (let k of crossCheck){
    k.addEventListener(events,  func);
    } 
}
addNewEvent('form','submit', whatGender);

