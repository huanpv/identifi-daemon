define({ "api": [  {    "type": "get",    "url": "/",    "title": "Identifi node information",    "name": "Api",    "group": "Api",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "version",            "description": "<p>Identifi daemon version</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "identifiLibVersion",            "description": "<p>Identifi library version</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "msgCount",            "description": "<p>Number of Identifi messages stored on the node</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "publicKey",            "description": "<p>DER-encoded public key of the node in hex</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "keyID",            "description": "<p>Base 64 encoded hash of the public key</p>"          },          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "loginOptions",            "description": "<p>Array of browser login options provided by the node</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Api",    "sampleRequest": [      {        "url": "/api/"      }    ]  },  {    "type": "get",    "url": "/identities/:pointer_type/:pointer_value/connecting_msgs",    "title": "Connecting messages",    "group": "Identities",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Identities",    "name": "GetIdentitiesPointer_typePointer_valueConnecting_msgs",    "sampleRequest": [      {        "url": "/api/identities/:pointer_type/:pointer_value/connecting_msgs"      }    ]  },  {    "type": "get",    "url": "/identities/:pointer_type/:pointer_value/received",    "title": "Messages received by",    "group": "Identities",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Identities",    "name": "GetIdentitiesPointer_typePointer_valueReceived",    "sampleRequest": [      {        "url": "/api/identities/:pointer_type/:pointer_value/received"      }    ]  },  {    "type": "get",    "url": "/identities/:pointer_type/:pointer_value/sent",    "title": "Messages sent by",    "group": "Identities",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Identities",    "name": "GetIdentitiesPointer_typePointer_valueSent",    "sampleRequest": [      {        "url": "/api/identities/:pointer_type/:pointer_value/sent"      }    ]  },  {    "type": "get",    "url": "/identities/:pointer_type/:pointer_value",    "title": "Identity attributes",    "name": "GetIdentityAttributes",    "group": "Identities",    "description": "<p>Identifi identities are refered to by pointers of unique type, such as &quot;email&quot;, &quot;url&quot;, &quot;bitcoin&quot; or &quot;keyID&quot;.</p> <p>This method returns other identifiers and attributes that are connected to the pointer.</p>",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Identities",    "sampleRequest": [      {        "url": "/api/identities/:pointer_type/:pointer_value"      }    ]  },  {    "type": "get",    "url": "/identities/:pointer_type/:pointer_value/stats",    "title": "Identity stats",    "name": "GetIdentityStats",    "group": "Identities",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "received_positive",            "description": "<p>Number of received positive ratings</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "received_neutral",            "description": "<p>Number of received neutral ratings</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "received_negative",            "description": "<p>Number of received negative ratings</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "sent_positive",            "description": "<p>Number of sent positive ratings</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "sent_neutral",            "description": "<p>Number of sent neutral ratings</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "sent_negative",            "description": "<p>Number of sent negative ratings</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "last_seen",            "description": "<p>ISO timestamp of the earliest message the identity was seen in</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Identities",    "sampleRequest": [      {        "url": "/api/identities/:pointer_type/:pointer_value/stats"      }    ]  },  {    "type": "get",    "url": "/identities/:pointer_type/:pointer_value/verifications",    "title": "Identity verifications",    "name": "GetIdentityVerifications",    "group": "Identities",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Identities",    "sampleRequest": [      {        "url": "/api/identities/:pointer_type/:pointer_value/verifications"      }    ]  },  {    "type": "get",    "url": "/identities",    "title": "List identities",    "name": "ListIdentities",    "group": "Identities",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "viewpoint_name",            "defaultValue": "node viewpoint type",            "description": "<p>Trust viewpoint identity pointer type</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "viewpoint_value",            "defaultValue": "node viewpoint value",            "description": "<p>Trust viewpoint identity pointer value</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "limit",            "defaultValue": "100",            "description": "<p>Limit the number of results</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "offset",            "defaultValue": "0",            "description": "<p>Offset</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "search_value",            "description": "<p>Search identities by attribute value</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "order_by",            "description": "<p>Order by field</p>"          },          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"asc\"",              "\"desc\""            ],            "optional": true,            "field": "direction",            "description": "<p>Order by direction</p>"          }        ]      }    },    "description": "<p>Returns an array of attribute-arrays that form identities.</p>",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Identities",    "sampleRequest": [      {        "url": "/api/identities"      }    ]  },  {    "type": "delete",    "url": "/messages/:hash",    "title": "Delete message",    "name": "DeleteMessage",    "group": "Messages",    "permission": [      {        "name": "admin"      }    ],    "description": "<p>Get message by hash</p>",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Messages"  },  {    "type": "get",    "url": "/messages/:hash",    "title": "Get message",    "name": "GetMessage",    "group": "Messages",    "description": "<p>Get message by hash</p>",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Messages",    "sampleRequest": [      {        "url": "/api/messages/:hash"      }    ]  },  {    "type": "get",    "url": "/messages",    "title": "List messages",    "name": "ListMessages",    "group": "Messages",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "type",            "description": "<p>Message type. In case of rating; :positive, :neutral or :negative can be appended</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "offset",            "defaultValue": "0",            "description": "<p>Offset</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "limit",            "defaultValue": "100",            "description": "<p>Limit the number of results</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "viewpoint_name",            "description": "<p>Trust viewpoint identity pointer type</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "viewpoint_value",            "description": "<p>Trust viewpoint identity pointer value</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "max_distance",            "description": "<p>Maximum trust distance of the message author from viewpoint</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "order_by",            "defaultValue": "timestamp",            "description": "<p>Order by field</p>"          },          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"asc\"",              "\"desc\""            ],            "optional": true,            "field": "direction",            "defaultValue": "desc",            "description": "<p>Order_by direction</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "timestamp_gte",            "description": "<p>Limit by timestamp greater than or equal</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "timestamp_lte",            "description": "<p>Limit by timestamp less than or equal</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Messages",    "sampleRequest": [      {        "url": "/api/messages"      }    ]  },  {    "type": "post",    "url": "/messages",    "title": "Post message",    "name": "PostMessage",    "group": "Messages",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "jws",            "description": "<p>Identifi message as JSON web signature</p>"          }        ]      }    },    "description": "<p>Successfully posted messages are broadcast to other nodes via /api websocket.</p>",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Messages",    "sampleRequest": [      {        "url": "/api/messages"      }    ]  },  {    "type": "get",    "url": "/peers",    "title": "List peers",    "name": "ListPeers",    "group": "Peers",    "version": "0.0.0",    "filename": "apidoc_src/server.js",    "groupTitle": "Peers",    "sampleRequest": [      {        "url": "/api/peers"      }    ]  }] });
