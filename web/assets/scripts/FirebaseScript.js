/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global file, textInput, firebase */
var file, textInput, firebase, timer;

//declaration and initialization of variables for selecting the HTML elements
document.addEventListener('DOMContentLoaded', function () {
    var messagesList = document.getElementById('messages'),
            textInput = document.getElementById('text'),
            sendButton = document.getElementById('send'),
            googleLogin = document.getElementById('google'),
            anonLogin = document.getElementById('anonLogin'),
            logout = document.getElementById('logout'),
            usernameElm = document.getElementById('username'),
            username = "notLoggedUser",
            uploader = document.getElementById('uploader');

//configuration of the firebase data for our app
    var config = {
        apiKey: "AIzaSyBMjfKCUSgwCDxFcwTh9vv010fIMOjfAVo",
        authDomain: "chatapp-a40df.firebaseapp.com",
        databaseURL: "https://chatapp-a40df.firebaseio.com",
        projectId: "chatapp-a40df",
        storageBucket: "chatapp-a40df.appspot.com",
        messagingSenderId: "470436860368"
    };

    // init firebase app
    var app = firebase.initializeApp(config);
    var database = app.database();
    var auth = app.auth();
    var storage = app.storage();
    var databaseRef = database.ref().child('chat');

    //function to send message
    sendButton.addEventListener('click', function () {
        timer = getCurrentTime(); //call to the function for getting time of sending message
        var chat = {  //creating an object chat that accepts the chat contents
            name: username,
            message: textInput.value,
            time: timer

        };
        databaseRef.push().set(chat); //pushing the chat object into the chat database
        textInput.value = '';
    });

    //function to read message contents from database
    databaseRef.on('child_added', function (snapshot) {
        var chat = snapshot.val();
        addMessage(chat); //call to the function to put the read messages into containers to display        
    });

    googleLogin.addEventListener('click', function (e) { //using google authentication for the login
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    });


    anonLogin.addEventListener('click', function (e) {
        auth.signInAnonymously().catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    });

    logout.addEventListener('click', function (e) {
        auth.signOut();
    });

    auth.onAuthStateChanged(function (user) {
        if (user) {
            if (user.isAnonymous) {
                setUsername('anon');
            } else {
                setUsername(user.displayName);
            }
        } else {
            setUsername("notLoggedUser");
        }
    });

    function handleFileSelect(e) {
        var file = e.target.files[0];
        var storageRef = storage.ref().child('chat_photos');
        var photoRef = storageRef.child(file.name);
        var uploadTask = photoRef.put(file);
        uploadTask.on('state_changed', null, null, function () {
            var downloadUrl = uploadTask.snapshot.downloadURL;
            textInput.value = downloadUrl;
        });
    }
    file.addEventListener('change', handleFileSelect, false);


    function setUsername(newUsername) {
        if (newUsername === null) {
            newUsername = "notLoggedUser";
        }
        username = newUsername;
        var isLoggedIn = username !== 'notLoggedUser';
        usernameElm.innerText = newUsername;
        usernameElm.style.fontWeight = "bold";
        logout.style.display = isLoggedIn ? '' : 'none';
        googleLogin.style.display = isLoggedIn ? 'none' : '';
        anonLogin.style.display = isLoggedIn ? 'none' : '';
    }

    //function to put the read messages into containers to display
    function addMessage(chat) {
        var li = document.createElement('li');
        var msgData = document.createElement('div');
        msgData.className = 'message-data';
        var nameElm = document.createElement('span');
        nameElm.className = 'message-data-name';
        nameElm.innerText = chat.name;
        msgData.appendChild(nameElm);
        var time = document.createElement('span');
        time.className = 'message-data-time';
        time.innerText = chat.time;
        msgData.appendChild(time);
        li.appendChild(msgData);

        if (chat.message.indexOf("https://firebasestorage.googleapis.com/") === 0 ||
                chat.message.indexOf("https://lh3.googleusercontent.com/") === 0 ||
                chat.message.indexOf("https://pbs.twimg.com/") === 0 ||
                chat.message.indexOf("data:image/") === 0) {
            var imgElm = document.createElement("img");
            imgElm.src = chat.message;
            li.appendChild(imgElm);
        } else {
            var messageElm = document.createElement("div");
            messageElm.innerText = chat.message;
            if (textInput === chat.message) {
                messageElm.className = 'message my-message';
            }
            else {
                messageElm.className = 'message other-message';
            }
            li.appendChild(messageElm);
        }
        messagesList.appendChild(li);
        li.scrollIntoView(false);
        sendButton.scrollIntoView(false);
    }
    
    //function to get the current time
    function getCurrentTime(){
        var time;
      var d = new Date();
      var Mins = d.getMinutes();
      var Hour = d.getHours();
      var Hr = Hour-12;
        nHour = 0 + Hour;
        Mins = 0 + Mins;
      if(Hr<0){
        time = (nHour + ":" + Mins + "AM");
      }else if(Hr===0){
          time = (nHour + ":" + Mins + "PM");
      }
      else{
          time = (Hr + ":" + Mins + "PM");
      }
      return time;
    }
    
    setUsername('notLoggedUser');
});