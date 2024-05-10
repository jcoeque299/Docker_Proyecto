<template>
    <section v-if="saved && saved.length" class="event__card__container">
        <h2>Eventos guardados</h2>
        <article v-for="savedEvent in saved" :key="savedEvent.eventId" class="event__card">
            <router-link :to="{name: 'event', params: {id: savedEvent.eventId}}">
                <img v-if="savedEvent.eventImageSource" :src="savedEvent.eventImageSource" :alt="savedEvent.eventName">
                <div class="event__card__content">
                    <h3>
                        {{ savedEvent.eventName }}
                    </h3>
                </div>
            </router-link>
            <button @click="deleteSaved(savedEvent.id)" class="event__card__button">Borrar</button>
        </article>
    </section>
    <section v-else-if="saved === false"><h2>Sin eventos guardados</h2></section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                user: null,
                saved: null
            };
        },
        async created() {
            const userData = await fetch("http://localhost:8000/api/user", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            const userResponse = await userData.json()
            if (userResponse.message) {
                cookies.remove("token", {path:"/"})
                this.$router.push("/")
                return
            }
            this.user = userResponse

            this.updateSaved()
        },
        methods: {
            async deleteSaved(eventId) {
                const deleteSaved = await fetch(`http://localhost:8000/api/saved/${eventId}`, {
                method: 'delete',
                headers: {
                    'Authorization': 'Bearer ' + cookies.get("token")
                }})
                this.updateSaved()
            },
            async updateSaved() {
                const savedData = await fetch(`http://localhost:8000/api/saved/${this.user.id}`, {
                method: 'get',
                })
                const savedResponse = await savedData.json()
                if (savedResponse.length) {
                    this.saved = savedResponse
                    return
                }
                this.saved = false
            }
        }
    }
</script>