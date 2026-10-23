const { Event } = require("../../../models");

class Model_r {
  constructor(req) {
    this.req = req;
  }
  async daftar_event() {
    try {
      const events = await Event.findAll();
      return events;
    } catch (error) {
      console.error("Error fetching event data:", error);
      throw error;
    }
  }
}

module.exports = Model_r;
