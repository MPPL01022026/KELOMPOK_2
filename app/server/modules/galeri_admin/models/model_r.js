const { Galery } = require("../../../models");
const { Op } = require("sequelize");
const moment = require("moment");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  async daftar_galeri_admin() {
    const body = this.req.body;

    const limit = parseInt(body.perpage, 10) || 10;
    const page =
      body.pageNumber && body.pageNumber !== "0"
        ? parseInt(body.pageNumber, 10)
        : 1;

    const where = body.search
      ? {
          [Op.or]: [{ name: { [Op.like]: `%${body.search}%` } }],
        }
      : {};

    try {
      const result = await Galery.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
        where,
        attributes: ["id", "name", "image"],
        subQuery: false,
        distinct: true,
      });
      console.log("======================================");
      console.log("ROWS:", result.rows);
      console.log("COUNT:", result.count);
      console.log("LIMIT:", limit);
      console.log("PAGE:", page);
      console.log("OFFSET:", (page - 1) * limit);
      console.log("WHERE:", where);
      console.log("======================================");

      return {
        data: result.rows.map((g) => ({
          id: g.id,
          name: g.name,
          image: g.image,
        })),
        total: result.count,
        perpage: limit,
        page: page,
      };
    } catch (error) {
      console.error("Error fetching Galeri data:", error);
      return { success: false, data: [], total: 0, perpage: limit, page: page };
    }
  }
}

module.exports = Model_r;
