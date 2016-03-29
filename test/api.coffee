###global describe, it, after, before ###

'use strict'
process.env.NODE_ENV = 'test'
fs = require('fs')
errors = require('request-promise/errors')
config = require('config')
identifi = require('identifi-lib/client')
message = require('identifi-lib/message')
chai = require('chai')
chaiAsPromised = require('chai-as-promised')
chai.should()
chai.use chaiAsPromised

privKey = '-----BEGIN EC PRIVATE KEY-----\n' + 'MHQCAQEEINY+49rac3jkC+S46XN0f411svOveILjev4R3aBehwUKoAcGBSuBBAAK\n' + 'oUQDQgAEKn3lQ3+/aN6xNd9DSFrYbaPSGOzLMbb1kQZ9lCMtwc6Og4hfCMLhaSbE\n' + '3sXek8e2fvKrTp8FY1MyCL4qMeVviA==\n' + '-----END EC PRIVATE KEY-----'
m = null

cleanup = ->
  fs.unlink './identifi_test.db', (err) ->
  fs.unlink './identifi_test.log', (err) ->

describe 'API', ->
  server = undefined
  before ->
    cleanup()
    # After hook fails to execute when errors are thrown
    server = require('../server.js')
    identifi.apiRoot = 'http://localhost:8081/api'
  after cleanup
  after ->
    console.log 'Test server at ' + config.get('port') + ' shutting down'
    server.close()
  it 'should return server status', ->
    identifi.request
      apiMethod: 'status'
  describe 'messages', ->
    describe 'create', ->
      it 'should add a rating message', ->
        m = message.createRating
          author: [['email', 'alice@example.com']]
          recipient: [['email', 'bob@example.com']]
          rating: 10
        message.sign(m, privKey, 'keyID')
        r = identifi.request
          method: 'POST'
          apiMethod: 'messages'
          body: m
      it 'should add another rating message', ->
        m = message.createRating
          author: [['email', 'bob@example.com']]
          recipient: [['email', 'charles@example.com']]
          rating: 10
        message.sign(m, privKey, 'keyID')
        r = identifi.request
          method: 'POST'
          apiMethod: 'messages'
          body: m
      it 'one more', ->
        m = message.createRating
          author: [['email', 'charles@example.com']]
          recipient: [['email', 'david@example.com']]
          rating: 10
        message.sign(m, privKey, 'keyID')
        r = identifi.request
          method: 'POST'
          apiMethod: 'messages'
          body: m
      it 'add a connection msg', ->
        m = message.create
          author: [['email', 'alice@example.com']]
          recipient: [['email', 'bob@example.com'], ['name', 'Bob the Builder']]
          type: 'confirm_connection'
        message.sign(m, privKey, 'keyID')
        r = identifi.request
          method: 'POST'
          apiMethod: 'messages'
          body: m
    describe 'retrieve', ->
      it 'should fail if the message was not found', ->
        r = identifi.request
              apiMethod: 'messages'
              apiId: '1234'
        r.should.be.rejectedWith Error
      it 'should return the previously saved message', (done) ->
        r = identifi.request
          apiMethod: 'messages'
          apiId: m.hash
        r.then (res) ->
          res.hash.should.equal m.hash
          done()
    describe 'list', ->
      it 'should list messages ordered by date', (done) ->
        r = identifi.request
          apiMethod: 'messages'
        r.then (res) ->
          res[0].hash.should.equal m.hash
          done()
      it 'should filter messages by type', (done) ->
        r = identifi.request
          apiMethod: 'messages'
          qs:
            type: 'rating'
        r.then (res) ->
          msg.type.should.equal 'rating' for msg in res
          done()
      it 'should filter messages by viewpoint', (done) ->
        r = identifi.request
          apiMethod: 'messages'
          qs:
            viewpoint_type: 'email'
            viewpoint_value: 'alice@example.com'
            max_distance: 1
        r.then (res) ->
          res.length.should.equal 3
          done()
    describe 'delete', ->
      it 'should fail if the message was not found', ->
        r = identifi.request
          apiMethod: 'messages'
          apiId: '1234'
          method: 'DELETE'
        r.should.be.rejectedWith Error
      it 'should delete the previously saved message', (done) ->
        r = identifi.request
          apiMethod: 'messages'
          apiId: m.hash
          method: 'DELETE'
        r.then (res) ->
          res.should.equal 'OK'
          done()
      it 'should have removed the message', ->
        r = identifi.request
              apiMethod: 'messages'
              apiId: m.hash
        r.should.be.rejectedWith Error
  describe 'identifiers', ->
    describe 'search', ->
      it 'should return matching identifiers / identities ordered by trust distance'
      it 'should return a list of peers as identifi identities'
    describe 'overview', ->
      it 'should return an overview of an identifier'
    describe 'connections', ->
      it 'should return an identity, i.e. set of identifiers connected to the query param'
    describe 'connectingmsgs', ->
        it 'should messages that connect id1 and id2 to the same identity'
    describe 'sent', ->
      it 'should return messages sent by an identifier / identity'
    describe 'received', ->
      it 'should return messages received by an identifier / identity'
    describe 'getname', ->
      it 'should return a cached common name for the identifier'
    describe 'trustpaths', ->
      it 'should trustpaths from id1 to id2'