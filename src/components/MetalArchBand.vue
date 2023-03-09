<template>
   
  <div id="metalarchband-wrapper">

    <div v-if="!loaded">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>

    <div id="metalsearch-results" v-if="!metalSearchLoading && band && band.name && band.params">
          
        <h1>{{ band.name }}</h1>
        
          <p>{{ band.name }} is a {{ band.params.genre }} band {{ band.params.location2 ? 'originally ' : '' }}from {{ band.params.location ? band.params.location+', ' : '' }}{{ band.params.countryOfOrigin }}.</p>
          <p v-if="band.params.location2">
            This band later moved to {{ band.params.location2 }}
            <span v-if="band.params.location3"> and to {{ band.params.location3 }}.</span>
          </p> 

          <img class="logo" v-if="band.params.logo" v-bind:src="'https://api.bardic.space/'+band.params.logo" />
          <img class="photo" v-if="band.params.photo" v-bind:src="'https://api.bardic.space/'+band.params.photo" />
          <br /><br />
          <p v-if="band.params.formedIn">They were formed in <b>{{ band.params.formedIn }}</b><span v-if="band.params.status">, and their status is now <b>{{ band.params.status }}</b>. </span>
            <span v-else>. </span>
            <span v-if="band.params.yearsActive">They were active during the following years: <b>{{ band.params.yearsActive }}</b>.</span>
          </p>
          <p v-if="band.params.currentLabel || band.params.lastLabel">
            They <span v-if="band.params.currentLabel">current</span><span v-else>last</span> label <span v-if="band.params.currentLabel">is</span><span v-else>was</span> {{ band.params.currentLabel ? band.params.currentLabel : band.params.lastLabel }}.
          </p>
          <p v-if="band.params.lyricalThemes">Their sing about {{ band.params.lyricalThemes }}.</p>

    </div>
    <div v-else-if="metalSearchedId && (!band || !band.name)">
      <h6>
        No band found with the following <span v-if="metalSearchById">ID</span><span v-else>name (in local cache)</span>: {{ metalSearchedId }}<br />
      </h6>
    </div>

  </div>
  

</template>

<script>

    //////////// TODO !!! Implement initMetalSearch() reloading on Route Change.
    //////////// Replace "Single band" menu link with "All bands" (the view should have A-Z table)
    //////////// Add moar details on the single band page, less on the search tool. Add the fetchedDate at the bottom

    import { useRoute } from 'vue-router';
    export default {
        setup(){
          const route = useRoute();
          const bandId = route.params.id;
          return { bandId }; //these variables in an object will be added to "this" in the methods.
        },
        name: 'MetalArchBand',
        props:{
            placeholder:String
        },
        data(){
            return{
                metalSearch:'',
                metalSearchedId:'',
                metalSearchById:false,
                metalSearchLoading:'',
                loaded:false,
                error:false,
                band:{},
                //and "bandId" added from setup()
            }
        },
        mounted(){
            this.initMetalSearch(); //todo: add loading icon
        },
        methods:{
            initMetalSearch(){
              
              this.metalSearchedId = '';
              this.metalSearchLoading = 'metal-archives';
              this.band = {};


              fetch('https://api.bardic.space/metalarch/getBand/'+this.bandId, {
                  headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                  }
              })
              .then( response => response.json())
              .then(data => {
                  if(data.error){
                      console.error(data);
                      this.error = true;
                      // TO DO !!!!! handling of errors
                  }else{
                      console.log(data);
                      this.metalSearchedId = this.metalSearch;
                      this.metalSearchLoading = '';
                      this.band = data;
                      this.loaded = true;
                  }
              })

            }
        }
    }
</script>

<style>

  /* Blue-grey Light scheme (Default) */
    /* Can be forced with data-theme="light" */
    [data-theme="light"],
    :root:not([data-theme="dark"]) {
    --primary: #546e7a;
    --primary-hover: #455a64;
    --primary-focus: rgba(84, 110, 122, 0.125);
    --primary-inverse: #FFF;
    }

    /* Blue-grey Dark scheme (Auto) */
    /* Automatically enabled if user has Dark mode enabled */
    @media only screen and (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
        --primary: #546e7a;
        --primary-hover: #607d8b;
        --primary-focus: rgba(84, 110, 122, 0.25);
        --primary-inverse: #FFF;
    }
    }

    /* Blue-grey Dark scheme (Forced) */
    /* Enabled if forced with data-theme="dark" */
    [data-theme="dark"] {
    --primary: #546e7a;
    --primary-hover: #607d8b;
    --primary-focus: rgba(84, 110, 122, 0.25);
    --primary-inverse: #FFF;
    }

    /* Blue-grey (Common styles) */
    :root {
    --form-element-active-border-color: var(--primary);
    --form-element-focus-color: var(--primary-focus);
    --switch-color: var(--primary-inverse);
    --switch-checked-background-color: var(--primary);
    }


    body>main{
    padding:24px;
    }

    article{
    margin:36px 0;
    padding: 24px;
    }
    
    #metalsearch-results img{background-color:#000; width:100%;}
    #metalsearch-results img.logo{padding:8px;}
    @media (min-width: 1200px){

    body>main{
        max-width: 576px;
    }
    }
    @media (min-width: 992px){
    body>main{
        max-width: 576px;
    }
    }
    @media (min-width: 768px){
    body>main{
        max-width: 576px;
    }
    }
    @media (min-width: 576px){  
    html{
        background-color: var(--primary-hover);
    }
    body{
        border:none;
    }
    body>main{
        background-color: var(--primary-inverse);
        border: 8px solid var(--primary);
        margin-top:24px;
        max-width: 576px;
    }
    }

    h1,h2,#topiosearch-loading, #topiosearch-results h6{
    text-align:center;
    }
    #topiosearch-form button{
    width:200px;
    margin:auto;
    }
</style>