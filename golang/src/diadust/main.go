package main

import (
	"github.com/astaxie/beego"
	"diadust/controllers"
	"github.com/astaxie/beego/context"
)

func main() {
	beego.BConfig.Listen.HTTPAddr = "127.0.0.1"
	beego.BConfig.Listen.HTTPPort = 13000
	beego.BConfig.CopyRequestBody = true
	beego.BConfig.RunMode = "dev"
	beego.BConfig.EnableGzip = true
	context.InitGzip(
		beego.AppConfig.DefaultInt("gzipMinLength", -1),
		beego.AppConfig.DefaultInt("gzipCompressLevel", 7),
		beego.AppConfig.DefaultStrings("includedMethods", []string{"GET", "POST"}),
	)
	beego.BConfig.WebConfig.AutoRender = false

	beego.Router("/image/fetch", &controllers.ImageController{}, "post:Fetch")

	beego.Run()
}