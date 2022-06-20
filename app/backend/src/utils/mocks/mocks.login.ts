const adminEmail = 'admin@admin.com';

export const LOGIN_RETURNS_OK = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: adminEmail,
};

export const MODEL_FIND_ONE = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: adminEmail,
  password: '2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const CORRECT_DATA = {
  email: adminEmail,
  password: 'secret_admin',
};

export const NO_EMAIL = {
  password: '123456',
};

export const INCORRECT_EMAIL = {
  email: 'hgfhd@gmail.com',
  password: 'secret_admin',
};

export const INCORRECT_PASSWORD = {
  email: adminEmail,
  password: '12356789',
};

export const EMPTY_EMAIL = {
  email: '',
  password: 'secret_admin',
};

export const WITHOUT_EMAIL = {
  password: 'secret_admin',
};

export const EMPTY_PASSWORD = {
  email: 'admin@admi.com',
  password: '',
};

export const WITHOUT_PASSWORD = {
  email: adminEmail,
};

export const BAD_REQUEST = {
  message: 'All fields must be filled',
};

export const RETURN_CREATE_TRUE = {
  id: 49,
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
};
