import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(advancedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

export default dayjs
