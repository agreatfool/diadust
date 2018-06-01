package main

import (
	"github.com/astaxie/beego"
	"diadust/controllers"
)

func main() {
	beego.Router("/image/fetch", &controllers.ImageController{}, "post:Fetch")
	beego.Run()
}