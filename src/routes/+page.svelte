<script lang="ts">
	import StringEncryptor from '$lib';
	import Radio from '$lib/components/Radio.svelte';
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
	function highlightText(event: MouseEvent) {
		const range = document.createRange();
		event.target && range.selectNodeContents(event.target as Node);
		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);
	}
</script>

<div>
	<Radio {options} fontSize={16} legend="Select " bind:userSelected={toEncrypt} />
	<div class="increase-padding">
		<label>
			Passphrase:
			<input name="pass" type="pass" bind:value={passField} />
		</label>
	</div>
	<div class="increase-padding">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label> text </label>
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<textarea rows="4" name="text" bind:value={textField} />
	</div>
	<button class="increase-padding" onclick={process}
		>{options.find((option) => option.value === toEncrypt)?.label ?? 'none selected'}
	</button>
	{#if output.length > 0}
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div class="increase-padding">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="width-max">{toEncrypt ? 'Encrypted text' : 'Decrypted text'}</label>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<textarea class=" width-max" onclick={highlightText} value={output} />
		</div>
	{/if}
</div>

<style>
	textarea {
		width: 100%;
	}
	.width-max {
		width: 100%;
	}
	.increase-padding {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
	}
	span {
		border: 2px solid black;
		padding: 5px;
		cursor: pointer;
	}
</style>
