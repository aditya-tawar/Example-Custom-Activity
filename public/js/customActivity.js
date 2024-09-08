// 

define(['postmonger'], function (Postmonger) {
  'use strict'

  var connection = new Postmonger.Session()
  var authTokens = {}
  var payload = {}
  var dataSourcesVar
  var eventKey  // Declare eventKey as a global variable

  $(window).ready(onRender)

  connection.on('initActivity', initialize)
  connection.on('requestedTokens', onGetTokens)
  connection.on('requestedEndpoints', onGetEndpoints)
  connection.on('requestedInteraction', onRequestedInteraction)
  connection.on('requestedTriggerEventDefinition', onRequestedTriggerEventDefinition)
  connection.on('requestedDataSources', onRequestedDataSources)
  connection.on('requestSchema', onRequestedSchema);

  connection.on('clickedNext', save)

  function onRender() {
    console.log("onRender Event Method calling...")
    connection.trigger('ready')
    connection.trigger('requestTokens')
    connection.trigger('requestEndpoints')
    connection.trigger('requestInteraction')
    connection.trigger('requestTriggerEventDefinition')
    connection.trigger('requestDataSources')
    connection.trigger('requestSchema');
  }   

  function onRequestedDataSources(dataSources) {
    console.log("onRequestedDataSources Event Method calling...")
    console.log(dataSources)
    dataSourcesVar = dataSources[0]
    console.log(dataSourcesVar);
  }

  function onRequestedInteraction(interaction) {
    console.log("onRequestedInteraction Event Method calling...")
    console.log(interaction)
  }

  function onRequestedTriggerEventDefinition(eventDefinitionModel) {
    console.log("onRequestedTriggerEventDefinition Event Method calling...")
    console.log(eventDefinitionModel)

    eventKey = eventDefinitionModel.eventDefinitionKey;  // Assign eventKey globally
    console.log("This is your event key:" + eventKey);
  }

  function onRequestedSchema(data) {
    const schema = data['schema'];
    console.log(schema.length)

    for (var i = 0, l = schema.length; i < l; i++) {
      var inArg = {};
      let attr = schema[i].key;
      let keyIndex = attr.lastIndexOf('.') + 1;
      inArg[attr.substring(keyIndex)] = '{{' + attr + '}}';
      payload['arguments'].execute.inArguments.push(inArg);
    }
  }

  function initialize(data) {
    console.log("initialize Event Method calling...")
    console.log(JSON.stringify(data));

    if (data) {
      payload = data
    }

    var hasInArguments = Boolean(
      payload["arguments"] &&
      payload["arguments"].execute &&
      payload["arguments"].execute.inArguments &&
      payload["arguments"].execute.inArguments.length > 0
    );

    var inArguments = hasInArguments ? payload["arguments"].execute.inArguments : {};

    $('#message').val(inArguments.message)
    $('#urlimg').val(inArguments.urlimg)
    $(`#selectBrand option[value=${inArguments.brand}]`).prop('selected', true)

    connection.trigger('updateButton', {
      button: 'next',
      text: 'done',
      visible: true,
    })
  }

  function onGetTokens(tokens) {
    console.log("onGetTokens Event Method calling...")
    console.log(tokens)
    authTokens = tokens
  }

  function onGetEndpoints(endpoints) {
    console.log("onGetEndpoints Event Method calling...")
    console.log(endpoints)
  }

  function save() {
    console.log("save Event Method calling...")
    try {
      // Get value from Iframe
      const message = $('#message').val()
      const urlimg = $('#urlimg').val()
      const brand = $('#selectBrand option').filter(':selected').val()

      let nPayload = {
        message,
        urlimg,
        brand,
      }

      // Ensure eventKey is defined before using it
      if (!eventKey) {
        throw new Error("eventKey is undefined");
      }

      var params =
        {
          nPayload: nPayload,
          TelegramID: '{{Event.' + eventKey + '.TelegramID}}',
          name: '{{Event.' + eventKey + '.Name}}',
          phone: '{{Event.' + eventKey + '.Phone}}'        
        }

      payload["arguments"].execute.inArguments = [params];
      payload['metaData'].isConfigured = true
      console.log(JSON.stringify(payload['arguments'].execute.inArguments));

      connection.trigger('updateActivity', payload)

    } catch (err) {
      console.log("Error while calling save method of Custom Activity")
      console.log(err)
    }
  }
})
