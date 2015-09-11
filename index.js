var five = require("johnny-five"),
board, button;

board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button1 = new five.Button({
    board: board,
    pin: 2,
    holdtime: 500,
    invert: false // Default: "false".  Set to "true" if button is Active-Low
  });
  button2 = new five.Button({
    board: board,
    pin: 3,
    holdtime: 500,
    invert: false // Default: "false".  Set to "true" if button is Active-Low
  });

  var led = new five.Led(11);
  var brightness = 0; //start brightness
  
  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button1: button1, 
	button2: button2, 
  });

  // Button Event API

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button1.on("hold", function() {
	brightness = brightness+10
	if (brightness>255) brightness = 255;
	led.brightness(brightness); 
	console.log(brightness);	
  });
  button2.on("hold", function() {
	brightness = brightness-10
	if (brightness<0) brightness = 0;
	led.brightness(brightness); 
	console.log(brightness);	
  });

  /*
  // "down" the button is pressed
  button1.on("down", function() {
    console.log("down");
  });
  
  // "up" the button is released
  button1.on("up", function() {
    console.log("up");
  });
  */
});