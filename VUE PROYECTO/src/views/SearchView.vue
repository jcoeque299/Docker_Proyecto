<template>
    <section class="form__container">
        <h1>Búsqueda avanzada</h1>
        <form @submit.prevent="searchEvents">
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="eventQuery" class="form__label">Evento</label>
                </div>
                <div class="form__column_big">
                    <input type="text" id="eventQuery" name="eventQuery" v-model="eventQuery" placeholder="Cualquiera" class="form__input">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="eventCountry" class="form__label">Pais</label>
                </div>
                <div class="form__column_big">
                    <select id="eventCountry" name="eventCountry" v-model="eventCountry" class="form__input">
                        <option value="" selected>-Cualquiera-</option>
                        <option v-for="country in countryData" v-bind:value="country.code">{{ country.name }}</option>
                    </select>
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="eventType" class="form__label">Tipo de evento</label>
                </div>
                <div class="form__column_big">
                    <select id="eventType" name="eventType" v-model="eventType" class="form__input">
                        <option value="" selected>-Cualquiera-</option>
                        <option value="Sports">Deportes</option>
                        <option value="Music">Música</option>
                        <option value="Arts & Theatre">Artes y teatro</option>
                        <option value="Film">Cine</option>
                        <option value="Merchandise">Merchandising</option>
                        <option value="Donation">Donaciones</option>
                    </select>
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="eventDate" class="form__label">Fecha</label>
                </div>
                <div class="form__column_big">
                    <input type="date" id="eventDate" name="eventDate" v-model="eventDate" class="form__input">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <router-link class="form__button" :to="{name: 'results', params: {query: this.eventQuery, type: this.eventType, country: this.eventCountry, date: this.eventDate}}">Buscar</router-link>
            </fieldset>
        </form>
    </section>
</template>

<script>
    import countryData from "/src/data.json"
    export default {
        data() {
            return {
                eventType: "",
                eventQuery: "",
                eventCountry: "",
                eventDate: `${new Date().getFullYear()}-01-01`,
                countryData: countryData
            }
        },
    }
</script>