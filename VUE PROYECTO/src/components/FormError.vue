<template>
    <div class="form__error" id="formError">
        <p>{{ this.$props.message }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            message: {type: String, required: false}
        },
    }
</script>