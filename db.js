const MongoClient = require('mongodb').MongoClient;
const password = process.env.mongodb_pass
const uri = "mongodb://admin:"+password+"@cluster0-shard-00-00-sl1vs.mongodb.net:27017,cluster0-shard-00-01-sl1vs.mongodb.net:27017,cluster0-shard-00-02-sl1vs.mongodb.net:27017/Shop_app?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

// const uri = "mongodb+srv://admin:"+password+"@cluster0-sl1vs.mongodb.net/Shop_app?retryWrites=true&w=majority";

function connect()
{
    return MongoClient.connect(uri,{ useUnifiedTopology: true })
}

module.exports={
    connect
}


