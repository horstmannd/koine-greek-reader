<script>
  import { onMount } from 'svelte';
  import { addVocab, loadVocab, removeVocab } from '$lib/vocab';

  export let data;

  let showGloss = true;
  let showParsing = false;
  let hoveredId = null;
  let pinnedId = null;

  let vocab = [];
  let vocabError = null;
  let vocabReady = false;

  const tokenById = data.tokens;
  const lemmaById = data.lemmas;

  const hoverToken = (id) => {
    hoveredId = id;
  };

  const clearHover = () => {
    hoveredId = null;
  };

  const pinToken = (id) => {
    pinnedId = id;
  };

  const refreshVocab = async () => {
    try {
      vocab = await loadVocab();
      vocabError = null;
    } catch (err) {
      vocabError = err?.message ?? 'Failed to load vocab.';
    } finally {
      vocabReady = true;
    }
  };

  const handleAddVocab = async () => {
    if (!pinnedToken) return;

    const entry = {
      lemmaId: pinnedToken.lemmaId,
      headword: pinnedLemma?.headword ?? '',
      surface: pinnedToken.surface,
      gloss: pinnedToken.gloss,
      morphCode: pinnedToken.morphCode
    };

    try {
      await addVocab(entry);
      await refreshVocab();
    } catch (err) {
      vocabError = err?.message ?? 'Failed to add vocab.';
    }
  };

  const handleRemoveVocab = async (lemmaId) => {
    try {
      await removeVocab(lemmaId);
      await refreshVocab();
    } catch (err) {
      vocabError = err?.message ?? 'Failed to remove vocab.';
    }
  };

  onMount(() => {
    refreshVocab();
  });

  $: hoveredToken = hoveredId ? tokenById[hoveredId] : null;
  $: pinnedToken = pinnedId ? tokenById[pinnedId] : null;
  $: hoveredLemma = hoveredToken ? lemmaById[hoveredToken.lemmaId] : null;
  $: pinnedLemma = pinnedToken ? lemmaById[pinnedToken.lemmaId] : null;
  $: hoveredGloss = hoveredToken?.gloss?.trim() || null;
  $: pinnedGloss = pinnedToken?.gloss?.trim() || null;
</script>

<section class="grid gap-8 lg:grid-cols-[2.5fr,1fr]">
  <div class="rounded-3xl border border-amber-200/60 bg-white/90 p-8 shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.4em] text-amber-700">Reader</p>
        <h2 class="text-2xl font-semibold text-stone-900">1 John {data.chapter}</h2>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <label class="flex items-center gap-2">
          <input type="checkbox" bind:checked={showGloss} />
          <span>Glosses</span>
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" bind:checked={showParsing} />
          <span>Parsing</span>
        </label>
      </div>
    </div>

    <div class="mt-8 space-y-6">
      {#each data.verses as verse}
        <div class="rounded-2xl border border-stone-200/70 bg-stone-50/70 p-6">
          <p class="text-xs uppercase tracking-[0.3em] text-stone-500">Verse {verse.verse}</p>
          <div class="mt-4 flex flex-wrap gap-3 text-xl font-semibold text-stone-900">
            {#each verse.tokenIds as tokenId}
              {#if tokenById[tokenId]}
                <button
                  class="rounded-full border border-transparent px-3 py-1 font-greek text-2xl hover:border-amber-300 hover:bg-amber-50"
                  on:mouseenter={() => hoverToken(tokenId)}
                  on:mouseleave={clearHover}
                  on:click={() => pinToken(tokenId)}
                  type="button"
                >
                  {tokenById[tokenId].surface}
                </button>
              {/if}
            {/each}
          </div>

          {#if showGloss || showParsing}
            <div class="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
              {#each verse.tokenIds as tokenId}
                {#if tokenById[tokenId]}
                  <div class="rounded-full border border-stone-200 bg-white px-3 py-1">
                    <span class="font-greek">{tokenById[tokenId].surface}</span>
                    {#if showGloss}
                      <span class="ml-2 text-stone-500">{tokenById[tokenId].gloss}</span>
                    {/if}
                    {#if showParsing}
                      <span class="ml-2 text-amber-700">{tokenById[tokenId].morphCode}</span>
                    {/if}
                  </div>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <aside class="space-y-6">
    <div class="rounded-2xl border border-stone-200 bg-white p-6">
      <h3 class="text-sm font-semibold text-stone-900">Hover</h3>
      {#if hoveredToken}
        <div class="mt-4 space-y-2 text-sm">
          <p class="font-greek text-2xl text-stone-900">{hoveredToken.surface}</p>
          <p class="text-stone-600">Lemma: {hoveredLemma?.headword}</p>
          <p class="text-stone-600">Gloss (short): {hoveredGloss ?? '—'}</p>
          <p class="text-stone-600">Parsing: {hoveredToken.morphCode}</p>
        </div>
      {:else}
        <p class="mt-3 text-sm text-stone-500">Hover a token to preview.</p>
      {/if}
    </div>

    <div class="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <h3 class="text-sm font-semibold text-stone-900">Study Panel</h3>
      {#if pinnedToken}
        <div class="mt-4 space-y-3 text-sm">
          <p class="font-greek text-2xl text-stone-900">{pinnedToken.surface}</p>
          <p class="text-stone-700">Lemma: {pinnedLemma?.headword}</p>
          <p class="text-stone-700">Gloss (short): {pinnedGloss ?? '—'}</p>
          <p class="text-stone-700">Parsing: {pinnedToken.morphCode}</p>
          <button
            class="mt-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
            type="button"
            on:click={handleAddVocab}
          >
            Add to vocab
          </button>
        </div>
      {:else}
        <p class="mt-3 text-sm text-stone-600">Click a token to pin it here.</p>
      {/if}
    </div>

    <div class="rounded-2xl border border-stone-200 bg-white p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-stone-900">Vocab</h3>
        <span class="text-xs text-stone-500">{vocab.length} items</span>
      </div>
      {#if vocabError}
        <p class="mt-3 text-sm text-rose-600">{vocabError}</p>
      {:else if !vocabReady}
        <p class="mt-3 text-sm text-stone-500">Loading…</p>
      {:else if vocab.length === 0}
        <p class="mt-3 text-sm text-stone-500">No vocab yet.</p>
      {:else}
        <div class="mt-4 space-y-3 text-sm">
          {#each vocab as entry}
            <div class="flex items-start justify-between gap-3 rounded-2xl border border-stone-200/70 p-3">
              <div>
                <p class="font-greek text-lg text-stone-900">{entry.surface}</p>
                <p class="text-stone-600">{entry.headword}</p>
                <p class="text-xs text-stone-500">{entry.gloss || '—'}</p>
              </div>
              <button
                class="text-xs uppercase tracking-widest text-rose-600"
                type="button"
                on:click={() => handleRemoveVocab(entry.lemmaId)}
              >
                Remove
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </aside>
</section>
