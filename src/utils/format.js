function Unite(nombre) {
  let unite
  switch (nombre) {
    case 0:
      unite = 'zéro'
      break
    case 1:
      unite = 'un'
      break
    case 2:
      unite = 'deux'
      break
    case 3:
      unite = 'trois'
      break
    case 4:
      unite = 'quatre'
      break
    case 5:
      unite = 'cinq'
      break
    case 6:
      unite = 'six'
      break
    case 7:
      unite = 'sept'
      break
    case 8:
      unite = 'huit'
      break
    case 9:
      unite = 'neuf'
      break
  } // fin switch
  return unite
}

function Dizaine(nombre) {
  let dizaine
  switch (nombre) {
    case 10:
      dizaine = 'dix'
      break
    case 11:
      dizaine = 'onze'
      break
    case 12:
      dizaine = 'douze'
      break
    case 13:
      dizaine = 'treize'
      break
    case 14:
      dizaine = 'quatorze'
      break
    case 15:
      dizaine = 'quinze'
      break
    case 16:
      dizaine = 'seize'
      break
    case 17:
      dizaine = 'dix-sept'
      break
    case 18:
      dizaine = 'dix-huit'
      break
    case 19:
      dizaine = 'dix-neuf'
      break
    case 20:
      dizaine = 'vingt'
      break
    case 30:
      dizaine = 'trente'
      break
    case 40:
      dizaine = 'quarante'
      break
    case 50:
      dizaine = 'cinquante'
      break
    case 60:
      dizaine = 'soixante'
      break
    case 70:
      dizaine = 'soixante-dix'
      break
    case 80:
      dizaine = 'quatre-vingt'
      break
    case 90:
      dizaine = 'quatre-vingt-dix'
      break
  } // fin switch
  return dizaine
}

