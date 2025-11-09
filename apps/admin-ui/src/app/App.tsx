import { RouterProvider } from 'react-router';

import { adminRouter } from '../router';

export function App() {

  return (
    <div>
      <RouterProvider router={adminRouter} />
    </div>
  );
}

export default App;
