import React, { useState, useEffect } from 'react';
import {Paper, Select, MenuItem} from '@material-ui/core'
import {
   SortingState,
   PagingState,
   FilteringState,
   CustomPaging,
} from '@devexpress/dx-react-grid';
import {
   Grid,
   VirtualTable,
   TableHeaderRow,
   TableFilterRow,
   PagingPanel,
   TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';
import { Loading } from './loading';

   // const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?requireTotalCount=true';
   const URL = 'http://localhost:5000/select';


export default () => {
   // tablename states
   const [tablenames, setTablenames] = useState([])
   const [selectedTable, setSelectedTable] = useState('')
   // cols and rows states
   const [columns, setColumns] = useState([]);
   const [rows, setRows] = useState([]);
   // sortng state
   const [sorting, setSorting] = useState([]);
   // filtering state
   const [filters, setFilters] = useState([]);
   // paging states
   const [totalCount, setTotalCount] = useState(0);
   const [pageSize, setPageSize] = useState(5);
   const [pageSizes] = useState([5, 10, 15, 0]);
   const [currentPage, setCurrentPage] = useState(0);
   // resizing states
   const [columnWidths, setColumnWidths] = useState([
      // { columnName: 'repo_url', width: 180 },
      // { columnName: 'application', width: 180 },
   ]);
   // loading states
   const [loading, setLoading] = useState(false);
   const [lastQuery, setLastQuery] = useState();

   // tablename-related functions
   const loadTablenames = async () => {
      try {
         const response = await fetch("http://localhost:5000/tables")
         const jsonData = await response.json()
         var newTablenames = []
         for (var obj of jsonData) {
            newTablenames.push(obj['tablename'])
         }
         setTablenames(newTablenames)
      } catch (err) {
         console.error(err.message)
      }
   }

   const handleTableChange = (event) => {
      setSelectedTable(event.target.value)
      loadColumnNames();
   }

   // columnnames-related functions
   const loadColumnNames = async () => {
      try {
         const response = await fetch(`http://localhost:5000/columns?tablename=${selectedTable}`)
         const jsonData = await response.json()
         var tablenames = []
         var tableWidths = []
         for (var obj of jsonData) {
            var newObj1 = { name: obj['column_name'], title: obj['column_name']}
            var newObj2 = { columnName: obj['column_name'], width: 200}
            tablenames.push(newObj1)
            tableWidths.push(newObj2)
         }
         console.log(tableWidths)
         setColumns(tablenames)
         setColumnWidths(tableWidths)
      } catch (err) {
         console.error(err.message)
      }
   }

   // dataloading-related functions
   const getQueryString = () => {
      let queryString = `${URL}?tablename=${selectedTable}`;
      // filtering part
      let filter = filters.reduce((acc, { columnName, value }) => {
         acc.push(`${columnName} LIKE ${encodeURIComponent("'%" + value +"%'")}`);
         return acc;
       }, []).join(' AND ');
   
       queryString = `${queryString}&filter=${filter}`;

      // sorting part
      if (sorting.length) {
         const sortingConfig = sorting
            .map(({ columnName, direction }) => ({
               selector: columnName,
               desc: direction === 'desc',
            }));
         const sortingStr = JSON.stringify(sortingConfig);
         queryString = `${queryString}&sort=${escape(`${sortingStr}`)}`;
      }

      // paging part
      queryString = `${queryString}&take=${pageSize}&skip=${pageSize * currentPage}`

      return queryString;
   };

   const loadData = async () => {
      
      const queryString = getQueryString();
      if (queryString !== lastQuery && !loading) {
         setLoading(true);
         try {
            
            const response = await fetch(queryString);
            const jsonData = await response.json();
            setTotalCount(0)
            if (jsonData.length > 0) setTotalCount(Number(jsonData[0]['full_count']))
            for (var obj in jsonData) {
               delete obj.full_count
            }
            setRows(jsonData);
            loadColumnNames();
            setLoading(false)
         } catch (error) {
            setLoading(false)
         }
         // fetch(queryString)
         //    .then(response => response.json())
         //    .then(response => console.log(response))
         //    .then(({ rows, totalCount: newTotalCount }) => {
         //       setRows(rows);
         //       setTotalCount(newTotalCount);
         //       setLoading(false);
         //    })
         //    .catch(() => setLoading(false));
         setLastQuery(queryString);
      }
   };

   // useEffect
   useEffect(() => {
      loadData();
   });
   useEffect(() => {
      loadTablenames();
   }, []);

   return (
      <Paper>
         <Grid
            rows={rows}
            columns={columns}
         >
            <SortingState
               sorting={sorting}
               onSortingChange={setSorting}
            />
            <PagingState
               currentPage={currentPage}
               onCurrentPageChange={setCurrentPage}
               pageSize={pageSize}
               onPageSizeChange={setPageSize}
            />
            <FilteringState
          onFiltersChange={setFilters}
        />
            <CustomPaging
               totalCount={totalCount}
            />
            <VirtualTable
               height={350}
            />
            <TableColumnResizing
               columnWidths={columnWidths}
               onColumnWidthsChange={setColumnWidths}
            />
            <TableHeaderRow showSortingControls />
            <Select value={selectedTable} onChange={handleTableChange}>
               {tablenames.map((tablename, index) =>
                  <MenuItem key={index} value={tablename}>{tablename}</MenuItem>
               )}
            </Select>
            <TableFilterRow />
            <PagingPanel
               pageSizes={pageSizes}
            />
         </Grid>
         {loading && <Loading />}
      </Paper>
   );
};
