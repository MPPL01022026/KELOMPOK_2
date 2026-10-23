const { Galery } = require("../../../models");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  async daftar_galeri_user() {
    try {
      const galeries = await Galery.findAll();
      return galeries;
    } catch (error) {
      console.error("Error fetching Galeri user data:", error);
      throw error;
    }
  }
}

module.exports = Model_r;
