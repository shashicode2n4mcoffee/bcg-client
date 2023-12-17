import * as moment from 'moment'

export const dateValidator = (dateString) => {
  const parsedDate = moment(dateString, 'DD/MM/YYYY', true)
  if (parsedDate.isValid()) {
    parsedDate.startOf('day')
    return parsedDate.format('DD/MM/YYYY')
  } else {
    return null
  }
}
