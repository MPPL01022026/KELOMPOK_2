<template>
  <main class="min-h-screen bg-white text-gray-700">
    <!-- Hero -->
    <section class="relative isolate overflow-hidden bg-gray-100">
      <img
        :src="heroImage"
        alt="Pesepeda melaju di jalan pegunungan saat matahari terbenam"
        class="absolute inset-0 -z-10 h-full w-full object-cover"
        loading="eager"
        @error="onImageError"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-gray-800/70 via-gray-800/30 to-transparent"></div>

      <div class="mx-auto flex min-h-[28rem] max-w-7xl items-center px-4 py-16 sm:min-h-[34rem] sm:px-6 lg:min-h-[40rem] lg:px-8">
        <div class="max-w-xl">
          <h1 class="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl">
            Jelajahi Kota
            Lebih Seru<br />
            dengan Hazza Bike<br />
          </h1>
          <p class="mt-5 max-w-md text-sm leading-relaxed text-gray-100 sm:text-base">
            Pilih unit favoritmu dan nikmati perjalanan santai tanpa ribet. Mulai petualanganmu sekarang!
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#tarif"
              class="rounded bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
            >
              Cek Harga Sewa
            </a>
            <a
              href="#armada"
              class="border-b border-white pb-0.5 text-sm font-semibold text-white transition hover:border-gray-300 hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Eksplor Sepeda
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Keunggulan -->
    <section class="border-b border-gray-200 bg-white">
      <ul class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        <li v-for="item in keunggulan" :key="item.judul" class="flex items-center gap-3">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#5F8070]">
            <svg
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path :d="item.ikon" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-semibold text-gray-800">{{ item.judul }}</p>
            <p class="text-xs text-gray-500">{{ item.keterangan }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Tarif -->
    <section id="tarif" class="bg-gray-100">
      <div class="mx-auto flex max-w-7xl flex-col items-center px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl text-gray-800">Tarif sewa</h2>
        <div class="mt-6 flex w-full max-w-xl items-center gap-4 sm:gap-6">
          <span class="h-px flex-1 bg-gray-300"></span>
          <p class="font-serif text-4xl font-bold text-[#5F8070] sm:text-6xl">{{ tarifSewa }}</p>
          <span class="h-px flex-1 bg-gray-300"></span>
        </div>
        <p class="mt-4 max-w-md text-sm text-gray-500">
          Tarif flat berlaku untuk semua jenis sepeda. Pilih sepeda favoritmu di bawah.
        </p>
      </div>
    </section>

    <!-- Katalog -->
    <section id="armada" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-4">
        <div>
          <h2 class="font-serif text-3xl text-gray-800">Armada kami</h2>
          <p class="mt-1 text-sm text-gray-500">{{ filteredBikes.length }} sepeda ditampilkan</p>
        </div>

        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter jenis sepeda">
          <button
            v-for="kategori in daftarKategori"
            :key="kategori"
            type="button"
            class="rounded-full px-4 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C9A8A]"
            :class="
              kategoriAktif === kategori
                ? 'bg-[#7C9A8A] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
            @click="kategoriAktif = kategori"
          >
            {{ kategori }}
          </button>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <article
          v-for="bike in filteredBikes"
          :key="bike.id"
          class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <div class="relative aspect-[4/3] bg-gray-100">
            <img
              :src="bike.gambar"
              :alt="bike.nama"
              class="h-full w-full object-cover"
              loading="lazy"
              @error="onImageError"
            />
            <span class="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-700">
              {{ bike.kategori }}
            </span>
          </div>

          <div class="flex flex-1 flex-col p-4">
            <div class="flex items-start justify-between gap-3">
              <h3 class="font-serif text-lg text-gray-800">{{ bike.nama }}</h3>
              <span
                class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="
                  bike.unit > 0
                    ? 'bg-[#7C9A8A]/15 text-[#4F6B5C]'
                    : 'bg-gray-200 text-gray-500'
                "
              >
                {{ bike.unit > 0 ? `${bike.unit} unit tersedia` : 'Habis' }}
              </span>
            </div>
            <p class="mt-1 text-sm text-gray-500">{{ bike.deskripsi }}</p>

            <dl class="mt-4 divide-y divide-gray-100 text-sm">
              <div
                v-for="spek in spesifikasiBike(bike)"
                :key="spek.label"
                class="flex justify-between gap-4 py-1.5"
              >
                <dt class="text-gray-500">{{ spek.label }}</dt>
                <dd class="text-right text-gray-800">{{ spek.nilai }}</dd>
              </div>
            </dl>
          </div>

          <div class="flex items-stretch border-t border-gray-200">
            <p class="flex flex-1 items-center bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-800">
              {{ tarifSewa }}
            </p>
            <button
              type="button"
              :disabled="bike.unit === 0"
              class="bg-[#7C9A8A] px-5 text-sm font-medium text-white transition hover:bg-[#6B8979] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white disabled:cursor-not-allowed disabled:bg-gray-300"
              @click="pilihSepeda(bike)"
            >
              Sewa
            </button>
          </div>
        </article>
      </div>

      <p
        v-if="pesanPilihan"
        class="mt-8 rounded-lg bg-gray-100 px-4 py-3 text-center text-sm text-gray-700"
        role="status"
      >
        {{ pesanPilihan }}
      </p>
    </section>

    <!-- Cara sewa -->
    <section class="bg-gray-100">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl text-gray-800">Cara menyewa</h2>
        <ol class="mt-8 grid gap-6 md:grid-cols-3">
          <li v-for="(langkah, index) in caraSewa" :key="langkah.judul" class="rounded-lg bg-white p-5">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C9A8A] text-sm font-semibold text-white">
              {{ index + 1 }}
            </span>
            <h3 class="mt-3 font-semibold text-gray-800">{{ langkah.judul }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ langkah.keterangan }}</p>
          </li>
        </ol>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type KategoriSepeda =
  | 'Sepeda Lipat'
  | 'Sepeda Gunung'
  | 'Sepeda Balap'
  | 'Sepeda Hybrid'
  | 'Sepeda Gravel'
  | 'Sepeda Fixie'
  | 'Sepeda Listrik'
  | 'Sepeda Ontel'

