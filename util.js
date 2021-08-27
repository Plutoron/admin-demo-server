const generatorAnswerMarkdownStr = (v) => {
  let { resourceTitle, resourceUrl, resourceShowType, sonAnswerRespList } = v 

  let result = `[${resourceTitle}](${resourceUrl})`
  let childStr = ''

  if (sonAnswerRespList && sonAnswerRespList.length) {
    childStr = sonAnswerRespList.reduce((pre, v) => {
      let { resourceTitle, resourceUrl, resourceShowType, sonAnswerRespList } = v 
      pre = `${pre}
  [${resourceTitle}](${resourceUrl})`

      return pre
    }, ``)
  }

  return `${result}${childStr}`.trim()
}

const generateMarkdownStr = (list) => {
  return list.reduce((pre, v) => {
    pre = `${pre}
${v}`

    return pre
  }, ``).trim()
}

module.exports = {
  generatorAnswerMarkdownStr,
  generateMarkdownStr
}