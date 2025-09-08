import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

const { PORT, NODE_ENV, DB_URI } = process.env;

// export default PORT;
export { PORT, NODE_ENV, DB_URI };
