# framework-node
basic express-socket server is setup just need to tell port no in config file and you are good to go.


# How to Use
  - put port number in config file in home folder
  - node app.js

# How it works
There are three main things to remember in framework
  - app.js
  - main
  - chatServer

app.js ------
<br>
app.js is main file from where application starts
<br><br>
main ------
<br>
main is main folder or router which is required by app and router requests according to url to different modules of large project.
<br>
for example :- 
www.example.com/app1/getuserlist
<br>
www.example.com/app2/getuserlist
<br>
Here you don't want to write two request handles in same file so your application will be divided to two parts app1 and app2 and there respecitve getuserlist will written in them.if i compare this example with framework than app1 and app2 are like chatServer folder which will have their respective routers and getuserlist will be route method in both of them and these two routers will used by main/server.js which is basically the base controller or router. 
This make application to be scalable.
<br>
<br>
chatServer --------
<br>
chatServer is acting as specific modules in base url. 

### Version
0.0.1


### Modules currently present
  - express
  - express-session
  - socket.io
  - body-parser

### Features
sessions with sockets is done by using external modules but in this framework it done by default without using any external moduels

License
--------
MIT


