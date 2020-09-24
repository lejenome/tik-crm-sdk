const hexTest = /^#[0-9a-f]{6}$/i
export function getContrastYIQ(hexcolor) {
  /*
  console.assert(
    hexcolor.length === 7 && hexcolor[0] === '#',
    'Excepted format #hhhhhh'
  )
  */
  console.assert(hexTest.test(hexcolor), 'Excepted format #hhhhhh')
  const r = parseInt(hexcolor.substr(1, 2), 16)
  const g = parseInt(hexcolor.substr(3, 2), 16)
  const b = parseInt(hexcolor.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 125 ? 'black' : 'white'
}
