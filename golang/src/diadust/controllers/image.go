package controllers

import (
	"github.com/astaxie/beego"
	"log"
)

type ImageController struct {
	beego.Controller
}

type Person struct {
	Name string `json:"string"`
	Age  int    `json:"int"`
}

func (this *ImageController) Fetch() {
	log.Printf("body: %s\n", this.Ctx.Input.RequestBody)
	person := &Person{Name: "Jonathan", Age: 23}
	this.Data["json"] = person
	this.ServeJSON()
}
