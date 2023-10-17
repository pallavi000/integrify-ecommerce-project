import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "./redux/store";

// Reducer
import { getCurrentUser } from "./redux/reducers/authReducer";
import AppRouter from "./routes/AppRouter";

// components
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  // App Dispatch
  const dispatch = useAppDispatch();

  // Auth States
  const { access_token, user } = useSelector((state: AppState) => ({
    access_token: state.auth.access_token,
    user: state.auth.user,
  }));

  // Get current user
  useEffect(() => {
    if (access_token && !user) {
      dispatch(getCurrentUser());
    }
  }, [access_token, user, dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <AppRouter />
    </Router>
  );
};

export default App;
