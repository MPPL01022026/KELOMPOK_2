<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'warning' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    fullWidth?: boolean
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
    loading: false,
    type: 'button',
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClasses = computed(() => {
  const base = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'rounded-xl',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
  ]

  const variants: Record<Variant, string> = {
    primary:
      'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm',
    secondary:
      'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300',
    warning:
      'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-sm',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 shadow-sm',
  }

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  }

  return [
    ...base,
    variants[props.variant],
    sizes[props.size],
    props.fullWidth ? 'w-full' : 'w-auto',
    props.disabled
      ? 'disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed'
      : '',
    props.loading ? 'cursor-wait' : '',
  ].join(' ')
})

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot name="icon-left" />
    <span v-if="!loading"><slot></slot></span>
    <slot name="icon-right" />
  </button>
</template>
