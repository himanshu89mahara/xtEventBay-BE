import winston,{format} from "winston";
const logger = winston.createLogger({
    level:'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error', format: format.combine(
      format.simple()) }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

  export default logger;