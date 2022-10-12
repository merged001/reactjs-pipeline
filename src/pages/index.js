import WalletConnect from "./WalletConnect";
import Login from "./Login";
import SignUp from "./SignUp";
import DirectBuy from "./DirectBuy";
import LiveAuction from "./LiveAuction";
import Explore from "./DirectBuy";
import UserProfile from "./UserProfile";
import HomePage from "./HomePage";

const routes = [
  { path: "/", component: <HomePage /> },
  { path: "/wallet-connect", component: <WalletConnect /> },
  { path: "/login", component: <Login /> },
  { path: "/sign-up", component: <SignUp /> },
  { path: "/direct-buy", component: <DirectBuy /> },
  { path: "/auction", component: <LiveAuction /> },
  { path: "/explore", component: <Explore /> },
  { path: "/user", component: <UserProfile /> },
];

export default routes;
