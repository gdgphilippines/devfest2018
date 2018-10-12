const baseExpress = require('../utils/base-express.js');
const cors = require('cors')({origin: true});

module.exports = (admin) => {
  const sponsorScanMemberExpress = baseExpress.createBaseExpress();
  // sponsorScanMemberExpress.use(cors({ origin: true }));
  sponsorScanMemberExpress.use(cors);

  sponsorScanMemberExpress.post('/', (req, res) => {
    const { body } = req;
    const { token, sponsorId, eventId, ticketId } = body;
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

    if (!ticketId) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'No ticketId found'
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
          admin.database().ref(`events/${eventId}/reverse-tickets/data/${ticketId}`).once('value')
        ]);
      })
      .then(results => {
        const [user, snapshot] = results;
        if (!snapshot) {
          const error = {
            status_code: 404,
            message: 'Ticket hasn\'t been connected to an account...'
          };
          return Promise.reject(error);
        }
        const ticket = snapshot.val();

        if (!ticket) {
          const error = {
            status_code: 404,
            message: 'Ticket hasn\'t been connected to an account...'
          };
          return Promise.reject(error);
        }

        const { informationConsent, age, email, gender, name, phone, positionType } = ticket;

        if (!informationConsent || informationConsent.toLowerCase() === 'no') {
          const error = {
            status_code: 404,
            message: 'User doesn\'t explicitly consent sharing of information to sponsors... Please ask him/her to check his/her account.'
          };
          return Promise.reject(error);
        }

        const { uid, displayName, email: userEmail } = user;
        const updates = {};
        const path = `events/${eventId}/sponsor-scanned/lists/sponsors/${sponsorId}/${ticketId}`;

        updates[path] = {
          name,
          email,
          age,
          gender,
          phone,
          positionType,
          scannedBy: userEmail || displayName || uid,
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

  return sponsorScanMemberExpress;
};
