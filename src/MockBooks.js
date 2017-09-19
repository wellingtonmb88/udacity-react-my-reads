const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const book = '{"title":"The Linux Command Line","authors":["William E. Shotts, Jr."],'
  + '"id":"nggnmAEACAAJ","shelf":"currentlyReading"}';

export const books = '[{"title":"The Linux Command Line","authors":["William E. Shotts, Jr."],'
  + '"id":"nggnmAEACAAJ","shelf":"currentlyReading"}]';

export const emptyBooks = '[]';

export const fetchWithBookResult = jest.fn(() => new Promise(resolve => resolve(mockResponse(200, null, '{"book":' + book + '}'))));

export const fetchWithBooksResult = jest.fn(() => new Promise(resolve => resolve(mockResponse(200, null, '{"books":' + books + '}'))));


export const fetchWithNoResult = jest.fn(() => new Promise(resolve => resolve(mockResponse(200, null, '{"books":' + emptyBooks + '}'))));