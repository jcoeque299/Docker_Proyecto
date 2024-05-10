<template>
    <section class="home__card__container">
        <h1>Buscar por categorías</h1>
        <article class="event__card">
            <router-link :to="{name: 'results', params: {query: '', type: 'Music', country: this.location, date: `${new Date().getFullYear()}-01-01`}}">
                <img :src='require("/public/images/music.jpg")' alt="">
                <div class="event__card__content">
                    <h2>Música</h2>
                </div>
            </router-link>
        </article>
        <article class="event__card">
            <router-link :to="{name: 'results', params: {query: '', type: 'Sports', country: this.location, date: `${new Date().getFullYear()}-01-01`}}">
                <img :src='require("/public/images/sports.jpg")' alt="">
                <div class="event__card__content">
                    <h2>Deportes</h2>
                </div>
            </router-link>
        </article>
        <article class="event__card">
            <router-link :to="{name: 'results', params: {query: '', type: 'Film', country: this.location, date: `${new Date().getFullYear()}-01-01`}}">
                <img :src='require("/public/images/cine.jpg")' alt="">
                <div class="event__card__content">
                    <h2>Cine</h2>
                </div>
            </router-link>
        </article>
        <article class="event__card">
            <router-link :to="{name: 'results', params: {query: '', type: 'Arts & Theatre', country: this.location, date: `${new Date().getFullYear()}-01-01`}}">
                <img :src='require("/public/images/teatro.jpg")' alt="">
                <div class="event__card__content">
                    <h2>Artes y teatro</h2>
                </div>
            </router-link>
        </article>
        <article class="event__card">
            <router-link :to="{name: 'results', params: {query: '', type: 'Merchandising', country: this.location, date: `${new Date().getFullYear()}-01-01`}}">
                <img :src='require("/public/images/merchandising.jpg")' alt="">
                <div class="event__card__content">
                    <h2>Merchandising</h2>
                </div>
            </router-link>
        </article>
    </section>
    <section v-if = "eventRecomendations && location" :key="eventRecomendations" class="event__card__container">
        <h2>Eventos en {{ this.locationName }}</h2>
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
                locationName: '',
                location: ''
            }
        },
        async created() {
            if (cookies.get("token")) {
                this.setEventRecommendations()
            }
            cookies.addChangeListener(() => {
                this.location = null
                this.locationName = null
            })
        },
        methods: {
            async setEventRecommendations() {
                const data = await fetch("http://localhost:8000/api/user", {
                method: 'get',
                headers: {
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            const response = await data.json()
            if (response.message) {
                cookies.remove("token", {path:"/"})
                this.$router.push("/")
                return
                }
            this.location = response.location
            this.locationName = countryData.find(country => country.code === this.location).name ?? ''
            if (this.location) {
                const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${this.location}&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr&size=5`)
                const results = await data.json()
                if (results._embedded) {
                    this.eventRecomendations = results._embedded.events
                    return
                    }
                this.eventRecomendations = null
                }
            }
        }
    }
</script>