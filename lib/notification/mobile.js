// lib/notifcation/mobile.js
const Customer = require("../../models/Customer");

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// initialize firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// send mobile notification on new offer

const sendMobileNotification = async () => {
  try {
    const customers = await Customer.find({ fcmToken: { $ne: null } });

    const registrationTokens = customers.map((customer) => customer.fcmToken);

    const message = {
      notification: {
        title: "New Offers Available!",
        body: "Check out our latest discounts and promotions!",
      },
      // data: {
      //   key1: "value1",
      //   key2: "value2",
      // },
      tokens: registrationTokens,
    };

    if (registrationTokens.length > 0) {
      admin
        .messaging()
        .sendEachForMulticast(message)
        .then((response) => {
          console.log(
            `${response.successCount} messages were sent successfully`
          );
        })
        .catch(console.error);

      //   const response = await admin
      //     .messaging()
      //     .sendToDevice(registrationTokens, message);
      //   console.log("Successfully sent message:", response);
    } else {
      console.log("No FCM tokens found to send notifications.");
    }
  } catch (error) {
    console.error("Error sending mobile notification:", error);
  }
};

const sendNewOfferNotification = async (coupon) => {
  try {
    const customers = await Customer.find({ fcmToken: { $ne: null } });

    const registrationTokens = customers.map((customer) => customer.fcmToken);

    const message = {
      notification: {
        title: "New Offers Available!",
        body: "Check out our latest discounts and promotions!",
      },
    };

    if (registrationTokens.length > 0) {
      const response = await admin
        .messaging()
        .sendToDevice(registrationTokens, message);
      console.log("Successfully sent new offer notification:", response);
    } else {
      console.log("No FCM tokens found to send new offer notifications.");
    }
  } catch (error) {
    console.error("Error sending new offer notification:", error);
  }
};

module.exports = { sendMobileNotification };
