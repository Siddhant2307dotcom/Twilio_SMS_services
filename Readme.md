Database Creation:-
Created a new database "Twilio_sms" using cmd in mongoDB, then created a collection named twilio_sms and inserted a null entry using command through cmd

db.db_name.insert({
mobileNumber : "",
message : "",
sentAt : "",
})

Steps to create a demo Message services for verification protocols using MongoDB , express and javasacript

Step1 :-
Created a new directory initialized it with npm init so node_modules is created.

Step 2:-
Installed express.

Step 3:-
Initialized index.js to be the starting point of the application.

Step 4:-
Created a directory with the name of public that holds the html pages that are to be rendered when the application is ran.

Step 5:-
I created a basic HTML form and rendered it to index.js.

Step 6:-
Installed npm driver for twilio sms and whatsapp using npm install twilio.

Step 7:-
Installed npm driver for bodyParser and mongodb.

Step 8:-
Created a html form and rendered it. The form contains two input tags one for mobileNumber and other for text. It uses post
method to send the data to the created database using ajax call.

Step 9:-
Login in/ Sign up to you Twilio account verify to access Account SID and Auth token

Step 10:-
In index.js store account Sid and auth token. import MongoClient from mongodb and twilio from twilio driver.

Step 11:-
Using MongoClient create connection to the database.

Step 12:-
Using app.post() method pass the credentials or form data extracted from the HTML form to store it to database and pass to
twilio api referred the docs for node.js.

Step 13:-
The using app.get() method we fetch data from the database and convert it to array.

Step 14:-
Created a new .html file to display messages.

Step 15:-
Fetched data from the path defined while using app.get() method and mapped the data in form of a table using forEach loop
and appended it to the list in html page.
