
import { Navigate } from 'react-router-dom';

const Index = () => {
  // This is a redirect page, it will redirect to the dashboard
  return <Navigate to="/dashboard" replace />;
};

export default Index;
