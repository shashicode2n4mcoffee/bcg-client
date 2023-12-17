// ConnectionRequestsChart.js
import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { DatePicker, Select } from 'antd'
import moment from 'moment'
import 'echarts/lib/chart/line'

const { RangePicker } = DatePicker
const { Option } = Select

const ConnectionRequestsChart = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data)
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    filterData()
  }, [statusFilter, data])

  const filterData = (dateRange) => {
    let filtered = data.slice()

    if (statusFilter !== 'All') {
      filtered = data?.filter((item) => item.Status === statusFilter)
    }

    if (dateRange?.length) {
      filtered = filtered?.filter((item) => {
        const startDate = moment(item.Date_of_Application, 'DD-MM-YY')
        const endDate = moment(item.Date_of_Application, 'DD-MM-YY')
        return (
          (!startDate || startDate.isSameOrAfter(dateRange[0])) &&
          (!endDate || endDate.isSameOrBefore(dateRange[1]))
        )
      })
    }

    setFilteredData(filtered)
  }

  const getChartData = () => {
    const months = {}
    filteredData?.forEach((item) => {
      const month = moment(item.Date_of_Application, 'DD-MM-YY').format(
        'MMM-YY'
      )
      months[month] = (months[month] || 0) + 1
    })

    return {
      xAxis: {
        type: 'category',
        data: Object.keys(months),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: Object.values(months),
          type: 'line',
        },
      ],
    }
  }

  const handleDateChange = (dates) => {
    filterData(dates)
  }

  const handleStatusChange = (value) => {
    setStatusFilter(value)
  }

  return (
    <div className='connection-request-container'>
      <div className='connection-request-datepicker'>
        <RangePicker onChange={handleDateChange} />
        <Select
          style={{ marginLeft: '16px' }}
          defaultValue='All'
          onChange={handleStatusChange}
        >
          <Option value='All'>All</Option>
          <Option value='Pending'>Pending</Option>
          <Option value='Approved'>Approved</Option>
          <Option value='Rejected '>Rejected</Option>
        </Select>
      </div>
      <ReactEcharts option={getChartData()} />
    </div>
  )
}

export default ConnectionRequestsChart
