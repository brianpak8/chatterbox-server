/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var storage = [
  // {
  //   username: 'Jono',
  //   message: 'Do my bidding!'
  // }
];

var CorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  console.log(request.headers);
  
  // Create custom request event handler
  //routes and URLS (rooms)
  //GETS
  //POSTS
      
  // Create container array to hold messages

  // Create custom response based on the Request

  // Handle error control flow
  //Set response statuscode to 404 for unrecognized URLs


  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);
  //console.log('this should show up');
  // The outgoing status.
  var statusCode = 200;

  if (request.url === '/classes/messages' && request.method === 'GET') {
    // console.log('================BEGIN GET===============');
    // console.log('G1/4 this is the storage array: ', storage);
    // console.log('G2/4 this is the statusCode: ', statusCode);
    
    // console.log('G3/4 this is the response body before stringify: ', response.body);
    response.body = JSON.stringify({results: storage}); 
    // console.log(`G4/4 response's body property after stringify: `, response.body);
    // console.log('0000000000000000', response.body);
    // console.log('===============END GET=================');
  } else if (request.url === '/classes/messages' && request.method === 'POST') {
    // console.log('===============BEGIN POST=============');
    
    var body = [];
    // console.log('P1/10 free-floating body before any post work: ', body);
    request.on('data', function(chunk) {
      // console.log('P2/10  chunk sent: ', chunk);
      body.push(chunk);
      // console.log('P3/10  body after pushing chunk: ', body);
    });
    request.on('end', function() {
      body = Buffer.concat(body).toString();
      var censored = body.replace(/fuck|damn/i, 'Hack Reactor does not condone the use of foul language.  Please wash your mouth with extra soap');
      console.log('=======================================================');
      console.log(censored);
      console.log(body);
      if (censored !== body) {
        storage.push(JSON.parse(censored));
      } else {
        body = JSON.parse(body);
        // console.log('P4/10  body after buffering and stringing chunk: ', body);
        //  response.end(body);
        // console.log('P5/10  storage before body is pushed: ', storage);
      
        storage.push(body);
      // console.log(`P6/10 storage after body is pushed: `, storage);
      }
      
    });
    
    // console.log(`P7/10 response.body before stringify: `, response.body);
    response.body = JSON.stringify({results: storage});
    // console.log(`P8/10 response.body after stringify: `, response.body);
    // console.log('P9/10 this is the status code before setting it: ', statusCode);
    statusCode = 201;
    // console.log('P10/10 this is the status code after setting it: ', statusCode);
    // console.log('============END POST===============');
  } else if (request.method === 'DELETE') { 
    statusCode = 405;
    console.log(statusCode, 'client attempted a delete method ************');
    response.writeHead(statusCode, CorsHeaders);
    response.end();
  } else if (request.url !== '/classes/messages') {
    // console.log('!!!!!!!!!!!NOT SENT TO /classes/messages!!!!!!!!!!');
    statusCode = 404;
  }


  // See the note below about CORS headers.
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = 'text/plain';
  headers['Content-Type'] = 'application/JSON';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.





  // console.log(`PRE-RES.END1/3: response.body: `, response.body);
  // console.log(`PRE-RES.END2/3: response.statusCode: `, response.statusCode);
  // console.log(`PRE-RES.END3/3: free floating headers: `, headers);
  console.log(storage); // expecting a string
  response.end(response.body);
  // console.log(`POST-RES.END1/3: response.body: `, response.body);
  // console.log(`POST-RES.END2/3: response.statusCode: `, response.statusCode);
  // console.log(`POST-RES.END3/3: free floating headers: `, headers);
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

// function stringifyStorage() {
//   return JSON.stringify({results: storage});
// }
exports.requestHandler = requestHandler;


