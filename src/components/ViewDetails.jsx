// Details.js
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../styles/ViewDetails.css' // Styling
import { useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import * as moment from 'moment'
import { dateValidator } from '../utils/dateValidator'
import ConnectionRequestsChart from './ConnectionRequestsChart'

const ViewDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [data, setData] = useState({})
  const [edit, setEdit] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  let location = useLocation()

  useEffect(() => {
    setData(location?.state?.rowData)
  }, [location?.state])

  const onSubmit = (formData) => {
    console.log(formData)
  }

  return (
    <div className='details-container'>
      <h1>Details Page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='group'>
          <div className='form-group'>
            <label htmlFor='applicantName'>Applicant Name</label>
            <input
              type='text'
              id='applicantName'
              defaultValue={data?.Applicant_Name}
              {...register('applicantName', {
                required: 'Applicant Name is required',
              })}
              readOnly={!edit}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='gender'>Gender</label>
            <input
              type='text'
              id='gender'
              defaultValue={data?.Gender}
              {...register('gender')}
              readOnly={!edit}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='district'>District</label>
            <input
              type='text'
              id='district'
              defaultValue={data?.District}
              {...register('district')}
              readOnly={!edit}
            />
          </div>
        </div>

        <div className='group'>
          <div className='form-group'>
            <label htmlFor='state'>State</label>
            <input
              type='text'
              id='state'
              defaultValue={data?.State}
              {...register('state')}
              readOnly={!edit}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='pincode'>Pincode</label>
            <input
              type='number'
              id='pincode'
              defaultValue={data?.Pincode}
              {...register('pincode')}
              readOnly={!edit}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='ownership'>Ownership</label>
            <input
              type='text'
              id='ownership'
              defaultValue={data?.Ownership}
              {...register('ownership')}
              readOnly={!edit}
            />
          </div>
        </div>

        <div className='group'>
          <div className='form-group'>
            <label htmlFor='govtIdType'>Government ID Type</label>
            <input
              type='text'
              id='govtIdType'
              defaultValue={data?.GovtID_Type}
              {...register('govtIdType')}
              readOnly
            />
          </div>

          <div className='form-group'>
            <label htmlFor='idNumber'>ID Number</label>
            <input
              type='number'
              id='idNumber'
              defaultValue={data?.ID_Number}
              {...register('idNumber')}
              readOnly
            />
          </div>

          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <input
              type='text'
              id='category'
              defaultValue={data?.Category}
              {...register('category')}
              readOnly={!edit}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='loadApplied'>Load Applied (in KV)</label>
            <input
              type='number'
              id='loadApplied'
              defaultValue={data?.['Load_Applied (in KV)']}
              {...register('loadApplied')}
              readOnly={!edit}
            />
          </div>
        </div>

        <div className='group'>
          <div className='form-group'>
            <label htmlFor='dateOfApplication'>Date of Application</label>
            <input
              type='text'
              id='dateOfApplication'
              defaultValue={data?.Date_of_Application}
              {...register('dateOfApplication')}
              readOnly
            />
          </div>

          <div className='form-group'>
            <label htmlFor='dateOfApproval'>Date of Approval</label>
            <DatePicker
              id='dateOfApproval'
              selected={
                data?.Date_of_Approval
                  ? dateValidator(data?.Date_of_Approval)
                  : null
              }
              onChange={(date) => register('dateOfApproval').onChange(date)}
              readOnly={!edit}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='modifiedDate'>Modified Date</label>
            <DatePicker
              id='modifiedDate'
              selected={
                data?.Modified_Date ? dateValidator(data?.Modified_Date) : null
              }
              onChange={(date) => register('modifiedDate')?.onChange(date)}
              readOnly={!edit}
            />
          </div>
        </div>

        <div className='group'>
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <input
              type='text'
              id='status'
              defaultValue={data?.Status}
              {...register('status')}
              readOnly={!edit}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='reviewerId'>Reviewer ID</label>
            <input
              type='number'
              id='reviewerId'
              defaultValue={data?.Reviewer_ID}
              {...register('reviewerId')}
              readOnly={!edit}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='reviewerName'>Reviewer Name</label>
            <input
              type='text'
              id='reviewerName'
              defaultValue={data?.Reviewer_Name}
              {...register('reviewerName')}
              readOnly={!edit}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='reviewerComments'>Reviewer Comments</label>
            <input
              type='text'
              id='reviewerComments'
              defaultValue={data?.Reviewer_Comments}
              {...register('reviewerComments')}
              readOnly={!edit}
            />
          </div>
        </div>

        {edit ? (
          <div>
            <button type='submit'>Submit</button>
            <button className='cancel' onClick={() => setEdit(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setEdit(true)}>Edit</button>
        )}
      </form>

      <ConnectionRequestsChart data={location?.state?.data} />
    </div>
  )
}

export default ViewDetails
