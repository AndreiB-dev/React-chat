import { axios } from "../../core";

export default {
    signin: (postData) => axios.post("/user/signin", postData),
    signup: (postData) => axios.post("/user/signup", postData),
    getMe: () => axios.get("/user/me"),
    verify: (hash) => axios.get("/user/verify?hash=" + hash),
    findUser: (query) => axios.get("/user/search?query=" + query),
    update: (name, url) => axios.post("/user/update", { name, url }),
};
