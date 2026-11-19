"use strict";

const bcrypt = require("bcryptjs");

const bikes = [
  ["HZB-001", "Seli Urban Fold", "Sepeda Lipat", "Tersedia", "Baik"],
  ["HZB-002", "Trail Master MTB", "Sepeda Gunung", "Tersedia", "Baik"],
  ["HZB-003", "Velocity Road Bike", "Sepeda Balap", "Tersedia", "Baik"],
  ["HZB-004", "Easy Hybrid", "Sepeda Hybrid", "Tersedia", "Baik"],
  ["HZB-005", "CityRide 7-Speed", "Sepeda Kota", "Tersedia", "Baik"],
  ["HZB-006", "Mini Fold 20", "Sepeda Lipat", "Tersedia", "Baik"],
  ["HZB-007", "Gravel Explorer", "Sepeda Gravel", "Tidak Tersedia", "Rusak"],
  ["HZB-008", "Comfort Step-Through", "Sepeda Kota", "Tersedia", "Baik"],
  ["HZB-009", "Crossway Hybrid", "Sepeda Hybrid", "Tidak Tersedia", "Perlu Perawatan"],
  ["HZB-010", "Urban Commuter", "Sepeda Kota", "Disewa", "Baik"],
  ["HZB-011", "Trail Scout 27.5", "Sepeda Gunung", "Disewa", "Baik"],
  ["HZB-012", "Swift Road 700C", "Sepeda Balap", "Disewa", "Baik"],
  ["HZB-013", "Family Tandem", "Sepeda Tandem", "Disewa", "Baik"],
  ["HZB-014", "Compact City Fold", "Sepeda Lipat", "Disewa", "Baik"],
];

const customers = [
  ["DEMO-KTP-001", "Rizky Maulana", "0812-0000-1001", "Jl. Sukajadi No. 18, Sukajadi, Bandung"],
  ["DEMO-KTP-002", "Nadia Putri", "0812-0000-1002", "Jl. Cihampelas No. 42, Coblong, Bandung"],
  ["DEMO-KTP-003", "Fajar Ramadhan", "0812-0000-1003", "Jl. Setiabudi No. 77, Sukasari, Bandung"],
  ["DEMO-KTP-004", "Intan Permata", "0812-0000-1004", "Jl. Dipatiukur No. 25, Coblong, Bandung"],
  ["DEMO-KTP-005", "Dimas Saputra", "0812-0000-1005", "Jl. Gegerkalong No. 31, Sukasari, Bandung"],
  ["DEMO-KTP-006", "Aulia Rahma", "0812-0000-1006", "Jl. Dago Asri No. 12, Coblong, Bandung"],
  ["DEMO-KTP-007", "Bagas Pratama", "0812-0000-1007", "Jl. Cikutra No. 56, Cibeunying, Bandung"],
  ["DEMO-KTP-008", "Siti Nurhaliza", "0812-0000-1008", "Jl. Antapani No. 9, Antapani, Bandung"],
  ["DEMO-KTP-009", "Rafi Akbar", "0812-0000-1009", "Jl. Buahbatu No. 63, Buahbatu, Bandung"],
  ["DEMO-KTP-010", "Dewi Anggraini", "0812-0000-1010", "Jl. Kiaracondong No. 14, Kiaracondong, Bandung"],
  ["DEMO-KTP-011", "Yoga Prakoso", "0812-0000-1011", "Jl. Pasteur No. 28, Sukajadi, Bandung"],
  ["DEMO-KTP-012", "Maya Lestari", "0812-0000-1012", "Jl. Pahlawan No. 35, Cibeunying, Bandung"],
  ["DEMO-KTP-013", "Andi Firmansyah", "0812-0000-1013", "Jl. Lodaya No. 17, Lengkong, Bandung"],
  ["DEMO-KTP-014", "Citra Maharani", "0812-0000-1014", "Jl. Margacinta No. 44, Buahbatu, Bandung"],
  ["DEMO-KTP-015", "Ilham Kurniawan", "0812-0000-1015", "Jl. Arcamanik No. 21, Arcamanik, Bandung"],
  ["DEMO-KTP-016", "Laras Wulandari", "0812-0000-1016", "Jl. Sarijadi No. 38, Sukasari, Bandung"],
  ["DEMO-KTP-017", "Reza Hidayat", "0812-0000-1017", "Jl. Cibaduyut No. 52, Bojongloa, Bandung"],
  ["DEMO-KTP-018", "Nisa Amelia", "0812-0000-1018", "Jl. Ujungberung No. 16, Ujungberung, Bandung"],
  ["DEMO-KTP-019", "Taufik Ismail", "0812-0000-1019", "Jl. Riau No. 33, Bandung Wetan, Bandung"],
  ["DEMO-KTP-020", "Putri Oktaviani", "0812-0000-1020", "Jl. Cibiru Hilir No. 11, Cileunyi, Kabupaten Bandung"],
];

