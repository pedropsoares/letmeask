import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { AdminRoom } from "./pages/AdminRoom";
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/admin/room/:id" component={AdminRoom} />
          <Route path="/room/new" component={NewRoom} />
          <Route path="/room/:id" component={Room} />
          <Route path="/" exact component={Home} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
