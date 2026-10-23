export default [
  {
    path: "",
    name: "home",
    component: () => import("@/modules/UserArea/Home.vue"),
  },
  {
    path: "lokasi",
    name: "lokasi",
    component: () => import("@/modules/UserArea/Lokasi.vue"),
  },
  {
    path: "berita",
    name: "berita",
    component: () => import("@/modules/UserArea/Berita.vue"),
  },
  {
    path: "galeri",
    name: "galeri",
    component: () => import("@/modules/UserArea/Galeri.vue"),
  },
];
