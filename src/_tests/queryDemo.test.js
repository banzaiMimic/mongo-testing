const { MongoClient } = require('mongodb')

const DB_COLLECTION = 'jest'

describe('insert', () => {
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db(globalThis.__MONGO_DB_NAME__)
  })

  afterEach(async () => {
    const collections = connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany()
    }
  })

  afterAll(async () => {
    await connection.close()
  })

  test('basic insert', async () => {
    const users = db.collection(DB_COLLECTION)

    const mockUser = { _id: 'some-user-id', name: 'dev' }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ _id: 'some-user-id' })
    expect(insertedUser).toEqual(mockUser)

  })

  test('dummy query?', async() => {

    const users = db.collection(DB_COLLECTION)

    const mockUser0 = { _id: 'some-user-id-0', name: 'dev1' }
    await users.insertOne(mockUser0)

    const insertedUser = await users.findOne({ _id: 'some-user-id-0' })
    expect(insertedUser).toEqual(mockUser0)

    let query = [
      {
        $facet: {
          "demoFacet": [
            {
              $project: {
                name: "$name"
              }
            },
            {
              $group: {
                _id: null,
                name: { "$last": "$name" }
              }
            },
            {
              $project: {
                _id: 0,
                name: 1
              }
            }
          ]
        }
      },
      {
        $project: {
          demoName: "$demoFacet.name",
        }
      }
    ]
    let data = await db.collection(DB_COLLECTION).aggregate(query).toArray();
    
    const expected = [{
      demoName: [ 'dev1' ]
    }]
    expect(data).toEqual(expected)

    // [DEMO] modify some data...
    const dataUpdate = Object.assign([], data)
    dataUpdate[0]['modifiedParam'] = data[0].demoName

    expect(dataUpdate).toEqual([{
      ...data[0],
      modifiedParam: [ 'dev1' ]
    }])

  })

})