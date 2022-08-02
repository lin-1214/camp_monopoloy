import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VillaIcon from "@mui/icons-material/Villa";

export const NavBarItems = [
  {
    id: 0,
    icon: <NotificationsIcon />,
    label: "Notifications",
    route: "notifications",
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: "Teams",
    route: "teams",
  },
  {
    id: 2,
    icon: <VillaIcon />,
    label: "Properties",
    route: "properties",
  },
];