export function num2Letters(nombre) {
  let quotient, reste
  let numberToLetter = ''
  // __________________________________

  if (nombre.toString().replace(/ /gi, '').length > 15)
    return 'dépassement de capacité'
  if (isNaN(nombre.toString().replace(/ /gi, ''))) return 'Nombre non valide'

  const nb = parseFloat(nombre.toString().replace(/ /gi, ''))
  if (Math.ceil(nb) !== nb) return 'Nombre avec virgule non géré.'

  const n = nb.toString().length
  switch (n) {
    case 1:
      numberToLetter = Unite(nb)
      break
    case 2:
      if (nb > 19) {
        quotient = Math.floor(nb / 10)
        reste = nb % 10
        if (nb < 71 || (nb > 79 && nb < 91)) {
          if (reste === 0) numberToLetter = Dizaine(quotient * 10)
          if (reste === 1)
            numberToLetter = Dizaine(quotient * 10) + '-et-' + Unite(reste)
          if (reste > 1)
            numberToLetter = Dizaine(quotient * 10) + '-' + Unite(reste)
        } else
          numberToLetter =
            Dizaine((quotient - 1) * 10) + '-' + Dizaine(10 + reste)
      } else numberToLetter = Dizaine(nb)
      break
    case 3:
      quotient = Math.floor(nb / 100)
      reste = nb % 100
      if (quotient === 1 && reste === 0) numberToLetter = 'cent'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'cent' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = Unite(quotient) + ' cents'
      if (quotient > 1 && reste !== 0)
        numberToLetter = Unite(quotient) + ' cent ' + num2Letters(reste)
      break
    case 4:
      quotient = Math.floor(nb / 1000)
      reste = nb - quotient * 1000
      if (quotient === 1 && reste === 0) numberToLetter = 'mille'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'mille' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' mille'
      if (quotient > 1 && reste !== 0)
        numberToLetter = num2Letters(quotient) + ' mille ' + num2Letters(reste)
      break
    case 5:
      quotient = Math.floor(nb / 1000)
      reste = nb - quotient * 1000
      if (quotient === 1 && reste === 0) numberToLetter = 'mille'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'mille' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' mille'
      if (quotient > 1 && reste !== 0)
        numberToLetter = num2Letters(quotient) + ' mille ' + num2Letters(reste)
      break
    case 6:
      quotient = Math.floor(nb / 1000)
      reste = nb - quotient * 1000
      if (quotient === 1 && reste === 0) numberToLetter = 'mille'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'mille' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' mille'
      if (quotient > 1 && reste !== 0)
        numberToLetter = num2Letters(quotient) + ' mille ' + num2Letters(reste)
      break
    case 7:
      quotient = Math.floor(nb / 1000000)
      reste = nb % 1000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un million'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un million' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' millions'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' millions ' + num2Letters(reste)
      break
    case 8:
      quotient = Math.floor(nb / 1000000)
      reste = nb % 1000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un million'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un million' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' millions'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' millions ' + num2Letters(reste)
      break
    case 9:
      quotient = Math.floor(nb / 1000000)
      reste = nb % 1000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un million'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un million' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' millions'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' millions ' + num2Letters(reste)
      break
    case 10:
      quotient = Math.floor(nb / 1000000000)
      reste = nb - quotient * 1000000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un milliard'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un milliard' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' milliards'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' milliards ' + num2Letters(reste)
      break
    case 11:
      quotient = Math.floor(nb / 1000000000)
      reste = nb - quotient * 1000000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un milliard'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un milliard' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' milliards'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' milliards ' + num2Letters(reste)
      break
    case 12:
      quotient = Math.floor(nb / 1000000000)
      reste = nb - quotient * 1000000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un milliard'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un milliard' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' milliards'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' milliards ' + num2Letters(reste)
      break
    case 13:
      quotient = Math.floor(nb / 1000000000000)
      reste = nb - quotient * 1000000000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un billion'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un billion' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' billions'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' billions ' + num2Letters(reste)
      break
    case 14:
      quotient = Math.floor(nb / 1000000000000)
      reste = nb - quotient * 1000000000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un billion'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un billion' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' billions'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' billions ' + num2Letters(reste)
      break
    case 15:
      quotient = Math.floor(nb / 1000000000000)
      reste = nb - quotient * 1000000000000
      if (quotient === 1 && reste === 0) numberToLetter = 'un billion'
      if (quotient === 1 && reste !== 0)
        numberToLetter = 'un billion' + ' ' + num2Letters(reste)
      if (quotient > 1 && reste === 0)
        numberToLetter = num2Letters(quotient) + ' billions'
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          num2Letters(quotient) + ' billions ' + num2Letters(reste)
      break
  } // fin switch
  /* respect de l'accord de quatre-vingt */
  if (
    numberToLetter.substr(
      numberToLetter.length - 'quatre-vingt'.length,
      'quatre-vingt'.length
    ) === 'quatre-vingt'
  )
    numberToLetter = numberToLetter + 's'

  return numberToLetter
}

export function money2Letters(n) {
  try {
    const x = parseFloat(n.toFixed(3))
    n = x
  } catch (e) {
    console.error(e)
  }
  let p1 = Math.trunc(n)
  let p2 = +(n % 1).toFixed(3) * 1000
  p1 = num2Letters(p1) + ' dinars'
  if (p2) {
    p2 = ' et ' + num2Letters(p2) + ' millimes'
  } else {
    p2 = ''
  }
  return `${p1}${p2}`
}

export function formatMoney(
  amount,
  decimalCount = 3,
  decimal = ',',
  thousands = ' '
) {
  decimalCount = Math.abs(decimalCount)
  decimalCount = isNaN(decimalCount) ? 3 : decimalCount
  amount = Number(amount) || 0

  const negativeSign = amount < 0 ? '-' : ''
  amount = Math.abs(amount).toFixed(decimalCount)

  const i = parseInt(amount).toString()
  const j = i.length > 3 ? i.length % 3 : 0

  return (
    negativeSign +
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
    (decimalCount
      ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
      : '')
  )
}
