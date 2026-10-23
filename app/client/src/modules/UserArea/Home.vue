<template>
  <div class="home w-full overflow-x-hidden">
    <!-- 🏞 Hero Section -->
    <section
      class="relative h-screen bg-cover bg-center"
      :style="`background-image: url('${heroBg}')`"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex flex-col justify-center items-center text-center text-white px-4"
      >
        <h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fade-in">
          Hazza Bike
        </h1>
        <p class="text-lg md:text-2xl mb-8 max-w-2xl leading-relaxed animate-fade-in delay-200">
          Nikmati Perjalanan bersepeda keliling kota.
        </p>
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 animate-bounce">
          <span class="block w-3 h-3 border-b-2 border-r-2 border-white rotate-45 mb-2"></span>
          <span class="block w-3 h-3 border-b-2 border-r-2 border-white rotate-45"></span>
        </div>
      </div>
    </section>

    <!-- 🌿 Sekilas Tentang -->
    <section class="py-16 px-6 md:px-12">
      <!-- Wrapper flex untuk memastikan judul selalu di tengah -->
      <div class="flex flex-col items-center">
        <!-- Judul di tengah -->
        <h1 class="text-3xl text-white font-bold text-center">Sekilas Tentang Hazza Bike</h1>
        <div class="mt-8"></div>

        <!-- Teks paragraf full-width -->
        <div class="w-full text-justify text-white leading-relaxed text-lg md:text-xl">
          <p>
            Bersepeda bukan lagi sekadar olahraga, melainkan bagian dari gaya hidup sehat dan cara kita menikmati kebersamaan.
            Namun, kami tahu betapa sulitnya mencari sepeda berkualitas, suku cadang premium yang langka, serta tempat servis yang bisa dipercaya di sekitar kita.
          </p>
          <p>
            Itulah alasan mengapa Hazza Bike hadir di Kota Langsa. Kami lahir dari kecintaan yang sama terhadap dunia sepeda,
            khususnya MTB. Kami berkomitmen untuk menjadi one-stop solution bagi Anda—mulai dari penyediaan sepeda baru dan bekas berkualitas,
            spareparts kelas dunia yang sulit dicari, layanan rental, hingga servis mekanik yang presisi.
            Di Hazza Bike, kami tidak hanya menjual produk, kami merawat hobi dan menjaga keselamatan perjalanan Anda.
          </p>
        </div>
      </div>
    </section>

    <!-- 📸 Galeri -->
    <section class="py-16">
      <h2 class="text-3xl font-bold text-white text-center mb-10">Galeri </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-16">
        <div
          v-for="(img, i) in gallery"
          :key="i"
          class="overflow-hidden rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:brightness-110 cursor-pointer"
        >
          <img :src="img" alt="Tamsar" class="w-full h-64 object-cover" />
        </div>
      </div>
    </section>

    <!-- 📍 CTA Section -->
    <section
      class="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center overflow-hidden py-24 px-6 md:px-20"
    >
      <!-- Wave Divider -->
      <svg
        class="absolute top-0 left-0 w-full -mt-1 z-0"
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="transparent"
          d="M0,32L80,48C160,64,320,96,480,101.3C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>

      <div class="relative z-10 flex flex-col items-center justify-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-8">Siap untuk bersepeda?</h2>
        <p class="text-lg md:text-xl mb-10 max-w-2xl">
          Kunjungi <a href="/products" class="text-blue-400 underline hover:text-blue-600">toko kami</a> untuk menemukan sepeda impian Anda dan suku cadang berkualitas tinggi.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease forwards;
}
.animate-fade-in.delay-200 {
  animation-delay: 0.2s;
}
.animate-fade-in.delay-400 {
  animation-delay: 0.4s;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