interface Sepeda {
  id: number
  nama: string
  kategori: KategoriSepeda
  deskripsi: string
  gambar: string
  rangka: string
  ban: string
  rem: string
  gigi: string
  unit: number
}

interface Keunggulan {
  judul: string
  keterangan: string
  ikon: string
}

interface LangkahSewa {
  judul: string
  keterangan: string
}

const tarifSewa = 'Rp 30.000 / 6 Jam'

const unsplash = (id: string): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`

// Foto hero: pesepeda di jalan pegunungan saat matahari terbenam.
// Bisa diganti dengan gambar sendiri, mis. '/img/hero.jpg'.
const heroImage = unsplash('photo-1541625602330-2277a4c46182')
const gambarCadangan = unsplash('photo-1571068316344-75bc76f77890')

const bikes: Sepeda[] = [
  {
    id: 1,
    nama: 'Seli Urban Fold',
    kategori: 'Sepeda Lipat',
    deskripsi: 'Ringkas, mudah dibawa dan hemat ruang.',
    gambar: unsplash('photo-1507035895480-2b3156c31fc8'),
    rangka: 'Aluminium Alloy',
    ban: '16 inci',
    rem: 'V-Brake',
    gigi: '6 Speed',
    unit: 4,
  },
  {
    id: 2,
    nama: 'Seli Compact Pro',
    kategori: 'Sepeda Lipat',
    deskripsi: 'Lipatan cepat, cocok untuk dibawa naik transportasi umum.',
    gambar: unsplash('photo-1571068316344-75bc76f77890'),
    rangka: 'Hi-Ten Steel',
    ban: '20 inci',
    rem: 'Disc Brake Mekanik',
    gigi: '7 Speed',
    unit: 3,
  },
  {
    id: 3,
    nama: 'Trail Master MTB',
    kategori: 'Sepeda Gunung',
    deskripsi: 'Ban lebar dan suspensi depan untuk medan berat.',
    gambar: unsplash('photo-1532298229144-0ec0c57515c7'),
    rangka: 'Aluminium 6061',
    ban: '27,5 inci',
    rem: 'Disc Brake Hidrolik',
    gigi: '21 Speed',
    unit: 5,
  },
  {
    id: 4,
    nama: 'Summit Rider MTB',
    kategori: 'Sepeda Gunung',
    deskripsi: 'Tangguh untuk tanjakan berbatu dan jalur tanah.',
    gambar: unsplash('photo-1576435728678-68d0fbf94e91'),
    rangka: 'Aluminium Alloy',
    ban: '26 inci',
    rem: 'Disc Brake Mekanik',
    gigi: '24 Speed',
    unit: 2,
  },
  {
    id: 5,
    nama: 'Velocity Road Bike',
    kategori: 'Sepeda Balap',
    deskripsi: 'Rangka ramping dan setang drop bar untuk kecepatan di aspal.',
    gambar: unsplash('photo-1541625602330-2277a4c46182'),
    rangka: 'Aluminium Ringan',
    ban: '700c',
    rem: 'Caliper Brake',
    gigi: '14 Speed',
    unit: 2,
  },
  {
    id: 6,
    nama: 'Easy Hybrid',
    kategori: 'Sepeda Hybrid',
    deskripsi: 'Posisi duduk tegak, nyaman untuk rekreasi dan harian.',
    gambar: unsplash('photo-1485965120184-e220f721d03e'),
    rangka: 'Aluminium Alloy',
    ban: '700c',
    rem: 'Disc Brake Mekanik',
    gigi: '21 Speed',
    unit: 4,
  },
  // Dua unit di bawah memakai foto sementara. Ganti ID Unsplash sesuai jenis sepedanya.
  {
    id: 7,
    nama: 'Gravel Explorer',
    kategori: 'Sepeda Gravel',
    deskripsi: 'Melintasi aspal, kerikil, hingga jalur tanah.',
    gambar: unsplash('photo-1541625602330-2277a4c46182'),
    rangka: 'Aluminium Alloy',
    ban: '700c x 40',
    rem: 'Disc Brake Hidrolik',
    gigi: '11 Speed',
    unit: 2,
  },
  {
    id: 8,
    nama: 'Klasik Ontel',
    kategori: 'Sepeda Ontel',
    deskripsi: 'Desain tempo dulu dengan sadel per yang empuk.',
    gambar: unsplash('photo-1507035895480-2b3156c31fc8'),
    rangka: 'Besi Klasik',
    ban: '28 inci',
    rem: 'Rem Tromol',
    gigi: '1 Speed',
    unit: 3,
  },
]

const keunggulan: Keunggulan[] = [
  { judul: 'Tarif flat', keterangan: 'Satu harga semua unit', ikon: 'M12 6v12M8.5 9.5C8.5 8.1 10 7.5 12 7.5s3.5.6 3.5 2-1.5 1.8-3.5 2.2-3.5.8-3.5 2.3 1.5 2 3.5 2 3.5-.6 3.5-2' },
  { judul: 'Dirawat rutin', keterangan: 'Dicek sebelum disewa', ikon: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.2-.5-.5-2.2z' },
  { judul: 'Durasi 6 jam', keterangan: 'Cukup untuk seharian', ikon: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' },
  { judul: 'Pilih sesuai medan', keterangan: 'Lipat, gunung, balap, dan lainnya', ikon: 'M3 17l6-9 4 5 3-4 5 8z' },
]

const caraSewa: LangkahSewa[] = [
  { judul: 'Pilih sepeda', keterangan: 'Lihat armada dan cek ketersediaan unit.' },
  { judul: 'Hubungi admin', keterangan: 'Konfirmasi sepeda dan waktu pengambilan.' },
  { judul: 'Kayuh dan kembalikan', keterangan: 'Pakai selama 6 jam, lalu kembalikan ke lokasi.' },
]

const daftarKategori: Array<'Semua' | KategoriSepeda> = [
  'Semua',
  'Sepeda Lipat',
  'Sepeda Gunung',
  'Sepeda Balap',
  'Sepeda Hybrid',
  'Sepeda Gravel',
  'Sepeda Ontel',
]

const kategoriAktif = ref<'Semua' | KategoriSepeda>('Semua')
const pesanPilihan = ref('')

const filteredBikes = computed<Sepeda[]>(() =>
  kategoriAktif.value === 'Semua'
    ? bikes
    : bikes.filter((b) => b.kategori === kategoriAktif.value),
)

const spesifikasiBike = (bike: Sepeda): Array<{ label: string; nilai: string }> => [
  { label: 'Bahan rangka', nilai: bike.rangka },
  { label: 'Ukuran ban', nilai: bike.ban },
  { label: 'Sistem rem', nilai: bike.rem },
  { label: 'Transmisi', nilai: bike.gigi },
]

const onImageError = (event: Event): void => {
  const img = event.target as HTMLImageElement
  if (img.src !== gambarCadangan) {
    img.src = gambarCadangan
  }
}

const pilihSepeda = (bike: Sepeda): void => {
  pesanPilihan.value = `${bike.nama} dipilih. Tarif ${tarifSewa}. Hubungi admin untuk konfirmasi sewa.`
}
</script>