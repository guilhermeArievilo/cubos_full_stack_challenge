import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeStringToMinutes(time: string): number {
  if (!time || !time.includes(":")) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
}

export function formatMinutesToHHMMSS(minutes: number) {
  const dur = dayjs.duration(minutes, 'minutes')
  const hours = Math.floor(dur.asHours())
  const mins = dur.minutes()
  const secs = dur.seconds()

  return `${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`
}

export function formatMinutesToReadable(minutes: number) {
  const dur = dayjs.duration(minutes, 'minutes')
  const hours = Math.floor(dur.asHours())
  const mins = dur.minutes()

  let result = ''
  if (hours > 0) result += `${hours}h `
  if (mins > 0) result += `${mins}m`

  return result.trim() || '0m'
}

export function formatDateToDDMMYYYY(date: string | Date) {
  return dayjs(date).format('DD/MM/YYYY')
}