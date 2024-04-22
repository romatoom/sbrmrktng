<script lang="ts">
  import { onMount } from 'svelte';
  import { getCurrencies, getRate } from "../api/exchangerate-api";

  let fromCurrency: string = "USD";
  let fromValue: number = 1;

  let toCurrency: string = "RUB";
  let toValue: number = undefined;

  let directRate: number = 1;
  $: reverseRate = 1 / directRate;

  $: directConvertedValue = fromValue * directRate;
  $: reverseConvertedValue = toValue * reverseRate;

  async function setDirectRate() {
    directRate = await getRate(fromCurrency, toCurrency);
  }

  let currencies = [];

  function calcToValue() {
    if (!fromValue) return;
    toValue = directConvertedValue;
  }

  function calcFromValue() {
    if (!toValue) return;
    fromValue = reverseConvertedValue;
  }

  async function changeCurrency() {
    await setDirectRate();
    calcToValue();
  }

	onMount(async () => {
		currencies = await getCurrencies();
    await setDirectRate();
    calcToValue();
	})
</script>

<div>
  <input type="number" step="any" bind:value={fromValue} on:input={calcToValue}/>

  <select bind:value={fromCurrency} on:change={changeCurrency}>
    {#each currencies as currency}
			<option value={currency}>
				{currency}
			</option>
		{/each}
  </select>

  =

  <input  type="number" step="any" bind:value={toValue}  on:input={calcFromValue}/>

  <select bind:value={toCurrency} on:change={changeCurrency}>
    {#each currencies as currency}
			<option value={currency}>
				{currency}
			</option>
		{/each}
  </select>
</div>
