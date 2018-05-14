## mk-dirs
> a little tool function of creating multi level directories or files

### Usage
```js
const mkdirs = require('mkdirs')
mkdirs('./aaa/bbb/ccc/ddd/eee/fff/ggg', console.log)
mkdirs('./aaa/bbb/ccc/ddd/eee/fff/haha.txt', 'this is text content', callback)
mkdirs('./aaa.txt/bbb.csv/../ccc.//./././fff/ttt.png', [textFile, csvFile, imageFile], callback)

```