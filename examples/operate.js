
var env = require('./env')
var aerospike = require('aerospike')

var status = aerospike.Status
var policy = aerospike.Policy
var client = aerospike.connect(env.config)


// No of operations to be performed
var n = env.nops
var m = 0

console.time(n + " operate");
for (var i = 0; i < n; i++ ) {

  var k1 = {
    ns: env.namespace,
    set: env.set,
    key: "value"+i
  }

  // Form an array of all the operation that has to be performed, in this operate function call.
  var ops = [
    { operation: operations.INCR, binName: 'i', binValue: i },
    { operation: operations.APPEND, binName: 's', binValue: "append_str" },
    { operation: operations.READ, binName: 'i' }
  ]

  var op_list = {
    binOps: ops
  }

  // This function increments the bin 'i' by the value i and
  // append the value 'append_str' to the bin 's'.
  client.operate(k1,op_list, function(err, rec, meta) {
   if ( err.code != status.AEROSPIKE_OK ) {
      // err.code AEROSPIKE_OK signifies the successful 
      // completion of the operation.
      console.log("error %s",err.message)
    }
    if ( (++m) == n ) {
      console.timeEnd(n + " operate")
    }
  })
}