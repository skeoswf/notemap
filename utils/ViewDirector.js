import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

const publicRoutes = ['/about'];

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  if (userLoading) {
    return <Loading />;
  }

  if (user) {
    document.body.style.backgroundImage = "url('/image-assets/landing_background.png')";
    document.body.style.backgroundSize = 'cover';
  }

  if (!user && !publicRoutes.includes(pathname)) {
    document.body.style.backgroundImage = "url('/image-assets/signin_background.png')";
    document.body.style.backgroundSize = 'cover';
    return <Signin />;
  }

  return <Component {...pageProps} />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
