const JWT_SECRET = '64b47cd7d12efe505db55667';

const ERROR_CODE_UNIQUE = 11000;
const STATUS_OK = 200;
const STATUS_OK_201 = 201;

const DUPLICATED_USER_ERROR = 'Пользователь с таким email уже зарегистрирован';
const LOGIN_ERROR = 'Неправильная почта или пароль';
const NOT_FOUND_USER_ERROR = 'Указанный пользователь не найден.';
const BAD_REQUEST_USER_ERROR = 'Переданы некорректные данные при создании пользователя';
const BAD_REQUEST_ERROR = 'Переданы некорректные данные';
const NOT_FOUND_ID_ERROR = 'Ресурс с таким ID не найден.';
const FORBIDDEN_ERROR = 'Недостаточно прав.';
const SERVER_ERROR = 'На сервере произошла ошибка.';
const VALIDATION_URL_ERROR = 'Некорректный URL';
const VALIDATION_EMAIL_ERROR = 'Некорректный email';
const SUCCESSFUL_AUTHORIZATION = 'Вы успешно авторизованны';

module.exports = {
  JWT_SECRET,
  NOT_FOUND_ID_ERROR,
  DUPLICATED_USER_ERROR,
  FORBIDDEN_ERROR,
  SERVER_ERROR,
  LOGIN_ERROR,
  VALIDATION_URL_ERROR,
  VALIDATION_EMAIL_ERROR,
  NOT_FOUND_USER_ERROR,
  BAD_REQUEST_USER_ERROR,
  BAD_REQUEST_ERROR,
  STATUS_OK,
  ERROR_CODE_UNIQUE,
  STATUS_OK_201,
  SUCCESSFUL_AUTHORIZATION,
};
