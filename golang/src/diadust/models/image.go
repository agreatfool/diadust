package models

type Image struct {
	Id           int    `json:"id"`
	Uuid         string `json:"uuid"`
	OriginalName string `json:"originalName"`
	Path         string `json:"path"`
	Tags         []int  `json:"tags"`
	Created      int    `json:"created"`
}
