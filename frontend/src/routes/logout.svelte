<script>
import { goto } from "$app/navigation";

import { logout } from "$lib/user";
import { onMount } from "svelte";
onMount(() => {
    logout();
    goto("/")
});
</script>
Logging out