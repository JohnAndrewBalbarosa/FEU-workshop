import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { WorkLayout } from './layouts/WorkLayout';
import { Root } from './pages/Root';
import { Work } from './pages/Work';
import { WorkDomain } from './pages/WorkDomain';
import { About } from './pages/About';
import { Receipts } from './pages/Receipts';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Root /> },
      {
        path: 'work',
        element: <WorkLayout />,
        children: [
          { index: true, element: <Work /> },
          { path: ':domain', element: <WorkDomain /> },
        ],
      },
      { path: 'about', element: <About /> },
      { path: 'receipts', element: <Receipts /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
