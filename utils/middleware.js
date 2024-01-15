export const restrictAccess = (req, res, next) => {
    const allowedIP = "localhost:4000"; 
    const requestIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    if (requestIP === allowedIP) {
      next(); 
    } else {
      res.status(403).send('Forbidden'); 
    }
  };