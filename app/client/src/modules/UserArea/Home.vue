
<template>
  <div class="home">

    <!-- HERO SECTION -->
    <section
      class="hero relative min-h-screen flex items-center"
      :style="{ backgroundImage: `url(${heroBg})` }"
    >
      <div class="hero-overlay"></div>

      <div class="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 pt-24">
        <div class="max-w-2xl">

          <div class="inline-flex items-center gap-2 border border-white/40 rounded-full px-5 py-2 mb-8">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span class="text-sm tracking-widest text-white">
              BICYCLE SHOP & RENTAL
            </span>
          </div>

          <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Explore More.<br />
            <span class="text-emerald-300">Ride Further.</span>
          </h1>

          <p class="text-gray-200 text-lg md:text-xl leading-relaxed mb-10">
            Temukan sepeda impianmu dan nikmati pengalaman
            bersepeda yang menyenangkan bersama Hazza Bike.
          </p>

          <div class="flex flex-wrap gap-4">
            <a href="#layanan" class="btn-primary">
              Jelajahi Layanan <span>→</span>
            </a>

            <RouterLink to="/lokasi" class="btn-secondary">
              Temukan Lokasi
            </RouterLink>
          </div>

        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-sm tracking-widest animate-bounce">
        SCROLL TO EXPLORE ↓
      </div>
    </section>


    <!-- INTRODUCTION -->
    <section class="py-20 px-6 md:px-16">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p class="section-label">WELCOME TO HAZZA BIKE</p>

          <h2 class="section-title">
            Teman Terbaik untuk
            <span>Kebutuhan Bersepedamu.</span>
          </h2>

          <p class="description">
            Hazza Bike hadir sebagai toko sepeda yang menyediakan
            layanan penjualan dan penyewaan sepeda untuk para
            pecinta olahraga dan aktivitas bersepeda.
          </p>

          <p class="description mt-4">
            Kami juga menyediakan layanan servis sepeda di toko
            untuk membantu menjaga kondisi sepeda agar tetap
            nyaman digunakan.
          </p>

          <RouterLink to="/lokasi" class="inline-flex items-center gap-3 mt-8 text-emerald-400 font-semibold hover:gap-5 transition-all">
            Kunjungi Toko Kami <span>→</span>
          </RouterLink>
        </div>

        <div class="relative">
          <img
            :src="gallery?.[0] || heroBg"
            alt="Koleksi sepeda Hazza Bike"
            class="w-full h-[400px] object-cover rounded-2xl shadow-xl"
          />

          <div class="absolute -bottom-5 -left-5 bg-emerald-700 p-6 rounded-xl shadow-lg">
            <p class="text-3xl font-bold text-white">HB.</p>
            <p class="text-sm text-emerald-100">Ride With Passion</p>
          </div>
        </div>

      </div>
    </section>


    <!-- SERVICES -->
    <section id="layanan" class="py-24 px-6 md:px-16 services-section">

      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-14">
          <p class="section-label">OUR SERVICES</p>

          <h2 class="section-title">
            Apa yang Bisa Kamu
            <span>Temukan di Sini?</span>
          </h2>

          <p class="description max-w-2xl mx-auto">
            Berbagai kebutuhan sepeda tersedia untuk
            mendukung aktivitas dan hobi bersepedamu.
          </p>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-3 gap-7">

          <!-- JUAL SEPEDA -->
          <div class="service-card">
            <div class="service-icon">🚲</div>

            <span class="text-emerald-400 text-xs font-bold tracking-widest">
              01 / PRODUCT
            </span>

            <h3>Jual Sepeda</h3>

            <p>
              Temukan berbagai pilihan sepeda yang sesuai
              dengan kebutuhan dan gaya bersepedamu.
            </p>

            <span class="service-arrow">↗</span>
          </div>


          <!-- RENTAL -->
          <div class="service-card">
            <div class="service-icon">🚴</div>

            <span class="text-emerald-400 text-xs font-bold tracking-widest">
              02 / RENTAL
            </span>

            <h3>Rental Sepeda</h3>

            <p>
              Nikmati pengalaman bersepeda dengan
              layanan penyewaan sepeda dari Hazza Bike.
            </p>

            <span class="service-arrow">↗</span>
          </div>


          <!-- SERVIS -->
          <div class="service-card">
            <div class="service-icon">🔧</div>

            <span class="text-emerald-400 text-xs font-bold tracking-widest">
              03 / SERVICE
            </span>

            <h3>Servis Sepeda</h3>

            <p>
              Perawatan dan perbaikan sepeda untuk
              membantu menjaga performa sepeda.
            </p>

            <span class="service-arrow">↗</span>
          </div>

        </div>
      </div>
    </section>


    <!-- WHY CHOOSE US -->
    <section class="py-24 px-6 md:px-16">
      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-16">
          <p class="section-label">WHY CHOOSE US</p>

          <h2 class="section-title">
            Kenapa Harus
            <span>Hazza Bike?</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div class="feature">
            <div class="feature-number">01</div>
            <h3>Pilihan Sepeda</h3>
            <p>
              Menyediakan pilihan sepeda untuk
              berbagai kebutuhan bersepeda.
            </p>
          </div>

          <div class="feature">
            <div class="feature-number">02</div>
            <h3>Layanan Rental</h3>
            <p>
              Memberikan alternatif bagi kamu yang
              ingin menikmati bersepeda tanpa membeli.
            </p>
          </div>

          <div class="feature">
            <div class="feature-number">03</div>
            <h3>Layanan Servis</h3>
            <p>
              Membantu perawatan sepeda agar
              tetap nyaman digunakan.
            </p>
          </div>

        </div>
      </div>
    </section>


    <!-- GALLERY -->
    <section class="py-24 px-6 md:px-16 gallery-section">

      <div class="max-w-7xl mx-auto">

        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-12">

          <div>
            <p class="section-label">OUR GALLERY</p>

            <h2 class="section-title">
              Cerita dari
              <span>Hazza Bike.</span>
            </h2>

            <p class="description">
              Lihat lebih dekat koleksi dan aktivitas Hazza Bike.
            </p>
          </div>

          <a
            href="https://www.tiktok.com/@hazza.renthal_sepeda"
            target="_blank"
            rel="noopener noreferrer"
            class="gallery-link"
          >
            Lihat TikTok Kami ↗
          </a>

        </div>


        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div class="gallery-placeholder md:row-span-2">
            <img
              :src="gallery?.[0] || heroBg"
              alt="Koleksi sepeda"
            />
            <div class="gallery-caption">
              <span>01</span>
              <p>Koleksi Sepeda</p>
            </div>
          </div>

          <div class="gallery-placeholder">
            <img
              :src="gallery?.[1] || heroBg"
              alt="Aktivitas bersepeda"
            />
            <div class="gallery-caption">
              <span>02</span>
              <p>Aktivitas Bersepeda</p>
            </div>
          </div>

          <div class="gallery-placeholder">
            <img
              :src="gallery?.[2] || heroBg"
              alt="Sepeda Hazza Bike"
            />
            <div class="gallery-caption">
              <span>03</span>
              <p>Hazza Bike</p>
            </div>
          </div>

        </div>

      </div>
    </section>


    <!-- CTA -->
    <section class="cta-section py-24 px-6 text-center">

      <div class="max-w-3xl mx-auto">

        <p class="text-emerald-300 tracking-widest font-bold text-sm mb-5">
          START YOUR JOURNEY
        </p>

        <h2 class="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          Siap Menemukan Sepeda Favoritmu?
        </h2>

        <p class="text-gray-300 text-lg mb-10">
          Kunjungi Hazza Bike dan temukan berbagai pilihan
          sepeda serta layanan yang kamu butuhkan.
        </p>

        <RouterLink to="/lokasi" class="btn-primary">
          Kunjungi Hazza Bike →
        </RouterLink>

      </div>
    </section>


    <!-- FOOTER -->
    <footer class="footer px-6 md:px-16 py-12">

      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        <div>
          <h2 class="text-3xl font-extrabold text-white mb-3">
            Hazza Bike<span class="text-emerald-400">.</span>
          </h2>

          <p class="text-gray-400 max-w-md leading-relaxed">
            Toko sepeda yang menyediakan layanan jual,
            rental, dan servis sepeda untuk para pecinta
            aktivitas bersepeda.
          </p>
        </div>

        <div>
          <h3 class="text-white font-bold mb-4">Hubungi Kami</h3>

          <p class="text-gray-400 mb-3">
            📍 GP Sidodadi, dekat Mie Rasa 2
          </p>

          <a
            href="https://www.tiktok.com/@hazza.renthal_sepeda"
            target="_blank"
            rel="noopener noreferrer"
            class="text-emerald-400 hover:text-emerald-300"
          >
            TikTok @hazza.renthal_sepeda ↗
          </a>
        </div>

      </div>

      <div class="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 text-center">
        <p class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} Hazza Bike. All Rights Reserved.
        </p>
      </div>

    </footer>

  </div>
