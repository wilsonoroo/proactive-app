import FactCheckIcon from "@mui/icons-material/FactCheck";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import * as React from "react";
import * as Icons from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import CustomImagenAvatar from "../../components/CustomImagenAvatar";
import useAuth from "../../hooks/useAuth";
const LogoProactive = require("../../assets/logo.png");

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  paddingLeft: 15,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function CustomNav({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const [open, setOpen] = React.useState(false);

  const menuItems = [
    {
      nombre: "Reclutamiento",
      url: "/reclutamientos",
      icon: <FactCheckIcon style={{ color: "white" }} />,
    },
    {
      nombre: "Requisitos",
      url: "/requisitos",
      icon: <Icons.FileText color="white" />,
    },
    {
      nombre: "Cargos",
      url: "/cargos",
      icon: <Icons.FileText color="white" />,
    },
    {
      nombre: "Faenas",
      url: "/faenas",
      icon: <Icons.Home color="white" />,
    },
    {
      nombre: "Usuarios",
      url: "/usuarios",
      icon: <Icons.Users color="white" />,
    },
    // {
    //   nombre: "Licencias \nDe Conduccion",
    //   url: "/licencia-conducir",
    //   icon: <Icons.Users color="white" />,
    // },
  ];

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#363C4F",
            color: "white",
          },
        }}
      >
        <DrawerHeader>
          {open && (
            <>
              <CustomImagenAvatar width={50} />
              <div className="ps-1">
                <img
                  src={LogoProactive}
                  alt="logo-proactive"
                  style={{ maxWidth: "80px" }}
                />
                <div className="h6">Area Reclutamiento</div>
              </div>
            </>
          )}
          <IconButton onClick={handleDrawer}>
            {open ? (
              <Icons.ChevronLeft color="white" />
            ) : (
              <Icons.ChevronRight color="white" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={item.nombre}
              disablePadding
              sx={{ display: "block" }}
              className={`${
                location.pathname.includes(item.url) &&
                "list-item-selected_navbar"
              }`}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.url)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.nombre}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            key={"Cerrar Sesión"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={logout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Icons.LogOut color="white" />
              </ListItemIcon>
              <ListItemText
                primary={"Cerrar Sesión"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <>{children}</>
    </Box>
  );
}
