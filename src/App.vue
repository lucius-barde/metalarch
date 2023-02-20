<template>  
  <main>
    <MetalArchForm />
    <MetalArchList order="" limit="" />
    <footer>
      <p style="text-align:center; color:var(--muted-color)"><small><small>&copy; 2023 Lucius</small></small></p>
    </footer>
  </main>
    
</template>

<script>
import MetalArchForm from './components/MetalArchForm.vue';
import MetalArchList from './components/MetalArchList.vue'

export default {
  name: 'App',
  components: {
    MetalArchForm,
    MetalArchList
  }
}
</script>

<style>
</style>
