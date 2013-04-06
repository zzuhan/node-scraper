抓取网页的脚本
====

目前主要用来抓取chinabike.net dongfanghong.com.cn 上的二手版块，进行信息过滤，生成结果页面，方便获取自己需要的内容

##下一步

1. 重构，update.js 改了目前又跑不通了，将helper.js中的一些方法拿出来，作为update.js中的本地方法。尽量让update.js 中 东方红和CB的内容能重用

2. 能在updata.js 页进行百分比的展示，不然等着太焦急了

2. 更高级的定制化，你喜欢的，不喜欢的，哪些页面，哪些选择器来进行选择

3. 如何提高速度，现在太慢了，我感觉是jsdom解析的问题

## 需要的模块

1. jsdom 用来将获取的String型网页内容解析，变成可以进行Dom操作的

2. iconv 解决request()获取网页编码问题

3. request 方便的获取网页

