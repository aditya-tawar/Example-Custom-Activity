define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';
    console.log("in the custom activity ");
    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [ // initialize to the same value as what's set in config.json for consistency
        { "label": "Create SMS Message", "key": "step1" }
    ];
    var currentStep = steps[0].key;

    console.log("Before windows is ready");
    $(window).ready(onRender);
    console.log("Before initializing");
    connection.on('initActivity', initialize);
    console.log("Before requesting tokens");
    connection.on('requestedTokens', onGetTokens);
    console.log("Before requesting endpoints");
    connection.on('requestedEndpoints', onGetEndpoints);
    console.log("After requesting endpoints");

    connection.on('clickedNext', save);
    console.log("After clicking done");
    //connection.on('clickedBack', onClickedBack);
    //connection.on('gotoStep', onGotoStep);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        console.log("Entered onRender function");
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    var eventDefinitionKey;
    connection.on("requestedTriggerEventDefinition", function (
    eventDefinitionModel
    ) {
        if (eventDefinitionModel) {
        eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
        }
    });

  function initialize(data) {
        console.log("Initializing data data: "+ JSON.stringify(data));
        if (data) {
            payload = data;
        }    

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
         );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log('Has In arguments: '+JSON.stringify(inArguments));

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {

                if (key === 'accountSid') {
                    $('#accountSID').val(val);
                }

                if (key === 'authToken') {
                    $('#authToken').val(val);
                }

                // if (key === 'messagingService') {
                //     $('#messagingService').val(val);
                // }

                if (key === 'body') {
                    $('#messageBody').val(val);
                }                                                               

            })
        });

        console.log("Before changing the button to done");
        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });

    }

    function onGetTokens (tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        console.log("Tokens function: "+JSON.stringify(tokens));
        //authTokens = tokens;
    }

    function onGetEndpoints (endpoints) {
         //Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
        console.log("Get End Points function: "+JSON.stringify(endpoints));
    }

    function save() {

        console.log("Entered save function");
        var accountSid = $('#accountSid').val();
        var authToken = $('#authToken').val();
    //    var messagingService = $('#messagingService').val();
        var body = $('#messageBody').val();
        console.log("in the save option "+ body);
        
        console.log("Before populating the payload");
        payload['arguments'].execute.inArguments = [{
            "accountSid": accountSid,
            "authToken": authToken,
    //        "messagingService": messagingService,
            "body": body,
            "to": "{{Events."+eventDefinitionKey+".telegramid}}" ,//<----This should map to your data extension name and phone number column
           
        }];       
        payload['metaData'].isConfigured = true;
        console.log("Payload on SAVE function: "+JSON.stringify(payload));
        connection.trigger('updateActivity', payload);
        console.log("after triggering the update activity");
    }                    
x``
});