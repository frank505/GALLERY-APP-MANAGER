import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routes from './routes/route';

// jest.mock('./routes/route');

const renderComponent = () =>
{
  return render(
    <Provider store={store}>
      <App/>
    </Provider>
  );
}

test('renders app component', async () => {
  const elemCalled = renderComponent();
   const { findByTestId } = elemCalled;
   expect(await findByTestId("app-data-id")).toBeTruthy();
});
