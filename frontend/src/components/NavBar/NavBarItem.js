import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VillaIcon from "@mui/icons-material/Villa";
import PaidIcon from "@mui/icons-material/Paid";
import BuildIcon from "@mui/icons-material/Build";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import EventIcon from "@mui/icons-material/Event";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";

export const NavBarItems = [
  {
    id: 1,
    icon: <NotificationsIcon />,
    label: "Notifications",
    shortLabel: "Notifications",
    route: "notifications",
  },
  {
    id: 2,
    icon: <PeopleIcon />,
    label: "Teams",
    shortLabel: "Teams",
    route: "teams",
  },
  {
    id: 3,
    icon: <VillaIcon />,
    label: "Properties",
    shortLabel: "Properties",
    route: "properties",
  },
  {
    id: 3,
    icon: <PaidIcon />,
    label: "Sell Property",
    shortLabel: "Sell",
    route: "sellproperty",
  },
];

export const NPCItems = [
  {
    id: 4,
    icon: <PaidIcon />,
    label: "Set Money",
    shortLabel: "Money",
    route: "setmoney",
  },
  {
    id: 5,
    icon: <RequestQuoteIcon />,
    label: "Set Ownership",
    shortLabel: "Ownership",
    route: "setownership",
  },
  {
    id: 6,
    icon: <CurrencyExchangeIcon />,
    label: "Transfer",
    shortLabel: "Transfer",
    route: "transfer",
  },
  {
    id: 7,
    icon: <ShoppingCartIcon />,
    label: "Set Shop",
    shortLabel: "Shop",
    route: "setshop",
  },
];

export const adminItems = [
  {
    id: 8,
    icon: <EventIcon />,
    label: "Event / Phase",
    shortLabel: "Event",
    route: "event",
  },
  {
    id: 9,
    icon: <AddToQueueIcon />,
    label: "Additional",
    shortLabel: "Additional",
    route: "additional",
  },
  {
    id: 10,
    icon: <BuildIcon />,
    label: "Set Occupation",
    shortLabel: "Occupation",
    route: "setoccupation",
  },
];

// export const Navigate = (path) => {
//   const { setNavBarId } = useContext(RoleContext);
//   const navigate = useNavigate();

//   const itemMap = {
//     ...NavBarItems,
//     ...NPCItems,
//     ...adminItems,
//   };
//   setNavBarId(itemMap.find((item) => item.route === path).id);

//   return () => navigate(path);
// };
