/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DeleteOutlined, FilterOutlined, FormOutlined, UserAddOutlined, ReloadOutlined, QrcodeOutlined } from '@ant-design/icons';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import Grid from '@mui/material/Grid';
import { FormControl, InputAdornment, OutlinedInput, Stack, Select, MenuItem, InputLabel, Avatar } from '@mui/material';
import api from '../../utils/api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#11cb5f'
        }
    }
});

// id, member_id, full_name, phone, password, address, gender, expiry_date, identity_card_number, total_donate, status, level
function createData(member_id, full_name, gender, phone, identity_card_number, total_donate, address) {
    return {
        member_id,
        full_name,
        gender,
        phone,
        identity_card_number,
        total_donate,
        address
    };
}

const rows = [
    // createData('Cupcake', 'member 1', 'nam', '123456', '1111', 4.3,'address'),
    // createData('Donut', 'member 2', 'nam', '123456', '1111', 4.9,'address'),
    // createData('Eclair', 'member 3', 'nu', '123456', '1111', 6.0, 'address'),
    // createData('Frozen yoghurt', 'member 4', 'nu', '123456', '1111', 4.0, 'address'),
    // createData('Gingerbread', 'member 5', 'nam', '123456', '1111', 3.9, 'address'),
    // createData('Honeycomb', 'member 6', 'nam', '123456', '1111', 6.5, 'address'),
    // createData('Ice cream sandwich', 'member 7', 'nam', '123456', '1111', 4.3, 'address'),
    // createData('Jelly Bean', 'member 8', 'nu', '123456', '1111', 0.0, 'address'),
    // createData('KitKat', 'member 9', 'nu', '123456', '1111', 7.0, 'address'),
    // createData('Lollipop', 'member 10', 'nu', '123456', '1111', 0.0, 'address'),
    // createData('Marshmallow', 'member 11', 'nam', '123456', '1111', 2.0, 'address'),
    createData('Nougat', 'member 12', 'nam', '123456', '1111', 37.0, 'address')
];

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
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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

