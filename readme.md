### Get NFTs

method: GET

url: https://sergey-shaposhnik-final-project-back.onrender.com/nfts

request: {}
response: 200 OK, [
{
"_id": "64785e8e430e348badb64911",
"title": "new nft",
"price": 1,
"author": "space33",
"image": "https://i.postimg.cc/CK3DrTv2/Img-Creator-ai-traditional-art-of-crash-bandicoot-with-sunflowers-at-back-art-nouveau-style.webp",
"description": "best nft ever",
"user": "64785e8e430e348badb64911"
},....]

### Ping

method: GET

url: https://sergey-shaposhnik-final-project-back.onrender.com/ping

request: {}
response: 200 OK, response: 200 OK, { "message": "Entered" }

### Login User

method: POST

url: https://sergey-shaposhnik-final-project-back.onrender.com/user/login

request: {
"username":"sergey",
"password":"qwerty"
}

response: 200 OK, {
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTBlMGUyZTczMzYzZDI4N2I0YWEiLCJuYW1lIjoic2VyZ2V5IiwiaWF0IjoxNjg1OTc0MTg5LCJleHAiOjE2ODY1Nzg5ODl9.HTqRzkq1tK-TG9MSUR9BFAcjfiT8-wH4g1yqen0tQpA"
}
