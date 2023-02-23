<template>
  <MetalArchForm />
  <MetalArchList />
</template>

<script>
// @ is an alias to /src
import MetalArchForm from '@/components/MetalArchForm.vue'
import MetalArchList from '@/components/MetalArchList.vue'

export default {
  name: 'HomeView',
  components: {
    MetalArchForm,
    MetalArchList
  }
}
</script>