const rentals = [
  { bike: 0, customer: 0, daysAgo: 12, hoursAgo: 4, returnHours: 5, condition: "Baik", note: null },
  { bike: 1, customer: 1, daysAgo: 10, hoursAgo: 2, returnHours: 4, condition: "Baik", note: "Sepeda kembali dalam kondisi baik." },
  { bike: 2, customer: 2, daysAgo: 9, hoursAgo: 3, returnHours: 6, condition: "Baik", note: "Rem dan perpindahan gigi sudah diperiksa." },
  { bike: 3, customer: 3, daysAgo: 8, hoursAgo: 1, returnHours: 5, condition: "Baik", note: null },
  { bike: 4, customer: 4, daysAgo: 7, hoursAgo: 5, returnHours: 4, condition: "Baik", note: "Pemeriksaan rutin selesai." },
  { bike: 5, customer: 5, daysAgo: 6, hoursAgo: 2, returnHours: 5, condition: "Baik", note: null },
  { bike: 6, customer: 6, daysAgo: 5, hoursAgo: 4, returnHours: 6, condition: "Rusak", note: "Rantai terlepas saat digunakan; sepeda perlu perbaikan." },
  { bike: 7, customer: 7, daysAgo: 4, hoursAgo: 3, returnHours: 4, condition: "Baik", note: "Dikembalikan tepat waktu." },
  { bike: 8, customer: 8, daysAgo: 3, hoursAgo: 1, returnHours: 5, condition: "Perlu Perawatan", note: "Ban depan perlu ditambah tekanan angin." },
  { bike: 9, customer: 9, daysAgo: 0, hoursAgo: 1, active: true },
  { bike: 10, customer: 10, daysAgo: 0, hoursAgo: 2, active: true },
  { bike: 11, customer: 11, daysAgo: 0, hoursAgo: 3, active: true },
  { bike: 12, customer: 12, daysAgo: 0, hoursAgo: 1, active: true },
  { bike: 13, customer: 13, daysAgo: 0, hoursAgo: 2, active: true },
];

