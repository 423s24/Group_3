<!-- Login view -->
<template>
    <form>
        <div>
            <h1>Login</h1>
            <sub>Please sign-in to continue</sub>
        </div>
        <div>
            <label for="username">Username</label>
            <input type="text" name="username" id="username" required>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" required>
        </div>
        <div>
            <button type="submit">Login</button>
            <button type="reset">Cancel</button>
        </div>
    </form>
</template>

<script setup lang="ts">
</script>