export const dateFilter = (filterLocalDateAtMidnight, cellValue) => {
  const dateAsString = cellValue
  const dateParts = dateAsString.split('-')
  const cellDate = new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  )

  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    return 0
  }

  if (cellDate < filterLocalDateAtMidnight) {
    return -1
  }

  if (cellDate > filterLocalDateAtMidnight) {
    return 1
  }
}
