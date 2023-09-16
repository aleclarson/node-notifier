const os = require('os');
const utils = require('./lib/utils');

// All notifiers

const options = { withFallback: true };

switch (utils.isWSL() ? 'WSL' : os.type()) {
  case 'Linux':
    const NotifySend = require('./notifiers/notifysend');
    module.exports = new NotifySend(options);
    module.exports.Notification = NotifySend;
    module.exports.NotifySend = NotifySend;
    break;
  case 'Darwin':
    const NotificationCenter = require('./notifiers/notificationcenter');
    module.exports = new NotificationCenter(options);
    module.exports.Notification = NotificationCenter;
    module.exports.NotificationCenter = NotificationCenter;
    break;
  case 'Windows_NT':
    if (utils.isLessThanWin8()) {
      const WindowsBalloon = require('./notifiers/balloon');
      module.exports = new WindowsBalloon(options);
      module.exports.Notification = WindowsBalloon;
      module.exports.WindowsBalloon = WindowsBalloon;
    } else {
      const WindowsToaster = require('./notifiers/toaster');
      module.exports = new WindowsToaster(options);
      module.exports.Notification = WindowsToaster;
      module.exports.WindowsToaster = WindowsToaster;
    }
    break;
  case 'WSL':
    const WindowsToaster = require('./notifiers/toaster');
    module.exports = new WindowsToaster(options);
    module.exports.Notification = WindowsToaster;
    module.exports.WindowsToaster = WindowsToaster;
    break;
  default:
    if (os.type().match(/BSD$/)) {
      const NotifySend = require('./notifiers/notifysend');
      module.exports = new NotifySend(options);
      module.exports.Notification = NotifySend;
      module.exports.NotifySend = NotifySend;
    } else {
      const Growl = require('./notifiers/growl');
      module.exports = new Growl(options);
      module.exports.Notification = Growl;
      module.exports.Growl = Growl;
    }
}
