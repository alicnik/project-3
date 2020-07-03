const User = require('../models/userModel')
const jsonwebtoken = require('jsonwebtoken')
const secret = 'campgrounds are the same as campsites and area 51 is a rec area but trump did not want you to know'

function register(req, res) {
  User
    .create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(error => res.status(400).send(error))
}

function login(req, res) {
  User
    .findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
    .then(user => {
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Passwords do not match' })
      }
      const token = jsonwebtoken.sign({ sub: user._id }, secret, { expiresIn: '12h' })
      res.status(202).send({ message: `Welcome back to the Wilderness ${user.username}`, token })
    })
    .catch(error => res.status(403).send(error))
}

const getAllUsers = (req, res) => User.find().then(users => res.status(200).send(users))

module.exports = {
  register,
  login,
  getAllUsers
}
phone: '435-384-2372',
  email: 'r4_m-l_ferron@fs.fed.us',
  address1: '14 Miller Road',
  address2: 'The Flats',
  city: 'Salt Lake City',
  state: 'UT',
  accessible: false,
  longitude: -111.2510361,
  latitude: 39.5222167,
  attributes: [{ petsAllowed: false }, { checkInTime: '01:00PM' }, { checkOutTime: '01:00PM' }],
  m
edia: [{ title: 'Miller Flat Reservoir Campground', url: 'https://cdn.recreation.gov/public/2019/12/06/13/55/258693_2e35e952-1fcc-4a04-b2db-6d5c4ccac735.jpeg' }]
})
hen(returnedCampgrounds => {
    turn RecArea.create({
      ridbRecAreaId: '1033',
      name: 'Manti-La Sal National Forest',
      description: 'Do you love the outdoors?  You can find something fun to do on The Manti-La Sal National Forest.',
      phone: '605-745-5476',
      email: 'thecamp@mlsforest.com',
      address1: 'Manti-La Sal National Forest',
      address2: 'Some forest somewhere over the rainbow',
      website: 'www.beavercreek.com',
      city: 'Salt Lake City',
      state: 'Utah',
      longitude: -111.272176,
      latitude: 39.300027,
      lastUpdated: '2020-03-20',
      dia: {
        _id: '5efe1fb02f0d4e28b5d047e7',
        title: 'Rocky Mountains on the Grand Avenue Tour.',
        url: 'https://cdn.recreation.gov/public/2018/08/14/14/46/59f83109-847e-44d2-945d-04608ff895eb_1600.jpg'
      },
      campgrounds: [returnedCampgrounds[0], returnedCampgrounds[1]]
    })
  })
  .then(() => done())
})

terEach(done => {
mpground
  .deleteMany()
hen(() => {
  cArea
    .deleteMany()
    .then(() => done())
})

})

}) done()
})
})

it('should be an array with 2 items', done => {
api.get('/api/campgrounds')
  .end((err, res) => {
    expect(res.body).to.be.an('array')
    expect(res.body.length).to.be.eq(5)
    done()
  })
})

})