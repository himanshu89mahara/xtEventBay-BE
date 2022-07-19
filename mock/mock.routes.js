const jsonServer = require("json-server");
const path = require("path");
const routes = jsonServer.create();
const middlewares = jsonServer.defaults()

routes
  .use(middlewares)
  .use((req,res,next)=>{
    //   req.body.oracleId=5757;
      next();
  })
//   .use(
//     server.rewriter({
//       "/mock/employee/:emailId": "/mock/employees?email=:emailId",
//     })
//   )
  
  .use("/", jsonServer.router(path.join(__dirname, "mock.json")));
  
  const PORT = process.env.PORT || 3200;
  routes.listen(PORT, () => {
    console.log(`Mock is running in PORT ${PORT}`);
  })
  