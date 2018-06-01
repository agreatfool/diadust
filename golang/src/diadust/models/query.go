package models

const (
	ORDER_TYPE_CREATED    = "CREATED"
	ORDER_TYPE_SIZE       = "SIZE"
	ORDER_TYPE_RESOLUTION = "RESOLUTION"
	ORDER_DESC            = "DESC"
	ORDER_ASC             = "ASC"
)

type ImageSearchFilter struct {
	IncludeNames []string `json:"includeNames"`
	ExcludeNames []string `json:"excludeNames"`
	IncludeTags  []string `json:"includeTags"`
	ExcludeTags  []string `json:"excludeTags"`
	OrderType    string   `json:"orderType"`
	Order        string   `json:"order"`
}
