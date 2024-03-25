import * as XLSX from 'xlsx'

export function changeBufferFile (file) {
  if (typeof file.buffer === 'object') {
    const bufferArray = Object.values(file.buffer).map((value) => {
      if (typeof value === 'number') {
        return value
      }
      throw new Error('Invalid byte value')
    })
    return bufferArray
  }
  return file.buffer
}

const readXLXStoJson = async (file) => {
  const bufferArray = changeBufferFile(file)

  const buffer = Buffer.from(bufferArray)

  const workbook = XLSX.read(buffer, { type: 'buffer' })

  const workbookToJson = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

  return workbookToJson
}

export default readXLXStoJson
