<template>
    <section v-if="user" class="user__info">
        <h1>Perfil</h1> 
        <h4>Username:</h4>
        <p>{{ user.name }}</p>
        <h4>Email:</h4>
        <p>{{ user.email }}</p>
        <h4>Ubicacion:</h4>
        <p>{{ user.location }}</p>
    </section>
</template>

<script>
    import countryData from "/src/data.json"
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])

    export default {
        data() {
            return {
                user: null,
                countryData: countryData
            };
        },
        async created() {
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
            this.user = response
            this.user.location = countryData.find(country => country.code === this.user.location).name
        }
    }
</script>