const selectOne = async (queryInterface, Sequelize, sql, replacements, transaction) => {
  const rows = await queryInterface.sequelize.query(sql, {
    replacements,
    type: Sequelize.QueryTypes.SELECT,
    transaction,
  });
  return rows[0] || null;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      let admin = await selectOne(
        queryInterface,
        Sequelize,
        "SELECT id FROM admins WHERE username = :username LIMIT 1",
        { username: "admin" },
        transaction,
      );

      if (!admin) {
        const now = new Date();
        await queryInterface.bulkInsert(
          "admins",
          [{
            name: "Admin Hazza Bike",
            username: "admin",
            password: await bcrypt.hash("admin", 10),
            createdAt: now,
            updatedAt: now,
          }],
          { transaction },
        );
        admin = await selectOne(
          queryInterface,
          Sequelize,
          "SELECT id FROM admins WHERE username = :username LIMIT 1",
          { username: "admin" },
          transaction,
        );
      }

      if (!admin) {
        throw new Error("Akun admin demo gagal disiapkan.");
      }

      const now = new Date();
      for (const [id, name, type, status, condition] of bikes) {
        const existingBike = await selectOne(
          queryInterface,
          Sequelize,
          "SELECT id_sepeda FROM sepeda WHERE id_sepeda = :id LIMIT 1",
          { id },
          transaction,
        );
        const values = {
          nama_sepeda: name,
          jenis: type,
          status,
          kondisi: condition,
          updatedAt: now,
        };

        if (existingBike && Number(id.slice(-3)) >= 5) {
          await queryInterface.bulkUpdate("sepeda", values, { id_sepeda: id }, { transaction });
        } else if (!existingBike) {
          await queryInterface.bulkInsert(
            "sepeda",
            [{ id_sepeda: id, ...values, createdAt: now }],
            { transaction },
          );
        }
      }

      const customerIds = [];
      for (const [identity, name, phone, address] of customers) {
        let customer = await selectOne(
          queryInterface,
          Sequelize,
          "SELECT id_pelanggan FROM pelanggan WHERE no_identitas = :identity LIMIT 1",
          { identity },
          transaction,
        );
        if (!customer) {
          await queryInterface.bulkInsert(
            "pelanggan",
            [{
              no_identitas: identity,
              nama: name,
              no_hp: phone,
              alamat: address,
              createdAt: now,
              updatedAt: now,
            }],
            { transaction },
          );
          customer = await selectOne(
            queryInterface,
            Sequelize,
            "SELECT id_pelanggan FROM pelanggan WHERE no_identitas = :identity LIMIT 1",
            { identity },
            transaction,
          );
        }
        if (!customer) {
          throw new Error(`Pelanggan demo ${identity} gagal disiapkan.`);
        }
        customerIds.push(customer.id_pelanggan);
      }

      for (const rental of rentals) {
        const bikeId = bikes[rental.bike][0];
        const customerId = customerIds[rental.customer];
        let transactionRow = await selectOne(
          queryInterface,
          Sequelize,
          `SELECT id_penyewaan FROM penyewaan
           WHERE id_sepeda = :bikeId AND id_pelanggan = :customerId AND id_pengelola = :adminId
           ORDER BY id_penyewaan DESC LIMIT 1`,
          { bikeId, customerId, adminId: admin.id },
          transaction,
        );

        const rentalTime = new Date(now);
        rentalTime.setDate(rentalTime.getDate() - rental.daysAgo);
        rentalTime.setHours(rentalTime.getHours() - rental.hoursAgo);
        const dueTime = new Date(rentalTime.getTime() + 6 * 60 * 60 * 1000);

        if (!transactionRow) {
          await queryInterface.bulkInsert(
            "penyewaan",
            [{
              id_sepeda: bikeId,
              id_pelanggan: customerId,
              id_pengelola: admin.id,
              waktu_sewa: rentalTime,
              batas_waktu: dueTime,
              tarif: 30000,
              status_transaksi: rental.active ? "Berjalan" : "Selesai",
              createdAt: rentalTime,
              updatedAt: now,
            }],
            { transaction },
          );
          transactionRow = await selectOne(
            queryInterface,
            Sequelize,
            `SELECT id_penyewaan FROM penyewaan
             WHERE id_sepeda = :bikeId AND id_pelanggan = :customerId AND id_pengelola = :adminId
             ORDER BY id_penyewaan DESC LIMIT 1`,
            { bikeId, customerId, adminId: admin.id },
            transaction,
          );
        }

        if (!transactionRow) {
          throw new Error(`Transaksi demo untuk sepeda ${bikeId} gagal disiapkan.`);
        }

        if (!rental.active) {
          const existingReturn = await selectOne(
            queryInterface,
            Sequelize,
            "SELECT id_pengembalian FROM pengembalian WHERE id_penyewaan = :rentalId LIMIT 1",
            { rentalId: transactionRow.id_penyewaan },
            transaction,
          );
          if (!existingReturn) {
            const returnedAt = new Date(rentalTime.getTime() + rental.returnHours * 60 * 60 * 1000);
            await queryInterface.bulkInsert(
              "pengembalian",
              [{
                id_penyewaan: transactionRow.id_penyewaan,
                waktu_kembali: returnedAt,
                kondisi_kembali: rental.condition,
                catatan: rental.note,
                createdAt: returnedAt,
                updatedAt: returnedAt,
              }],
              { transaction },
            );
          }
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const demoCustomers = await queryInterface.sequelize.query(
        "SELECT id_pelanggan FROM pelanggan WHERE no_identitas LIKE 'DEMO-KTP-%'",
        { type: Sequelize.QueryTypes.SELECT, transaction },
      );
      const customerIds = demoCustomers.map((customer) => customer.id_pelanggan);

      if (customerIds.length > 0) {
        const rentalsForCustomers = await queryInterface.sequelize.query(
          "SELECT id_penyewaan FROM penyewaan WHERE id_pelanggan IN (:customerIds)",
          { replacements: { customerIds }, type: Sequelize.QueryTypes.SELECT, transaction },
        );
        const rentalIds = rentalsForCustomers.map((rental) => rental.id_penyewaan);

        if (rentalIds.length > 0) {
          await queryInterface.bulkDelete(
            "pengembalian",
            { id_penyewaan: rentalIds },
            { transaction },
          );
          await queryInterface.bulkDelete("penyewaan", { id_penyewaan: rentalIds }, { transaction });
        }
        await queryInterface.bulkDelete("pelanggan", { id_pelanggan: customerIds }, { transaction });
      }

      await queryInterface.bulkDelete(
        "sepeda",
        { id_sepeda: bikes.slice(4).map(([id]) => id) },
        { transaction },
      );
    });
  },
};
