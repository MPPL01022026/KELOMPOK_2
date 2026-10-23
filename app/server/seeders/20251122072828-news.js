"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "News",
      [
        {
          title: "Jalan Menuju Wisata Tamsar 27",
          image: "jalan.jpeg",
          deskripsi:
            "Peningkatan akses menuju Wisata Tamsar 27 kembali menjadi perhatian masyarakat dan pengunjung. Jalur utama yang sebelumnya rusak akibat kondisi alam dan curah hujan tinggi kini mulai dibenahi melalui kegiatan gotong royong yang melibatkan warga sekitar. Proses perbaikan dilakukan secara bertahap, mulai dari perataan jalur, penimbunan material, hingga memperlebar bagian jalan yang sebelumnya sulit dilalui.\n\nMasyarakat bekerja sama menggunakan alat sederhana untuk memperbaiki struktur tanah, sekaligus membuka kembali akses yang sempat tertutup. Upaya ini mendapat apresiasi dari sejumlah pengunjung yang datang untuk menikmati keindahan alam Tamsar 27. Perbaikan jalan diharapkan dapat meningkatkan kenyamanan wisatawan sekaligus mendukung perkembangan pariwisata lokal.",
          slug: "jalan-menuju-wisata-tamsar-27",
          date: new Date(),
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: "Jembatan Menuju Wisata Tamsar 27",
          image: "jembatan.jpeg",
          deskripsi:
            "Akses menuju Wisata Tamsar 27 kembali menjadi sorotan setelah sejumlah kendaraan off-road melintasi jalur ekstrem yang dikenal sebagai salah satu rute tersulit di kawasan tersebut. Kondisi jalan yang licin, berlumpur, serta sempit membuat jalur ini hanya dapat dilewati oleh kendaraan 4x4 khusus. Beberapa titik bahkan mengharuskan pengemudi berhenti dan melakukan pengecekan jalur secara manual sebelum melanjutkan perjalanan.\n\nKeberadaan jembatan kecil dan jalur menurun yang curam menjadi tantangan tersendiri bagi para rombongan yang melakukan ekspedisi menuju wisata alam ini. Meski demikian, upaya untuk memperbaiki dan memperlebar bagian jalan juga terus dilakukan oleh warga dan komunitas pecinta alam setempat. Diharapkan akses menuju Tamsar 27 nantinya lebih aman bagi pengunjung umum tanpa menghilangkan nuansa petualangan yang menjadi daya tarik kawasan ini.",
          slug: "jembatan-menuju-wisata-tamsar-27",
          date: new Date(),
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: "Mobil Mogok di Wisata Tamsar 27",
          image: "mobil_mogok.jpeg",
          deskripsi:
            "Sebuah kendaraan off-road dilaporkan mengalami kendala saat melakukan ekspedisi menuju Air Terjun Tamsar 27. Mobil tersebut terperosok di jalur berlumpur setelah melewati medan yang sangat terjal dan licin akibat hujan. Situasi ini menarik perhatian rombongan lain yang kemudian memberikan bantuan untuk menarik kendaraan menggunakan peralatan recovery.\n\nKondisi jalan menuju air terjun memang dikenal cukup menantang, terutama bagi kendaraan yang tidak dipersiapkan secara maksimal. Meski demikian, kawasan Tamsar 27 tetap menjadi salah satu destinasi favorit pecinta adventure berkat keindahan alamnya. Insiden ini juga menjadi pengingat pentingnya persiapan kendaraan, pemeriksaan kondisi jalur, serta kewaspadaan pengemudi saat memasuki rute ekstrem.",
          slug: "mobil-mogok-di-wisata-tamsar-27",
          date: new Date(),
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("News", null, {});
  },
};