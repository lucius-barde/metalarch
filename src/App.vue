<template>
  <main>
    <div id="topiosearch-wrapper">
          
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/all">All bands</router-link>
      </nav>

      <router-view />

    </div>
  <footer>
    <div>
      <small><small>&copy; 2023 Lucius</small></small>
    </div>
  </footer>
  </main>
</template>

<style>

h1{
  margin-bottom: 16px;
}

hgroup{
  margin-bottom: 0;
}

hgroup h1{ margin-bottom:0;}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
