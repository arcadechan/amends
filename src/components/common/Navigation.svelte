<script lang="ts">
  type Links = {
    label: string;
    path: string;
    active: boolean;
  };

  import { trapFocus } from "../../scripts/attachments.svelte";

  let { children, links }: { children: any; links: Links[] } = $props();

  let isOpen = $state(false);
  let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<header {@attach isOpen ? trapFocus : undefined} class:scrolled={scrollY > 0}>
  <div class="header-container">
    <div class="logo-and-hamburger">
      {@render children?.()}
      <button
        class="hamburger"
        class:open={isOpen}
        onclick={() => (isOpen = !isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span class="bar top"></span>
        <span class="bar middle"></span>
        <span class="bar bottom"></span>
      </button>
    </div>
    <nav id="main-menu" class:open={isOpen}>
      <ul>
        {#each links as link}
          {#if link.active}
            <li>
              <a href={link.path}>
                {link.label}
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </nav>
  </div>
</header>

<style lang="scss">
  :global(html.comic) {
    #main-menu {
      a {
        &:hover {
          background-color: var(--color-black);
          color: var(--color-white);
        }
      }
    }
  }

  .header-container {
    width: 100%;
    height: 100%;
    max-width: 954px;
    margin: 0 auto;

    @include screen("md") {
      display: flex;
      justify-content: space-between;
      padding: 22px 48px;
    }
  }
  header {
    background-color: var(--color-main);
    height: 75px;
    z-index: 999;
    top: 0;
    position: sticky;
    width: 100%;

    &.scrolled {
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .logo-and-hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 22px 21.75px;

    @include screen("md") {
      width: auto;
      padding: 0px;
    }
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: auto;

    .bar {
      display: block;
      width: 31px;
      height: 4px;
      border-radius: 2px;
      background: var(--outline-color);
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
      transform-origin: center;
    }

    &.open {
      .top {
        transform: translateY(10px) rotate(-45deg);
      }
      .middle {
        opacity: 0;
        transform: rotate(45deg);
      }
      .bottom {
        transform: translateY(-10px) rotate(45deg);
      }
    }

    @include screen("md") {
      display: none;
    }
  }

  #main-menu {
    display: block;
    opacity: 0;
    visibility: hidden;
    background-color: var(--color-main);
    transition: all 100ms ease-in-out;

    &.open {
      opacity: 1;
      visibility: visible;
      transition: all 100ms ease-in-out;
    }

    ul {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      list-style-type: none;
      padding: 22px;
      margin: 0;

      @include screen("md") {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        height: 100%;
        padding: 0px;
      }

      li {
        a {
          display: inline-block;
          color: var(--color-text);
          font-size: 20px;
          font-weight: bold;
          text-decoration: none;
          text-transform: uppercase;
          padding: 7px 23px;
          border-radius: var(--button-radius);

          &:hover {
            background-color: var(--btn-alt-background-hover);
            color: var(--btn-alt-text-hover);
          }
        }
      }
    }

    @include screen("md") {
      padding: 0;
      opacity: 1;
      visibility: visible;
      position: relative;
      right: -24px;
    }
  }
</style>
