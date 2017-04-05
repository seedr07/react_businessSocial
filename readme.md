# Express-Redux Application

## Purpose

This is a social project for business.

## Stack

* [Express](http://expressjs.com/) - Node.js web application framework used for server. Sets up the REST API and handles communication with the database.
* [Redux](http://rackt.github.io/redux/) - A state container for Javascript web applications derived from [Facebook's flux architecture](https://facebook.github.io/flux/docs/overview.html).
* [React](http://facebook.github.io/react/) - A Javascript library for building UI components.
* [React Router](http://rackt.github.io/react-router/) - A routing solution to handle routing on the client side. 
* [ArangoDB] - Database  (you could easily intercahnge this with another).
* [PassportJs](http://passportjs.org/) - Authentication middleware used to implement the user system. 
* [SocketIO](http://socket.io/) - Used to push updates to users via open sockets.
* [MySql](https://www.mysql.com/) - Database (you could easily interchange this with another).
* [webpack](https://webpack.github.io/) - A module bundler (like [Browserify](http://browserify.org/)).

### A Good System Architecture and Project Directory

I spent some time coming up with a clean and organized structure for this implementation. I had two criteria for "good". The first was that anyone can easily understand what's going on. The second was that it'd be easy to implement new features. If either of those two weren't met, please let me know what could be done differently!

On the highest level, I chose the classic client-server architecture - I wanted a clear separation between the two. I then looked for some inspiration on how to organize each directory (look at the readme's in each respective folder).


### REST API Server Using Node

Using [Express](http://expressjs.com/), this was fairly straightforward.

### A User System

I'm using [PassportJs](http://passportjs.org/) to implement a user system. Essentially, a session token is generated when a client connects, it is then associated with an account if the user successfully signs on and saved to a store (currently the dev session store, but soon to be redis - though it could also be saved in the DB). The token is then used to authorize subsequent requests.

### Redux

Initially, I was using the flux architecture for the client side implementation, but then switched to redux. The idea is to have an immutable object that represents the state of the entire application. Everytime something happens, a new state object is created to reflect the change, and the views update accordingly. I definitely suggest reading up on redux and their examples [here](http://rackt.github.io/redux/).

### Optimistic Updates

After having a redux application connected to a backend, I wanted to implement optimistic updates (a.k.a. reflect user updates immediately, even though the change wasn't necessarily saved). This was implemented by generating a unique id on the client side and then using that to reconcile after hearing back from the server. By using the client-side-generated id, react nicely handles updating the view and notifying the user on the status of each change.

### Live Updates/Push Notifications

After users were able to make changes, I didn't want them to have to refresh their page to see changes made by other users. I used [SocketIO](http://socket.io/) to alert each client of any update. Please let me know what you think about this! I've never used backbone, but it seems to have a nice model and event system that could be worth exploring.

### Client Side Routing

I refused to use Angular for this project (wanted to learn something new), but become worried when I started to think about client-side routing. I'm currently using the react router - the version which is still in beta and isn't properly documented yet. It works well enough to get the job done, but I still need to do my research. It's still not clear to me what the best way of passing variables down the hierarchy is when using the router.

## Setting up

1. Run 'npm install' in both the /server and /client directory (I am treating both as different projects).
2. Run the database set up script using 'node /server/config/database_creation_script.js'. This will clear any tables and recreate them. Note: this is in place until we can come up with a better migration process. 

## Running the project

Note: There currently isn't a "one step" script to run the entire application, so you may need 2 terminals.

After setting up...

1. Make sure that the myql server is running on your machine.
2. Run 'npm start' in the /client folder. This will compile the current client code using [webpack](https://webpack.github.io/) and continue to compile future changes. It's nice to keep an eye on this as you update the client project.
3. Run 'npm start' from the server folder. This will run the server using [supervisor](https://github.com/petruisfan/node-supervisor) and rerun on new server changes.


Message me if I'm missing anything or if you have a suggestion for how to do any of these!

Again, let me know if anything is work going on this list!

