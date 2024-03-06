import React from 'react'
import Skeleton from '@mui/material/Skeleton';

import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';
import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table'

import { IconButton, Paper, TablePagination, Toolbar, Tooltip, Typography, useMediaQuery, useTheme, } from '@mui/material'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

export default function Table({ columns, data, onAdd, onSelect }) {
    const theme = useTheme();

    const { getTableProps, headerGroups, rows, prepareRow, page, canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds }, } = useTable({
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
            useSortBy,
            usePagination,
            useRowSelect,
            hooks => {
                hooks.visibleColumns.push(columns => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ])
            }

        )
  
     const limpiarSeleccion = () => {
        setSelectedRowIds({})
    }
    return (
        <TableContainer component={Paper}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 }
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="subtitle1"
                    id="tableTitle"
                    component="div"
                >
                    Listado
                </Typography>
                {
                    (onSelect&&selectedFlatRows.length!=0) && (
                        <Tooltip title="Autorizar" onClick={() => onSelect(selectedFlatRows, 'autorizar')}>
                            <IconButton>
                                <LockOpenIcon />
                            </IconButton>
                        </Tooltip>
                    )

                }
                {
                        (onSelect&&selectedFlatRows.length!=0)&& (
                        <Tooltip title="Rechazar" onClick={() => onSelect(selectedFlatRows, 'rechazar')}>
                            <IconButton>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    )

                }

            </Toolbar>
            <MaUTable {...getTableProps()}>

                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps()} >
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>

            </MaUTable>
            <TablePagination

                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(e, newPage) => {
                    gotoPage(newPage)
                }}
                labelRowsPerPage="Filas por página"
                onRowsPerPageChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            />

        </TableContainer>
    )
}

