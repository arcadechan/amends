<script lang="ts">
  import { onMount } from "svelte";

  let activeTheme: string = $state("light");

  onMount(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === null) {
      localStorage.setItem("theme", "light");
    } else {
      activeTheme = storedTheme;
    }
  });

  const handleThemeChange = (e: Event) => {
    const newTheme = (e.target as HTMLSelectElement)?.value;

    if (newTheme) {
      localStorage.setItem("theme", newTheme);
      activeTheme = newTheme;

      switch (newTheme) {
        case "light":
          document.documentElement.setAttribute("class", "");
          break;
        default:
          document.documentElement.setAttribute("class", newTheme);
          break;
      }
    }
  };

  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "comic", label: "Comic" },
  ];
</script>

<label>
  Theme:
  <select onchange={handleThemeChange}>
    {#each themes as theme}
      <option value={theme.value} selected={theme.value === activeTheme}>
        {theme.label}
      </option>
    {/each}
  </select>
</label>

<style lang="scss">
  :global(html.comic) {
    select {
      border: 1px solid black;
    }
  }

  select {
    border-radius: var(--element-radius);
    padding: 5px 10px;
    border: none;
    background-color: var(--color-input);
    box-shadow: var(--box-shadow);
  }
</style>