const headCells = [
    {
        id: 'member_id',
        numeric: false,
        disablePadding: true,
        label: 'M?? Th??nh Vi??n'
    },
    {
        id: 'full_name',
        numeric: false,
        disablePadding: true,
        label: 'H??? T??n'
    },
    {
        id: 'gender',
        numeric: false,
        disablePadding: true,
        label: 'Gi???i T??nh'
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: true,
        label: '??i???n Tho???i'
    },
    {
        id: 'total_donate',
        numeric: false,
        disablePadding: false,
        label: '???ng H???'
    },
    {
        id: 'identity_card_number',
        numeric: false,
        disablePadding: true,
        label: 'M?? ?????nh Danh'
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: true,
        label: '?????a Ch???'
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Tooltip title="Ch???n t???t c???">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts'
                            }}
                        />
                    </Tooltip>
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell>
                    <div></div>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const [open, setOpen] = React.useState(false);
    const [member, setMember] = React.useState({
        member_id: '',
        full_name: '',
        gender: 1,
        phone: '',
        identity_card_number: '',
        total_donate: 1000,
        address: ''
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
    };

    const handleCrate = async () => {
        try {
            var { data } = await api.post('/member/create', member);
            if (data.msg == 'success') {
                setMember({
                    member_id: '',
                    full_name: '',
                    gender: 1,
                    phone: '',
                    identity_card_number: '',
                    total_donate: 1000,
                    address: ''
                });
                setOpen(false);
                alert('T???o t??i kho???n th??nh c??ng!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRefresh = (e) => {
        setMembers([list]);
    };

    return (
        <div>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                    })
                }}
            >
                {numSelected > 0 ? (
                    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                        ???? ch???n {numSelected} d??ng
                    </Typography>
                ) : (
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                        Danh S??ch Th??nh Vi??n
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="X??a">
                        <IconButton color="error">
                            <DeleteOutlined />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <>
                        <Tooltip title="Th??m d??? li???u">
                            <IconButton color="primary" size="large" onClick={handleClickOpen}>
                                <UserAddOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="L??m m???i d??? li???u">
                            <IconButton color="primary" size="large" onClick={props.reFresh}>
                                <ReloadOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="L???c d??? li???u">
                            <IconButton color="primary" size="large">
                                <FilterOutlined />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Toolbar>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h3">T???o Th??ng Tin</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid xs={12} md={12} container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">S??? ??i???n tho???i*</InputLabel>
                                <OutlinedInput
                                    size="medium"
                                    name="phone"
                                    startAdornment={<InputAdornment position="start">{/* <IdcardOutlined /> */}</InputAdornment>}
                                    onChange={handleOnChange}
                                    value={member.phone}
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">M?? ?????nh danh*</InputLabel>
                                <OutlinedInput
                                    size="medium"
                                    name="identity_card_number"
                                    startAdornment={<InputAdornment position="start">{/* <PhoneOutlined /> */}</InputAdornment>}
                                    onChange={handleOnChange}
                                    value={member.identity_card_number}
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">H??? t??n*</InputLabel>
                                <OutlinedInput
                                    size="medium"
                                    name="full_name"
                                    startAdornment={<InputAdornment position="start">{/* <PhoneOutlined /> */}</InputAdornment>}
                                    onChange={handleOnChange}
                                    value={member.full_name}
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">Gi???i t??nh*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name="gender"
                                    label="Age"
                                    value={member.gender}
                                    onChange={handleOnChange}
                                >
                                    <MenuItem value={1}>Nam</MenuItem>
                                    <MenuItem value={0}>N???</MenuItem>
                                </Select>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">?????a ch???</InputLabel>
                                <OutlinedInput
                                    size="medium"
                                    name="address"
                                    startAdornment={<InputAdornment position="start">{/* <IdcardOutlined /> */}</InputAdornment>}
                                    onChange={handleOnChange}
                                    value={member.address}
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <input type="file" />
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ mx: 'auto' }}>
                        <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={handleCrate}>
                            L??u
                        </Button>
                        <Button variant="contained" color="secondary" sx={{ m: 1 }} onClick={handleClose}>
                            H???y
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('full_name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [members, setMembers] = React.useState([]);
    const [openD, setOpenD] = React.useState(false);
    const [member, setMember] = React.useState({
        member_id: 'a',
        full_name: 'a',
        gender: 1,
        phone: 'aa',
        identity_card_number: 'aa',
        total_donate: 1000,
        address: 'aaaa'
    });

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        handleGetData();
    });

    const handleGetData = async () => {
        try {
            var { data } = await api.get('/member');
            const list = data.data.data.map((item) => {
                return {
                    member_id: item.member_id,
                    full_name: item.full_name,
                    gender: item.gender == 0 ? 'N???' : 'Nam',
                    phone: item.phone,
                    identity_card_number: item.identity_card_number,
                    total_donate: item.total_donate,
                    address: item.address
                };
            });
            setMembers(list);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = members.map((n) => n.member_id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, member_id) => {
        const selectedIndex = selected.indexOf(member_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, member_id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const showDetail = async (id) => {
        try {
            var { data } = await api.get('/member/' + id);
            setMember({
                member_id: data.data.member_id,
                full_name: data.data.full_name,
                gender: data.data.gender,
                phone: data.data.phone,
                identity_card_number: data.data.identity_card_number,
                total_donate: data.data.total_donate,
                address: data.data.address
            });
            setOpenD(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCrate = async () => {
        // try {
        //     var { data } = await api.post('/member/create', member);
        //     if (data.msg == 'success') {
        //         setMember({
        //             member_id: "",
        //             full_name: "",
        //             gender: 1,
        //             phone: "",
        //             identity_card_number: "",
        //             total_donate: 1000,
        //             address: ""
        //         }
        //         );
        //         setOpen(false);
        //         alert("T???o t??i kho???n th??nh c??ng!");
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpenD(false);
    };

    const isSelected = (member_id) => selected.indexOf(member_id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - members.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    reFresh={() => {
                        // truy???n function v??o component ????? reload tr??nh b??? treo
                        setMembers([]);
                    }}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={members.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(members, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.member_id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.member_id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.member_id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Tooltip title="Ch???n">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId
                                                        }}
                                                    />
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.member_id}
                                            </TableCell>
                                            <TableCell omponent="th" scope="row" padding="none">
                                                {row.full_name}
                                            </TableCell>
                                            <TableCell omponent="th" scope="row" padding="none">
                                                {row.gender}
                                            </TableCell>
                                            <TableCell omponent="th" scope="row" padding="none">
                                                {row.phone}
                                            </TableCell>
                                            <TableCell omponent="th" scope="row" padding="none">
                                                {row.total_donate}
                                            </TableCell>
                                            <TableCell omponent="th" scope="row" padding="none">
                                                {row.identity_card_number}
                                            </TableCell>
                                            <TableCell omponent="th" scope="row" padding="none">
                                                {row.address}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack>
                                                    <Tooltip title="Xem chi ti???t">
                                                        <IconButton
                                                            name={row.member_id}
                                                            color="primary"
                                                            aria-label="ViewDetail"
                                                            component="label"
                                                            onClick={() => {
                                                                showDetail(row.member_id);
                                                            }}
                                                        >
                                                            <FormOutlined />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="X??a">
                                                        <IconButton
                                                            name={row.member_id}
                                                            color="error"
                                                            aria-label="DeleteItem"
                                                            component="label"
                                                        >
                                                            <DeleteOutlined />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="X??a">
                                                        <IconButton
                                                            name={row.member_id}
                                                            color="success"
                                                            aria-label="DeleteItem"
                                                            component={Link}
                                                            to={`qrcode/${row.member_id}`}
                                                        >
                                                            <QrcodeOutlined />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={members.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog open={openD} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h3">Chi Ti???t Th??ng Tin</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid xs={12} md={12} container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">S??? ??i???n tho???i*</InputLabel>
                                <OutlinedInput
                                    size="medium"
                                    name="phone"
                                    startAdornment={<InputAdornment position="start">{/* <IdcardOutlined /> */}</InputAdornment>}
                                    onChange={handleOnChange}
                                    value={member.phone}
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">M?? ?????nh danh*</InputLabel>
                                <OutlinedInput
                                    size="medium"
                                    name="identity_card_number"
                                    startAdornment={<InputAdornment position="start">{/* <PhoneOutlined /> */}</InputAdornment>}
                                    onChange={handleOnChange}
                                    value={member.identity_card_number}
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">H??? t??n*</InputLabel>
                                <OutlinedInput
                                    size="medium"
                                    name="full_name"
                                    startAdornment={<InputAdornment position="start">{/* <PhoneOutlined /> */}</InputAdornment>}
                                    onChange={handleOnChange}
                                    value={member.full_name}
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">Gi???i t??nh*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name="gender"
                                    label="Age"
                                    value={member.gender}
                                    onChange={handleOnChange}
                                >
                                    <MenuItem value={1}>Nam</MenuItem>
                                    <MenuItem value={0}>N???</MenuItem>
                                </Select>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">?????a ch???</InputLabel>
                                <OutlinedInput
                                    size="medium"
                                    name="address"
                                    startAdornment={<InputAdornment position="start">{/* <IdcardOutlined /> */}</InputAdornment>}
                                    onChange={handleOnChange}
                                    value={member.address}
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <input type="file" />
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ mx: 'auto' }}>
                        <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={handleCrate}>
                            L??u
                        </Button>
                        <Button variant="contained" color="secondary" sx={{ m: 1 }} onClick={handleClose}>
                            H???y
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
        </Box>
    );
}
