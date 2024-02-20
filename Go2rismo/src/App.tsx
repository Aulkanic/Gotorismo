
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RouterUrl } from './routes';
import { LandingPage } from './pages/public/landingPage';
import { Public } from './layout';
import { Error } from './pages/error/error';
import { Signup } from './pages/public/Signup/signup';
function App() {
  const router = createBrowserRouter([
    {
      path: RouterUrl.LANDINGPAGE,
      element: <Public />,
      errorElement: <Error />,
      children:[
        {
          path: RouterUrl.LANDINGPAGE,
          element:<LandingPage />
        },
        {
          path: RouterUrl.SIGNUPPAGE,
          element:<Signup />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} fallbackElement={<h6>Loading...</h6>} />
  )
}

export default App
