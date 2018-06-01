package controllers

import (
	"github.com/astaxie/beego"
	"encoding/json"
	"diadust/models"
	"fmt"
)

type ImageController struct {
	beego.Controller
}

type Person struct {
	Name string `json:"string"`
	Age  int    `json:"int"`
}

func (this *ImageController) Fetch() {
	beego.Debug(fmt.Sprintf("body: %s\n", this.Ctx.Input.RequestBody))

	var filter models.ImageSearchFilter
	err := json.Unmarshal(this.Ctx.Input.RequestBody, &filter)
	if err != nil {
		beego.Error(err)
	}
	beego.Debug(fmt.Sprintf("%+v", filter))

	this.Data["json"] = &Person{Name: "Jonathan", Age: 23}
	this.ServeJSON()
}
