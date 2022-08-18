import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import testData from '../../cypress/mocks/testData';

describe('It tests the full application', () => {
  const api = () => {
    globalThis.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
  };

  beforeEach(api);
  afterEach(cleanup);

  it('tests if the application shows a table header on the screen', async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const tableHeaderName = await screen.findByText(/name/i);
    expect(tableHeaderName).toBeInTheDocument();
  });

  it('tests if the inputs on the application works as they should', async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const ROWS_NUMBER = 11;

    await waitFor(() => {
      const teste = screen.getAllByRole('row');
      expect(teste).toHaveLength(ROWS_NUMBER);
    });

    const nameInputSearch = screen.getByRole('textbox');
    expect(nameInputSearch).toBeInTheDocument();

    userEvent.type(nameInputSearch, 'ta');
    expect(nameInputSearch.value).toEqual('ta');

    const planetName = await screen.findByRole('cell', { name: /tatooine/i });
    expect(planetName).toBeInTheDocument();
  });
});
