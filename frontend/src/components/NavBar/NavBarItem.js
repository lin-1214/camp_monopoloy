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
    route: "notifications",
  },
  {
    id: 2,
    icon: <PeopleIcon />,
    label: "Teams",
    route: "teams",
  },
  {
    id: 3,
    icon: <VillaIcon />,
    label: "Properties",
    route: "properties",
  },
];

export const NPCItems = [
  {
    id: 4,
    icon: <PaidIcon />,
    label: "Add Money",
    route: "setmoney",
  },
  {
    id: 5,
    icon: <RequestQuoteIcon />,
    label: "Ownership",
    route: "setownership",
  },
  {
    id: 6,
    icon: <CurrencyExchangeIcon />,
    label: "Transfer",
    route: "transfer",
  },
  {
    id: 7,
    icon: <ShoppingCartIcon />,
    label: "Set Shop",
    route: "setshop",
  },
];

export const adminItems = [
  {
    id: 8,
    icon: <EventIcon />,
    label: "Event / Phase",
    route: "event",
  },
  {
    id: 9,
    icon: <AddToQueueIcon />,
    label: "Additional",
    route: "additional",
  },
  {
    id: 10,
    icon: <BuildIcon />,
    label: "Set Occupation",
    route: "setoccupation",
  },
];
