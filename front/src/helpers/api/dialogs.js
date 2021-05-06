import { axios } from "../../core";

export default {
    getAll: () => axios.get("/dialogs/user/me"),
    create: (partnerId) =>
        axios.post("/dialogs/create", { partner: partnerId }),
};
