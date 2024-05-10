<template>
    <section v-if="events" :key="events" class="event__card__container">
        <h1>Resultados</h1>
        <article class="event__card" v-for="event in events" :key="event.id">
            <router-link  :to="{name: 'event', params: {id: event.id}}">
                <img v-if="event.images" :src="event.images[0].url" :alt="event.name">
                <div class="event__card__content">
                    <h2>
                        {{ event.name }}
                    </h2>
                    <p v-if="!event.dates.start.dateTBD && !event.dates.start.dateTBA">{{ event.dates.start.localDate }}</p>
                    <p v-if=" event._embedded && event._embedded.venues">{{ event._embedded.venues[0].country.name }}, {{ event._embedded.venues[0].city.name }}</p>
                </div>
            </router-link> 
        </article>
    </section>
    <section v-else-if="events === false">
        <h2>No hay resultados</h2>
    </section>
    <section v-else-if="error">
        <h2>Error de búsqueda. Por favor, usa el formulario para realizar búsquedas</h2>
    </section>
</template>

<script>
export default {
    props: {
        query: {type: String, required: false},
        type: {type: String, required: false},
        country: {type: String, required: false},
        date: {type: String, required: false},
    },
    data() {
        return {
            events: null,
            error: false,
        }
    },
    watch: {
        $route (to, from) {
            this.searchEvents()
        }
    },
    async created() {
        await this.searchEvents()
    },
    methods: {
        async searchEvents() {
            try {
                const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.$props.query}&countryCode=${this.$props.country}&classificationName=${this.$props.type}&startDateTime=${this.$props.date}T00:00:00Z&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr`)
                const results = await data.json()
                if (results._embedded) {
                    this.events = results._embedded.events
                    console.log(this.events)
                    return
                }
                this.events = false
            }
            catch {
                this.error = true
            }
        }
    }
}

</script>