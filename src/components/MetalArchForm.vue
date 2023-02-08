<template>
    <div id="metalarchform-wrapper">
      
      <header>
        <hgroup>
          <h1><a style="text-decoration:none; color:#000;" href="">Metal Archiver</a></h1>
          <h2>
            <strong><a style="text-decoration:none; color:var(--muted-color)" href="">Search tool for metal bands</a></strong>
            <br /><br />
            <small>Searching by band ID only (example: 125 = Metallica).<br /> The search by band name is currently under development.</small>
          </h2>
          
        </hgroup>
      </header>
      <br />
      <form id="metalarch-form" @submit.prevent="initMetalSearch">
          
          <input v-model="metalSearch" type="search" id="metalsearch" name="metalarch" required v-bind:placeholder="placeholder" />
          <button type="submit">Search</button>
      
      </form>
    </div>
    <div id="metalsearch-loading" v-if="metalSearchLoading">
      <h6>Search on : {{ metalSearchLoading }}...</h6>
    </div>
   
    <div id="metalsearch-results" v-if="!metalSearchLoading && band && band.params">
        <h6>Search results for: {{ metalSearchedId }}</h6>
        <article>
          <h3>{{ band.name }}</h3>
          <p>{{ band.params.genre }} band {{ band.params.location2 ? 'originally ' : '' }}from {{ band.params.location ? band.params.location+', ' : '' }}{{ band.params.countryOfOrigin }}.</p>
          <p v-if="band.params.location2">
            This band later moved to {{ band.params.location2 }}
            <span v-if="band.params.location3"> and to {{ band.params.location3 }}.</span>
          </p> 

          <img class="logo" v-if="band.params.logo" v-bind:src="'https://api.oppidumweb.net/'+band.params.logo" />
          <img class="photo" v-if="band.params.photo" v-bind:src="'https://api.oppidumweb.net/'+band.params.photo" />
          <br /><br />
          <p v-if="band.params.formedIn">They were formed in <b>{{ band.params.formedIn }}</b><span v-if="band.params.status">, and their status is now <b>{{ band.params.status }}</b>. </span>
            <span v-else>. </span>
            <span v-if="band.params.yearsActive">They were active during the following years: <b>{{ band.params.yearsActive }}</b>.</span>
          </p>
          <p v-if="band.params.currentLabel || band.params.lastLabel">
            They <span v-if="band.params.currentLabel">current</span><span v-else>last</span> label <span v-if="band.params.currentLabel">is</span><span v-else>was</span> {{ band.params.currentLabel ? band.params.currentLabel : band.params.lastLabel }}.
          </p>
          <p v-if="band.params.lyricalThemes">Their sing about {{ band.params.lyricalThemes }}.</p>

         
        </article>
    </div>
    <div v-else-if="metalSearchedId && !band">
      <h6>
        No band found with the ID: {{ metalSearchedId }}<br />
      </h6>
    </div>


</template>

<script>
    export default {
        name: 'MetalArchForm',
        props:{
            placeholder:String
        },
        data(){
            return{
                metalSearch:'',
                metalSearchedId:'',
                metalSearchLoading:'',
                //metalSearchedTerm:'',
                band:{},
            }
        },
        methods:{
            initMetalSearch(){

                this.metalSearchedId = '';
                this.metalSearchLoading = 'metal-archives';
                this.band = {};

                fetch('https://api.oppidumweb.net/metalarch/getBand/'+this.metalSearch, {
                    headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
                })
                .then( response => response.json())
                .then(data => {
                    if(data.error){
                        console.error(data);
                        // TO DO !!!!! handling of errors
                    }else{
                        console.log(data);
                        this.metalSearchedId = this.metalSearch;
                        this.metalSearchLoading = '';
                        this.band = data;
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