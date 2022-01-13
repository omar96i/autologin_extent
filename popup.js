$(document).ready(function() {     
  let setDatos = document.getElementById("setDatos");
  let getDatos = document.getElementById("getDatos");
  let LogOut = document.getElementById("LogOut");
  setDatos.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setDatosUser,
    });
  });

  LogOut.addEventListener("click", async () => {
    chrome.storage.sync.set({'user': '', 'password': ''})
    $(".tittle").hide()
    $(".saved").hide()
    $(".save").show()
  });

  getDatos.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getDatosUser,
    });

    chrome.storage.sync.get('user', function (user) {
      usuario = user.user;
      if(usuario != ""){
        $(".tittle").show()
        $(".saved").show()
        $(".save").hide()
      }else{
        $(".tittle").hide()
        $(".saved").hide()
        $(".save").show()
      }
    });
  })

  chrome.storage.sync.get('user', function (user) {
    usuario = user.user;
    if(usuario != ""){
      $(".tittle").show()
      $(".saved").show()
      $(".save").hide()
      chrome.storage.sync.get('tipo_pagina', function (tipo_pagina) {
        type = tipo_pagina.tipo_pagina;
        $("#text-pagina").html(type)
      });
    }
  });
});



function setDatosUser(){
  chrome.storage.sync.get('tipo_pagina', function (tipo) {
    tipo_cuenta = tipo.tipo_pagina;
    if(tipo_cuenta == "StripChat"){
      chrome.storage.sync.get('user', function (user) {
        usuario = user.user;
        document.getElementById("login_login_or_email").value = usuario
      });
      chrome.storage.sync.get('password', function (password) {
        clave = password.password;
        document.getElementById("login_password").value = clave
        document.getElementsByClassName("login-form__submit")[0].click()
      });
    }else if(tipo_cuenta == "Chaturbate"){
      chrome.storage.sync.get('user', function (user) {
        usuario = user.user;
        document.getElementById("username").value = usuario
      });
      chrome.storage.sync.get('password', function (password) {
        clave = password.password;
        document.getElementById("password").value = clave
        document.getElementById("id_login_btn").click()
      });
    }else if(tipo_cuenta == "MyFreeCams"){
      chrome.storage.sync.get('user', function (user) {
        usuario = user.user;
        document.getElementById("username").value = usuario
      });
      chrome.storage.sync.get('password', function (password) {
        clave = password.password;
        document.getElementById("password").value = clave
        document.getElementsByName("submit_login_button")[0].click()
      });
    }else if(tipo_cuenta == "BongaCams"){
      chrome.storage.sync.get('user', function (user) {
        usuario = user.user;
        document.getElementsByName("log_in[username]")[0].value = usuario
      });
      chrome.storage.sync.get('password', function (password) {
        clave = password.password;
        document.getElementsByName("log_in[password]")[0].value = clave
        document.getElementsByClassName("form_actions")[0].children[1].click()
      });
    }else if(tipo_cuenta == "Camsoda"){
      chrome.storage.sync.get('user', function (user) {
        usuario = user.user;
        document.getElementsByName("username")[0].value = usuario
      });
      chrome.storage.sync.get('password', function (password) {
        clave = password.password;
        document.getElementsByName("password")[0].value = clave
        setTimeout(function (){ document.getElementsByClassName("form-group")[4].children[0].click() }, 2000);
      });
    }
    
    // else if(tipo_cuenta == "amatur.tv"){
    //   chrome.storage.sync.get('user', function (user) {
    //     usuario = user.user;
    //     document.getElementById("login-username").value = usuario
    //   });
    //   chrome.storage.sync.get('password', function (password) {
    //     clave = password.password;
    //     document.getElementById("login-password").value = clave
    //   });
    // }
  });
  
}

function getDatosUser(){
  user = document.getElementById("user").value
  password = document.getElementById("password").value
  tipo_pagina = document.getElementById("tipo_pagina").value
  if(user == "" || password == "" || tipo_pagina == ""){
    document.getElementById("error-alert").style.display = "block"
    document.getElementById("success-alert").style.display = "none"
  }else{
    document.getElementById("error-alert").style.display = "none"
    document.getElementById("success-alert").style.display = "block"
  }
  chrome.storage.sync.set({'user': user, 'password': password, 'tipo_pagina': tipo_pagina})
}