const baseExpress = require('../utils/base-express.js');
const cors = require('cors')({origin: true});

module.exports = (admin) => {
  const connectSponsorMemberExpress = baseExpress.createBaseExpress();
  // connectSponsorMemberExpress.use(cors({ origin: true }));
  connectSponsorMemberExpress.use(cors);

  connectSponsorMemberExpress.post('/', (req, res) => {
    const { body } = req;
    const { token, sponsorId, sponsorKey, eventId } = body;
    if (!token) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'No auth or uid found'
        });
    }

    if (!sponsorId) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'No sponsorId found'
        });
    }

    if (!sponsorKey) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'No sponsorKey found'
        });
    }

    if (!eventId) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'No eventId found'
        });
    }

    return admin.auth().verifyIdToken(token)
      .then(user => {
        if (!user) {
          const error = {
            status_code: 404,
            message: 'No User found'
          };
          return Promise.reject(error);
        }
        return Promise.all([
          Promise.resolve(user),
          admin.database().ref(`events/${eventId}/sponsor-keys/data/${sponsorId}`).once('value')
        ]);
      })
      .then(results => {
        const [user, snapshot] = results;
        if (!snapshot) {
          const error = {
            status_code: 404,
            message: 'No sponsor key object found'
          };
          return Promise.reject(error);
        }
        const secretKey = snapshot.val();

        if (!secretKey) {
          const error = {
            status_code: 404,
            message: 'No sponsor key found'
          };
          return Promise.reject(error);
        }

        const { uid } = user;
        const updates = {};
        const path = `events/${eventId}/sponsor-members/data/${uid}`;

        updates[path] = {
          sponsorId,
          dateCreated: admin.database.ServerValue.TIMESTAMP
        };

        return admin.database().ref().update(updates);
      })
      .then(() => res.status(200).json({
        success: true
      }))
      .catch(error => {
        console.log(error);
        return res
          .status(error.status_code || 500)
          .json(error);
      });
  });

  return connectSponsorMemberExpress;
};
