<template>
    <section class="event__card__container">
        <h1>Oops... Esta página no existe...</h1>
        <h2 id="h3__404">Prueba con estos eventos</h2>
        <article class="event__card" v-for="event in eventRecomendations" :key="event.id">
            <router-link  :to="{name: 'event', params: {id: event.id}}">
                <img v-if="event.images" :src="event.images[0].url" :alt="event.name">
                <div class="event__card__content">
                    <h2>
                        {{ event.name }}
                    </h2>
                    <p v-if="!event.dates.start.dateTBD && !event.dates.start.dateTBA">{{ event.dates.start.localDate }}</p>
                    <p v-if=" event._embedded && event._embedded.venues">{{ event._embedded.venues[0].city.name }}</p>  
                </div>
            </router-link> 
        </article>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    import countryData from "/src/data.json"
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                countryData: countryData,
                eventRecomendations: null,
                location: {
                    code: '',
                    name: ''
                }
            }
        },
        async created() {
            if (cookies.get("token")) {
                const userData = await fetch("http://localhost:8000/api/user", {
                method: 'get',
                headers: {
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
                const response = await userData.json()
                if (response.message) {
                    cookies.remove("token", {path:"/"})
                }
                else if (response.location) {
                    this.location.code = response.location
                    this.location.name = countryData.find(country => country.code === this.location.code).name ?? ''
                }
            }
            const eventData = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${this.location.code}&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr&size=5`)
            const results = await eventData.json()
            if (results._embedded) {
                this.eventRecomendations = results._embedded.events
                return
                }
            this.eventRecomendations = null
        }
    }
</script>