// Express app from src/app.ts
import app from "./app";
import { serverConfig } from "./config";

const init = () => {
    app.listen(serverConfig.PORT, () => 
        console.log("Server running on port %d", serverConfig.PORT)
    );
}

init();