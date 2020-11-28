//function search(value){
//  value
//}
function keypressed(event,value){
  var e = event;
  var ekey;
  if(e != null){
    ekey = e.key;
    value = (value+ekey);
    console.log(value);
    if(value != null){
      if(value.includes(" ")){
        for(let i=0;i<value.length-1;i++){
          if(value[i].indexOf(" ")==0 && i<value.length-1){
            value = value.slice(0,i+1)+value[i+1].toUpperCase()+value.slice(i+2);
          }
        }
      }
      value = value[0].toUpperCase()+value.slice(1);
    }
  }
  if(value != ""){
    value = value.replace(value[0],value[0].toUpperCase());
    console.log(value);
    if(ekey == "Enter"){
      search_cities(value);
    }else{
      let t = 0;
      for (let i = 0;i<cities.length-1;i++){
        if(cities[i].slice(0,value.length) == value || cities[i].includes(value) == true){
          s_listshow(cities[i],t);
          t++;
          if(t>5){
            break;
          }
        }
      }
      for(t;t<6;t++){
        s_listshow(null,t);
      }
    }
  }else{
    for(let t=0;t<6;t++){
      s_listshow(null,t);
    }
  }
}
function s_onmouseover(element){
  element.classList.add("s_mouseon");
  console.log(element);
}
function s_onmouseout(element){
  element.classList.remove("s_mouseon");
  if(element.classList.contains("s_onmousedown")){
    element.classList.remove("s_onmousedown");
  }
}
function s_onmousedown(element){
  element.classList.add("s_onmousedown");
  console.log(element);
}
function s_onmouseup(element){
  if(element.classList.contains("s_onmousedown")){
    element.classList.remove("s_onmousedown");
    let num = element.id.slice(element.id.length-1);
    let num_value = document.getElementById(`sug${num}`).innerHTML;
    getWeatherbycity(num_value);
  }
}
function s_backspacecheck(key,value){
  console.log("keypress");
  if(key == "Backspace" && value != null){
    console.log("backspace");
    value = value.slice(0,value.length-1);
    keypressed(null,value);
  }
}
function s_listshow(value,num){
  num++;
  element = document.getElementById(`sugl${num}`);
  valuelabel = document.getElementById(`sug${num}`);
  list = document.getElementById("sbar_sug");
  if(value != null){
    list.style.display = "block";
    element.style.display = "flex";
    valuelabel.innerHTML = value;
  }else{
    if(num==1){
      console.log("dsfa");
      list.style.display = "none";
      element.style.display = "none";
      valuelabel.innerHTML = "";
    }else{
      console.log("ff");
      element.style.display = "none";
      valuelabel.innerHTML = "";
    }
  }
}
