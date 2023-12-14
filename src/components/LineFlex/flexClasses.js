const pascal = str => {
  if (/^[0-9]/.test(str)) {
    return (
      str.charAt(0) + str.charAt(1).toUpperCase() + str.substr(2).toLowerCase()
    )
  }
  if (/^xx/.test(str)) {
    return 'XX' + str.substr(2).toLowerCase()
  }
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
}

const getSpacing = spacing => {
  return spacing ? 'spc' + pascal(spacing) : ''
}
const getMargin = (margin, layout) => {
  if (!margin) {
    return ''
  }
  const position = layout === 'vertical' ? 'T' : 'L'
  return margin ? `ExMgn${position}${pascal(margin)}` : ''
}

const getSize = size => {
  if (['xxs', 'xs', 'sm', 'md','lg', 'xl','xxl','3xl','4xl','5xl','full'].includes(size || 'md')) {
    return 'Ex' + pascal(size || 'md')
  }
  return ''
}

const getWrap = wrap => {
  return wrap ? 'ExWrap' : ''
}

const getLayout = layout => {
  const layouts = {
    vertical: 'vr',
    horizontal: 'hr',
    baseline: 'hr'
  }
  return layouts[layout]
}
const getBaseline = layout => {
  return layout === 'baseline' ? 'bl' : ''
}
const getTextStyle = style => {
  return style === 'italic' ? 'ExFntStyIt' : ''
}
const getDecoration = dec => {
  return (
    {
      none: 'ExTxtDecNone',
      'line-through': 'ExTxtDecLt',
      underline: 'ExTxtDecUl'
    }[dec] || ''
  )
}
const getFlexClass = (flex, width) => {
  if (typeof flex === 'undefined') {
    if (width) {
      return 'fl0'
    }
    return ''
  }
  return flex <= 3 ? `fl${flex}` : ''
}
const getFlex = flex => {
  if (typeof flex === 'undefined' || flex === null || flex <= 3) {
    return {}
  }
  return {
    '-webkit-box-flex': flex,
    flex: `${flex}`
  }
}

const getCornerRadius = cornerRadius => {
  return cornerRadius ? { borderRadius: cornerRadius } : {}
}
const getHeight = height => {
  return height ? { height } : {}
}
const getWidth = width => {
  return width ? { width } : {}
}
const getWeight = weight => {
  return weight ? 'ExWB' : ''
}
const getBorderColor = borderColor => {
  return borderColor ? { borderColor } : {}
}
const getBorderWidth = borderWidth => {
  return borderWidth ? { borderWidth } : {}
}
const getAlign = align => {
  const aligns = {
    start: 'S',
    center: 'C',
    end: 'E'
  }
  return align ? 'ExAlg' + aligns[align] : ''
}
const getGravity = gravity => {
  if (!gravity || gravity === 'top') {
    return ''
  }
  const gravities = {
    center: 'C',
    bottom: 'B'
  }
  return 'grv' + gravities[gravity]
}
const getBackgroundColor = backgroundColor => {
  return backgroundColor ? { backgroundColor } : {}
}
const getPosition = position => {
  if (position && position === 'absolute') {
    return 'ExAbs'
  }
  return ''
}
const getOffsetClasses = data => {
  return ['top', 'bottom', 'start', 'end']
    .map(loc => offsetClass(data, loc))
    .filter(t => t)
}
const offsetClass = (data, location) => {
  const key = 'offset' + pascal(location)
  return data[key] && !/^[0-9]/.test(data[key])
    ? 'Ex' + convertLocationShort(location) + pascal(data[key])
    : ''
}

const getOffsetStyle = data => {
  return {
    ...offsetStyle(data, 'top'),
    ...offsetStyle(data, 'bottom'),
    ...offsetStyle(data, 'start'),
    ...offsetStyle(data, 'end')
  }
}
const offsetStyle = (data, location) => {
  const key = 'offset' + pascal(location)
  return data[key] && /^[0-9]/.test(data[key])
    ? { [convertLocation(location)]: data[key] }
    : {}
}

const getPaddingClasses = data => {
  return ['all', 'top', 'bottom', 'start', 'end']
    .map(loc => paddingClass(data, loc))
    .filter(t => t)
}
const paddingClass = (data, location) => {
  const key = 'padding' + pascal(location)
  return data[key] && !/^[0-9]/.test(data[key])
    ? 'ExPad' + convertLocationShort(location) + pascal(data[key])
    : ''
}

const getPaddingStyle = data => {
  return {
    ...paddingStyle(data, 'all'),
    ...paddingStyle(data, 'top'),
    ...paddingStyle(data, 'bottom'),
    ...paddingStyle(data, 'start'),
    ...paddingStyle(data, 'end')
  }
}
const paddingStyle = (data, location) => {
  const key = 'padding' + pascal(location)
  let pos = convertLocation(location)
  pos = pos === 'all' ? 'padding' : `padding-${pos}`
  return data[key] && /^[0-9]/.test(data[key]) ? { [pos]: data[key] } : {}
}

const convertLocationShort = str => {
  return convertLocation(str).charAt(0).toUpperCase()
}

const convertLocation = str => {
  return {
    all: 'all',
    top: 'top',
    bottom: 'bottom',
    start: 'left',
    end: 'right'
  }[str]
}

const getAlignItems = str => {
  return {
    center: 'itms-algC',
    start: 'itms-algS',
    end: 'itms-algE',
    baseline: 'itms-algBL',
    stretch: 'itms-algSR'
  }[str] || ''
}


const getJustifyContent = str => {
  return {
    center: 'itms-jfcC',
    start: 'itms-jfcS',
    end: 'itms-jfcE',
    'space-between': 'itms-jfcSB',
    'space-around': 'itms-jfcSA',
    'space-evenly': 'itms-jfcSE'
  }[str] || ''
}


export {
  pascal,
  getSpacing,
  getMargin,
  getSize,
  getWrap,
  getLayout,
  getBaseline,
  getFlex,
  getFlexClass,
  getCornerRadius,
  getHeight,
  getWidth,
  getWeight,
  getBorderColor,
  getBorderWidth,
  getGravity,
  getBackgroundColor,
  getPosition,
  getOffsetClasses,
  getOffsetStyle,
  getPaddingClasses,
  getPaddingStyle,
  getAlign,
  getDecoration,
  getTextStyle,
  getAlignItems,
  getJustifyContent
}
