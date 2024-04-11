curl localhost:8080 -F operations='{ "query": "mutation ($input: CreateCategoryInput!) { createCategory(input: $input) }", "variables": { input:{name: "starter" image:null} } }' -F map='{ "0": ["variables.image"] }' -F 0=@./uploads/a.txt

curl localhost:8080/query  -F operations='{ "query": "mutation CreateCategory($input: CreateCategoryInput!) { createCategory(input: $input) }", "variables": { input:{"image": null, "name" : "12345"} } }' -F map='{ "0": ["variables.input.image"] }'  -F 0=@uploads/a.txt

curl localhost:8080/query  -F operations='{ "query": "mutation CreateCategory($input: CreateCategoryInput!) { createCategory(input: $input) }", "variables": { input:{"image": null, "name" : "12345"} } }' -F map='{ "0": ["variables.input.image"] }'  -F 0=@uploads/a.txt