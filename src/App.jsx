import Theme from './components/theme/Theme'
import { BrowserRouter } from "react-router-dom";
import Router from './components/router/Router'
import Notification from './components/notification/Notification';
import Store from './store/Store'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Drawer from './components/drawer/Drawer'
import db from "../firebase";
import PushNotification from './components/notification/PushNotification';

const queryClient = new QueryClient()

function App() {

  return (
    <BrowserRouter>
      <Store>
        <Theme>
        <Notification />

          <QueryClientProvider client={queryClient}>
            <PushNotification />
            <Drawer>
              <Router />
            </Drawer>
           
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </Theme>
      </Store>
    </BrowserRouter>
  )
}

export default App
