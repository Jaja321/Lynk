# Lynk
Lynk is a full-stack (React, Node, MongoDB) reddit-like news aggregation website, in which users can post links and vote on others.
[Live website](https://glacial-peak-11538.herokuapp.com/) (hosted on heroku)


Technical details:
## Server
- The server is built with Node, Express, and MongoDB.
- It provides a RESTful API, allowing users to get a list of links, vote on them, or post new ones.
- Authentication: When a user registers, its password is encryped before being stored in the database. When logging in, a token is generated for the user using JWT and sent to the client. The cilent can then include the token in its future requests to verify its identity.

## Client
- A React/Redux App
- Made with [Material-UI](https://material-ui-next.com/) components
