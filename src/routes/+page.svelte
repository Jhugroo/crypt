<script lang="ts">
	import StringEncryptor from '$lib';
	import Radio from '$lib/components/Radio.svelte';
	import '@picocss/pico';
	let passField = $state('');
	let textField = $state('');
	let output = $state('');
	let toEncrypt = $state(true);
	const encryptor = new StringEncryptor();
	function process() {
		encryptor.setPassPhrase(passField);
		output = toEncrypt ? encryptor.encrypt(textField) : encryptor.decrypt(textField);
	}
	const options = [
		{
			value: true,
			label: 'encrypt'
		},
		{
			value: false,
			label: 'decrypt'
		}
	];
</script>

<div>
	<Radio {options} fontSize={16} legend="Select " bind:userSelected={toEncrypt} />
	<div>
		<label>
			Passphrase:
			<input name="pass" type="pass" bind:value={passField} />
		</label>
	</div>
	<div>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label> text </label>
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<textarea rows="4" name="text" bind:value={textField} />
	</div>
	<button onclick={process}
		>{options.find((option) => option.value === toEncrypt)?.label ?? 'none selected'}
	</button>
	{#if output.length > 0}
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label>{toEncrypt ? 'Encrypted text' : 'Decrypted text'}</label>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<textarea rows="34" value={output} />
		</div>
	{/if}
</div>

<style>
	:root {
		--pico-border-radius: 2rem;
		--pico-typography-spacing-vertical: 1.5rem;
		--pico-form-element-spacing-vertical: 1rem;
		--pico-form-element-spacing-horizontal: 1.25rem;
	}
	h1 {
		--pico-font-family: Pacifico, cursive;
		--pico-font-weight: 400;
		--pico-typography-spacing-vertical: 0.5rem;
	}
	button {
		--pico-font-weight: 700;
	}
</style>
