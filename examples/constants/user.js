const blacklist = [
  'refreshToken',
  'email',
  'facebookID',
  'password',
  'deviceID',
  'updated_at',
  'lastVisit',
  'created_at',
  'lastUpdate',
  'ipLastVisit',
  'activationCode',
  'lostPassword',
  'lostPasswordTime',
  'authyID',
  'isBan',
  'isActivated',
  'refreshToken',
];

const privateBlacklist = [
  'refreshToken',
  'lostPassword',
  'lostPasswordTime',
  'authyID',
  'isBan',
  'password',
  'facebookID',
  'deviceID',
];

const privateSelect =
  'fullname primaryLanguage role email lastVisit isActivated profilePicture authorized authorizedTime activationCode url';

const select = 'fullname primaryLanguage role url profilePicture';

module.exports = {
  blacklist,
  select,
  privateBlacklist,
  privateSelect,
};