</template>


<script setup>
import { RouterLink } from 'vue-router'

// Gunakan variabel heroBg dan gallery yang sudah ada.
// Jika sebelumnya didefinisikan di script lama, pertahankan definisinya.
</script>


<style scoped>
.home {
  background: #172923;
  color: white;
}

.hero {
  background-size: cover;
  background-position: center;
  background-color: #172923;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(10, 25, 19, 0.95) 0%,
    rgba(10, 25, 19, 0.72) 55%,
    rgba(10, 25, 19, 0.25) 100%
  );
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: #4d9877;
  color: white;
  padding: 15px 27px;
  border-radius: 7px;
  font-weight: 700;
  transition: 0.3s;
}

.btn-primary:hover {
  background: #36785b;
  transform: translateY(-3px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 15px 27px;
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 7px;
  color: white;
  font-weight: 600;
  transition: 0.3s;
}

.btn-secondary:hover {
  background: white;
  color: #172923;
}

.section-label {
  color: #69b58c;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 4px;
  margin-bottom: 16px;
}

.section-title {
  font-size: clamp(30px, 4vw, 43px);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 22px;
}

.section-title span {
  color: #75b991;
}

.description {
  color: #b9c9bf;
  line-height: 1.9;
  font-size: 16px;
}

.services-section,
.gallery-section {
  background: #20372e;
}

.service-card {
  position: relative;
  background: #29443a;
  padding: 35px 28px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  transition: 0.35s;
  min-height: 290px;
}

.service-card:hover {
  transform: translateY(-9px);
  border-color: #69b58c;
  background: #304f40;
}

.service-icon {
  font-size: 43px;
  margin-bottom: 25px;
}

.service-card h3 {
  font-size: 23px;
  font-weight: 800;
  margin: 14px 0;
}

.service-card p {
  color: #bdccc2;
  line-height: 1.8;
  font-size: 14px;
}

.service-number {
  position: absolute;
  right: 25px;
  top: 25px;
  color: #9ab4a4;
  font-size: 12px;
  font-weight: bold;
}

.service-arrow {
  display: block;
  margin-top: 22px;
  color: #75b991;
  font-size: 23px;
}

.feature {
  border-left: 2px solid #4d9877;
  padding: 10px 0 10px 25px;
}

.feature-number {
  font-size: 38px;
  font-weight: 800;
  color: #75b991;
  margin-bottom: 15px;
}

.feature h3 {
  font-size: 21px;
  font-weight: 800;
  margin-bottom: 12px;
}

.feature p {
  color: #bdccc2;
  line-height: 1.8;
}

.gallery-placeholder {
  position: relative;
  height: 280px;
  overflow: hidden;
  border-radius: 14px;
  background: #29443a;
}

.gallery-placeholder.md\:row-span-2 {
  height: 580px;
}

.gallery-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}

.gallery-placeholder:hover img {
  transform: scale(1.08);
}

.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 35px 22px 20px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
}

.gallery-caption span {
  color: #75b991;
  font-size: 12px;
  font-weight: bold;
}

.gallery-caption p {
  font-size: 19px;
  font-weight: bold;
  margin-top: 5px;
}

.gallery-link {
  color: #75b991;
  font-weight: 700;
  padding-bottom: 5px;
  border-bottom: 1px solid #75b991;
}

.cta-section {
  background: linear-gradient(135deg, #315944, #172923);
}

.footer {
  background: #101c17;
}

@media (max-width: 768px) {
  .hero {
    background-position: 60% center;
  }

  .hero-overlay {
    background: rgba(10, 25, 19, 0.72);
  }

  .gallery-placeholder.md\:row-span-2 {
    height: 300px;
  }
}
</style>
