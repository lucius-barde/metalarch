<template>
    <section id="MetalArchAllBands">
        <h1>All bands</h1>
        <ul>   
            <li v-for="band in allBands" v-bind:key="band.id">
                <router-link :to="`/metalband/${band.id}`">{{ band.data.name }}</router-link> 
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        name: 'MetalArchAllBands',
        props:{
        },
        data(){
            return{
                allBands: {}
            }
        },
        mounted:function(){
            this.initMetalArchAllBands();
        },
        methods:{
            initMetalArchAllBands: function(){
                
                fetch('https://api.oppidumweb.net/metalarch/getAllBands/', {
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
                        this.allBands = data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
li{list-style:none; text-align:left;}
li a{display:block; border: 1px solid #ccc; padding:8px; text-decoration:none; border-radius: 4px;}
li a:hover, li a:active { background-color: #eee; }
</style>