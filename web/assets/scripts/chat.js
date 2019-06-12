/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* declaration of global variables: file, textInput, firebase */
var file, textInput, firebase, timer;

//on completion of page load
$(document).ready(function () {

// declaration of function variables to select the needed html elements
    var messagesList = $('#messages'),
            textInput = $('#text'),
            sendButton = $('#send'),
            googleLogin = $('#google'),
            anonLogin = $('#anonLogin'),
            logout = $('#logout'),
            usernameElm = $('#username'),
            username = "notLoggedUser",
            uploader = $('#uploader'),
            config;
            
    // configuration of the firebase credentials for use in the app
    config = {
        apiKey: "AIzaSyBMjfKCUSgwCDxFcwTh9vv010fIMOjfAVo",
        authDomain: "chatapp-a40df.firebaseapp.com",
        databaseURL: "https://chatapp-a40df.firebaseio.com",
        projectId: "chatapp-a40df",
        storageBucket: "chatapp-a40df.appspot.com",
        messagingSenderId: "470436860368"
    };
//initialization of the firebase data into our app
    var app = firebase.initializeApp(config); //initialize our app using the firebase config settings
    var database = app.database(); // initialize our app database as the firebase database
    var auth = app.auth(); //initialize our app authentication as the firebase authentication
    var storage = app.storage(); //initialize our app storage as the firebase storage
    var databaseRef = database.ref().child('chat'); //create a child called chat for the database

//function to send msg
    sendButton.click(function () {
        var chat = {
            name: username,
            message: textInput.value,
            time: timer
        };
        databaseRef.push(chat);
        textInput.value = '';
        timer = getCurrentTime();
    });
    
    //function to listen to message
    databaseRef.on('child_added', function (snapshot) {
        var chat = snapshot.val();
        addMessage(chat);
    });
    
    //function to place the listened message into containers and seperate them
    function addMessage(chat) {
        var li = $('<li />', {class: "clearfix"});
        var msgData = $("<div />", {class: "message-data"}).prependTo(li);
        var msgName = $("<span />", {text: chat.name, class: "message-data-name"}).prependTo(msgData);
        var msgIcon = $("<i />", {class: "message-data-time"}).prependTo(msgName);
        var msgTime = $("<span />", {text: chat.time, class: "message-data-time"}).appendTo(msgData);
        if ( textInput===chat.message){
                var msgDetail = $("<div />", {text: chat.message, class: "message my-message align-right"}).appendTo(li);
            }
            else {
                msgDetail = $("<div />", {text: chat.message, class: "message other-message align-left"}).appendTo(li);
            }
        
        li.appendTo(messagesList);
    }
    
    function getCurrentTime(){
        var d = new Date();
        /*var month =d.getMonth()+1;
        var day = d.getDate();*/
        var hour= d.getHours();
        var mins= d.getMinutes();
        var time= hour + mins;
        return time;
    }

});




