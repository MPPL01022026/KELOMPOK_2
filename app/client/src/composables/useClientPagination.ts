import { computed, ref, watch, type Ref } from 'vue'

export function useClientPagination<T>(data: Ref<T[]>, perPage = 10) {
  const currentPage = ref(1)
  const totalRow = computed(() => data.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalRow.value / perPage)))
  const pages = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1))
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return data.value.slice(start, start + perPage)
  })

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  watch(data, () => {
    currentPage.value = 1
  })

  watch(totalPages, (pageCount) => {
    if (currentPage.value > pageCount) {
      currentPage.value = pageCount
    }
  })

  return {
    pagination: { currentPage, totalPages, pages, totalRow, perPage },
    paginatedData,
    setPage,
  }
}
