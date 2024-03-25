import * as XLSX from 'xlsx'

const writeFileBuffer = async (excelSheet) => {
  const worksheet = await XLSX.utils.json_to_sheet(excelSheet)
  const wb = {
    Sheets: {
      Sheet1: worksheet
    },
    SheetNames: ['Sheet1']
  }
  const wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'buffer'
  }

  return XLSX.write(wb, wopts)
}

export default writeFileBuffer



