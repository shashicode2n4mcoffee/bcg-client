// src/App.js
import React, { useState, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useNavigate } from 'react-router-dom'

import data from '../data/excel-to-json.json'
import { dateFilter } from '../utils/dateFilter'
import Search from './Search'

const Records = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const gridApiRef = useRef(null)
  const navigate = useNavigate()

  const columnDefs = [
    { headerName: 'ID', field: 'ID', width: 60 },
    { headerName: 'Applicant Name', field: 'Applicant_Name', width: 120 },
    {
      headerName: 'Gender',
      field: 'Gender',
      width: 80,
      filter: 'agTextColumnFilter',
      filterParams: {
        defaultOption: 'startsWith',
      },
    },
    {
      headerName: 'District',
      field: 'District',
      width: 80,
      filter: 'agTextColumnFilter',
      filterParams: {
        defaultOption: 'startsWith',
      },
    },
    {
      headerName: 'State',
      field: 'State',
      width: 80,
      filter: 'agTextColumnFilter',
      filterParams: {
        defaultOption: 'startsWith',
      },
    },
    { headerName: 'Pincode', field: 'Pincode', width: 80 },
    { headerName: 'Ownership', field: 'Ownership', width: 80 },
    {
      headerName: 'GovtID Type',
      field: 'GovtID_Type',
      width: 80,
      filter: 'agTextColumnFilter',
      filterParams: {
        defaultOption: 'startsWith',
      },
    },
    { headerName: 'ID Number', field: 'ID_Number', width: 80 },
    {
      headerName: 'Category',
      field: 'Category',
      width: 80,
      filter: 'agTextColumnFilter',
      filterParams: {
        defaultOption: 'startsWith',
      },
    },
    {
      headerName: 'Load Applied (in KV)',
      field: 'Load_Applied (in KV)',
      width: 80,
    },
    {
      headerName: 'Date of Application',
      field: 'Date_of_Application',
      width: 80,
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          return dateFilter(filterLocalDateAtMidnight, cellValue)
        },
        browserDatePicker: true,
        dateFormat: 'dd-mm-yyyy',
      },
    },
    {
      headerName: 'Date of Approval',
      field: 'Date_of_Approval',
      width: 80,
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          return dateFilter(filterLocalDateAtMidnight, cellValue)
        },
        browserDatePicker: true,
        dateFormat: 'dd-mm-yyyy',
      },
    },
    {
      headerName: 'Modified Date',
      field: 'Modified_Date',
      width: 80,
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          return dateFilter(filterLocalDateAtMidnight, cellValue)
        },
        browserDatePicker: true,
        dateFormat: 'dd-mm-yyyy',
      },
    },
    {
      headerName: 'Status',
      field: 'Status',
      width: 100,
      filter: 'agTextColumnFilter',
      filterParams: {
        defaultOption: 'startsWith',
      },
    },
    { headerName: 'Reviewer ID', field: 'Reviewer_ID', width: 80 },
    { headerName: 'Reviewer Name', field: 'Reviewer_Name', width: 80 },
    { headerName: 'Reviewer Comments', field: 'Reviewer_Comments', width: 130 },
  ]

  const handleRowClick = (event) => {
    navigate(`/details/${event?.data?.ID}`, {
      state: { rowData: event?.data, data: data },
    })
  }

  const gridOptions = {
    domLayout: 'autoHeight',
    domLayout: 'autoWidth',
  }

  const handleSearch = () => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      const filteredData = data.filter(
        (row) => row.ID.toString().toLowerCase() === lowerCaseSearchTerm
      )

      if (gridApiRef.current) {
        gridApiRef.current.setRowData(filteredData)
      }
    } else {
      if (gridApiRef.current) {
        gridApiRef.current.setRowData(data)
      }
    }
  }

  const onGridReady = (params) => {
    gridApiRef.current = params.api
  }

  return (
    <div className='ag-theme-alpine' style={{ height: '100%', width: '100%' }}>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
        onCellClicked={handleRowClick}
      />
    </div>
  )
}

export default Records
