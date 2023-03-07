import PropTypes from "prop-types";
import './CustomMaterialTable.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha, Avatar, Box, Chip, ClickAwayListener, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import * as Icons from 'react-feather';
import { useNavigate } from 'react-router-dom';
import CustomCargoView from '../CustomCargosView/CustomCargoView';
import CustomFaenasView from '../CustomFaenasView/CustomFaenasView';
import CustomImagenAvatar from '../CustomImagenAvatar';
import CustomProgresoCircular from '../CustomProgresoCircular/CustomProgresoCircular';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headerData } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      style={{ backgroundColor: "#EEF2F3" }}
    >
      <TableRow >
        {headerData.map((headerItem, index) => {
          if (headerItem.type === "notificacion") {
            return (
              <TableCell padding="normal" align={'right'} key={`${headerItem.id}-${index}`}>
                <Icons.Bell />
              </TableCell>
            );
          } else if (headerItem.type === "acciones") {
            return (
              <TableCell
                sx={{ fontWeight: 'bold' }}
                key={`${headerItem.id}-${index}`}
                align={'left'}
                padding={headerItem.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headerItem.id ? order : false}
                style={{
                  position: "sticky",
                  left: 0,
                  background: "#eef2f3",
                  zIndex: 2,
                  boxShadow: "5px 2px 5px grey"
                }}
              >
                <TableSortLabel
                  active={orderBy === headerItem.id}
                  direction={orderBy === headerItem.id ? order : 'asc'}
                  onClick={createSortHandler(headerItem.id)}
                >
                  {headerItem.label}
                  {orderBy === headerItem.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )


          } else {
            return (
              <TableCell
                sx={{ fontWeight: 'bold' }}
                key={`${headerItem.id}-${index}`}
                align={'left'}
                style={{ width: 160 }}
                padding={headerItem.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headerItem.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headerItem.id}
                  direction={orderBy === headerItem.id ? order : 'asc'}
                  onClick={createSortHandler(headerItem.id)}
                >
                  {headerItem.label}
                  {orderBy === headerItem.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })
        }
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headerData: PropTypes.shape({
    map: PropTypes.func
  }),
  numSelected: PropTypes.any,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.any,
  order: PropTypes.string,
  orderBy: PropTypes.any,
  rowCount: PropTypes.any
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number
}

/**
 * Una función que devuelve una tabla con los datos que se pasan como parámetro.
 */
/**
 * Una función que devuelve una tabla con los datos que se pasan como parámetro.
 */
export default function CustomMaterialTable({ data, idOrder, handleEliminar, headerData, numFila = 20 }) {

  const navigate = useNavigate();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(idOrder ?? headerData[1].id);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(numFila);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [openClipboard, setOpenClipboard] = React.useState(false);


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const handleTooltipClose = () => {
    setOpenClipboard(false);
  };

  const handleTooltipOpen = () => {
    setOpenClipboard(true);
  };

  return (

    <Box  >
      <Paper sx={{ mb: 2 }}>
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"

            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              headerData={headerData}
            />

            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  let avatar = null
                  if (row?.requisito) {
                    let foto = row.requisito.find(item => item.tipoDocumento === "63cab0af64fa7700207f8332")
                    avatar = foto?.documento ? foto.documento.linkUrl : ""

                  }

                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={`row-${row.id}-${index}`}
                    >
                      {
                        headerData.map((e, index) => {
                          if (e.type === "string" || e.type === "number") {
                            return <TableCell key={`${row.id}-${index}`} align="left" style={{ width: 160, whiteSpace: "nowrap" }}>
                              <Typography component={'span'} variant="body2" gutterBottom>
                                <p>{row[e.id]}</p>
                              </Typography>
                            </TableCell>
                          } else if (e.type === "email") {
                            return <TableCell key={`${row.id}-${index}`} align="left" style={{ width: 160, whiteSpace: "nowrap" }}>
                              <ClickAwayListener onClickAway={handleTooltipClose}>
                                <Tooltip
                                  PopperProps={{
                                    disablePortal: true,
                                  }}
                                  onClose={handleTooltipClose}
                                  open={openClipboard}
                                  disableFocusListener
                                  disableHoverListener
                                  disableTouchListener
                                  title="Add"
                                >
                                  <Chip label={`${row[e.id]}`} onClick={() => {
                                    handleTooltipOpen()
                                    navigator.clipboard.writeText(row[e.id])
                                  }} />
                                </Tooltip>
                              </ClickAwayListener>


                            </TableCell>

                          } else if (e.type === "acciones") {
                            return (
                              <TableCell style={{
                                position: "sticky",
                                left: 0,
                                background: "white",
                                boxShadow: "5px 2px 5px grey"
                              }} align="right" key={`${row.id}-${index}`} padding="checkbox">
                                <div className='d-flex justify-content-center align-items-center'>
                                  {
                                    e.acciones.map((accion, index) => {
                                      if (accion.type === "view") {
                                        return <div key={`${index}-${accion.type}`} onClick={() => { accion.function(row); }}><Icons.Eye className='boton-view me-2' /></div>
                                      } else if (accion.type === "edit") {
                                        return <div key={`${index}-${accion.type}`} onClick={() => { accion.function(row) }}><Icons.Edit3 className='boton-view me-2' /></div>
                                      }
                                      else if (accion.type === "delete") {
                                        return <div key={`${index}-${accion.type}`} onClick={() => {
                                          handleEliminar(row[e.id])
                                          accion.function(row[e.id])
                                        }
                                        }><Icons.Trash className='boton-delete me-2' /></div>
                                      } else if (accion.type === "whatsapp") {
                                        return <div key={`${index}-${accion.type}`} onClick={() => accion.function(row[e.id])}><Icons.MessageCircle className='boton-whatsapp me-2' /></div>
                                      }
                                      return <></>
                                    })
                                  }
                                </div>
                              </TableCell>
                            );
                          } else if (e.type === "porcentaje") {
                            return (
                              <TableCell
                                key={`${row.id}-${index}`}
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                <div className='d-flex justify-content-start ms-2'>
                                  <CustomProgresoCircular valor={row[e.id] >= 1 ? 1 : row[e.id]} />
                                </div>
                              </TableCell>
                            );
                          } else if (e.type === "notificacion") {
                            return <TableCell
                              align="right"
                              key={`${row.id}-${index}`}
                            >🔴</TableCell>
                          } else if (e.type === "faenas_view") {
                            return (
                              <TableCell
                                key={`${row.id}-${index}`}
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="normal"
                              >
                                <div className='d-flex justify-content-start ms-2'>
                                  <CustomFaenasView valor={row[e.id]} />
                                </div>
                              </TableCell>
                            );
                          } else if (e.type === "avatar") {
                            return <TableCell
                              align="right"
                              padding="none"
                              key={`${row.id}-${index}`}>
                              <CustomImagenAvatar width={50}
                                letras={"T"}
                                src={avatar}
                                fontSize={10} />
                            </TableCell>

                          } else if (e.type === "cargos_view") {
                            return (
                              <TableCell
                                key={`${row.id}-${index}`}
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                <div className='d-flex justify-content-start ms-2'>
                                  <CustomCargoView valor={row[e.id]} />
                                </div>
                              </TableCell>
                            );
                          } else if (e.type === "bool") {
                            return <TableCell key={`${row.id}-${index}`} align="left">
                              {row[e.id] ? <Chip label="Si" color="success" /> : <Chip label="No" color="error" />}
                            </TableCell>

                          } else if (e.type === "responsable_view") {

                            return (row[e.id] && typeof row[e.id] !== "undefined") ? <TableCell key={`${row.id}-${index}`} align="left">
                              {<Chip avatar={<Avatar>{row[e.id].name.split('')[0]}</Avatar>} label={row[e.id].name} />}
                            </TableCell> : <TableCell key={`${row.id}-${index}`} align="left">
                              <Typography variant="caption" >
                                {`Sin responsable Asociadas`}
                              </Typography>
                            </TableCell>


                          } else if (e.type === "faena_view") {
                            return (typeof row[e.id] !== "undefined") ? <TableCell key={`${row.id}-${index}`} align="left">
                              {<Chip label={`${row[e.id].abreviatura} - ${row[e.id].nombre}`} />}
                            </TableCell> : <Typography variant="caption" >
                              {`Sin responsable Asociadas`}
                            </Typography>


                          } else if (e.type === "string-date") {
                            return (
                              <TableCell
                                key={`${row.id}-${index}`}
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="normal"
                              >
                                <Chip label={`${row[e.id] <= 0 ? Math.abs(row[e.id]) : row[e.id]} ${row[e.id] <= 0 ? "Días de retrazo" : "Días restantes"}`}
                                  variant={`${row[e.id] <= 0 ? 'outlined' : "filled"}`}
                                  style={{
                                    border: row[e.id] <= 0 ? "1px solid #FB050C" : "1px solid primary",
                                    // backgroundColor: row[e.id] <= 0 ? "#FB050C" : "primary",
                                    // color: row[e.id] <= 0 ? "#FFFF" : "primary"
                                  }} />
                              </TableCell>
                            );
                          }
                          else {
                            return null;
                          }
                        })
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
        {/* 
      {/* 
        {/* 
          rowsPerPage: cantidad filas por pagina
          page: numero pagina actual
          rows: arreglo de datos
          rows.length: cantidad total de elementos

          Math.ceil(rows.length/rowsPerPage
        */}
        <div className='d-flex justify-content-end my-4'>
          <Pagination
            sx={{ mb: 2, mr: 2 }}
            count={Math.ceil(data.length / rowsPerPage)}
            variant="outlined"
            shape="rounded"
            page={page + 1}
            onChange={(event, page) => handleChangePage(event, page - 1)}
            color="primary"
          />
        </div>
      </Paper>
    </Box >

  );
}


CustomMaterialTable.propTypes = {
  data: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  }),
  handleEliminar: PropTypes.func,
  headerData: PropTypes.shape({
    map: PropTypes.func
  }),
  idOrder: PropTypes.anyy,
  numFila: PropTypes.number
}
