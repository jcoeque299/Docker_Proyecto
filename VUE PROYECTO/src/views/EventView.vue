<template>
    <section v-if="event">
        <section class="event__information">
            <article class="event__header">
                <h1>
                {{ event.name }}
                </h1>
                <img v-if="event.images" :src="event.images[0].url" :alt="event.name">
                <!-- <img v-if="event.seatmap" :src="event.seatmap.staticUrl"> -->
            </article>
            <article class="event__body">
                <p v-if="!event.dates.start.dateTBD && !event.dates.start.dateTBA">Fecha del evento: {{ event.dates.start.localDate }}</p>
                <p v-if=" event._embedded && event._embedded.venues">En: {{ event._embedded.venues[0].country.name }}, {{ event._embedded.venues[0].city.name }}</p>
                <p v-if="event.info">{{ event.info }}</p>
                <p v-if="event.pleaseNote">{{ event.pleaseNote }}</p>
                <p v-if="event.ticketLimit">{{ event.ticketLimit.info }}</p>
                <button v-if="event.seatmap">Ver mapa del recinto</button>
                <a v-if="event.url" :href="event.url" target="_blank">Comprar entradas</a>
                <button @click="saveEvent" v-if="!saved && user">Guardar evento</button>
                <button @click="removeEvent" v-if="saved && user">Borrar evento</button>
            </article>
        </section>
        <section class="event__commentbox__container" v-if="user" :key = "user">
            <h2>Escribe tu comentario</h2>
            <form @submit.prevent="sendComment">
                <textarea v-model="commentBox" id="commentBox" class="event__commentbox"></textarea>
                <button @submit="sendComment" class="event__commentbox__button">Enviar comentario</button>
            </form>
        </section>
        <section v-if="comments" class="event__comments">
            <h3 >Comentarios</h3>
            <article v-for="comment in comments" class="event__comment">
                <div class="event__comment__info">
                    <p>{{ comment.name }}</p>
                </div>
                <div class="event__comment__body">
                    <p>{{ comment.commentText }}</p>
                </div>
            </article>
        </section>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                event: null,
                comments: null,
                user: null,
                saved: null,
                commentBox: "",
                token: cookies.get("token")
            }
        },
        props: {
            id: {type: String, required: true}
        },
        async created() {
            const eventData = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${this.id}.json?apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr`)
            const eventResponse = await eventData.json()
            this.event = eventResponse
            cookies.addChangeListener(() => {
                this.token = cookies.get("token")
                this.checkUser()
            })
        },
        async mounted() {
            await this.checkUser()
            await this.updateComments()
            await this.checkIfSaved()
        },
        methods: {
            async sendComment() {
                console.log(this.user.id, this.$props.id, this.commentBox)
                const commentBoxData = await fetch('http://localhost:8000/api/comments', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.user.id,
                        eventId: this.$props.id,
                        commentText: this.commentBox,
                    })
                })
                const commentBoxResponse = await commentBoxData.json()
                this.updateComments()
            },
            async updateComments() {
                const commentData = await fetch(`http://localhost:8000/api/comments/${this.$props.id}`)
                const commentResponse = await commentData.json()
                this.comments = commentResponse
            },
            async saveEvent() {
                const savedEventData = await fetch('http://localhost:8000/api/saved', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.user.id,
                        eventId: this.$props.id,
                        eventName: this.event.name,
                        eventImageSource: this.event.images[0].url
                    })
                })
                this.checkIfSaved()
            },
            async removeEvent() {
                const deleteSaved = await fetch(`http://localhost:8000/api/saved/${this.saved.id}`, {
                method: 'delete',
                headers: {
                    'Authorization': 'Bearer ' + cookies.get("token")
                }})
                this.saved = null
            },
            async checkUser() {
                if (this.token) {
                    const userData = await fetch("http://localhost:8000/api/user", {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + cookies.get("token")
                    }})
                    const userResponse = await userData.json()
                    if (userResponse.message) {
                        cookies.remove("token", {path:"/"})
                    }
                    else {
                        this.user = userResponse
                    }
                }
                else {
                    this.user = null
                }
            },
            async checkIfSaved() {
                if (this.user) {
                    const savedData = await fetch(`http://localhost:8000/api/saved/${this.user.id}`, {
                    method: 'get',
                    })
                    const savedResponse = await savedData.json()
                    const savedEvent = savedResponse.find(savedEvent => savedEvent.eventId === this.$props.id)
                    if (savedEvent) {
                        this.saved = savedEvent
                    }
                    else {
                        this.saved = null
                    }
                }
            }
        }
    }
</script>