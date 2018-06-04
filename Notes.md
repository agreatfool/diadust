## TODO

* 如何使用npm预安装imagemagick之类的软件
* 在当前照片图库中进行深度学习，根据当前的图片内容及tag，对后续的照片进行自动化猜测tag
* 使用golang的库进行重复图片识别
* 人脸识别解锁？face id？https://blog.machinebox.io/introducing-web-face-id-how-to-use-html5-go-and-facebox-to-verify-your-face-b75cf2aee5e8

## VueJs

* https://segmentfault.com/a/1190000011744210 起手sample
* https://www.npmjs.com/package/vue-property-decorator
* https://www.cnblogs.com/crazycode2/p/7821389.html vue-property-decorator 提供 OO 的风格 Vue Component 方便类型声明

## Lib

* https://github.com/vuejs/awesome-vue
* isotope.metafizzy.co 格子排序、过滤等动画库
* https://tsuyoshiwada.github.io/react-stack-grid/ react堆栈 完全就是想要的效果
* https://www.npmjs.com/package/vue-waterfall vue的
* https://github.com/shershen08/vue-masonry
* https://masonry.desandro.com/ https://codepen.io/desandro/pen/kwsJb https://codepen.io/desandro/pen/bqvLaZ/
* http://mirari.cc/v-viewer/

## Electron

* https://github.com/electron-userland/electron-packager

## GOPATH

* https://gist.github.com/RobRuana/7cda375014e0f699fba1 gohere
* https://www.jtolio.com/2017/01/magic-gopath/ magic gopath
* https://github.com/golang/go/wiki/PackageManagementTools go package management
* https://github.com/golang/go/issues/24301 latest version proposal
* https://github.com/golang/vgo version go
* https://github.com/golang/dep https://gocn.vip/article/414 dependency management tool official

## Golang

* https://github.com/rivo/duplo duplicate images detection

## Dummy

$ protoc --version
libprotoc 3.3.0

go grpc的protoc插件仍旧需要使用全局GOPATH的方式来安装，否则没办法进行命令行直接执行
go get -u github.com/golang/protobuf/protoc-gen-go

protoc \
--go_out=plugins=grpc:./dest_dir \
-I ./proto \
./proto/*.proto

npm install grpc_tools_node_protoc_ts@2.3.0 -g