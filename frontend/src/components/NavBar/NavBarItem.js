import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VillaIcon from "@mui/icons-material/Villa";
import BuildIcon from "@mui/icons-material/Build";
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
    icon: <BuildIcon />,
    label: "Add Money",
    route: "setmoney",
  },
  {
    id: 5,
    icon: <BuildIcon />,
    label: "Set Ownership",
    route: "setownership",
  },
  {
    id: 6,
    icon: <BuildIcon />,
    label: "Transfer",
    route: "transfer",
  },
];

export const adminItems = [
  {
    id: 7,
    icon: <EventIcon />,
    label: "Event",
    route: "event",
  },
  {
    id: 8,
    icon: <AddToQueueIcon />,
    label: "Additional",
    route: "additional",
  },
  {
    id: 9,
    icon: <BuildIcon />,
    label: "Set Occupation",
    route: "setoccupation",
  }
];
