<script lang="ts">
import { onMount } from 'svelte';

export let isSignUp = false;
import {setToken, user as user_store} from './user';
import type { User } from './user';
import { goto } from '$app/navigation';
let username = "";
let password = "";
let error = "" || "Please choose a password.";
let user: User;
user_store.subscribe(function(new_user) {
  user = new_user;
});
onMount(() => {
    if (user.token){
        goto("/");
    }
});
const handle = async () => {
    const res = await fetch(`http://localhost:5000/${isSignUp?"signup":"login"}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    const data = await res.json();
    if (data.error) {
        error = data.error;
    } else {
        error = "";
        user_store.set(data.user);
        setToken(data.token);
        goto("/");
        // console.log(data)
    }
}
</script>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="my-3 text-3xl text-indigo-800 text-center font-semibold font-mono">
                <h1 class="">{isSignUp?"Sign Up":"Login"} </h1>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" autocomplete="username" bind:value={username}>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class={`shadow appearance-none border ${error?"border-red-500":""} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="password" type="password" placeholder="******************" autocomplete="current-password" bind:value={password}>
                <p class="text-red-500 text-xs italic">{error}</p>
            </div>
            <div class="flex items-center justify-around">
                <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" on:click={handle}>
                    {isSignUp?"Sign Up":"Login"}
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800" href={isSignUp?"login":"signup"}>
                    {isSignUp?"Login":"Sign Up"}
                </a>
            </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
            &copy;2021 Yog Panjarale , All rights reserved.
        </p>
    </div>
</div>
