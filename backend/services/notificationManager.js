
const cron = require('node-cron');
const Item = require('./models/item'); //mongoose model for items
const NotificationService = require('./services/notificationService'); //notification service module

// function to check product quantity and send notifications
const checkProductQuantityAndSendNotification = async () => {
  try {
    // Find all items with quantity less than 10
    const lowQuantityItems = await Item.find({ quantity: { $lt: 10 } });

    // If there are low quantity items, send notifications
    if (lowQuantityItems.length > 0) {
      // Generate notification message
      const message = `The following products are running low:\n${lowQuantityItems.map(item => `${item.name}: ${item.quantity}`).join('\n')}`;

      // Send notification to supplier manager
      NotificationService.sendNotification(message, 'Supplier Manager');
    }
  } catch (error) {
    console.error('Error checking product quantity and sending notification:', error);
  }
};

// Schedule the function to run daily at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running daily check for low quantity products...');
  checkProductQuantityAndSendNotification();
});
