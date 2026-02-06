<script>
  export let data;
</script>

<section class="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
  <p class="text-xs uppercase tracking-[0.4em] text-amber-700">Lemma</p>
  <h2 class="mt-3 font-greek text-4xl text-stone-900">{data.lemma.headword}</h2>
  <p class="mt-2 text-sm text-stone-600">{data.lemma.glosses.join(', ')}</p>

  <div class="mt-8">
    <h3 class="text-sm font-semibold text-stone-900">Tokens</h3>
    <div class="mt-3 flex flex-wrap gap-2">
      {#each data.tokens as token}
        <span class="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm">
          <span class="font-greek">{token.surface}</span>
          <span class="ml-2 text-stone-500">{token.morphCode}</span>
        </span>
      {/each}
    </div>
  </div>
</section>
