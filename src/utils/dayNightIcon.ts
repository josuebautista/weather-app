export const getDayOrNightIcon = (iconName: string, dateTimeString: Date): string => {
  const hours = new Date(dateTimeString).getHours()
  const isDayTime = hours >= 6 && hours < 18
  return isDayTime ? iconName.replace(/.$/, 'd') : iconName.replace(/.$/, 'n')
}