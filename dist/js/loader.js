/**
 * Created by ryarborough on 12/12/16.
 *
 * TODO: Add asynchronous loader,...require.js to wire up the modules
 */



//invoke the cookie when the document loads completely


/*function onLoad(que) {

    if (onLoad.loaded){
        window.setTimeout(que, 0);
        chocolateChip.start();
        console.log(chocolateChip, 'started');
    }else if (window.addEventListener){
        window.addEventListener("load", que, false);
        chocolateChip.start();
        console.log('registering events', chocolateChip.start);
    }else if (window.attachEvent){
        window.attachEvent("onload", que);
        console.log('ie8 and earlier use this instead');
    }
}


//This logic should be a separate module that initializes or loads this module

//set flag to indicate document has not loaded yet
onLoad.loaded = false;

//trigger event when dom element is clicked
if (document.getElementById("cookie")){
    //initialize the id event
    chocolateChip.id();
    chocolateChip.iframe();
    //register function to set the flag when the document does load
    onLoad(function () {
        onLoad.loaded = true;
        console.log('onLoad event has triggered!');
    });
}
*/
