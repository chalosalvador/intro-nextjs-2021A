import api from "./index";

const Article = {
  create: (data) => {
    return api.post("/articles", data);
  },
};

export default Article;
