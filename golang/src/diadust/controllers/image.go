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

	images := []models.Image{
		{Id: 1, Uuid: "uuid1", OriginalName: "OriginalName1", Path: "Path1", Tags: []int{1,2,3}, Created: 123},
		{Id: 2, Uuid: "uuid2", OriginalName: "OriginalName1", Path: "Path1", Tags: []int{1,2,3}, Created: 123},
		{Id: 3, Uuid: "uuid3", OriginalName: "OriginalName1", Path: "Path1", Tags: []int{1,2,3}, Created: 123},
		{Id: 4, Uuid: "uuid4", OriginalName: "OriginalName1", Path: "Path1", Tags: []int{1,2,3}, Created: 123},
		{Id: 5, Uuid: "uuid5", OriginalName: "OriginalName1", Path: "Path1", Tags: []int{1,2,3}, Created: 123},
	}

	this.Data["json"] = images
	this.ServeJSON()
}
