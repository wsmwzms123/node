const path = require('path')
const fs = require('fs')

/**
 * 
 * 
 * @param {String} paths of creating files or folders
 * @param {Array|String} contents of files you creating
 * @param {Function} callback 
 */
function mkdirs (paths, contentsArr, callback) {
  if (!paths || typeof paths !== 'string') return
  if (typeof contentsArr === 'function') {
    callback = contentsArr
    contentsArr = []
  }
  if (contentsArr && !Array.isArray(contentsArr)) {
    contentsArr = [contentsArr]
  }
  callback = callback || function (err) { console.log(err) }
  const {base, dir, ext} = path.parse(paths)
  const dirnameArr = dir.split(/\\|\//)
  let dirname = ''
  function mk (err) {
    if (dirnameArr.length) {
      let arrShift, currentPath = ''
      while (/^\.{1,2}$/.test(arrShift = dirnameArr.shift())) {
        currentPath += (arrShift + '/')
      }
      dirname += (currentPath ? dirname ? '/' : '' : '') + currentPath + (arrShift ? ((!currentPath ? '/' : '') + arrShift) : '')
      if (/\./.test(arrShift)) {
        fs.writeFile(dirname, contentsArr.shift() || '', err => {
          dirname = dirname.slice(0, -(arrShift.length + 1))
          mk(err)
        })
      } else {
        fs.mkdir(dirname, mk.bind)
      }
    } else {
      if (ext) {
        fs.writeFile(dirname + '/' + base, contentsArr.shift() || '', err => {
          callback(err, paths)
        })
      } else {
        fs.mkdir(dirname + '/' + base, err => {
          callback(err, paths)
        })
      }
    }
  }
  mk()
}

exports = module.exports = mkdirs
