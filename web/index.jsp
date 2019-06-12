<%-- 
    Document   : index
    Created on : 27-Oct-2017, 11:49:51
    Author     : hp 8460p
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>RealTime Chat</title>
        <link href="assets/styles/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" type="text/css"/>
        <link href="assets/styles/FirebaseStyle.css" rel="stylesheet" type="text/css"/>
        <script src="assets/scripts/jquery-ui.min.js" type="text/javascript"></script>
        <script src="https://www.gstatic.com/firebasejs/4.6.0/firebase.js"></script>
    </head>

    <body>
        <div class="container">
            <div class="left">
                <div class="user">
                    <div class="avatar">
                    </div>
                    <div class="user-details">
                        <span id='username'></span><span>&nbsp &nbsp<i class="fa fa-circle online"></i></span>
                    </div>
                </div>

                <div class="search curved">
                    <input type="text" placeholder="search" class="isearch curved"/>
                    <i class="fa fa-search"></i>
                </div>

                <div class='logger'>
                    <button id='google' class="btn btn-danger btn-sm curved">Sign in with Google</button><br>
                    <button id='anonLogin' class="btn btn-primary btn-sm curved">Sign in Anonymously</button><br>
                    <button id='logout' class="btn btn-danger btn-xs curved">Sign out</button>
                </div>
            </div>

            <div class="chat">
                
                <div class="chat-history">                    
                    <div class="message" id='messages'></div>
                </div>

                <div class="chat-message clearfix">
                    <textarea id='text' class="" type="text" placeholder="Type Message Here..." required="yes"> </textarea>
                    <div class="m10">
                        <div class='Uploader float-left'>
                            <label for="file"><i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;<i class="fa fa-file-image-o"></i></label>
                            <input type="file" id="file" name="file" class="hidden"/>
                            <p>click on the icons above to attach files</p>
                            <progress value="0" max="100" class = "hidden" id="uploader">0%</progress>
                        </div>

                        <button id="send" class="float-right btn btn-success">Send</button>
                    </div> 
                </div>
            </div>

        </div>
        <script src="assets/scripts/FirebaseScript.js" type="text/javascript"></script>
    </body>
</html>
