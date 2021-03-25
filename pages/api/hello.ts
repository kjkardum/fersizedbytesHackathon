// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { APIWrapper } from "../../services/ApiWrapper";

export default (req, res) => {
<<<<<<< HEAD:pages/api/hello.ts
	let test = new APIWrapper();
=======
    res.status(200).json({ name: "John Doe" });
>>>>>>> 5221226356e828624563b8ca0b0d9c32716216fc:pages/api/hello.js
};
