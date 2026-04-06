<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    accessKey: string;
  }

  type WindowWithHCaptcha = {
    hcaptcha?: any;
  } & Window;

  const { accessKey }: Props = $props();

  let form: HTMLFormElement;
  let emailField: HTMLInputElement;
  let messageField: HTMLTextAreaElement;
  let resultMessage: string = $state("");
  let resultType: string = $state("");

  let errors: { email: string; message: string } = $state({
    email: "",
    message: "",
  });

  let isSubmitting: boolean = $state(false);

  onMount(() => {
    const isMobile = window.matchMedia("(max-width: 500px)").matches;

    const hCaptchaContainer = document.querySelector(".h-captcha");

    if (hCaptchaContainer) {
      hCaptchaContainer?.setAttribute(
        "data-size",
        isMobile ? "compact" : "normal",
      );

      window as WindowWithHCaptcha;

      if (typeof (window as any)?.hcaptcha === "function") {
        (window as any).hcaptcha.reset();
      }
    }
  });

  // On blur: clear error if valid, refresh message if still invalid
  function handleBlur(field, key) {
    if (field.validity.valid) {
      errors[key] = "";
    } else {
      errors[key] = field.validationMessage;
    }
  }

  async function handleSubmit(e) {
    isSubmitting = true;
    e.preventDefault();

    const hCaptcha = form.querySelector<HTMLTextAreaElement>(
      "textarea[name=h-captcha-response]",
    )?.value;

    if (!hCaptcha) {
      isSubmitting = false;
      alert("Please fill out captcha field");
      return;
    }

    // Validate and collect messages from all invalid fields
    errors.email = emailField.validity.valid
      ? ""
      : emailField.validationMessage;
    errors.message = messageField.validity.valid
      ? ""
      : messageField.validationMessage;

    if (!emailField.validity.valid || !messageField.validity.valid) {
      isSubmitting = false;
      // Focus the first invalid field
      if (!emailField.validity.valid) emailField.focus();
      else messageField.focus();
      return;
    }

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await response.json();
      resultType = response.status === 200 ? "success" : "error";
      resultMessage = data.message;
    } catch {
      resultType = "error";
      resultMessage = "Something went wrong!";
    } finally {
      isSubmitting = false;

      form.reset();
      errors = { email: "", message: "" };
      setTimeout(() => {
        resultMessage = "";
        resultType = "";
      }, 5000);
    }
  }
</script>

<svelte:head>
  <script src="https://web3forms.com/client/script.js" async defer></script>
</svelte:head>

<div>
  <form bind:this={form} onsubmit={handleSubmit} novalidate>
    <input type="hidden" name="access_key" value={accessKey} />
    <input type="checkbox" style="display:none" name="botcheck" />

    <!-- Email -->
    <div>
      <label for="email_address" class="sr-only">Email Address</label>
      <input
        bind:this={emailField}
        id="email_address"
        type="email"
        name="email"
        placeholder="Email Address"
        required
        aria-describedby="email-error"
        aria-invalid={!!errors.email}
        onblur={() => handleBlur(emailField, "email")}
        disabled={isSubmitting}
      />
      <div id="email-error" class="error" role="alert" aria-live="polite">
        {errors.email}
      </div>
    </div>

    <!-- Message -->
    <div>
      <label for="message" class="sr-only">Your Message</label>
      <textarea
        bind:this={messageField}
        id="message"
        name="message"
        placeholder="Your Message"
        required
        aria-describedby="message-error"
        aria-invalid={!!errors.message}
        onblur={() => handleBlur(messageField, "message")}
        disabled={isSubmitting}
      ></textarea>
      <div id="message-error" class="error" role="alert" aria-live="polite">
        {errors.message}
      </div>
    </div>

    <div class="h-captcha" data-captcha="true"></div>

    <button type="submit" disabled={isSubmitting}>
      {#if isSubmitting}
        <img src="/icons/loading.svg" alt="" height={20} width={20} />
        Submitting...
      {:else}
        Send Message
      {/if}
    </button>

    {#if resultMessage}
      <div
        class="result"
        class:success={resultType === "success"}
        class:error-text={resultType === "error"}
      >
        {resultMessage}
      </div>
    {/if}
  </form>
</div>

<style lang="scss">
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  form {
    background-color: var(--color-yellow);
    padding: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 40px auto 0;
    text-align: center;
    max-width: 500px;

    div {
      width: 100%;
    }

    input,
    textarea {
      font-size: 14px;
      border: 2px solid #1a1d27;
      border-radius: 20px;
      padding: 10px 20px;
      width: 100%;
      min-width: 100%;
      max-width: 100%;

      &:disabled {
        background-color: rgba(255, 255, 255, 0.5);
        border-color: rgba(0, 0, 0, 0.3);
      }
    }

    textarea {
      min-height: 150px;
    }

    button {
      background-color: var(--color-black);
      color: #ffffff;
      padding: 7px 23px;
      font-size: 20px;
      font-weight: bold;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover {
        background-color: white;
        color: var(--color-black);
      }
    }

    input,
    textarea,
    button {
      &:focus {
        outline: 2px solid var(--color-black);
        outline-offset: 2px;
      }
    }

    button[type="submit"]:disabled {
      background-color: #ffffff;
      color: var(--color-black);
      cursor: auto;
    }
  }

  .error {
    min-height: 1.2em; // reserves space so layout doesn't jump
    color: #dc3545;
    font-size: 13px;
    margin-top: 4px;
    text-align: left;
    padding-left: 20px;

    &:empty {
      visibility: hidden;
    }
  }

  [aria-invalid="true"] {
    border-color: #dc3545 !important;
  }

  .result {
    margin-top: 16px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  .success {
    color: var(--color-green);
  }

  .error-text {
    color: var(--color-red);
  }
</style>
