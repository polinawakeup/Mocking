import getLevel from '../getLevel';
import fetchData from '../http';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call fetchData with correct url', () => {
  fetchData.mockReturnValue({ status: 'ok', level: 10 });
  getLevel(1);
  expect(fetchData).toHaveBeenCalledWith('https://server/user/1');
});

test('should return user level when status is ok', () => {
  fetchData.mockReturnValue({ status: 'ok', level: 10 });
  const status = getLevel(1);
  expect(status).toBe('Ваш текущий уровень: 10');
});

test('should return error message when status is not ok', () => {
  fetchData.mockReturnValue({ status: 'error', level: '' });
  const status = getLevel(1);
  expect(status).toBe('Информация об уровне временно недоступна');
});
