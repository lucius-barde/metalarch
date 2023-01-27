<template>
    <hr />
    <section id="MetalArchList">
        <p>Coming soon here: a list of latest bands in the database.</p>
        <dl>   
            <!--<dt>Metallica</dt>
            <dd>Definition of the band</dd>
            <dt>Iron Maiden</dt>
            <dd>Definition of the band</dd>-->
        </dl>
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
        },
        methods:{
        }
    }
</script>

<style scoped>
#MetalArchList p:first-child{text-align:center;}
#MetalArchList dl{columns: 2;}
#MetalArchList dt{ font-weight: bold;}
#MetalArchList dd{ margin: 0 0 1em 0;}
</style>