<script>
  import { nounEndingsFirstSecond, nounEndingsThird, verbEndings, quickDefinitions } from '$lib/grammar';

  const sections = [
    {
      title: 'Tense',
      items: quickDefinitions.tense
    },
    {
      title: 'Voice',
      items: quickDefinitions.voice
    },
    {
      title: 'Mood',
      items: quickDefinitions.mood
    },
    {
      title: 'Case',
      items: quickDefinitions.case
    },
    {
      title: 'Number',
      items: quickDefinitions.number
    },
    {
      title: 'Gender',
      items: quickDefinitions.gender
    },
    {
      title: 'Person',
      items: quickDefinitions.person
    }
  ];

  const tables = [nounEndingsFirstSecond, nounEndingsThird, verbEndings];
</script>

<section class="space-y-8">
  <div class="rounded-3xl border border-amber-200/60 bg-white/90 p-8 shadow-sm">
    <p class="text-xs uppercase tracking-[0.4em] text-amber-700">Grammar</p>
    <h2 class="mt-3 text-2xl font-semibold text-stone-900">Reference &amp; Short Explanations</h2>
    <p class="mt-3 max-w-2xl text-sm text-stone-600">
      Quick explanations for parsing terms, plus paradigm tables from the unfoldingWord Greek Grammar
      (UGG). Use these alongside the Study Panel to decode forms faster.
    </p>
  </div>

  <div class="grid gap-6 md:grid-cols-2">
    {#each sections as section}
      <div class="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h3 class="text-sm font-semibold text-stone-900">{section.title}</h3>
        <div class="mt-4 space-y-2 text-sm text-stone-600">
          {#each Object.entries(section.items) as [label, definition]}
            <div class="flex items-start gap-2">
              <span class="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                {label}
              </span>
              <span>{definition}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class="space-y-6">
    {#each tables as table}
      <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h3 class="text-sm font-semibold text-stone-900">{table.title}</h3>
          <span class="text-xs text-stone-500">{table.note}</span>
        </div>
        <div class="mt-4 overflow-x-auto">
          <table class="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr class="bg-stone-100 text-left text-xs uppercase tracking-wider text-stone-500">
                {#each table.columns as column}
                  <th class="border-b border-stone-200 px-3 py-2">{column}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each table.rows as row, rowIndex}
                <tr class={rowIndex % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                  {#each row as cell}
                    <td class="border-b border-stone-200 px-3 py-2 font-medium text-stone-700">
                      {cell}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/each}
  </div>
</section>
