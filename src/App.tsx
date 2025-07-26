import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import { router } from './router';


function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
