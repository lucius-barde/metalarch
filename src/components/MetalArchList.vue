<template>
    <section id="MetalArchList">
        <h3>Latest bands added:</h3>
        <div v-if="!loaded">
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <ul>   
            <li v-for="band in latestBands" v-bind:key="band.id">
                <router-link :to="`/metalband/${band.id}`">{{ band.data.name }}</router-link> 
                <small><small> (#{{ band.id }})</small></small>
            </li>
        </ul>
    </section>
    <hr />
</template>

<script>
    export default {
        name: 'MetalArchList',
        props:{
            order: String,
            limit: Number,
        },
        data(){
            return{
                loaded:false,
                error:false,
                latestBands: {}
            }
        },
        mounted:function(){
            this.initMetalArchList();
        },
        methods:{
            initMetalArchList: function(){
                
                fetch('https://api.bardic.space/metalarch/getLatestBands/10/', {
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
                        this.latestBands = data;
                        this.loaded = true;
                    }
                })
            }
        }
    }
</script>

<style scoped>
#MetalArchList > :first-child{text-align:center;}
#MetalArchList ul{columns:2;}
#MetalArchList ul li{list-style:none outside none; text-align:left;}
</style>