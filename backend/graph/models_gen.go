// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package graph

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/99designs/gqlgen/graphql"
)

type Category struct {
	ID          uint       `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Products    []*Product `json:"products"`
}

type CreateCategoryInput struct {
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
}

type CreateProductInput struct {
	Name        string  `json:"name"`
	Sku         string  `json:"sku"`
	CategoryID  uint    `json:"categoryId"`
	Price       float64 `json:"price"`
	Description *string `json:"description,omitempty"`
}

type File struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Content string `json:"content"`
}

type ListProductsInput struct {
	Name  string         `json:"name"`
	Price float64        `json:"price"`
	Sort  *SortDirection `json:"sort,omitempty"`
}

// Root mutation type representing all entry points for modifying data in the API.
type Mutation struct {
}

type Product struct {
	ID          uint      `json:"id"`
	Name        string    `json:"name"`
	Sku         string    `json:"sku"`
	Price       float64   `json:"price"`
	Description *string   `json:"description,omitempty"`
	CategoryID  *uint     `json:"categoryId,omitempty"`
	Category    *Category `json:"category"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Root query type representing all entry points into the API.
type Query struct {
}

type UpdateCategoryInput struct {
	ID          uint    `json:"id"`
	Name        *string `json:"name,omitempty"`
	Description *string `json:"description,omitempty"`
}

type UpdateProductInput struct {
	ID          uint    `json:"id"`
	Name        string  `json:"name"`
	Sku         string  `json:"sku"`
	CategoryID  uint    `json:"categoryId"`
	Price       float64 `json:"price"`
	Description *string `json:"description,omitempty"`
}

type UploadFile struct {
	ID   int            `json:"id"`
	File graphql.Upload `json:"file"`
}

type SortDirection string

const (
	SortDirectionAsc  SortDirection = "ASC"
	SortDirectionDesc SortDirection = "DESC"
)

var AllSortDirection = []SortDirection{
	SortDirectionAsc,
	SortDirectionDesc,
}

func (e SortDirection) IsValid() bool {
	switch e {
	case SortDirectionAsc, SortDirectionDesc:
		return true
	}
	return false
}

func (e SortDirection) String() string {
	return string(e)
}

func (e *SortDirection) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = SortDirection(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid SortDirection", str)
	}
	return nil
}

func (e SortDirection) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
