<template>
    <section class="event__comments">
        <h1>Tickets de soporte</h1>
        <article v-if="tickets" v-for="ticket in tickets" class="event__comment">
            <div class="event__comment__info">
                <p>{{ ticket.contactEmail }}</p>
            </div>
            <div class="event__comment__body">
                <p>{{ ticket.text }}</p>
            </div>
        </article>
        <article v-else-if="tickets === false">
            <h3>Acceso no autorizado</h3>
        </article>
    </section>
    
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                tickets: null
            }
        },
        async created() {
            const data = await fetch("http://localhost:8000/api/tickets", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            if(data.status === 200) {
                this.tickets = await data.json()
            }
            else {
                this.tickets = false
            }
        }
    }
</script>