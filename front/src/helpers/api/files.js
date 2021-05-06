import { axios } from "../../core";

export default {
    upload: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post("/files/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    uploadAvatar: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post("/files/uploadavatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    delete: (id) => axios.delete("/files/delete/" + id),
};
