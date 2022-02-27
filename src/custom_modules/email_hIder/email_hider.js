const emailHider = async (email) => {
  const a = email.split('@')
  const b = a[0]
  let newString = ''

  for (let i = 0; i < b.length; i++) {
    if (i > 2 && i < b.length - 1) newString += '*'
    else newString += b[i]
  }

  return `${newString}@${a[1]}`
}

module.exports = { emailHider }
