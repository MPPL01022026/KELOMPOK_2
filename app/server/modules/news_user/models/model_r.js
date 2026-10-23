const { News } = require("../../../models");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  async daftar_news_user() {
    try {
      const news = await News.findAll();
      return news;
    } catch (error) {
      console.error("Error fetching News user data:", error);
      throw error;
    }
  }
}

module.exports = Model_r;
